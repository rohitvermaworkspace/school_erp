const express = require("express");

const router = express.Router();

const {
  createTimetable,
  getTimetables,
  getTeacherTimetable,
  getTimetable,
  updateTimetable,
  deleteTimetable,
  getStudentTimetable,
} = require("../controllers/timetableController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const tenantScope = require("../middleware/tenantMiddleware");

// =====================================
// CREATE TIMETABLE
// =====================================
router.post(
  "/",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  createTimetable
);

// =====================================
// GET ALL TIMETABLES
// =====================================
router.get(
  "/",
  protect,
  tenantScope,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  getTimetables
);

// =====================================
// TEACHER TIMETABLE
// IMPORTANT:
// MUST COME BEFORE /:id
// =====================================
router.get(
  "/teacher",
  protect,
  tenantScope,
  authorizeRoles("teacher", "admin"),
  (req, res, next) => {
    console.log("Teacher timetable route hit");
    next();
  },
  getTeacherTimetable
);
router.get(
  "/student",
  protect,
  tenantScope,
  authorizeRoles("student"),
  getStudentTimetable
);


// =====================================
// GET SINGLE TIMETABLE
// =====================================
router.get(
  "/:id",
  protect,
  tenantScope,
  getTimetable
);

// =====================================
// UPDATE TIMETABLE
// =====================================
router.put(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  updateTimetable
);

// =====================================
// DELETE TIMETABLE
// =====================================
router.delete(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  deleteTimetable
);

router.get("/test", (req, res) => {
  res.json({
    message: "Timetable route working",
  });
});

module.exports = router;