const express = require("express");

const router = express.Router();

const {
  getNotifications,
  markAsRead,
  createNotification,
  updateNotification,
  deleteNotification,
  getNotificationStats,
} = require("../controllers/notificationController");

const protect = require("../middleware/authMiddleware");

router.get(
  "/",
  protect,
  getNotifications
);

router.post(
  "/",
  protect,
  createNotification
);

router.put(
  "/:id",
  protect,
  updateNotification
);

router.delete(
  "/:id",
  protect,
  deleteNotification
);

router.put(
  "/:id/read",
  protect,
  markAsRead
);

router.get(
  "/stats",
  protect,
  getNotificationStats
);

module.exports = router;