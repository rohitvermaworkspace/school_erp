const Notice = require(
  "../models/Notice"
);


// CREATE NOTICE
const createNotice = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const { title, description, audience } = req.body;

    const notice = await Notice.create({
      title,
      description,
      audience,
      schoolId,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      data: notice,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL NOTICES
const getNotices = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const userRole = req.user.role;

    let filter = {
      schoolId,
      $or: [
        { audience: "all" },
        { audience: userRole === "student" ? "students" : "teachers" },
      ],
    };

    const notices = await Notice.find(filter)
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: notices,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE NOTICE
const updateNotice = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const notice = await Notice.findOneAndUpdate(
      { _id: req.params.id, schoolId },
      req.body,
      { new: true }
    );

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    return res.json({
      success: true,
      data: notice,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE NOTICE
const deleteNotice = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const notice = await Notice.findOne({ _id: req.params.id, schoolId });

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    await Notice.findOneAndDelete({ _id: req.params.id, schoolId });

    return res.json({
      success: true,
      message: "Notice deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createNotice,
  getNotices,
  updateNotice,
  deleteNotice,
};