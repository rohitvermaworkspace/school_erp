const Result = require("../models/Result");
const Student = require("../models/Student");

const getStudentResults = async (req, res) => {
  try {
    console.log("USER =>", req.user);

    const student = await Student.findOne({
      userId: req.user._id,
    });

    console.log("STUDENT =>", student);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    const results = await Result.find({
      student: student._id,
      published: true
    })
      .populate(
        "subjects.subject",
        "subjectName subjectCode"
      );

    console.log("RESULTS =>", results.length);

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// GET SINGLE RESULT DETAILS
// =====================================

const getStudentResultDetails =
  async (req, res) => {
    try {
      const result =
        await Result.findById(
          req.params.id
        )
          .populate(
            "student",
            "name rollNumber"
          )
          .populate(
            "subjects.subject",
            "subjectName subjectCode"
          );

      if (!result) {
        return res.status(404).json({
          success: false,
          message:
            "Result not found",
        });
      }

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  getStudentResults,
  getStudentResultDetails,
};