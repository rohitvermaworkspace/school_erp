import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import api from "../../../services/api";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function StudentReportCard() {
  const { id } = useParams();

  const [result, setResult] = useState(null);

  const printRef = useRef();

  useEffect(() => {
    fetchReportCard();
  }, []);

  const fetchReportCard = async () => {
    try {
      const res = await api.get(
        `/student-results/${id}`
      );

      setResult(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  if (!result) {
    return (
      <DashboardLayout>
        <div className="p-6">
          Loading Report Card...
        </div>
      </DashboardLayout>
    );
  }

const downloadPDF = () => {
  const doc = new jsPDF();

  // ==========================
  // SCHOOL HEADER
  // ==========================
  doc.setFontSize(20);
  doc.setTextColor(30, 64, 175);

  doc.text(
    "ABC PUBLIC SCHOOL",
    105,
    20,
    { align: "center" }
  );

  doc.setFontSize(12);
  doc.setTextColor(100);

  doc.text(
    "Academic Report Card",
    105,
    28,
    { align: "center" }
  );

  // ==========================
  // STUDENT DETAILS
  // ==========================
  doc.setTextColor(0);

  doc.setFontSize(11);

  doc.text(
    `Student Name : ${result.student?.name}`,
    14,
    45
  );

  doc.text(
    `Roll Number : ${result.student?.rollNumber}`,
    14,
    52
  );

  doc.text(
    `Class : ${result.className}`,
    14,
    59
  );

  doc.text(
    `Exam : ${result.examName}`,
    120,
    45
  );

  doc.text(
    `Status : ${result.status}`,
    120,
    52
  );

  doc.text(
    `Grade : ${result.grade}`,
    120,
    59
  );

  // ==========================
  // SUBJECT TABLE
  // ==========================
  autoTable(doc, {
    startY: 70,

    head: [
      [
        "Subject",
        "Code",
        "Obtained",
        "Max Marks",
        "%"
      ]
    ],

    body: result.subjects.map(
      (item) => [
        item.subject?.subjectName,
        item.subject?.subjectCode,
        item.marksObtained,
        item.maxMarks,
        `${(
          (item.marksObtained /
            item.maxMarks) *
          100
        ).toFixed(1)}%`,
      ]
    ),

    theme: "grid",

    headStyles: {
      fillColor: [37, 99, 235],
    },
  });

  // ==========================
  // SUMMARY
  // ==========================
  let finalY =
    doc.lastAutoTable.finalY + 15;

  doc.setFontSize(12);

  doc.text(
    `Total Marks : ${result.totalMarks}`,
    14,
    finalY
  );

  doc.text(
    `Obtained Marks : ${result.obtainedMarks}`,
    14,
    finalY + 8
  );

  doc.text(
    `Percentage : ${result.percentage}%`,
    14,
    finalY + 16
  );

  doc.text(
    `Grade : ${result.grade}`,
    120,
    finalY
  );

  doc.text(
    `Result : ${result.status}`,
    120,
    finalY + 8
  );

  // ==========================
  // SIGNATURES
  // ==========================
  finalY += 40;

  doc.line(
    20,
    finalY,
    70,
    finalY
  );

  doc.line(
    130,
    finalY,
    180,
    finalY
  );

  doc.text(
    "Class Teacher",
    25,
    finalY + 8
  );

  doc.text(
    "Principal",
    145,
    finalY + 8
  );

  // ==========================
  // SAVE
  // ==========================
  doc.save(
    `${result.student?.name}-report-card.pdf`
  );
};

  return (
    <DashboardLayout>
      <div className="p-6">

        {/* Print Button */}

        <div className="flex justify-end mb-4">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            Download PDF
            </button>
        </div>

        {/* Printable Area */}

        <div
        ref={printRef}
        className="print-area max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8"
        >
          {/* Header */}

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">
              School Report Card
            </h1>

            <p className="text-gray-500">
              Academic Performance Report
            </p>
          </div>

          {/* Student Info */}

          <div className="grid md:grid-cols-2 gap-4 mb-8">

            <div>
              <p>
                <strong>Name:</strong>{" "}
                {result.student?.name}
              </p>

              <p>
                <strong>Roll Number:</strong>{" "}
                {result.student?.rollNumber}
              </p>

              <p>
                <strong>Class:</strong>{" "}
                {result.className}
              </p>
            </div>

            <div>
              <p>
                <strong>Exam:</strong>{" "}
                {result.examName}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {result.status}
              </p>

              <p>
                <strong>Grade:</strong>{" "}
                {result.grade}
              </p>
            </div>

          </div>

          {/* Subject Table */}

          <table className="w-full border border-gray-200">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-3 text-left">
                  Subject
                </th>

                <th className="p-3 text-left">
                  Code
                </th>

                <th className="p-3 text-center">
                  Obtained
                </th>

                <th className="p-3 text-center">
                  Max
                </th>
              </tr>

            </thead>

            <tbody>

              {result.subjects.map(
                (item) => (
                  <tr
                    key={item._id}
                    className="border-t"
                  >
                    <td className="p-3">
                      {
                        item.subject
                          ?.subjectName
                      }
                    </td>

                    <td className="p-3">
                      {
                        item.subject
                          ?.subjectCode
                      }
                    </td>

                    <td className="p-3 text-center">
                      {
                        item.marksObtained
                      }
                    </td>

                    <td className="p-3 text-center">
                      {item.maxMarks}
                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

          {/* Summary */}

          <div className="mt-8 bg-gray-50 rounded-xl p-5">

            <div className="grid md:grid-cols-4 gap-4">

              <div>
                <p className="text-gray-500">
                  Total Marks
                </p>

                <h3 className="font-bold text-xl">
                  {result.totalMarks}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Obtained Marks
                </p>

                <h3 className="font-bold text-xl">
                  {result.obtainedMarks}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Percentage
                </p>

                <h3 className="font-bold text-xl text-blue-600">
                  {result.percentage}%
                </h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Grade
                </p>

                <h3 className="font-bold text-xl text-green-600">
                  {result.grade}
                </h3>
              </div>

            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default StudentReportCard;