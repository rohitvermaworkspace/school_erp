const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAllAttendance,
  getStudentAttendance,
  getAttendanceByClass,
  deleteAttendance,
  getStudentsByClass,
  markClassAttendance,
  getStudentAttendanceForLoggedUser,
  getAttendanceDashboard,
  exportAttendanceCSV,
  getStudentsByClassId
} = require("../controllers/attendanceController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const tenantScope = require("../middleware/tenantMiddleware");

router.get(
  "/dashboard",
  protect,
  tenantScope,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  getAttendanceDashboard
);

// GET ALL ATTENDANCE
router.get(
  "/",
  protect,
  tenantScope,
  authorizeRoles("teacher", "admin"),
  getAllAttendance
);

// GET ATTENDANCE BY CLASS
router.get(
  "/class/:className",
  protect,
  tenantScope,
  authorizeRoles("teacher", "admin"),
  getAttendanceByClass
);

// GET STUDENT ATTENDANCE
router.get(
  "/student/:studentId",
  protect,
  tenantScope,
  getStudentAttendance
);

// GET STUDENTS BY CLASS
router.get(
  "/students/:className",
  protect,
  tenantScope,
  getStudentsByClass
);
router.post(
  "/mark",
  protect,
  tenantScope,
  authorizeRoles("teacher", "admin"),
  markAttendance
);
router.post(
  "/teacher/mark",
  protect,
  tenantScope,
  authorizeRoles(
    "teacher",
    "admin"
  ),
  markClassAttendance
);

router.get(
  "/my",
  protect,
  tenantScope,
  authorizeRoles("student"),
  getStudentAttendanceForLoggedUser
);

router.get(
  "/export",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  exportAttendanceCSV
);

router.get(
  "/class-id/:classId",
  protect,
  tenantScope,
  authorizeRoles("admin", "teacher"),
  getStudentsByClassId
);


module.exports = router;