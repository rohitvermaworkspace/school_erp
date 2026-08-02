const Subject = require('../models/Subject');
const Student = require('../models/Student');

// CREATE SUBJECT
const createSubject = async (req, res) => {
  try {
    const { subjectName, subjectCode, className, teacher } = req.body;

    const subject = await Subject.create({
      subjectName,
      subjectCode,
      className,
      teacher,
      createdBy: req.user.id,
    });

    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// All ALL STUDENT SUBJECT
const getStudentSubjects = async (req, res) => {
  try {
    const student = await Student.findOne({
      userId: req.user.id,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    const subjects = await Subject.find({
      className: student.className,
    })
      .populate('teacher', 'name email')
      .sort({ subjectName: 1 });

    res.status(200).json({
      success: true,
      data: subjects,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSubjectDashboard = async (req, res) => {
  try {
    // Total Subjects
    const totalSubjects = await Subject.countDocuments();

    // Subjects By Class
    const classWiseSubjects = await Subject.aggregate([
      {
        $group: {
          _id: "$className",
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          count: -1
        }
      }
    ]);

    // Teacher Allocation
    const teacherAllocation = await Subject.aggregate([
      {
        $match: {
          teacher: { $ne: null }
        }
      },
      {
        $group: {
          _id: "$teacher",
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "teachers", // collection name
          localField: "_id",
          foreignField: "_id",
          as: "teacher"
        }
      },
      {
        $unwind: {
          path: "$teacher",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          teacherName: {
            $ifNull: ["$teacher.name", "Unassigned"]
          },
          count: 1
        }
      },
      {
        $sort: {
          count: -1
        }
      }
    ]);

    res.status(200).json({
      totalSubjects,
      classWiseSubjects,
      teacherAllocation
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL SUBJECTS
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('teacher', 'name email subject').populate('createdBy', 'name role');

    res.json(subjects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE SUBJECT
const getSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({
        message: 'Subject not found',
      });
    }

    res.json(subject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE SUBJECT
const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(subject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE SUBJECT
const deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Subject deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSubject,
  getSubjects,
  getSubjectDashboard,
  getSubject,
  updateSubject,
  deleteSubject,
  getStudentSubjects,
};
