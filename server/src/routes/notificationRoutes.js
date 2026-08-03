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
const tenantScope = require("../middleware/tenantMiddleware");

router.get(
  "/",
  protect,
  tenantScope,
  getNotifications
);

router.post(
  "/",
  protect,
  tenantScope,
  createNotification
);

router.put(
  "/:id",
  protect,
  tenantScope,
  updateNotification
);

router.delete(
  "/:id",
  protect,
  tenantScope,
  deleteNotification
);

router.put(
  "/:id/read",
  protect,
  tenantScope,
  markAsRead
);

router.get(
  "/stats",
  protect,
  tenantScope,
  getNotificationStats
);

module.exports = router;