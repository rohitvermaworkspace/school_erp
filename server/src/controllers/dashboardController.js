const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Class = require("../models/Class");
const Fee = require("../models/Fee");
const Attendance = require("../models/Attendance");

// ADMIN DASHBOARD SUMMARY
const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalClasses = await Class.countDocuments();

    // FEES CALCULATION
    const fees = await Fee.find();

    const totalFeesCollected = fees
      .filter((f) => f.status === "Paid")
      .reduce((acc, item) => acc + item.amount, 0);

    const pendingFees = fees
      .filter((f) => f.status === "Pending")
      .reduce((acc, item) => acc + item.amount, 0);

    // ATTENDANCE CALCULATION
    const attendance = await Attendance.find();

    const totalAttendance = attendance.length;
    const present = attendance.filter(
      (a) => a.status === "present"
    ).length;

    const attendanceRate =
      totalAttendance === 0
        ? 0
        : (present / totalAttendance) * 100;

    res.json({
      students: totalStudents,
      teachers: totalTeachers,
      classes: totalClasses,
      fees: {
        collected: totalFeesCollected,
        pending: pendingFees,
      },
      attendance: {
        totalRecords: totalAttendance,
        rate: attendanceRate.toFixed(2),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMonthlyRevenue = async (req, res) => {
  try {
    const payments = await Fee.find({ status: "Paid" });

    const monthly = {};

    payments.forEach((p) => {
      const month = new Date(p.paymentDate || p.createdAt).getMonth() + 1;

      if (!monthly[month]) {
        monthly[month] = 0;
      }

      monthly[month] += p.amount;
    });

    res.json(monthly);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTopClasses = async (req, res) => {
  try {
    const attendance = await Attendance.find();

    const classMap = {};

    attendance.forEach((a) => {
      if (!classMap[a.className]) {
        classMap[a.className] = { total: 0, present: 0 };
      }

      classMap[a.className].total += 1;

      if (a.status === "present") {
        classMap[a.className].present += 1;
      }
    });

    const result = Object.keys(classMap).map((cls) => {
      const data = classMap[cls];

      return {
        className: cls,
        attendanceRate:
          (data.present / data.total) * 100 || 0,
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getMonthlyRevenue,
  getTopClasses,
};