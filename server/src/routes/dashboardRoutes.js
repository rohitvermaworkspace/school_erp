const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getMonthlyRevenue,
  getTopClasses,
} = require("../controllers/dashboardController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const tenantScope = require("../middleware/tenantMiddleware");

// MAIN DASHBOARD
router.get(
  "/stats",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  getDashboardStats
);

// REVENUE CHART
router.get(
  "/revenue",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  getMonthlyRevenue
);

// TOP CLASSES
router.get(
  "/top-classes",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  getTopClasses
);

module.exports = router;