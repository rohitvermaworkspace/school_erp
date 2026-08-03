const Mark = require("../models/Mark");
const Student = require("../models/Student");

// =====================================
// SAVE SINGLE MARK
// =====================================
const saveMark = async (req, res) => {
  try {
    const schoolId = req.schoolId;

    const {
      student,
      className,
      subject,
      examType,
      marksObtained,
      totalMarks,
    } = req.body;

    const studentExists =
      await Student.findOne({ _id: student, schoolId });

    if (!studentExists) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const mark =
      await Mark.findOneAndUpdate(
        {
          student,
          subject,
          examType,
          schoolId,
        },
        {
          student,
          className,
          subject,
          examType,
          marksObtained,
          totalMarks,
          schoolId,
          teacher: req.user.id,
        },
        {
          new: true,
          upsert: true,
        }
      );

    res.status(200).json(mark);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// SAVE BULK MARKS
// =====================================
const saveBulkMarks = async (
  req,
  res
) => {
  try {
    const schoolId = req.schoolId;

    const {
      className,
      subject,
      examType,
      marksData,
    } = req.body;

    const results = [];

    for (const item of marksData) {
      const mark =
        await Mark.findOneAndUpdate(
          {
            student:
              item.studentId,
            subject,
            examType,
            schoolId,
          },
          {
            student:
              item.studentId,
            className,
            subject,
            examType,
            marksObtained:
              item.marksObtained,
            totalMarks: 100,
            schoolId,
            teacher:
              req.user.id,
          },
          {
            new: true,
            upsert: true,
          }
        );

      results.push(mark);
    }

    res.status(200).json({
      message:
        "Marks saved successfully",
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET MARKS BY CLASS
// =====================================
const getMarksByClass = async (
  req,
  res
) => {
  try {
    const schoolId = req.schoolId;

    const {
      subject,
      examType,
    } = req.query;

    const query = {
      className:
        req.params.className,
      schoolId,
    };

    if (subject) {
      query.subject = subject;
    }

    if (examType) {
      query.examType = examType;
    }

    const marks = await Mark.find(
      query
    )
      .populate(
        "student",
        "name rollNumber className"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json(marks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET STUDENT RESULT
// =====================================
const getStudentMarks =
  async (req, res) => {
    try {
      const schoolId = req.schoolId;

      const marks =
        await Mark.find({
          student:
            req.params.studentId,
          schoolId,
        })
          .populate(
            "student",
            "name rollNumber className"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(marks);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };

// =====================================
// DELETE MARK
// =====================================
const deleteMark = async (
  req,
  res
) => {
  try {
    const schoolId = req.schoolId;

    const mark =
      await Mark.findOne(
        {
          _id: req.params.id,
          schoolId,
        }
      );

    if (!mark) {
      return res.status(404).json({
        message:
          "Mark record not found",
      });
    }

    await mark.deleteOne();

    res.status(200).json({
      message:
        "Mark deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveMark,
  saveBulkMarks,
  getMarksByClass,
  getStudentMarks,
  deleteMark,
};