const express = require("express");
const router = express.Router();

const {
  getAdminDashboard,
  getClassDrilldown,
  getStudentDrilldown,
  getFeeAnalytics,
} = require("../controllers/adminAnalyticsController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ADMIN DASHBOARD
router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin"),
  getAdminDashboard
);

// CLASS DRILLDOWN
router.get(
  "/class/:className",
  protect,
  authorizeRoles("admin"),
  getClassDrilldown
);

// STUDENT DRILLDOWN
router.get(
  "/student/:studentId",
  protect,
  authorizeRoles("admin"),
  getStudentDrilldown
);

router.get(
  "/fees",
  protect,
  authorizeRoles("admin"),
  getFeeAnalytics
);


module.exports = router;