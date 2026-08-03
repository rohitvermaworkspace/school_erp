const Notification = require('../models/Notification');

// GET ALL NOTIFICATIONS
const getNotifications = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const notifications = await Notification.find({ schoolId }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MARK AS READ
const markAsRead = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, schoolId },
      { isRead: true },
      { new: true }
    );

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// CREATE
const createNotification = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const notification =
      await Notification.create({
        title: req.body.title,
        message: req.body.message,
        category: req.body.category,
        audience: req.body.audience,
        priority: req.body.priority,
        publishDate: req.body.publishDate,
        expiryDate: req.body.expiryDate,
        schoolId,
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
    const schoolId = req.schoolId;
    const total = await Notification.countDocuments({ schoolId });

    const active = await Notification.countDocuments({
      schoolId,
      isActive: true,
    });

    const holidays = await Notification.countDocuments({
      schoolId,
      category: 'HOLIDAY',
    });

    const exams = await Notification.countDocuments({
      schoolId,
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
    const schoolId = req.schoolId;
    const { title, message, category, audience, priority, publishDate, expiryDate } = req.body;

    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, schoolId },
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
    const schoolId = req.schoolId;
    await Notification.findOneAndDelete({ _id: req.params.id, schoolId });

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
