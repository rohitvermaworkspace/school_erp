const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Notice = require('../models/Notice');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// CREATE TEACHER
const createTeacher = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const {
      name,
      email,
      subject,
      classes,
      phone,
      experience,
    } = req.body;

    let user = await User.findOne({
      email,
      role: "teacher",
      schoolId,
    });

    if (!user) {
      const defaultPassword = "teacher123";

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(
        defaultPassword,
        salt
      );

      user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "teacher",
        schoolId,
      });
    }

    const teacherExists = await Teacher.findOne({
      email,
      schoolId,
    });

    if (teacherExists) {
      return res.status(400).json({
        message: "Teacher already exists",
      });
    }

    const teacher = await Teacher.create({
      user: user._id,
      name,
      email,
      subject,
      classes,
      phone,
      experience,
      status: "Active",
      createdBy: req.user._id,
      schoolId,
    });

    const populatedTeacher = await Teacher.findById(teacher._id)
      .populate('schoolId', 'name code email');

    res.status(201).json({
      message: "Teacher created successfully",
      teacher: populatedTeacher,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Teacher Profile APIs
const getMyTeacherProfile = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const teacher = await Teacher.findOne({
      email: req.user.email,
      schoolId,
    }).populate('schoolId', 'name code email').populate('user', 'name email role');

    if (!teacher) {
      return res.status(404).json({
        message: 'Teacher profile not found',
      });
    }

    res.json({
      ...teacher.toObject(),
      role: req.user.role,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Profile
const updateMyTeacherProfile = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const teacher = await Teacher.findOne({
      email: req.user.email,
      schoolId,
    });

    if (!teacher) {
      return res.status(404).json({
        message: 'Teacher not found',
      });
    }

    teacher.phone = req.body.phone || teacher.phone;

    teacher.subject = req.body.subject || teacher.subject;

    teacher.classes = req.body.classes || teacher.classes;

    await teacher.save();

    res.json(teacher);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const uploadTeacherProfileImage = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const teacher = await Teacher.findOne({
      email: req.user.email,
      schoolId,
    });

    if (!teacher) {
      return res.status(404).json({
        message: 'Teacher not found',
      });
    }

    teacher.profileImage = req.file.filename;

    await teacher.save();

    res.json({
      message: 'Profile image uploaded',
      profileImage: teacher.profileImage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const changeTeacherPassword = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({ _id: req.user._id, schoolId });

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Old password incorrect',
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL TEACHERS
const getTeachers = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const teachers = await Teacher.find({ schoolId })
      .populate('schoolId', 'name code email')
      .populate('createdBy', 'name email role');

    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE TEACHER
const getTeacherById = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const teacher = await Teacher.findOne({ _id: req.params.id, schoolId })
      .populate('schoolId', 'name code email');

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TEACHER
const updateTeacher = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const teacher = await Teacher.findOneAndUpdate({ _id: req.params.id, schoolId }, req.body, { new: true });

    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TEACHER
const deleteTeacher = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    await Teacher.findOneAndDelete({ _id: req.params.id, schoolId });

    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeacherDashboard = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    console.log('User Email:', req.user.email);

    const teacher = await Teacher.findOne({
      email: req.user.email,
      schoolId,
    });

    if (!teacher) {
      const allTeachers = await Teacher.find({ schoolId });
      return res.status(404).json({
        message: 'Teacher not found',
        loggedInEmail: req.user.email,
        availableTeachers: allTeachers.map((t) => t.email),
      });
    }

    const totalStudents = await Student.countDocuments({
      className: { $in: teacher.classes },
      schoolId,
    });

    const today = new Date().toISOString().split('T')[0];

    const todayAttendance = await Attendance.countDocuments({
      className: { $in: teacher.classes },
      date: today,
      schoolId,
    });

    const totalNotices = await Notice.countDocuments({ schoolId });

    res.json({
      totalStudents,
      totalClasses: teacher.classes.length,
      todayAttendance,
      totalNotices,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getTeacherDashboard,

  getMyTeacherProfile,
  updateMyTeacherProfile,
  uploadTeacherProfileImage,
  changeTeacherPassword,
};
