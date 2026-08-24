const express = require("express");

const router = express.Router();

const {
  getClasses,
  createClass,
  updateClass,
  updateClassStatus,
  deleteClass,
  getSubjects,
  createSubject,
  updateSubject,
  updateSubjectStatus,
  deleteSubject,
  getClassAssignment,
  assignSubjectsToClass,
} = require("../controllers/academicConfigController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const tenantScope = require("../middleware/tenantMiddleware");

// Every academic-configuration route is platform-level: only the
// SUPER_ADMIN may read or change school configurations from here.
router.use(protect, tenantScope, authorizeRoles("super_admin"));

// ---------------------------- CLASSES ----------------------------
router.get("/classes", getClasses);
router.post("/classes", createClass);
router.put("/classes/:id", updateClass);
router.patch("/classes/:id/status", updateClassStatus);
router.delete("/classes/:id", deleteClass);

// ---------------------------- SUBJECTS ---------------------------
router.get("/subjects", getSubjects);
router.post("/subjects", createSubject);
router.put("/subjects/:id", updateSubject);
router.patch("/subjects/:id/status", updateSubjectStatus);
router.delete("/subjects/:id", deleteSubject);

// --------------------- CLASS → SUBJECT ASSIGNMENT -----------------
router.get("/assignments", getClassAssignment);
router.post("/assignments", assignSubjectsToClass);

module.exports = router;
