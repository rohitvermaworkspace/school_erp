const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const upload = require('../middleware/uploadMiddleware');

const {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getTeacherDashboard,
  getMyTeacherProfile,
  updateMyTeacherProfile,
  uploadTeacherProfileImage,
  changeTeacherPassword
} = require("../controllers/teacherController");

router.get(
  "/me",
  protect,
  authorizeRoles("teacher"),
  getMyTeacherProfile
);

router.put(
  "/profile",
  protect,
  authorizeRoles("teacher"),
  updateMyTeacherProfile
);

router.post(
  "/profile-image",
  protect,
  authorizeRoles("teacher"),
  upload.single("image"),
  uploadTeacherProfileImage
);

router.put(
  "/change-password",
  protect,
  authorizeRoles("teacher"),
  changeTeacherPassword
);

// =====================================
// TEACHER DASHBOARD
// IMPORTANT:
// Must come BEFORE /:id
// =====================================
router.get(
  "/dashboard",
  protect,
  authorizeRoles("teacher", "admin"),
  getTeacherDashboard
);
// =====================================
// GET ALL TEACHERS
// =====================================
router.get(
  "/",
  protect,
  authorizeRoles("admin", "teacher"),
  getTeachers
);

// =====================================
// GET SINGLE TEACHER
// =====================================
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "teacher"),
  getTeacherById
);
// =====================================
// CREATE TEACHER
// =====================================
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createTeacher
);

// =====================================
// UPDATE TEACHER
// =====================================
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateTeacher
);

// =====================================
// DELETE TEACHER
// =====================================
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteTeacher
);

module.exports = router;