const Notification = require('../models/Notification');

// GET ALL NOTIFICATIONS
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MARK AS READ
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// CREATE
const createNotification = async (req, res) => {
  try {
    const notification =
      await Notification.create({
        title: req.body.title,
        message: req.body.message,
        category: req.body.category,
        audience: req.body.audience,
        priority: req.body.priority,
        publishDate: req.body.publishDate,
        expiryDate: req.body.expiryDate,
        createdBy: req.user._id,
      });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET Notification Stats
const getNotificationStats = async (req, res) => {
  try {
    const total = await Notification.countDocuments();

    const active = await Notification.countDocuments({
      isActive: true,
    });

    const holidays = await Notification.countDocuments({
      category: 'HOLIDAY',
    });

    const exams = await Notification.countDocuments({
      category: 'EXAM',
    });

    res.json({
      total,
      active,
      holidays,
      exams,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
const updateNotification = async (req, res) => {
  try {
    const { title, message, category, audience, priority, publishDate, expiryDate } = req.body;

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        title,
        message,
        category,
        audience,
        priority,
        publishDate,
        expiryDate,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        message: 'Notification not found',
      });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Notification deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  createNotification,
  updateNotification,
  deleteNotification,
  getNotificationStats,
};
