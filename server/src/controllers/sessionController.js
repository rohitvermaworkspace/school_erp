const AcademicSession = require("../models/AcademicSession");

const createSession = async (req, res) => {
  try {
    const exists = await AcademicSession.findOne({
      sessionName: req.body.sessionName,
    });

    if (exists) {
      return res.status(400).json({
        message: "Session already exists",
      });
    }

    const session = await AcademicSession.create(req.body);

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSessions = async (req, res) => {
  try {
    const sessions = await AcademicSession.find().sort({
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
    const session = await AcademicSession.findOne({
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
    const session =
      await AcademicSession.findByIdAndUpdate(
        req.params.id,
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
    await AcademicSession.updateMany(
      {},
      {
        isActive: false,
        status: "Archived",
      }
    );

    const session =
      await AcademicSession.findByIdAndUpdate(
        req.params.id,
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
    const session =
      await AcademicSession.findById(
        req.params.id
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

    await AcademicSession.findByIdAndDelete(
      req.params.id
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