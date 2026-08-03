const express = require("express");

const router =
  express.Router();

const {
  createNotice,
  getNotices,
  updateNotice,
  deleteNotice,
} = require(
  "../controllers/noticeController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const authorizeRoles = require(
  "../middleware/roleMiddleware"
);

const tenantScope = require("../middleware/tenantMiddleware");


// CREATE NOTICE
router.post(
  "/",
  protect,
  tenantScope,
  authorizeRoles(
    "admin",
    "teacher"
  ),
  createNotice
);


// GET ALL
router.get(
  "/",
  protect,
  tenantScope,
  getNotices
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
  updateNotice
);


// DELETE
router.delete(
  "/:id",
  protect,
  tenantScope,
  authorizeRoles("admin"),
  deleteNotice
);

module.exports = router;