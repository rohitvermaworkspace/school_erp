const express = require("express");
const router = express.Router();

const {
  createLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  getLeaveStats
} = require("../controllers/leaveController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const tenantScope = require("../middleware/tenantMiddleware");

// ======================================
// APPLY LEAVE (Teacher + Student)
// ======================================

router.post(
  "/apply",
  protect,
  tenantScope,
  authorizeRoles("teacher", "student"),
  createLeave
);

// Keep old route working (optional)
router.post(
  "/",
  protect,
  tenantScope,
  authorizeRoles("teacher", "student"),
  createLeave
);

// ======================================
// MY LEAVES
// ======================================

router.get(
  "/me",
  protect,
  tenantScope,
  authorizeRoles("teacher", "student"),
  getMyLeaves
);

// ======================================
// ADMIN - ALL LEAVES
// ======================================

router.get(
  "/",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  getAllLeaves
);

// ======================================
// ADMIN - APPROVE / REJECT
// ======================================

router.put(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  updateLeaveStatus
);

router.get(
  "/leave-stats",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  getLeaveStats
);

module.exports = router;