const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getMonthlyRevenue,
  getTopClasses,
} = require("../controllers/dashboardController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// MAIN DASHBOARD
router.get(
  "/stats",
  protect,
  authorizeRoles("admin"),
  getDashboardStats
);

// REVENUE CHART
router.get(
  "/revenue",
  protect,
  authorizeRoles("admin"),
  getMonthlyRevenue
);

// TOP CLASSES
router.get(
  "/top-classes",
  protect,
  authorizeRoles("admin"),
  getTopClasses
);

module.exports = router;