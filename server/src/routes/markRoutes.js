const express = require("express");

const router = express.Router();

const {
  saveMark,
  saveBulkMarks,
  getMarksByClass,
  getStudentMarks,
  deleteMark,
} = require("../controllers/markController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

// =====================================
// SAVE SINGLE MARK
// =====================================
router.post(
  "/",
  protect,
  authorizeRoles(
    "teacher",
    "admin"
  ),
  saveMark
);

// =====================================
// SAVE BULK MARKS
// =====================================
router.post(
  "/bulk",
  protect,
  authorizeRoles(
    "teacher",
    "admin"
  ),
  saveBulkMarks
);

// =====================================
// GET MARKS BY CLASS
// =====================================
router.get(
  "/class/:className",
  protect,
  authorizeRoles(
    "teacher",
    "admin"
  ),
  getMarksByClass
);

// =====================================
// GET STUDENT MARKS
// =====================================
router.get(
  "/student/:studentId",
  protect,
  getStudentMarks
);

// =====================================
// DELETE MARK
// =====================================
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteMark
);

module.exports = router;