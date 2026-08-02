const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage,
} = require("../controllers/userController");

// ================= PROFILE =================
router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

// ================= PASSWORD =================
router.put("/change-password", protect, changePassword);

router.post('/profile-image', protect, upload.single('image'), uploadProfileImage);

module.exports = router;