const express = require("express");

const router =
  express.Router();

const {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
  getStudentSubjects,
  getSubjectDashboard,
} = require(
  "../controllers/subjectController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const authorizeRoles = require(
  "../middleware/roleMiddleware"
);

const tenantScope = require("../middleware/tenantMiddleware");


// CREATE
router.post(
  "/",
  protect,
  tenantScope,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  createSubject
);

router.get(
  "/student",
  protect,
  tenantScope,
  authorizeRoles("student"),
  getStudentSubjects
);
router.get(
  "/dashboard",
  protect,
  tenantScope,
  getSubjectDashboard
);

// GET ALL
router.get(
  "/",
  protect,
  tenantScope,
  getSubjects
);


// GET ONE
router.get(
  "/:id",
  protect,
  tenantScope,
  getSubject
);


// UPDATE
router.put(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  updateSubject
);


// DELETE
router.delete(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  deleteSubject
);

module.exports = router;