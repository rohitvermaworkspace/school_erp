const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const tenantScope = require("../middleware/tenantMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage,
} = require("../controllers/userController");

// ================= PROFILE =================
router.get("/profile", protect, tenantScope, getProfile);

router.put("/profile", protect, tenantScope, updateProfile);

// ================= PASSWORD =================
router.put("/change-password", protect, tenantScope, changePassword);

router.post('/profile-image', protect, tenantScope, upload.single('image'), uploadProfileImage);

module.exports = router;