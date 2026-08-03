const express = require("express");
const router = express.Router();

const {
  getTeacherDashboardAnalytics,
} = require("../controllers/teacherAnalyticsController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const tenantScope = require("../middleware/tenantMiddleware");

// TEACHER DASHBOARD
router.get(
  "/dashboard",
  protect,
  tenantScope,
  authorizeRoles("admin", "teacher"),
  getTeacherDashboardAnalytics
);

module.exports = router;