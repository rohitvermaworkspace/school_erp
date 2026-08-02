import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StudentTimetableCalendar from "./StudentTimetableCalendar";
import { FaCalendarAlt } from "react-icons/fa";

import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

function StudentTimetable() {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("calendar");

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const res = await api.get("/timetables/student");
      setTimetables(res.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const timetableMap = useMemo(() => {
    const map = {};

    timetables.forEach((dayItem) => {
      dayItem.periods.forEach((period) => {
        const timeSlot = `${period.startTime} - ${period.endTime}`;

        if (!map[timeSlot]) {
          map[timeSlot] = {};
        }

        map[timeSlot][dayItem.day] = period;
      });
    });

    return map;
  }, [timetables]);

  const stats = useMemo(() => {
    let totalClasses = 0;
    let subjects = new Set();

    timetables.forEach((day) => {
      day.periods.forEach((period) => {
        totalClasses++;

        if (period.subject?.subjectName) {
          subjects.add(period.subject.subjectName);
        }
      });
    });

    return {
      totalClasses,
      totalSubjects: subjects.size,
    };
  }, [timetables]);

  // -------------------
  // PRINT
  // -------------------

  const handlePrint = () => {
    const content = document.getElementById("printable-timetable");

    const printWindow = window.open("", "", "width=1200,height=900");

    printWindow.document.write(`
      <html>
        <head>
          <title>Timetable</title>

          <style>
            body{
              font-family: Arial;
              padding:20px;
            }

            table{
              width:100%;
              border-collapse:collapse;
            }

            th,td{
              border:1px solid #ddd;
              padding:10px;
            }

            th{
              background:#2563eb;
              color:white;
            }
          </style>
        </head>

        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  // ======================================
  // DOWNLOAD PDF
  // ======================================
  const downloadPDF = () => {
    try {
      const pdf = new jsPDF("landscape", "mm", "a4");

      // ======================================
      // SCHOOL DETAILS
      // ======================================

      const schoolInfo = {
        name: "School ERP",
        address: "Basavakalyan, Karnataka",
        phone: "+91 9876543210",
      };

      const className = timetables?.[0]?.className || "N/A";

      const generatedDate = new Date().toLocaleString();

      // ======================================
      // HEADER
      // ======================================

      pdf.setFontSize(22);
      pdf.setTextColor(37, 99, 235);

      pdf.text(schoolInfo.name, 14, 15);

      pdf.setFontSize(10);
      pdf.setTextColor(80);

      pdf.text(schoolInfo.address, 14, 22);

      pdf.text(`Phone: ${schoolInfo.phone}`, 14, 28);

      pdf.setFontSize(15);
      pdf.setTextColor(20);

      pdf.text(`Student Timetable - Class ${className}`, 14, 40);

      pdf.setFontSize(10);

      pdf.text(`Generated On: ${generatedDate}`, 220, 40);

      // ======================================
      // TABLE DATA
      // ======================================

      const body = Object.keys(timetableMap)
        .sort()
        .map((time) => {
          const row = [time];

          weekDays.forEach((day) => {
            const period = timetableMap[time]?.[day];

            if (period) {
              row.push(
                `${period.subject?.subjectName || ""}
  Teacher: ${period.teacher?.name || ""}
  Room: ${period.roomNumber || "N/A"}`
              );
            } else {
              row.push("-");
            }
          });

          return row;
        });

      // ======================================
      // TABLE
      // ======================================

      autoTable(pdf, {
        startY: 50,

        head: [
          [
            "Time",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        ],

        body,

        theme: "grid",

        styles: {
          fontSize: 8,
          cellPadding: 3,
          valign: "middle",
        },

        headStyles: {
          fillColor: [37, 99, 235],
          textColor: 255,
          fontStyle: "bold",
        },

        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },

        columnStyles: {
          0: {
            cellWidth: 30,
          },
        },
      });

      // ======================================
      // FOOTER
      // ======================================

      const pageCount = pdf.internal.getNumberOfPages();

      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);

        pdf.setFontSize(9);
        pdf.setTextColor(120);

        pdf.text(`Generated by School ERP`, 14, 190);

        pdf.text(`Page ${i} of ${pageCount}`, 255, 190);
      }

      // ======================================
      // SAVE
      // ======================================

      pdf.save(`Class-${className}-Timetable.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg mb-8">
          <h1 className="text-3xl font-bold">Class Timetable</h1>

          <p className="mt-2 text-blue-100">
            View your weekly schedule, subjects, teachers and class timings.
          </p>
          <div className="mt-4 inline-flex items-center bg-white/20 px-4 py-2 rounded-full">
            Today: {today}
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-5 border border-gray-100">
            <p className="text-gray-500 text-sm">Subjects</p>
            <h2 className="text-3xl font-bold text-blue-600">
              {stats.totalSubjects}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-5 border border-gray-100">
            <p className="text-gray-500 text-sm">Weekly Classes</p>
            <h2 className="text-3xl font-bold text-green-600">
              {stats.totalClasses}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-5 border border-gray-100">
            <p className="text-gray-500 text-sm">Working Days</p>
            <h2 className="text-3xl font-bold text-purple-600">
              {timetables.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-5 border border-gray-100">
            <p className="text-gray-500 text-sm">Today</p>
            <h2 className="text-xl font-bold text-orange-600">{today}</h2>
          </div>
        </div>

        {/* VIEW SWITCHER */}

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setView("weekly")}
              className={`px-5 py-2 rounded-xl transition ${
                view === "weekly" ? "bg-blue-600 text-white" : "border bg-white"
              }`}
            >
              Weekly View
            </button>

            <button
              onClick={() => setView("calendar")}
              className={`px-5 py-2 rounded-xl transition ${
                view === "calendar"
                  ? "bg-blue-600 text-white"
                  : "border bg-white"
              }`}
            >
              Calendar View
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl"
            >
              Print
            </button>

            <button
              onClick={downloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* LOADING */}

        {loading && (
          <div className="bg-white rounded-xl shadow p-6">
            Loading timetable...
          </div>
        )}
        {!loading &&
          Object.keys(timetableMap).length === 0 && (
            <div className="bg-white rounded-2xl shadow p-10 text-center">
              <h3 className="text-lg font-semibold">
                No Timetable Available
              </h3>

              <p className="text-gray-500 mt-2">
                Timetable has not been published yet.
              </p>
            </div>
        )}

        {/* WEEKLY VIEW */}

        {!loading && view === "weekly" && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
            {/* TABLE HEADER */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <FaCalendarAlt className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Weekly Timetable</h2>
                    <p className="text-sm text-white/80">{stats.totalClasses} Classes scheduled</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow overflow-x-auto">

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3">Time</th>

                    {weekDays.map((day) => (
                      <th key={day} className="border p-3">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {Object.keys(timetableMap)
                    .sort()
                    .map((time) => (
                      <tr key={time}>
                        <td className="border p-3 font-semibold bg-gray-50">
                          {time}
                        </td>

                        {weekDays.map((day) => {
                          const period = timetableMap[time]?.[day];

                          return (
                            <td key={day} className="border p-3">
                              {period ? (
                                <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-3 space-y-2 hover:shadow-md transition">
                                  <div className="font-semibold text-blue-700">
                                    {period.subject?.subjectName}
                                  </div>

                                  <div className="text-sm text-gray-600">
                                    👨‍🏫 {period.teacher?.name}
                                  </div>

                                  <div className="text-xs text-blue-600 font-medium">
                                    {period.startTime} - {period.endTime}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-4">
                                  <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs">
                                    Free Period
                                  </span>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        )}

        {/* CALENDAR VIEW */}

        {!loading && view === "calendar" && (
          <div id="printable-timetable">
            <StudentTimetableCalendar
              timetableMap={timetableMap}
              weekDays={weekDays}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default StudentTimetable;