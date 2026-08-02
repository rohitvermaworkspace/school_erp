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


// CREATE
router.post(
  "/",
  protect,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  createSubject
);

router.get(
  "/student",
  protect,
  authorizeRoles("student"),
  getStudentSubjects
);
router.get(
  "/dashboard",
  protect,
  getSubjectDashboard
);

// GET ALL
router.get(
  "/",
  protect,
  getSubjects
);


// GET ONE
router.get(
  "/:id",
  protect,
  getSubject
);


// UPDATE
router.put(
  "/:id",
  protect,
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
  authorizeRoles("admin"),
  deleteSubject
);

module.exports = router;