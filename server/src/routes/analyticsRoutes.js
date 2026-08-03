const express = require("express");
const router = express.Router();

const {
  getStudentAttendanceStats,
  getMonthlyAttendance,
  getClassAttendanceStats,
  getTeacherDashboardAnalytics,
} = require("../controllers/analyticsController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const tenantScope = require("../middleware/tenantMiddleware");

// ===============================
// STUDENT ANALYTICS
// ===============================
router.get(
  "/student/:studentId",
  protect,
  tenantScope,
  authorizeRoles("admin", "teacher"),
  getStudentAttendanceStats
);

// ===============================
// MONTHLY ANALYTICS
// ===============================
router.get(
  "/monthly/:studentId/:month/:year",
  protect,
  tenantScope,
  authorizeRoles("admin", "teacher"),
  getMonthlyAttendance
);

// ===============================
// CLASS ANALYTICS
// ===============================
router.get(
  "/class/:className",
  protect,
  tenantScope,
  authorizeRoles("admin", "teacher"),
  getClassAttendanceStats
);

// ===============================
// TEACHER DASHBOARD ANALYTICS
// ===============================
router.get(
  "/teacher-dashboard",
  protect,
  tenantScope,
  authorizeRoles("admin", "teacher"),
  getTeacherDashboardAnalytics
);

module.exports = router;