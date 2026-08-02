const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const Fee = require("../models/Fee");
const Teacher = require("../models/Teacher");

// ===============================
// ADMIN DASHBOARD
// ===============================
const getAdminDashboard = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    const attendanceRecords = await Attendance.find();
    const totalStudents = students.length;
    const present = attendanceRecords.filter(
      (r) => r.status === "present"
    ).length;

    const attendanceRate =
      attendanceRecords.length > 0
        ? Math.round((present / attendanceRecords.length) * 100)
        : 0;

    const classMap = {};

    students.forEach((student) => {
      const className = student.className || "Unknown";

      if (!classMap[className]) {
        classMap[className] = {
          className,
          students: 0,
        };
      }

      classMap[className].students += 1;
    });

    const classes = Object.values(classMap);
    const recentAdmissions = students
      .sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
      .slice(0, 5)
      .map((student) => ({
        id: student._id,
        name: student.name,
        className: student.className,
        createdAt: student.createdAt
      }));

    const notices = [
      {
        id: 1,
        title: "PTM Meeting",
        date: "20 Jun 2026",
      },
      {
        id: 2,
        title: "Summer Vacation",
        date: "25 Jun 2026",
      },
    ];
    // ===============================
    // FEE ANALYTICS
    // ===============================

    const totalCollectedResult = await Fee.aggregate([
      {
        $match: { status: "Paid" }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const pendingFeesResult = await Fee.aggregate([
      {
        $match: { status: "Pending" }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const todayCollectionResult = await Fee.aggregate([
      {
        $match: {
          status: "Paid",
          paymentDate: { $gte: startOfDay }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const monthlyCollectionResult = await Fee.aggregate([
      {
        $match: {
          status: "Paid"
        }
      },
      {
        $group: {
          _id: "$month",
          amount: { $sum: "$amount" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    const months = [
      "",
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];
    const admissionTrend = await Student.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.month": 1
        }
      }
    ]);
    const admissionTrendFormatted =
      admissionTrend.map(item => ({
        month: months[item._id.month],
        count: item.count
      }));

    const feeAnalytics = {
      totalCollected: totalCollectedResult[0]?.total || 0,
      pendingFees: pendingFeesResult[0]?.total || 0,
      todayCollection: todayCollectionResult[0]?.total || 0,
      monthlyCollection: monthlyCollectionResult.map(item => ({
        month: item._id,
        amount: item.amount
      }))
    };

     const totalTeachers = await Teacher.countDocuments();
      const activeTeachers =
        await Teacher.countDocuments({
          status: "Active"
        });

      const leaveTeachers =
        await Teacher.countDocuments({
          status: "Leave"
        });

    const stats = {
      session: "2026-2027",
      totalStudents,
      totalTeachers,
      newAdmissions: recentAdmissions.length,
      enquiries: 0,
      pendingFees: feeAnalytics.pendingFees,
      attendance: `${attendanceRate}%`,
    };
    const totalAttendance = attendanceRecords.length;
    const presentCount = attendanceRecords.filter(
      r => r.status === "present"
    ).length;
    const absentCount = attendanceRecords.filter(
      r => r.status === "absent"
    ).length;
    const lateCount = attendanceRecords.filter(
      r => r.status === "late"
    ).length;


   res.json({
    stats,
    classes,
    classStrength: classes,
    notices,
    recentAdmissions,
    feeAnalytics,

    attendanceAnalytics: {
      present: presentCount,
      absent: absentCount,
      late: lateCount
    },

    teacherAnalytics: {
      total: totalTeachers,
      active: activeTeachers,
      leave: leaveTeachers
    },

    admissionTrend: admissionTrendFormatted
  });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ===============================
// CLASS DRILLDOWN
// ===============================
const getClassDrilldown = async (req, res) => {
  try {
    const className = req.params.className;

    const records = await Attendance.find({ className });
    const students = await Student.find({ className });

    const studentMap = {};

    students.forEach(s => {
      const studentAttendance = records.filter(r => r.student.toString() === s._id.toString());

      const present = studentAttendance.filter(r => r.status === "present").length;

      studentMap[s._id] = {
        studentId: s._id,
        name: s.name,
        total: studentAttendance.length,
        present,
        percentage: studentAttendance.length
          ? (present / studentAttendance.length) * 100
          : 0,
      };
    });

    res.json({
      className,
      students: Object.values(studentMap),
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// STUDENT DRILLDOWN
// ===============================
const getStudentDrilldown = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const records = await Attendance.find({ student: studentId });

    const timeline = records.map(r => ({
      date: r.date,
      status: r.status,
    }));

    res.json({
      studentId,
      total: records.length,
      present: records.filter(r => r.status === "present").length,
      absent: records.filter(r => r.status === "absent").length,
      timeline,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// FEE ANALYTICS
// ===============================
const getFeeAnalytics = async (req, res) => {
  try {
    const fees = await Fee.find();

    const totalCollected = fees
      .filter(f => f.status === "Paid")
      .reduce((sum, f) => sum + f.amount, 0);

    const pendingFees = fees
      .filter(f => f.status === "Pending")
      .reduce((sum, f) => sum + f.amount, 0);

    const today = new Date();

    const todayCollection = fees
      .filter(
        f =>
          f.status === "Paid" &&
          f.paymentDate &&
          new Date(f.paymentDate).toDateString() === today.toDateString()
      )
      .reduce((sum, f) => sum + f.amount, 0);

    const monthlyCollection = [];

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    months.forEach((month) => {
      const amount = fees
        .filter(
          f =>
            f.status === "Paid" &&
            f.month === month
        )
        .reduce((sum, f) => sum + f.amount, 0);

      monthlyCollection.push({
        month,
        amount,
      });
    });

    res.json({
      totalCollected,
      pendingFees,
      todayCollection,
      monthlyCollection,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getAdminDashboard,
  getClassDrilldown,
  getStudentDrilldown,
  getFeeAnalytics,
};