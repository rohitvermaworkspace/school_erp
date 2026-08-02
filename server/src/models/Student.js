const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    // =========================
    // USER REFERENCE
    // =========================
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // =========================
    // ADMISSION INFORMATION
    // =========================
    admission: {
      admissionNo: String,
      admissionDate: Date,
      academicSession: String,
      admissionType: {
        type: String,
        default: "New",
      },
      joiningClass: String,
      joiningSection: String,

      medium: {
        type: String,
        default: "English",
      },

      status: {
        type: String,
        default: "Active",
      },
    },

    // =========================
    // ACADEMIC INFORMATION
    // =========================
    academic: {
      className: String,
      section: String,
      rollNumber: String,
      house: String,
      board: String,
      stream: String,
    },
    // =========================
    // PERSONAL INFORMATION
    // =========================
    personal: {
      dob: Date,
      gender: String,
      bloodGroup: String,
      religion: String,
      category: String,
      caste: String,
      nationality: {
        type: String,
        default: "Indian",
      },
      birthPlace: String,
      motherTongue: String,
      aadhaarNumber: String,
      penNumber: String,
      apaarId: String,
    },

    // =========================
    // PARENTS INFORMATION
    // =========================
    family: {
      primaryContactType: String,
      father: {
        name: String,
        mobile: String,
        qualification: String,
        occupation: String,
        aadhaar: String,
      },

      mother: {
        name: String,
        mobile: String,
        qualification: String,
        occupation: String,
        aadhaar: String,
      },

      guardian: {
        name: String,
        mobile: String,
        qualification: String,
        occupation: String,
      },
    },

    // =========================
    // ADDRESS
    // =========================
    address: {
      current: {
        addressLine: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
      },

      isPermanentSameAsCurrent: Boolean,

      permanent: {
        addressLine: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
      },
    },

    // =========================
    // BANK DETAILS
    // =========================
    bank: {
      accountHolder: String,
      accountNumber: String,
      bankName: String,
      branchName: String,
      ifscCode: String,
    },

    // =========================
    // PREVIOUS SCHOOL
    // =========================
    previousSchool: {
      schoolName: String,
      board: String,
      medium: String,
      lastClass: String,
      lastSession: String,
      tcNumber: String,
      percentageMarks: Number,
      reasonForLeaving: String,
    },

    // =========================
    // OTHER DETAILS
    // =========================
    facilities: {
      transport: {
        required: {
          type: Boolean,
          default: false,
        },
      },

      hostel: {
        required: {
          type: Boolean,
          default: false,
        },
      },

      rte: {
        type: Boolean,
        default: false,
      },
    },

    documents: {
      studentPhoto: String,
      birthCertificate: String,
      aadhaarCard: String,
      transferCertificate: String,
      marksheet: String,
      fatherPhoto: String,
      motherPhoto: String,
    },
    notes:{
      futureGoal:String,
      remarks:String
    },

    // =========================
    // CREATED BY
    // =========================
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);