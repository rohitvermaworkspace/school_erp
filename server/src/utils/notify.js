const Notification = require("../models/Notification");

const sendNotification = async (req, data) => {
  try {
    const io = req.app.get("io");

    const notification = await Notification.create({
      title: data.title || "Notification",
      message: data.message,
      category: data.category || "GENERAL",
      audience: data.audience || "ALL",
      priority: data.priority || "MEDIUM",
      publishDate: data.publishDate || new Date(),
      expiryDate: data.expiryDate || null,
      createdBy: req.user?._id || null,
    });

    io.emit("notification", notification);

    return notification;
  } catch (error) {
    console.log("Notification error:", error.message);
  }
};

module.exports = sendNotification;