const Fee = require("../models/Fee");
const Student = require("../models/Student");

const generateReceiptNo = () => {
  return "REC-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
};

// ================= CREATE FEE (ADMIN ONLY) =================
const createFee = async (req, res) => {
  try {
    const schoolId = req.schoolId;

    const { student, amount, feeType, month, year, status } = req.body;
   const isPaid = req.body.status?.trim().toLowerCase() === "paid";
    const fee = await Fee.create({
      student,
      amount,
      feeType,
      month,
      year,
      status,
      paymentDate: isPaid ? new Date() : null,
      schoolId,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: fee,
    });
  } catch (error) {
    console.error('CREATE FEE ERROR:', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL FEES (ADMIN) =================
const getFees = async (req, res) => {
  try {
    const schoolId = req.schoolId;

    const fees = await Fee.find({ schoolId })
      .populate("student", "name className rollNumber")
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: fees,
    });
  } catch (error) {
    console.error("GET FEES ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE FEE =================
const getFee = async (req, res) => {
  try {
    const schoolId = req.schoolId;

    const fee = await Fee.findOne({ _id: req.params.id, schoolId })
      .populate("student", "name className rollNumber");

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee not found",
      });
    }
    res.status(200).json({
      success: true,
      data: fee,
    });
  } catch (error) {
    console.error("GET FEE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE FEE =================
const updateFee = async (req, res) => {
  try {
    const schoolId = req.schoolId;

    const existingFee = await Fee.findOne({ _id: req.params.id, schoolId });

    if (!existingFee) {
      return res.status(404).json({
        success: false,
        message: 'Fee not found',
      });
    }

    const updateData = {
      ...req.body,
    };

    const isPaid = req.body.status && req.body.status.toLowerCase() === 'paid';

    if (isPaid) {
      if (!existingFee.paymentDate) {
        updateData.paymentDate = new Date();
      }
    } else {
      updateData.paymentDate = null;
    }

    const fee = await Fee.findOneAndUpdate({ _id: req.params.id, schoolId }, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: fee,
    });
  } catch (error) {
    console.error('UPDATE FEE ERROR:', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ================= DELETE FEE =================
const deleteFee = async (req, res) => {
  try {
    const schoolId = req.schoolId;

    await Fee.findOneAndDelete({ _id: req.params.id, schoolId });

    res.status(200).json({
      success: true,
      message: "Fee deleted successfully",
    });
  } catch (error) {
    console.error("DELETE FEE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= STUDENT FEES (FIXED ERP LOGIC) =================
const getMyFees = async (req, res) => {
  try {
    const schoolId = req.schoolId;

    const userId = req.user._id;

    // find student
    const student = await Student.findOne({ userId, schoolId });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // find fees
    const fees = await Fee.find({
      student: student._id,
      schoolId,
    });

    return res.json({
      success: true,
      data: fees,
    });

  } catch (error) {
    console.error("getMyFees ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= FEES SUMMARY (FOR DASHBOARD) =================
const getFeeSummary = async (req, res) => {
  try {
    const schoolId = req.schoolId;

    const student = await Student.findOne({
      userId: req.user._id,
      schoolId,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    const fees = await Fee.find({
      student: student._id,
      schoolId,
    });

    const summary = fees.map((f) => ({
      month: f.month,
      paid: f.status === "Paid" ? f.amount : 0,
      pending: f.status === "Pending" ? f.amount : 0,
    }));

    res.status(200).json({
      success: true,
      data: summary,
    });

  } catch (error) {
    console.error("FEE SUMMARY ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const payFee = async (req, res) => {
  try {
    const schoolId = req.schoolId;

    const { feeId, paymentMethod, transactionId } = req.body;

    const fee = await Fee.findOne({ _id: feeId, schoolId });

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee not found",
      });
    }

    if (fee.status === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Fee already paid",
      });
    }

    fee.status = "Paid";
    fee.paymentDate = new Date();
    fee.paymentMethod = paymentMethod || "Online";
    fee.transactionId = transactionId || `TXN-${Date.now()}`;
    fee.receiptNo = "REC-" + Date.now();

    await fee.save();

    res.json({
      success: true,
      message: "Payment successful",
      data: fee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReceipt = async (req, res) => {
  try {
    const schoolId = req.schoolId;

    const fee = await Fee.findOne({ _id: req.params.id, schoolId })
      .populate("student", "name className rollNumber");

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee not found",
      });
    }

    res.json({
      success: true,
      receipt: {
        receiptNo: fee.receiptNo,
        student: fee.student,
        amount: fee.amount,
        feeType: fee.feeType,
        status: fee.status,
        paymentDate: fee.paymentDate,
        paymentMethod: fee.paymentMethod,
        month: fee.month,
        year: fee.year,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createFee,
  getFees,
  getFee,
  updateFee,
  deleteFee,
  getMyFees,
  getFeeSummary,
  payFee,
  getReceipt
};