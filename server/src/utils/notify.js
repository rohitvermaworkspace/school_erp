const Notification = require("../models/Notification");

const sendNotification = async (req, data) => {
  try {
    const io = req.app.get("io");

    const notification = await Notification.create({
      title: data.type,
      message: data.message,
      type: data.type,
      role: data.role || "admin",
      user: data.user || null,
    });

    io.emit("notification", notification);

    console.log("Notification saved:", notification);

    return notification;
  } catch (error) {
    console.log("Notification error:", error.message);
  }
};

module.exports = sendNotification;