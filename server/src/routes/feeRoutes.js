const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const tenantScope = require("../middleware/tenantMiddleware");

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
router.get("/my", protect, tenantScope, authorizeRoles("student"), getMyFees);
router.get("/summary", protect, tenantScope, authorizeRoles("student"), getFeeSummary);
router.post("/pay", protect, tenantScope, authorizeRoles("student"), payFee);
router.get("/receipt/:id", protect, tenantScope, getReceipt);

// ================= ADMIN ROUTES =================
router.post("/", protect, tenantScope, authorizeRoles("admin"), createFee);
router.get("/", protect, tenantScope, authorizeRoles("admin"), getFees);
router.get("/:id", protect, tenantScope, authorizeRoles("admin"), getFee);
router.put("/:id", protect, tenantScope, authorizeRoles("admin"), updateFee);
router.delete("/:id", protect, tenantScope, authorizeRoles("admin"), deleteFee);

module.exports = router;