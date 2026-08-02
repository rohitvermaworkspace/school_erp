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

// =====================================
// CREATE TIMETABLE
// =====================================
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createTimetable
);

// =====================================
// GET ALL TIMETABLES
// =====================================
router.get(
  "/",
  protect,
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
  authorizeRoles("student"),
  getStudentTimetable
);


// =====================================
// GET SINGLE TIMETABLE
// =====================================
router.get(
  "/:id",
  protect,
  getTimetable
);

// =====================================
// UPDATE TIMETABLE
// =====================================
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateTimetable
);

// =====================================
// DELETE TIMETABLE
// =====================================
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteTimetable
);

router.get("/test", (req, res) => {
  res.json({
    message: "Timetable route working",
  });
});

module.exports = router;