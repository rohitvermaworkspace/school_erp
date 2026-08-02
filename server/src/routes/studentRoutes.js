const express = require("express");
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const studentUpload = require("../middleware/studentUploadMiddleware");

const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentsByClass,
  getStudentDashboard,
  getMyStudentProfile,

  uploadProfileImage,
  updateMyStudentProfile,
  changeStudentPassword,
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// =====================
// STUDENT ROUTES
// =====================

router.get(
  "/dashboard",
  protect,
  authorizeRoles("student"),
  getStudentDashboard
);

router.get(
  "/me",
  protect,
  authorizeRoles("student"),
  getMyStudentProfile
);

router.put(
  "/profile",
  protect,
  authorizeRoles("student"),
  updateMyStudentProfile
);

router.put(
  "/change-password",
  protect,
  authorizeRoles("student"),
  changeStudentPassword
);

router.post(
  "/profile-image",
  protect,
  authorizeRoles("student"),
  upload.single("image"),
  uploadProfileImage
);

// =====================
// ADMIN / TEACHER
// =====================

router.post(
  "/",
  protect,
  authorizeRoles("admin", "teacher"),

  upload.fields([
    { name: "studentPhoto", maxCount: 1 },
    { name: "guardianPhoto", maxCount: 1 },
    { name: "birthCertificate", maxCount: 1 },
    { name: "aadhaarCard", maxCount: 1 },
    { name: "transferCertificate", maxCount: 1 },
    { name: "marksheet", maxCount: 1 },
  ]),

  createStudent
);

router.get(
  "/",
  protect,
  authorizeRoles("admin", "teacher"),
  getStudents
);

router.get(
  "/class/:className",
  protect,
  authorizeRoles("admin", "teacher"),
  getStudentsByClass
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "teacher"),
  getStudentById
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "teacher"),
  updateStudent
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteStudent
);


module.exports = router;