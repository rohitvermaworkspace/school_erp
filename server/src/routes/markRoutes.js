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

const tenantScope = require("../middleware/tenantMiddleware");

// =====================================
// SAVE SINGLE MARK
// =====================================
router.post(
  "/",
  protect,
  tenantScope,
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
  tenantScope,
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
  tenantScope,
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
  tenantScope,
  getStudentMarks
);

// =====================================
// DELETE MARK
// =====================================
router.delete(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  deleteMark
);

module.exports = router;