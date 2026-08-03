const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Student = require("../models/Student");
const Counter = require("../models/Counter");

const createAuditLog = require("../utils/auditLogger");

const generateAdmissionNo = async (schoolId, session) => {
  const year = new Date().getFullYear();
  const counter = await Counter.findOneAndUpdate(
    { schoolId, type: "admission", year: String(year) },
    { $inc: { seq: 1 } },
    { upsert: true, new: true, session }
  );
  return `ADM${year}${String(counter.seq).padStart(3, "0")}`;
};

// ===============================
// CREATE STUDENT (Transaction)
// ===============================

const createStudent = async (req, res) => {
  const schoolId = req.schoolId;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // ============================
    // Parse JSON (handles both FormData and JSON body)
    // ============================

    const parseField = (field) => {
      if (!field) return {};
      if (typeof field === "object") return field;
      try { return JSON.parse(field); } catch { return {}; }
    };

    const user = parseField(req.body.user);
    const admission = parseField(req.body.admission);
    const academic = parseField(req.body.academic);
    const personal = parseField(req.body.personal);
    const family = parseField(req.body.family);
    const address = parseField(req.body.address);
    const bank = parseField(req.body.bank);
    const previousSchool = parseField(req.body.previousSchool);
    const facilities = parseField(req.body.facilities);
    const notes = parseField(req.body.notes);

    // ============================
    // Uploaded Documents
    // ============================

    const files = req.files || {};

    const documents = {
      studentPhoto:
        files.studentPhoto?.[0]?.filename || "",

      guardianPhoto:
        files.guardianPhoto?.[0]?.filename || "",

      birthCertificate:
        files.birthCertificate?.[0]?.filename || "",

      aadhaarCard:
        files.aadhaarCard?.[0]?.filename || "",

      transferCertificate:
        files.transferCertificate?.[0]?.filename || "",

      marksheet:
        files.marksheet?.[0]?.filename || "",
    };

    // ============================
    // VALIDATION
    // ============================

    if (!user?.name?.trim())
      throw new Error("Student name is required.");

    if (!user?.email?.trim())
      throw new Error("Student email is required.");

    if (!academic?.className?.trim())
      throw new Error("Class is required.");

    if (!academic?.rollNumber?.trim())
      throw new Error("Roll Number is required.");

    const admissionNo = await generateAdmissionNo(schoolId, session);

    // ============================
    // CHECK USER
    // ============================

    const existingUser = await User.findOne({
      email: user.email.trim().toLowerCase(),
      schoolId,
    }).session(session);

    if (existingUser) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message: "Student email already exists.",
      });
    }

    // ============================
    // CHECK ROLL NUMBER
    // ============================

    const rollExists = await Student.findOne({
      "academic.className": academic.className,
      "academic.section": academic.section,
      "academic.rollNumber": academic.rollNumber,
      schoolId,
    }).session(session);

    if (rollExists) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message: "Roll number already exists.",
      });
    }

    // ============================
    // DEFAULT PASSWORD
    // ============================

    const defaultPassword = "Student@123";

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      defaultPassword,
      salt
    );

    // ============================
    // CREATE USER
    // ============================

    const users = await User.create(
      [
        {
          name: user.name.trim(),
          email: user.email.trim().toLowerCase(),
          phone: user.phone || "",
          profileImage: documents.studentPhoto || "",
          password: hashedPassword,
          role: "student",
          schoolId,
        },
      ],
      { session }
    );
    console.log("===============");
    console.log(req.files);
    console.log(documents);
    console.log(documents.studentPhoto);
    console.log("===============");
    const createdUser = users[0];
    
    // ============================
    // CREATE STUDENT
    // ============================
    const students = await Student.create(
      [
        {
          userId: createdUser._id,
          schoolId,

          admission: {
            ...admission,
            admissionNo,
            status: admission.status || "Active",
            medium: admission.medium || "English",
          },

          academic,
          personal,
          family,
          address,
          bank,
          previousSchool,
          facilities,

          documents,

          notes,

          createdBy: req.user._id,
        },
      ],
      { session }
    );

    const student = await Student.findOne(
      { _id: students[0]._id, schoolId }
    )
      .populate("schoolId", "name code email")
      .populate(
        "userId",
        "name email phone profileImage role"
      )
      .populate(
        "createdBy",
        "name email role"
      )
      .session(session);

    // ============================
    // COMMIT
    // ============================

    await session.commitTransaction();

    session.endSession();

    try {
      await createAuditLog({
        module: "Students",
        action: "CREATE",
        details: `Student ${createdUser.name} admitted`,
        userId: req.user._id,
        schoolId,
      });
    } catch (err) {
      console.error(err);
    }

    return res.status(201).json({
      success: true,
      message: "Student admitted successfully.",
      student,

      login: {
        email: createdUser.email,
        password: defaultPassword,
      },
    });
  } catch (error) {
    await session.abortTransaction();

    session.endSession();

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET ALL STUDENTS
// =========================
const getStudents = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const students = await Student.find({ schoolId })
      .populate("schoolId", "name code email")
      .populate("userId", "name email phone profileImage role")
      .populate("createdBy", "name email role");

    const normalizedStudents = students.map((student) => {
      const s = student.toObject();

      return {
        ...s,

        // =========================
        // Normalize User Information
        // =========================
        name: s.userId?.name || s.name || "",
        email: s.userId?.email || s.email || "",
        phone: s.userId?.phone || s.phone || "",
        profileImage:
          s.userId?.profileImage ||
          s.documents?.studentPhoto ||
          "",

        // =========================
        // Normalize Academic
        // =========================
        className: s.academic?.className || s.className || "",
        section: s.academic?.section || s.section || "",
        rollNumber: s.academic?.rollNumber || s.rollNumber || "",
        house: s.academic?.house || s.house || "",

        // =========================
        // Normalize Personal
        // =========================
        gender: s.personal?.gender || s.gender || "",
        dob: s.personal?.dob || s.dob || "",
        bloodGroup: s.personal?.bloodGroup || s.bloodGroup || "",
        religion: s.personal?.religion || s.religion || "",
        category: s.personal?.category || s.category || "",
        nationality: s.personal?.nationality || s.nationality || "",

        // =========================
        // Normalize Parents
        // =========================
        fatherName: s.family?.father?.name || "",
        fatherPhone: s.family?.father?.phone || "",
        motherName: s.family?.mother?.name || "",
        motherPhone: s.family?.mother?.phone || "",
        guardianName: s.family?.guardian?.name || "",
        guardianPhone: s.family?.guardian?.phone || "",

        // =========================
        // Normalize Admission
        // =========================
        admissionNo: s.admission?.admissionNo || "",
        admissionDate: s.admission?.admissionDate || "",
        academicSession: s.admission?.academicSession || "",
        medium: s.admission?.medium || "",
        status: s.admission?.status || s.status || "Active",
      };
    });

    return res.status(200).json(normalizedStudents);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET SINGLE STUDENT
// =========================
const getStudentById = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const student = await Student.findOne({ _id: req.params.id, schoolId })
      .populate("schoolId", "name code email")
      .populate("userId", "name email phone profileImage role")
      .populate("createdBy", "name email role");

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// UPDATE STUDENT
// =========================
const updateStudent = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const student = await Student.findOne({ _id: req.params.id, schoolId });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // -----------------------------
    // Update User
    // -----------------------------
    if (student.userId && req.body.user) {
      await User.findOneAndUpdate(
        { _id: student.userId, schoolId },
        {
          name: req.body.user.name,
          email: req.body.user.email,
          phone: req.body.user.phone,
          profileImage: req.body.user.profileImage,
        },
        { new: true }
      );
    }

    // -----------------------------
    // Update Student
    // -----------------------------
    student.admission = {
        ...student.admission.toObject(),
        ...req.body.admission,
      };

      student.academic = {
        ...student.academic.toObject(),
        ...req.body.academic,
      };

      student.personal = {
        ...student.personal.toObject(),
        ...req.body.personal,
      };

      student.family = {
        ...student.family.toObject(),
        ...req.body.family,
      };

      student.address = {
        ...student.address.toObject(),
        ...req.body.address,
      };

      student.bank = {
        ...student.bank.toObject(),
        ...req.body.bank,
      };

      student.previousSchool = {
        ...student.previousSchool.toObject(),
        ...req.body.previousSchool,
      };

      student.facilities = {
        ...student.facilities.toObject(),
        ...req.body.facilities,
      };

      student.documents = {
        ...student.documents.toObject(),
        ...req.body.documents,
      };

      student.notes = {
        ...student.notes.toObject(),
        ...req.body.notes,
      };

    await student.save();

    const updatedStudent = await Student.findOne({ _id: student._id, schoolId })
      .populate("schoolId", "name code email")
      .populate("userId", "name email phone profileImage role")
      .populate("createdBy", "name email role");

    await createAuditLog({
      module: "Students",
      action: "UPDATE",
      details: `Updated student ${updatedStudent.userId.name}`,
      userId: req.user._id,
      schoolId,
    });

    return res.json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// DELETE STUDENT
// =========================
const deleteStudent = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const student = await Student.findOne({ _id: req.params.id, schoolId });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await Student.findOneAndDelete({ _id: req.params.id, schoolId });

    await createAuditLog({
      module: "Students",
      action: "DELETE",
      details: `Deleted student ${student.name}`,
      userId: req.user._id,
      schoolId,
    });

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// GET STUDENTS BY CLASS
// =========================
const getStudentsByClass = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const students = await Student.find({
      className: req.params.className,
      schoolId,
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// STUDENT DASHBOARD
// =========================
const getStudentDashboard = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    console.log("REQ USER:", req.user);

    const student = await Student.findOne({
      userId: req.user._id,
      schoolId,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    // 🔥 ERP STYLE DASHBOARD DATA
    const dashboard = {
      profile: {
        name: student.name,
        email: student.email,
        className: student.className,
        rollNumber: student.rollNumber,
      },

      stats: {
        attendance: 92,
        feesPaid: false,
        subjects: 6,
      },

      attendanceTrend: [
        { month: "Jan", value: 92 },
        { month: "Feb", value: 88 },
        { month: "Mar", value: 95 },
        { month: "Apr", value: 90 },
        { month: "May", value: 93 },
        { month: "Jun", value: 91 },
      ],

      feesTrend: [
        { month: "Jan", paid: 1000, pending: 500 },
        { month: "Feb", paid: 1200, pending: 300 },
        { month: "Mar", paid: 1500, pending: 200 },
      ],

      notices: [
        {
          title: "Midterm Exam",
          date: "2026-06-15",
        },
      ],
    };

    res.json(dashboard);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// MY PROFILE (/me)
// =========================
const getMyStudentProfile = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const student = await Student.findOne({
      userId: req.user._id,
      schoolId,
    }).populate("schoolId", "name code email").populate("userId", "name email phone profileImage role");

    if (!student) {
      return res.status(404).json({
        message: "Student profile not created yet",
      });
    }

    res.json({
      ...student.toObject(),
      role: req.user.role,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Upload Profile Image
// =========================
const uploadProfileImage = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const student = await Student.findOne({
      userId: req.user._id,
      schoolId,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    student.profileImage = req.file.filename;

    await student.save();

    res.json({
      success: true,
      image: student.profileImage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Update Student profile
// =========================
const updateMyStudentProfile = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const student = await Student.findOne({
      userId: req.user._id,
      schoolId,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    Object.assign(student, req.body);

    await student.save();

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const changeStudentPassword = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({ _id: req.user.id, schoolId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Old password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentsByClass,
  getStudentDashboard,
  getMyStudentProfile,

  uploadProfileImage,
  updateMyStudentProfile,
  changeStudentPassword,
};