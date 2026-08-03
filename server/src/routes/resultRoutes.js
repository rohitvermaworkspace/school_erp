const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const tenantScope = require("../middleware/tenantMiddleware");

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
  tenantScope,
  authorizeRoles("admin"),
  createResult
);

router.get(
  "/",
  protect,
  tenantScope,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  getResults
);

router.get(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  getResult
);

router.put(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  updateResult
);

router.delete(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  deleteResult
);

router.put(
  "/:id/publish",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  publishResult
);


// =============================
// ANALYTICS
// =============================

router.get(
  "/class/:className",
  protect,
  tenantScope,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  getClassResults
);

router.get(
  "/top-performers/:className",
  protect,
  tenantScope,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  getTopPerformers
);

router.get(
  "/subject-summary/:className",
  protect,
  tenantScope,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  getSubjectSummary
);

module.exports = router;