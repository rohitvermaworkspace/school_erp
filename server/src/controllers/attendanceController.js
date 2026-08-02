const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const { Parser } = require('json2csv');
const Class = require('../models/Class');

const getAttendanceDashboard = async (req, res) => {
  try {
    const present = await Attendance.countDocuments({
      status: 'present',
    });

    const absent = await Attendance.countDocuments({
      status: 'absent',
    });

    const late = await Attendance.countDocuments({
      status: 'late',
    });

    const totalStudents = await Student.countDocuments();

    const total = present + absent + late;

    // ==========================
    // ATTENDANCE TREND
    // ==========================

    const attendanceTrend = await Attendance.aggregate([
      {
        $group: {
          _id: '$date',
          total: { $sum: 1 },
          present: {
            $sum: {
              $cond: [{ $eq: ['$status', 'present'] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const attendanceTrendFormatted = attendanceTrend.map((item) => ({
      date: new Date(item._id).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
      }),
      percentage: item.total > 0 ? Math.round((item.present / item.total) * 100) : 0,
    }));

    // ==========================
    // CLASS ATTENDANCE
    // ==========================

    const classAttendance = await Attendance.aggregate([
      {
        $match: {
          className: {
            $ne: null,
          },
        },
      },
      {
        $group: {
          _id: '$className',
          total: { $sum: 1 },
          present: {
            $sum: {
              $cond: [{ $eq: ['$status', 'present'] }, 1, 0],
            },
          },
        },
      },
    ]);

    const classAttendanceFormatted = classAttendance
      .map((item) => ({
        className: item._id,
        percentage: item.total > 0 ? Math.round((item.present / item.total) * 100) : 0,
        present: item.present,
        total: item.total,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    res.json({
      present,
      absent,
      late,
      totalStudents,
      total,

      attendancePercentage: total > 0 ? Number(((present / total) * 100).toFixed(1)) : 0,

      attendanceTrend: attendanceTrendFormatted,

      classAttendance: classAttendanceFormatted,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// MARK ATTENDANCE
const markAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    const studentExists = await Student.findById(studentId);

    if (!studentExists) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    const existingAttendance = await Attendance.findOne({
      studentId,
      date,
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: 'Attendance already marked for this student on this date',
      });
    }

    const attendance = await Attendance.create({
      studentId,
      className: studentExists.className,
      date,
      status,
      markedBy: req.user.id,
    });

    const populatedAttendance = await Attendance.findById(attendance._id).populate('studentId', 'name rollNumber className').populate('markedBy', 'name role');

    res.status(201).json({
      message: 'Attendance marked successfully',
      attendance: populatedAttendance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL ATTENDANCE
const getAllAttendance = async (req, res) => {
  try {
    const { date, className } = req.query;

    let filter = {};

    if (date) filter.date = date;

    if (className) filter.className = className;

    const records = await Attendance.find(filter).populate('studentId', 'name rollNumber className').populate('markedBy', 'name role').sort({
      date: -1,
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET STUDENT ATTENDANCE
const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const studentExists = await Student.findById(studentId);

    if (!studentExists) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    const records = await Attendance.find({
      studentId, // ✅ FIXED
    })
      .populate('studentId', 'name rollNumber className')
      .populate('markedBy', 'name role')
      .sort({ date: -1 });

    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ATTENDANCE BY CLASS
const getAttendanceByClass = async (req, res) => {
  try {
    const { className } = req.params;

    const records = await Attendance.find({
      className,
    })
      .populate('studentId', 'name rollNumber className')
      .populate('markedBy', 'name role')
      .sort({ date: -1 });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStudentsByClassId = async (req, res) => {
  try {
    console.log('Class Id:', req.params.classId);

    const classData = await Class.findById(req.params.classId);

    console.log('Class Data:', classData);

    const students = await Student.find({
      className: `${classData.className}${classData.section.replace(classData.className, '')}`,
    });

    console.log('Students:', students);

    res.json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStudentAttendanceForLoggedUser = async (req, res) => {
  try {
    // 1. FIND STUDENT PROFILE FIRST
    const student = await Student.findOne({
      userId: req.user._id,
    });

    if (!student) {
      return res.status(404).json({
        message: 'Student profile not found',
      });
    }

    // 2. FETCH ATTENDANCE USING STUDENT ID
    const records = await Attendance.find({
      studentId: student._id,
    }).sort({ date: 1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE ATTENDANCE
const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        message: 'Attendance record not found',
      });
    }

    await attendance.deleteOne();

    res.status(200).json({
      message: 'Attendance deleted successfully',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getStudentsByClass = async (req, res) => {
  try {
    const students = await Student.find({
      className: req.params.className,
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// TEACHER BULK ATTENDANCE
// =====================================
const markClassAttendance = async (req, res) => {
  try {
    const { attendanceData } = req.body;

    const today = new Date().toISOString().split('T')[0];

    const studentIds = attendanceData.map((item) => item.studentId);

    const students = await Student.find({
      _id: { $in: studentIds },
    });

    const studentMap = {};

    students.forEach((student) => {
      studentMap[student._id.toString()] = student;
    });

    const results = [];

    for (const item of attendanceData) {
      const student = studentMap[item.studentId];

      if (!student) continue;

      const attendance = await Attendance.findOneAndUpdate(
        {
          studentId: item.studentId,
          date: today,
        },
        {
          studentId: item.studentId,
          className: student.className,
          date: today,
          status: item.status,
          markedBy: req.user.id,
        },
        {
          new: true,
          upsert: true,
        }
      );

      results.push(attendance);
    }

    res.status(200).json({
      message: 'Attendance saved successfully',
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const exportAttendanceCSV = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('studentId', 'name rollNumber');

    const rows = attendance.map((item) => ({
      student: item.studentId?.name,
      rollNumber: item.studentId?.rollNumber,
      class: item.className,
      date: item.date,
      status: item.status,
    }));

    const parser = new Parser();

    const csv = parser.parse(rows);

    res.header('Content-Type', 'text/csv');

    res.attachment('attendance.csv');

    res.send(csv);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  markAttendance,
  getAllAttendance,
  getStudentAttendance,
  getAttendanceByClass,
  deleteAttendance,
  getStudentsByClass,
  markClassAttendance,
  getStudentAttendanceForLoggedUser,
  getAttendanceDashboard,
  exportAttendanceCSV,
  getStudentsByClassId,
};
