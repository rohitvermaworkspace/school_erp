const User = require("../models/User");
const School = require("../models/School");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Class = require("../models/Class");
const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");
const createAuditLog = require("../utils/createAuditLog");

const signup = async (req, res) => {
  try {
    const { name, email, password, role, schoolId, className, rollNumber } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["admin", "teacher", "student"].includes(role)) {
      return res.status(400).json({ message: "Invalid role for signup" });
    }

    if (!schoolId) {
      return res.status(400).json({ message: "schoolId is required for signup" });
    }

    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    if (school.status !== "Active") {
      return res.status(403).json({
        message:
          "This school is currently deactivated. New signups are not accepted.",
      });
    }

    const existingUser = await User.findOne({ email, schoolId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists in this school" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      schoolId,
    });

    if (role === "student") {
      await Student.create({
        userId: user._id,
        schoolId,
        admission: { status: "Active" },
        personal: {},
      });
    }

    const token = generateToken(user);

    await createAuditLog({
      module: "Authentication",
      action: "SIGNUP",
      details: `${user.email} registered as ${role} in ${school.name}`,
      userId: user._id,
      schoolId,
    });

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, schoolCode } = req.body;

    let query = { email };

    if (schoolCode) {
      const school = await School.findOne({ code: schoolCode.toUpperCase() });
      if (!school) {
        return res.status(404).json({ message: "School not found" });
      }
      query.schoolId = school._id;
    } else {
      const superAdmin = await User.findOne({ email, role: "super_admin" });
      if (superAdmin) {
        query = { _id: superAdmin._id };
      } else {
        return res.status(400).json({ message: "School code is required" });
      }
    }

    const user = await User.findOne(query);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Blocked / deactivated accounts cannot log in.
    if (user.status && user.status !== "Active") {
      return res.status(403).json({
        message: "Your account has been deactivated. Please contact the platform administrator.",
      });
    }

    // Users of a deactivated school are blocked at the gate as well
    // (tenantScope middleware enforces this on every subsequent request).
    if (user.role !== "super_admin" && user.schoolId) {
      const school = await School.findById(user.schoolId).select("status");
      if (!school || school.status !== "Active") {
        return res.status(403).json({
          message:
            "Your school has been deactivated by the platform administrator. Please contact support.",
        });
      }
    }

    const token = generateToken(user);

    await createAuditLog({
      module: "Authentication",
      action: "LOGIN",
      details: `${user.email} logged in`,
      userId: user._id,
      schoolId: user.schoolId || null,
    });

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId || null,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createSchool = async (req, res) => {
  try {
    const {
      name,
      code,
      email,
      phone,
      address,
      city,
      state,
      country,
      board,
      academicYear,
      principalName,
      adminEmail,
      adminName,
      adminPassword,
    } = req.body;

    if (!name || !code || !adminEmail || !adminName || !adminPassword) {
      return res.status(400).json({ message: "Name, code, and admin credentials are required" });
    }

    const existingSchool = await School.findOne({ code: code.toUpperCase() });
    if (existingSchool) {
      return res.status(400).json({ message: "School code already exists" });
    }

    const school = await School.create({
      name,
      code: code.toUpperCase(),
      email: email || "",
      phone: phone || "",
      address: address || "",
      city: city || "",
      state: state || "",
      country: country || "",
      board: board || "",
      academicYear: academicYear || "",
      principalName: principalName || "",
      createdBy: req.user._id,
    });

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const adminUser = await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      schoolId: school._id,
    });

    await createAuditLog({
      module: "School Management",
      action: "CREATE_SCHOOL",
      details: `Created school "${school.name}" (${school.code}) with admin ${adminUser.email}`,
      userId: req.user._id,
      schoolId: school._id,
    });

    return res.status(201).json({
      message: "School created successfully",
      school: {
        id: school._id,
        name: school.name,
        code: school.code,
        status: school.status,
      },
      admin: {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSchools = async (req, res) => {
  try {
    const schools = await School.find().sort({ createdAt: -1 });

    const schoolsWithCounts = await Promise.all(
      schools.map(async (school) => {
        const [userCount, teacherCount, studentCount, classCount] = await Promise.all([
          User.countDocuments({ schoolId: school._id }),
          Teacher.countDocuments({ schoolId: school._id }),
          Student.countDocuments({ schoolId: school._id }),
          Class.countDocuments({ schoolId: school._id }),
        ]);
        return {
          ...school.toObject(),
          userCount,
          teacherCount,
          studentCount,
          classCount,
        };
      })
    );

    return res.json(schoolsWithCounts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    const users = await User.find({ schoolId: school._id }).select("-password");
    const userCount = users.length;
    const roleBreakdown = {
      admin: users.filter((u) => u.role === "admin").length,
      teacher: users.filter((u) => u.role === "teacher").length,
      student: users.filter((u) => u.role === "student").length,
    };

    const [teacherCount, studentCount, classCount] = await Promise.all([
      Teacher.countDocuments({ schoolId: school._id }),
      Student.countDocuments({ schoolId: school._id }),
      Class.countDocuments({ schoolId: school._id }),
    ]);

    return res.json({
      ...school.toObject(),
      userCount,
      roleBreakdown,
      teacherCount,
      studentCount,
      classCount,
      users,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const SCHOOL_EDITABLE_FIELDS = [
  "name",
  "code",
  "email",
  "phone",
  "address",
  "city",
  "state",
  "country",
  "board",
  "academicYear",
  "principalName",
  "logo",
  "plan",
  "status",
];

const updateSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    // Only known school fields can be changed — never touch related
    // users/students/etc. from here.
    const updates = {};
    for (const field of SCHOOL_EDITABLE_FIELDS) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (updates.code) {
      updates.code = String(updates.code).toUpperCase();
      const duplicate = await School.findOne({
        code: updates.code,
        _id: { $ne: school._id },
      });
      if (duplicate) {
        return res.status(400).json({ message: "School code already exists" });
      }
    }

    Object.assign(school, updates);
    await school.save();

    await createAuditLog({
      module: "School Management",
      action: "UPDATE_SCHOOL",
      details: `Updated school "${school.name}" (${school.code})`,
      userId: req.user._id,
      schoolId: school._id,
    });

    return res.json({ message: "School updated successfully", school });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// All tenant-scoped collections. Used when permanently removing a school
// so that no orphaned data is left behind.
const SCHOOL_SCOPED_MODELS = () => ({
  User,
  Student,
  Teacher,
  Class,
  Subject: require("../models/Subject"),
  Attendance: require("../models/Attendance"),
  Mark: require("../models/Mark"),
  Result: require("../models/Result"),
  Fee: require("../models/Fee"),
  FeePayment: require("../models/FeePayment"),
  Notice: require("../models/Notice"),
  Notification: require("../models/Notification"),
  Timetable: require("../models/Timetable"),
  Settings: require("../models/Settings"),
  AuditLog: require("../models/AuditLog"),
  Leave: require("../models/Leave"),
  AcademicSession: require("../models/AcademicSession"),
  File: require("../models/File"),
  SubjectResource: require("../models/SubjectResource"),
  Counter: require("../models/Counter"),
});

const deleteSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    const models = SCHOOL_SCOPED_MODELS();

    // Count everything first so the caller gets an honest deletion report.
    const deletedCounts = {};
    let totalDeleted = 0;

    for (const [name, model] of Object.entries(models)) {
      const result = await model.deleteMany({ schoolId: school._id });
      deletedCounts[name.toLowerCase()] = result.deletedCount || 0;
      totalDeleted += result.deletedCount || 0;
    }

    await School.findByIdAndDelete(school._id);

    await createAuditLog({
      module: "School Management",
      action: "DELETE_SCHOOL",
      details: `Permanently deleted school "${school.name}" (${school.code}) along with ${totalDeleted} related records`,
      userId: req.user._id,
      schoolId: null,
    });

    return res.json({
      message: `School "${school.name}" and all its data were deleted`,
      totalDeleted,
      deletedCounts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  loginUser,
  createSchool,
  getSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
};
