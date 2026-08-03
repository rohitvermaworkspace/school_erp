const PDFDocument = require("pdfkit");

const Student = require("../models/Student");
const Mark = require("../models/Mark");

const generateReportCard = async (
  req,
  res
) => {
  try {
    const schoolId = req.schoolId;
    const { studentId } =
      req.params;

    const student =
      await Student.findOne(
        { _id: studentId, schoolId }
      );

    if (!student) {
      return res.status(404).json({
        message:
          "Student not found",
      });
    }

    const marks =
      await Mark.find({
        schoolId,
        student: studentId,
      });

    let obtained = 0;
    let total = 0;

    marks.forEach((m) => {
      obtained +=
        m.marksObtained;

      total += m.totalMarks;
    });

    const percentage =
      total > 0
        ? (
            (obtained /
              total) *
            100
          ).toFixed(2)
        : 0;

    let grade = "F";

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

    const doc =
      new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${student.name}-report-card.pdf`
    );

    doc.pipe(res);

    doc
      .fontSize(22)
      .text(
        "School Report Card",
        {
          align: "center",
        }
      );

    doc.moveDown();

    doc.fontSize(14);

    doc.text(
      `Student Name: ${student.name}`
    );

    doc.text(
      `Roll Number: ${student.rollNumber}`
    );

    doc.text(
      `Class: ${student.className}`
    );

    doc.moveDown();

    doc.text("Marks");

    doc.moveDown();

    marks.forEach((mark) => {
      doc.text(
        `${mark.subject} : ${mark.marksObtained}/${mark.totalMarks}`
      );
    });

    doc.moveDown();

    doc.text(
      `Total: ${obtained}/${total}`
    );

    doc.text(
      `Percentage: ${percentage}%`
    );

    doc.text(
      `Grade: ${grade}`
    );

    doc.end();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateReportCard,
};