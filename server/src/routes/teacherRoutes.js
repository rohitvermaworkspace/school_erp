const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const upload = require('../middleware/uploadMiddleware');
const tenantScope = require("../middleware/tenantMiddleware");

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
  tenantScope,
  authorizeRoles("teacher"),
  getMyTeacherProfile
);

router.put(
  "/profile",
  protect,
  tenantScope,
  authorizeRoles("teacher"),
  updateMyTeacherProfile
);

router.post(
  "/profile-image",
  protect,
  tenantScope,
  authorizeRoles("teacher"),
  upload.single("image"),
  uploadTeacherProfileImage
);

router.put(
  "/change-password",
  protect,
  tenantScope,
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
  tenantScope,
  authorizeRoles("teacher", "admin"),
  getTeacherDashboard
);
// =====================================
// GET ALL TEACHERS
// =====================================
router.get(
  "/",
  protect,
  tenantScope,
  authorizeRoles("admin", "teacher"),
  getTeachers
);

// =====================================
// GET SINGLE TEACHER
// =====================================
router.get(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("admin", "teacher"),
  getTeacherById
);
// =====================================
// CREATE TEACHER
// =====================================
router.post(
  "/",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  createTeacher
);

// =====================================
// UPDATE TEACHER
// =====================================
router.put(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  updateTeacher
);

// =====================================
// DELETE TEACHER
// =====================================
router.delete(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  deleteTeacher
);

module.exports = router;