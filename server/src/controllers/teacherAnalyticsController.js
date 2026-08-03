const Attendance = require("../models/Attendance");
const Student = require("../models/Student");

// ===============================
// TEACHER ERP ANALYTICS
// ===============================
const getTeacherDashboardAnalytics = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const teacherId = req.user.id;

    const records = await Attendance.find({ schoolId, teacher: teacherId });
    const students = await Student.find({ schoolId, createdBy: teacherId });

    // ================= KPI =================
    const total = records.length;
    const present = records.filter(r => r.status === "present").length;
    const absent = records.filter(r => r.status === "absent").length;

    const attendanceRate = total ? (present / total) * 100 : 0;

    // ================= ATTENDANCE TREND =================
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const dayRecords = records.filter(
        r => new Date(r.date).toDateString() === date.toDateString()
      );

      const presentCount = dayRecords.filter(r => r.status === "present").length;

      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        attendance: dayRecords.length
          ? Number(((presentCount / dayRecords.length) * 100).toFixed(2))
          : 0,
      };
    }).reverse();

    // ================= CLASS DISTRIBUTION =================
    const classMap = {};

    records.forEach(r => {
      classMap[r.className] = (classMap[r.className] || 0) + 1;
    });

    const classDistribution = Object.entries(classMap).map(([cls, count]) => ({
      name: cls,
      value: count,
    }));

    // ================= OVERVIEW =================
    const overview = [
      { name: "Present", value: present },
      { name: "Absent", value: absent },
      { name: "Total", value: total },
      { name: "Students", value: students.length },
    ];

    // ================= RESPONSE =================
    res.json({
      stats: {
        totalStudents: students.length,
        totalClasses: classDistribution.length,
        attendanceRate: Number(attendanceRate.toFixed(2)),
        totalNotices: 0,
      },
      charts: {
        attendanceTrend: last7Days,
        classDistribution,
        overview,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTeacherDashboardAnalytics };