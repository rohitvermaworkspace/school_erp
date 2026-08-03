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
const tenantScope = require("../middleware/tenantMiddleware");

// ADMIN DASHBOARD
router.get(
  "/dashboard",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  getAdminDashboard
);

// CLASS DRILLDOWN
router.get(
  "/class/:className",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  getClassDrilldown
);

// STUDENT DRILLDOWN
router.get(
  "/student/:studentId",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  getStudentDrilldown
);

router.get(
  "/fees",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  getFeeAnalytics
);


module.exports = router;