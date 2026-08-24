const mongoose = require("mongoose");

const User = require("../models/User");
const School = require("../models/School");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Class = require("../models/Class");
const Subject = require("../models/Subject");
const bcrypt = require("bcryptjs");
const createAuditLog = require("../utils/createAuditLog");

// ================= PLATFORM STATS =================
const getPlatformStats = async (req, res) => {
  try {
    const [schools, totalStudents, totalTeachers, totalSchoolAdmins, totalSubjects] =
      await Promise.all([
        School.find().select("name code status createdAt").sort({ createdAt: -1 }),
        Student.countDocuments(),
        Teacher.countDocuments(),
        User.countDocuments({ role: "admin" }),
        Subject.countDocuments(),
      ]);

    const activeSchools = schools.filter((s) => s.status === "Active").length;
    const inactiveSchools = schools.length - activeSchools;

    res.json({
      totals: {
        schools: schools.length,
        activeSchools,
        inactiveSchools,
        students: totalStudents,
        teachers: totalTeachers,
        schoolAdmins: totalSchoolAdmins,
        subjects: totalSubjects,
      },
      recentSchools: schools.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= SCHOOL STATUS (ACTIVATE / DEACTIVATE) =================
const updateSchoolStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({
        message: "Status must be either Active or Inactive",
      });
    }

    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    school.status = status;
    await school.save();

    await createAuditLog({
      module: "School Management",
      action: status === "Active" ? "ACTIVATE_SCHOOL" : "DEACTIVATE_SCHOOL",
      details: `${status === "Active" ? "Activated" : "Deactivated"} school "${school.name}" (${school.code})`,
      userId: req.user._id,
      schoolId: school._id,
    });

    res.json({
      message:
        status === "Active"
          ? `"${school.name}" has been activated`
          : `"${school.name}" has been deactivated. Its staff and students can no longer use the system.`,
      school,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= SCHOOL ADMINS =================
// A School Admin is a User with role "admin" bound to exactly one school.
const listSchoolAdmins = async (req, res) => {
  try {
    const { schoolId, search, status } = req.query;

    const query = { role: "admin" };
    if (schoolId && mongoose.isValidObjectId(schoolId)) {
      query.schoolId = schoolId;
    }
    if (status === "Active" || status === "Inactive") {
      query.status = status;
    }

    let admins = await User.find(query)
      .populate("schoolId", "name code status")
      .select("-password")
      .sort({ createdAt: -1 });

    if (search) {
      const term = search.toLowerCase();
      admins = admins.filter(
        (a) =>
          a.name?.toLowerCase().includes(term) ||
          a.email?.toLowerCase().includes(term) ||
          a.schoolId?.name?.toLowerCase().includes(term)
      );
    }

    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSchoolAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, schoolId } = req.body;

    if (!name || !email || !password || !schoolId) {
      return res.status(400).json({
        message: "Name, email, password and school are required",
      });
    }

    if (!mongoose.isValidObjectId(schoolId)) {
      return res.status(400).json({ message: "Invalid school selected" });
    }

    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    const existing = await User.findOne({ email: email.toLowerCase(), schoolId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists in this school" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      role: "admin",
      schoolId,
    });

    await createAuditLog({
      module: "User Management",
      action: "CREATE",
      details: `Created school admin "${admin.name}" (${admin.email}) for "${school.name}"`,
      userId: req.user._id,
      schoolId,
    });

    res.status(201).json({
      message: "School admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        status: admin.status,
        schoolId: admin.schoolId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSchoolAdmin = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);
    if (!admin || admin.role !== "admin") {
      return res.status(404).json({ message: "School admin not found" });
    }

    const { name, email, phone, schoolId, password } = req.body;

    if (name !== undefined) admin.name = name;
    if (phone !== undefined) admin.phone = phone;

    // Re-assigning the admin to another school must keep emails unique there.
    if (schoolId !== undefined && String(schoolId) !== String(admin.schoolId)) {
      if (!mongoose.isValidObjectId(schoolId)) {
        return res.status(400).json({ message: "Invalid school selected" });
      }
      const school = await School.findById(schoolId);
      if (!school) {
        return res.status(404).json({ message: "New school not found" });
      }
      const duplicate = await User.findOne({
        email: admin.email,
        schoolId,
        _id: { $ne: admin._id },
      });
      if (duplicate) {
        return res.status(400).json({
          message: "A user with this email already exists in the target school",
        });
      }
      admin.schoolId = schoolId;
    }

    if (email !== undefined && email.toLowerCase() !== admin.email) {
      const duplicate = await User.findOne({
        email: email.toLowerCase(),
        schoolId: admin.schoolId,
        _id: { $ne: admin._id },
      });
      if (duplicate) {
        return res
          .status(400)
          .json({ message: "A user with this email already exists in this school" });
      }
      admin.email = email.toLowerCase();
    }

    if (password) {
      if (String(password).length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }
      admin.password = await bcrypt.hash(password, 10);
    }

    await admin.save();

    await createAuditLog({
      module: "User Management",
      action: "UPDATE",
      details: `Updated school admin "${admin.name}" (${admin.email})`,
      userId: req.user._id,
      schoolId: admin.schoolId,
    });

    const populated = await User.findById(admin._id)
      .populate("schoolId", "name code status")
      .select("-password");

    res.json({ message: "School admin updated successfully", admin: populated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSchoolAdminStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({ message: "Status must be Active or Inactive" });
    }

    const admin = await User.findById(req.params.id);
    if (!admin || admin.role !== "admin") {
      return res.status(404).json({ message: "School admin not found" });
    }

    admin.status = status;
    await admin.save();

    await createAuditLog({
      module: "User Management",
      action: status === "Active" ? "ACTIVATE_USER" : "DEACTIVATE_USER",
      details: `${status === "Active" ? "Activated" : "Deactivated"} school admin "${admin.name}" (${admin.email})`,
      userId: req.user._id,
      schoolId: admin.schoolId,
    });

    res.json({
      message:
        status === "Active"
          ? `"${admin.name}" can log in again`
          : `"${admin.name}" has been deactivated and can no longer log in`,
      admin: { id: admin._id, name: admin.name, email: admin.email, status: admin.status },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= PLATFORM USERS =================
const listPlatformUsers = async (req, res) => {
  try {
    const { schoolId, role, status, search, page = 1, limit = 10 } = req.query;

    const query = {};
    if (schoolId && mongoose.isValidObjectId(schoolId)) {
      query.schoolId = schoolId;
    }
    if (role && ["super_admin", "admin", "teacher", "student"].includes(role)) {
      query.role = role;
    }
    if (status === "Active" || status === "Inactive") {
      query.status = status;
    }

    if (search) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      query.$or = [{ name: regex }, { email: regex }];
    }

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

    const [users, total] = await Promise.all([
      User.find(query)
        .populate("schoolId", "name code")
        .select("-password")
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize),
      User.countDocuments(query),
    ]);

    res.json({
      users,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deactivate / reactivate any non-super-admin platform user.
const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({ message: "Status must be Active or Inactive" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "super_admin") {
      return res
        .status(403)
        .json({ message: "Super Admin accounts cannot be deactivated" });
    }

    user.status = status;
    await user.save();

    res.json({
      message: `User "${user.name}" ${status === "Active" ? "activated" : "deactivated"}`,
      user: { id: user._id, name: user.name, status: user.status },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPlatformStats,
  updateSchoolStatus,
  listSchoolAdmins,
  createSchoolAdmin,
  updateSchoolAdmin,
  updateSchoolAdminStatus,
  listPlatformUsers,
  updateUserStatus,
};
