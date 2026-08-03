const Leave = require("../models/Leave");
const mongoose = require("mongoose");

// CREATE LEAVE (COMMON FOR BOTH TEACHER/STUDENT)
const createLeave = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const { leaveType, reason, fromDate, toDate } = req.body;

    if (!leaveType || !reason || !fromDate || !toDate) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const leave = await Leave.create({
      applicant: req.user._id,
      role: req.user.role,
      leaveType,
      reason,
      fromDate,
      toDate,
      status: "pending",
      schoolId,
    });

    res.status(201).json(leave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET MY LEAVES
const getMyLeaves = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const leaves = await Leave.find({
      applicant: req.user._id || req.user.id,
      schoolId,
    }).sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN ALL LEAVES
const getAllLeaves = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const leaves = await Leave.find({ schoolId })
      .populate("applicant", "name email role")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STATUS
const updateLeaveStatus = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const leave = await Leave.findOneAndUpdate(
      { _id: req.params.id, schoolId },
      { status: req.body.status },
      { new: true }
    );

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getLeaveStats = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const stats = await Leave.aggregate([
      {
        $match: { schoolId: new mongoose.Types.ObjectId(schoolId) },
      },
      {
        $group: {
          _id: {
            $toLower: "$status",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const formatted = {
      pending: 0,
      approved: 0,
      rejected: 0,
    };

    stats.forEach((item) => {
      formatted[item._id] = item.count;
    });

    res.json([
      {
        status: "Pending",
        count: formatted.pending,
      },
      {
        status: "Approved",
        count: formatted.approved,
      },
      {
        status: "Rejected",
        count: formatted.rejected,
      },
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch leave statistics",
    });
  }
};

module.exports = {
  createLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  getLeaveStats
};