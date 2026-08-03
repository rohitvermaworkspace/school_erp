const Mark = require("../models/Mark");
const Result = require("../models/Result");

const createResult = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const {
      student,
      examName,
      className,
      subjects,
    } = req.body;

    const totalMarks = subjects.reduce(
      (sum, item) => sum + Number(item.maxMarks),
      0
    );

    const obtainedMarks = subjects.reduce(
      (sum, item) => sum + Number(item.marksObtained),
      0
    );

    const percentage =
      (obtainedMarks / totalMarks) * 100;

    let grade = "F";

    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 35) grade = "D";

    const status =
      percentage >= 35
        ? "Pass"
        : "Fail";

    const result =
      await Result.create({
        student,
        examName,
        className,
        subjects,

        totalMarks,
        obtainedMarks,
        percentage,
        grade,
        status,

        schoolId,
        createdBy: req.user.id,
      });

    res.status(201).json({
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

const getResults = async (
  req,
  res
) => {
  try {
    const schoolId = req.schoolId;
    const results =
      await Result.find({ schoolId })
        .populate(
          "student",
          "name rollNumber className"
        )
        .populate(
          "subjects.subject",
          "subjectName subjectCode"
        )
        .sort({
          createdAt: -1,
        });

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getResult = async (
  req,
  res
) => {
  try {
    const schoolId = req.schoolId;
    const result =
      await Result.findOne(
        { _id: req.params.id, schoolId }
      )
        .populate(
          "student",
          "name rollNumber className"
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

const updateResult = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const existingResult = await Result.findOne(
      { _id: req.params.id, schoolId }
    );

    if (!existingResult) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    const subjects =
      req.body.subjects ||
      existingResult.subjects;

    let totalMarks =
      existingResult.totalMarks;

    let obtainedMarks =
      existingResult.obtainedMarks;

    let percentage =
      existingResult.percentage;

    let grade =
      existingResult.grade;

    let status =
      existingResult.status;

    if (req.body.subjects) {
      totalMarks = subjects.reduce(
        (sum, item) =>
          sum + Number(item.maxMarks),
        0
      );

      obtainedMarks =
        subjects.reduce(
          (sum, item) =>
            sum +
            Number(
              item.marksObtained
            ),
          0
        );

      percentage =
        (obtainedMarks /
          totalMarks) *
        100;

      if (percentage >= 90)
        grade = "A+";
      else if (
        percentage >= 80
      )
        grade = "A";
      else if (
        percentage >= 70
      )
        grade = "B";
      else if (
        percentage >= 60
      )
        grade = "C";
      else if (
        percentage >= 35
      )
        grade = "D";
      else grade = "F";

      status =
        percentage >= 35
          ? "Pass"
          : "Fail";
    }

    const result =
      await Result.findOneAndUpdate(
        { _id: req.params.id, schoolId },
        {
          ...req.body,
          totalMarks,
          obtainedMarks,
          percentage,
          grade,
          status,
        },
        {
          new: true,
        }
      );

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

const deleteResult = async (
  req,
  res
) => {
  try {
    const schoolId = req.schoolId;
    await Result.findOneAndDelete(
      { _id: req.params.id, schoolId }
    );

    res.json({
      success: true,
      message:
        "Result deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const publishResult =
  async (req, res) => {
    try {
      const schoolId = req.schoolId;
      const result =
        await Result.findOneAndUpdate(
          { _id: req.params.id, schoolId },
          {
            published: true,
          },
          {
            new: true,
          }
        );

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

// =====================================
// CLASS RESULT SUMMARY
// =====================================
const getClassResults = async (
  req,
  res
) => {
  try {
    const schoolId = req.schoolId;
    const { className } =
      req.params;

    const marks =
      await Mark.find({
        className,
        schoolId,
      }).populate(
        "student",
        "name rollNumber"
      );

    if (!marks.length) {
      return res.json({
        totalStudents: 0,
        averageMarks: 0,
        passPercentage: 0,
        failPercentage: 0,
      });
    }

    const studentMap = {};

    marks.forEach((mark) => {
      const id =
        mark.student?._id.toString();

      if (!studentMap[id]) {
        studentMap[id] = {
          student:
            mark.student,
          obtained: 0,
          total: 0,
        };
      }

      studentMap[id].obtained +=
        mark.marksObtained;

      studentMap[id].total +=
        mark.totalMarks;
    });

    const students =
      Object.values(studentMap);

    let totalPercentage = 0;
    let passCount = 0;

    students.forEach((student) => {
      const percentage =
        (student.obtained /
          student.total) *
        100;

      totalPercentage +=
        percentage;

      if (percentage >= 35) {
        passCount++;
      }
    });

    const averageMarks =
      totalPercentage /
      students.length;

    res.json({
      totalStudents:
        students.length,
      averageMarks:
        averageMarks.toFixed(2),
      passPercentage: (
        (passCount /
          students.length) *
        100
      ).toFixed(2),
      failPercentage: (
        ((students.length -
          passCount) /
          students.length) *
        100
      ).toFixed(2),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// TOP PERFORMERS
// =====================================
const getTopPerformers =
  async (req, res) => {
    try {
      const schoolId = req.schoolId;
      const { className } =
        req.params;

      const marks =
        await Mark.find({
          className,
          schoolId,
        }).populate(
          "student",
          "name rollNumber"
        );

      const studentMap = {};

      marks.forEach((mark) => {
        const id =
          mark.student?._id.toString();

        if (!studentMap[id]) {
          studentMap[id] = {
            student:
              mark.student,
            obtained: 0,
            total: 0,
          };
        }

        studentMap[id]
          .obtained +=
          mark.marksObtained;

        studentMap[id].total +=
          mark.totalMarks;
      });

      const rankings =
        Object.values(
          studentMap
        ).map((student) => ({
          name:
            student.student.name,
          rollNumber:
            student.student
              .rollNumber,
          percentage: (
            (student.obtained /
              student.total) *
            100
          ).toFixed(2),
        }));

      rankings.sort(
        (a, b) =>
          b.percentage -
          a.percentage
      );

      res.json(
        rankings.slice(0, 10)
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// =====================================
// SUBJECT ANALYTICS
// =====================================
const getSubjectSummary =
  async (req, res) => {
    try {
      const schoolId = req.schoolId;
      const { className } =
        req.params;

      const marks =
        await Mark.find({
          className,
          schoolId,
        });

      const subjectMap = {};

      marks.forEach((mark) => {
        if (
          !subjectMap[
            mark.subject
          ]
        ) {
          subjectMap[
            mark.subject
          ] = {
            total: 0,
            count: 0,
          };
        }

        subjectMap[
          mark.subject
        ].total +=
          mark.marksObtained;

        subjectMap[
          mark.subject
        ].count += 1;
      });

      const result =
        Object.keys(
          subjectMap
        ).map((subject) => ({
          subject,
          average:
            (
              subjectMap[
                subject
              ].total /
              subjectMap[
                subject
              ].count
            ).toFixed(2),
        }));

      res.json(result);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  createResult,
  getResults,
  getResult,
  updateResult,
  deleteResult,
  publishResult,

  getClassResults,
  getTopPerformers,
  getSubjectSummary,
};