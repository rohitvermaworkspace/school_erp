const mongoose = require("mongoose");
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const Notice = require("../models/Notice");

// ===============================
// EXISTING APIs (KEEP THESE)
// ===============================

const getStudentAttendanceStats = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const studentId = req.params.studentId;

    const records = await Attendance.find({ schoolId, student: studentId });

    const total = records.length;
    const present = records.filter(r => r.status === "present").length;
    const absent = records.filter(r => r.status === "absent").length;
    const late = records.filter(r => r.status === "late").length;

    const percentage = total === 0 ? 0 : (present / total) * 100;

    res.json({
      totalDays: total,
      present,
      absent,
      late,
      attendancePercentage: percentage.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMonthlyAttendance = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const { studentId, month, year } = req.params;

    const records = await Attendance.find({ schoolId, student: studentId });

    const filtered = records.filter(record => {
      const date = new Date(record.date);
      return (
        date.getMonth() + 1 === Number(month) &&
        date.getFullYear() === Number(year)
      );
    });

    res.json({
      month,
      year,
      total: filtered.length,
      present: filtered.filter(r => r.status === "present").length,
      absent: filtered.filter(r => r.status === "absent").length,
      late: filtered.filter(r => r.status === "late").length,
      data: filtered,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClassAttendanceStats = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const className = req.params.className;

    const records = await Attendance.find({ schoolId, className });

    const total = records.length;
    const present = records.filter(r => r.status === "present").length;
    const absent = records.filter(r => r.status === "absent").length;

    res.json({
      className,
      totalRecords: total,
      present,
      absent,
      attendanceRate: total === 0 ? 0 : (present / total) * 100,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// NEW: TEACHER DASHBOARD ANALYTICS
// ===============================

const getTeacherDashboardAnalytics = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const teacherId = req.user.id;

    const records = await Attendance.find({ schoolId });

    const total = records.length;
    const present = records.filter(r => r.status === "present").length;
    const absent = records.filter(r => r.status === "absent").length;

    const attendanceTrend = [
      { day: "Mon", attendance: 85 },
      { day: "Tue", attendance: 90 },
      { day: "Wed", attendance: 78 },
      { day: "Thu", attendance: 88 },
      { day: "Fri", attendance: 92 },
    ];

    const classData = await Student.aggregate([
      {
        $match: { schoolId: new mongoose.Types.ObjectId(schoolId) }
      },
      {
        $group: {
          _id: "$className",
          count: { $sum: 1 },
        },
      },
    ]);

    const classDistribution = classData.map(item => ({
      name: item._id,
      value: item.count,
    }));

    const totalStudents = await Student.countDocuments({ schoolId });
    const totalNotices = await Notice.countDocuments({ schoolId });

    const overview = [
      { name: "Students", value: totalStudents },
      { name: "Attendance", value: total },
      { name: "Present", value: present },
      { name: "Notices", value: totalNotices },
    ];

    res.json({
      stats: {
        totalRecords: total,
        present,
        absent,
        attendanceRate: total ? (present / total) * 100 : 0,
      },
      charts: {
        attendanceTrend,
        classDistribution,
        overview,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAttendanceTrend = async (teacherId) => {
  const today = new Date();
  const last7Days = [];

  // create last 7 days array
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);

    const dateStr = d.toISOString().split("T")[0];

    const records = await Attendance.find({
      date: dateStr,
      teacher: teacherId, // remove if not in model
    });

    const present = records.filter(r => r.status === "present").length;
    const total = records.length;

    last7Days.push({
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      attendance: total === 0 ? 0 : Math.round((present / total) * 100),
    });
  }

  return last7Days;
};

// ===============================
// EXPORT ALL (IMPORTANT)
// ===============================

module.exports = {
  getStudentAttendanceStats,
  getMonthlyAttendance,
  getClassAttendanceStats,
  getTeacherDashboardAnalytics,
  getAttendanceTrend,
};