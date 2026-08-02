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

// ======================================
// APPLY LEAVE (Teacher + Student)
// ======================================

router.post(
  "/apply",
  protect,
  authorizeRoles("teacher", "student"),
  createLeave
);

// Keep old route working (optional)
router.post(
  "/",
  protect,
  authorizeRoles("teacher", "student"),
  createLeave
);

// ======================================
// MY LEAVES
// ======================================

router.get(
  "/me",
  protect,
  authorizeRoles("teacher", "student"),
  getMyLeaves
);

// ======================================
// ADMIN - ALL LEAVES
// ======================================

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllLeaves
);

// ======================================
// ADMIN - APPROVE / REJECT
// ======================================

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateLeaveStatus
);

router.get(
  "/leave-stats",
  protect,
  authorizeRoles("admin"),
  getLeaveStats
);

module.exports = router;