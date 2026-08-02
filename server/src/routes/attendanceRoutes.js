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

router.get(
  "/dashboard",
  protect,
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
  authorizeRoles("teacher", "admin"),
  getAllAttendance
);

// GET ATTENDANCE BY CLASS
router.get(
  "/class/:className",
  protect,
  authorizeRoles("teacher", "admin"),
  getAttendanceByClass
);

// GET STUDENT ATTENDANCE
router.get(
  "/student/:studentId",
  protect,
  getStudentAttendance
);

// GET STUDENTS BY CLASS
router.get(
  "/students/:className",
  protect,
  getStudentsByClass
);
router.post(
  "/mark",
  protect,
  markAttendance
);
router.post(
  "/teacher/mark",
  protect,
  authorizeRoles(
    "teacher",
    "admin"
  ),
  markClassAttendance
);

router.get(
  "/my",
  protect,
  authorizeRoles("student"),
  getStudentAttendanceForLoggedUser
);

router.get(
  "/export",
  protect,
  authorizeRoles("admin"),
  exportAttendanceCSV
);

router.get(
  "/class-id/:classId",
  protect,
  authorizeRoles("admin", "teacher"),
  getStudentsByClassId
);


module.exports = router;