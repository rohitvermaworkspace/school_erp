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


// CREATE NOTICE
router.post(
  "/",
  protect,
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
  getNotices
);


// UPDATE
router.put(
  "/:id",
  protect,
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
  authorizeRoles("admin"),
  deleteNotice
);

module.exports = router;