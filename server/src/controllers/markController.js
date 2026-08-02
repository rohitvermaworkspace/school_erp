const Mark = require("../models/Mark");
const Student = require("../models/Student");

// =====================================
// SAVE SINGLE MARK
// =====================================
const saveMark = async (req, res) => {
  try {
    const {
      student,
      className,
      subject,
      examType,
      marksObtained,
      totalMarks,
    } = req.body;

    const studentExists =
      await Student.findById(student);

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
        },
        {
          student,
          className,
          subject,
          examType,
          marksObtained,
          totalMarks,
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
    const {
      subject,
      examType,
    } = req.query;

    const query = {
      className:
        req.params.className,
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
      const marks =
        await Mark.find({
          student:
            req.params.studentId,
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
    const mark =
      await Mark.findById(
        req.params.id
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