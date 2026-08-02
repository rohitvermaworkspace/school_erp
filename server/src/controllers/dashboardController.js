const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Class = require("../models/Class");
const FeePayment = require("../models/FeePayment");
const Attendance = require("../models/Attendance");

// ADMIN DASHBOARD SUMMARY
const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalClasses = await Class.countDocuments();

    // FEES CALCULATION
    const feePayments = await FeePayment.find();

    const totalFeesCollected = feePayments.reduce(
      (acc, item) => acc + item.amountPaid,
      0
    );

    const pendingFees = feePayments.reduce(
      (acc, item) => acc + (item.remainingFee || 0),
      0
    );

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
    const payments = await FeePayment.find();

    const monthly = {};

    payments.forEach((p) => {
      const month = new Date(p.paidAt).getMonth() + 1;

      if (!monthly[month]) {
        monthly[month] = 0;
      }

      monthly[month] += p.amountPaid;
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