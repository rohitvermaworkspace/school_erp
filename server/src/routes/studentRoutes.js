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
const tenantScope = require("../middleware/tenantMiddleware");

// =====================
// STUDENT ROUTES
// =====================

router.get(
  "/dashboard",
  protect,
  tenantScope,
  authorizeRoles("student"),
  getStudentDashboard
);

router.get(
  "/me",
  protect,
  tenantScope,
  authorizeRoles("student"),
  getMyStudentProfile
);

router.put(
  "/profile",
  protect,
  tenantScope,
  authorizeRoles("student"),
  updateMyStudentProfile
);

router.put(
  "/change-password",
  protect,
  tenantScope,
  authorizeRoles("student"),
  changeStudentPassword
);

router.post(
  "/profile-image",
  protect,
  tenantScope,
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
  tenantScope,
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
  tenantScope,
  authorizeRoles("admin", "teacher"),
  getStudents
);

router.get(
  "/class/:className",
  protect,
  tenantScope,
  authorizeRoles("admin", "teacher"),
  getStudentsByClass
);

router.get(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("admin", "teacher"),
  getStudentById
);

router.put(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("admin", "teacher"),
  updateStudent
);

router.delete(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  deleteStudent
);


module.exports = router;