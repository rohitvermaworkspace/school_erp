const Timetable = require("../models/Timetable");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

// =====================================
// CREATE TIMETABLE
// =====================================
const createTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(timetable);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET ALL TIMETABLES
// =====================================
const getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find()
      .populate(
        "periods.subject",
        "subjectName"
      )
      .populate(
        "periods.teacher",
        "name email"
      )
      .populate(
        "createdBy",
        "name role"
      );

    res.status(200).json(timetables);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// STUDENT TIMETABLE
// =====================
const getStudentTimetable = async (req, res) => {
  try {
    const student = await Student.findOne({
      userId: req.user._id,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const timetables = await Timetable.find({
      className: student.className,
    })
      .populate("periods.subject", "subjectName")
      .populate("periods.teacher", "name email");
    console.log(
      JSON.stringify(timetables, null, 2)
    );
    res.status(200).json({
      success: true,
      data: timetables,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET SINGLE TIMETABLE
// =====================================
const getTimetable = async (req, res) => {
  try {
    const timetable =
      await Timetable.findById(req.params.id)
        .populate(
          "periods.subject",
          "subjectName"
        )
        .populate(
          "periods.teacher",
          "name email"
        );

    if (!timetable) {
      return res.status(404).json({
        message: "Timetable not found",
      });
    }

    res.status(200).json(timetable);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// UPDATE TIMETABLE
// =====================================
const updateTimetable = async (req, res) => {
  try {
    const timetable =
      await Timetable.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!timetable) {
      return res.status(404).json({
        message: "Timetable not found",
      });
    }

    res.status(200).json(timetable);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// DELETE TIMETABLE
// =====================================
const deleteTimetable = async (req, res) => {
  try {
    const timetable =
      await Timetable.findById(req.params.id);

    if (!timetable) {
      return res.status(404).json({
        message: "Timetable not found",
      });
    }

    await timetable.deleteOne();

    res.status(200).json({
      message:
        "Timetable deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// TEACHER TIMETABLE
// =====================================
const getTeacherTimetable = async (
  req,
  res
) => {
  try {
    const teacher =
      await Teacher.findOne({
        email: req.user.email,
      });

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    const timetables =
      await Timetable.find({
        "periods.teacher":
          teacher._id,
      })
        .populate(
          "periods.subject",
          "subjectName"
        )
        .populate(
          "periods.teacher",
          "name email"
        );

    const schedule = [];

    timetables.forEach((timetable) => {
      timetable.periods.forEach((period) => {
        if (
          period.teacher &&
          period.teacher._id.toString() ===
            teacher._id.toString()
        ) {
          schedule.push({
            day: timetable.day,
            className:
              timetable.className,
            subject:
              period.subject
                ?.subjectName,
            startTime:
              period.startTime,
            endTime:
              period.endTime,
          });
        }
      });
    });

    res.status(200).json(schedule);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTimetable,
  getTimetables,
  getTimetable,
  updateTimetable,
  deleteTimetable,
  getTeacherTimetable,
  getStudentTimetable,
};