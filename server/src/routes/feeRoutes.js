const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createFee,
  getFees,
  getFee,
  updateFee,
  deleteFee,
  getMyFees,
  getFeeSummary,
  payFee,
  getReceipt,
} = require("../controllers/feeController");

// ================= STUDENT ROUTES =================
router.get("/my", protect, authorizeRoles("student"), getMyFees);
router.get("/summary", protect, authorizeRoles("student"), getFeeSummary);
router.post("/pay", protect, authorizeRoles("student"), payFee);
router.get("/receipt/:id", protect, getReceipt);

// ================= ADMIN ROUTES =================
router.post("/", protect, authorizeRoles("admin"), createFee);
router.get("/", protect, authorizeRoles("admin"), getFees);
router.get("/:id", protect, authorizeRoles("admin"), getFee);
router.put("/:id", protect, authorizeRoles("admin"), updateFee);
router.delete("/:id", protect, authorizeRoles("admin"), deleteFee);

module.exports = router;