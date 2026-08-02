const express = require("express");
const router = express.Router();

const {
  getTeacherDashboardAnalytics,
} = require("../controllers/teacherAnalyticsController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// TEACHER DASHBOARD
router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin", "teacher"),
  getTeacherDashboardAnalytics
);

module.exports = router;