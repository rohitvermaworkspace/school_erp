const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createResult,
  getResults,
  getResult,
  updateResult,
  deleteResult,
  publishResult,

  getClassResults,
  getTopPerformers,
  getSubjectSummary,
} = require(
  "../controllers/resultController"
);


// =============================
// RESULT CRUD
// =============================

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createResult
);

router.get(
  "/",
  protect,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  getResults
);

router.get(
  "/:id",
  protect,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  getResult
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateResult
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteResult
);

router.put(
  "/:id/publish",
  protect,
  authorizeRoles("admin"),
  publishResult
);


// =============================
// ANALYTICS
// =============================

router.get(
  "/class/:className",
  protect,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  getClassResults
);

router.get(
  "/top-performers/:className",
  protect,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  getTopPerformers
);

router.get(
  "/subject-summary/:className",
  protect,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  getSubjectSummary
);

module.exports = router;