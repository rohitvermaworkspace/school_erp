const AcademicSession = require("../models/AcademicSession");

const createSession = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const exists = await AcademicSession.findOne({
      schoolId,
      sessionName: req.body.sessionName,
    });

    if (exists) {
      return res.status(400).json({
        message: "Session already exists",
      });
    }

    const session = await AcademicSession.create({ ...req.body, schoolId });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSessions = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const sessions = await AcademicSession.find({ schoolId }).sort({
      createdAt: -1,
    });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getActiveSession = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const session = await AcademicSession.findOne({
      schoolId,
      isActive: true,
    });

    res.json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateSession = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const session =
      await AcademicSession.findByIdAndUpdate(
        { _id: req.params.id, schoolId },
        req.body,
        { new: true }
      );

    res.json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const activateSession = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    await AcademicSession.updateMany(
      { schoolId },
      {
        isActive: false,
        status: "Archived",
      }
    );

    const session =
      await AcademicSession.findByIdAndUpdate(
        { _id: req.params.id, schoolId },
        {
          isActive: true,
          status: "Active",
        },
        {
          new: true,
        }
      );

    res.json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteSession = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const session =
      await AcademicSession.findOne(
        { _id: req.params.id, schoolId }
      );

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    if (session.isActive) {
      return res.status(400).json({
        message:
          "Active session cannot be deleted",
      });
    }

    await AcademicSession.findOneAndDelete(
      { _id: req.params.id, schoolId }
    );

    res.json({
      message: "Session deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSession,
  getSessions,
  getActiveSession,
  updateSession,
  activateSession,
  deleteSession,
};