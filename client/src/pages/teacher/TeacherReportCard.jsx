import { useState, useEffect } from "react";

import TeacherLayout from "../../components/layout/TeacherLayout";
import { FaAward } from "react-icons/fa";

import {
  getStudentsByClass,
  downloadReportCard,
} from "../../services/reportCardService";

function TeacherReportCard() {
  const [className, setClassName] = useState("");

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

const filteredStudents = students.filter((student) =>
  student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
);

  useEffect(() => {
    if (className) {
      loadStudents();
    }
  }, [className]);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const data = await getStudentsByClass(className);

      setStudents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (studentId, name) => {
    try {
      const pdf = await downloadReportCard(studentId);

      const url = window.URL.createObjectURL(new Blob([pdf]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", `${name}-report-card.pdf`);

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.error(error);

      alert("Failed to download report card");
    }
  };

  return (
    <TeacherLayout>
      <div className="p-6 space-y-6">

  {/* HERO */}
  <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-3xl p-8 text-white shadow-xl">
    <h1 className="text-3xl font-bold">
      Report Card Management
    </h1>

    <p className="mt-2 text-green-100">
      Generate, preview and download student report cards.
    </p>
  </div>

  {/* KPI CARDS */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

    <div className="bg-white rounded-2xl shadow p-5">
      <p className="text-gray-500 text-sm">
        Total Students
      </p>

      <h2 className="text-3xl font-bold text-blue-600">
        {students.length}
      </h2>
    </div>

    <div className="bg-white rounded-2xl shadow p-5">
      <p className="text-gray-500 text-sm">
        Selected Class
      </p>

      <h2 className="text-3xl font-bold text-green-600">
        {className || "-"}
      </h2>
    </div>

    <div className="bg-white rounded-2xl shadow p-5">
      <p className="text-gray-500 text-sm">
        Generated Reports
      </p>

      <h2 className="text-3xl font-bold text-purple-600">
        {students.length}
      </h2>
    </div>

    <div className="bg-white rounded-2xl shadow p-5">
      <p className="text-gray-500 text-sm">
        Download Ready
      </p>

      <h2 className="text-3xl font-bold text-orange-600">
        {students.length}
      </h2>
    </div>

  </div>

  {/* FILTER BAR */}
  <div className="bg-white rounded-2xl shadow p-5">

    <div className="grid md:grid-cols-3 gap-4">

      <select
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        className="
          border
          rounded-xl
          px-4
          py-3
          focus:ring-2
          focus:ring-green-500
        "
      >
        <option value="">
          Select Class
        </option>

        <option value="10A">10A</option>
        <option value="10B">10B</option>
        <option value="9A">9A</option>
        <option value="9B">9B</option>

      </select>

      <input
        type="text"
        placeholder="Search student..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          border
          rounded-xl
          px-4
          py-3
          focus:ring-2
          focus:ring-green-500
        "
      />

      <button
        className="
          bg-green-600
          hover:bg-green-700
          text-white
          rounded-xl
          px-4
          py-3
          font-medium
        "
      >
        Download All PDFs
      </button>

    </div>

  </div>

  {/* STUDENT TABLE */}
  {loading ? (

    <div className="bg-white rounded-2xl shadow p-10 text-center">
      Loading students...
    </div>

  ) : filteredStudents.length > 0 ? (

    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">

      {/* TABLE HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
        <div className="flex items-center gap-3 text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <FaAward className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Student Report Cards</h2>
            <p className="text-sm text-white/80">View and download student report cards</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>
              <th className="px-6 py-4 text-left">
                Student
              </th>

              <th className="px-6 py-4 text-left">
                Roll No
              </th>

              <th className="px-6 py-4 text-left">
                Class
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {filteredStudents.map((student) => (

              <tr
                key={student._id}
                className="
                  border-t
                  hover:bg-gray-50
                "
              >
                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        h-10
                        w-10
                        rounded-full
                        bg-green-100
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-green-700
                      "
                    >
                      {student.name?.charAt(0)}
                    </div>

                    <div>

                      <p className="font-medium">
                        {student.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {student.email}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-4">
                  {student.rollNumber}
                </td>

                <td className="px-6 py-4">

                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-blue-100
                      text-blue-700
                      text-sm
                    "
                  >
                    {student.className}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-green-100
                      text-green-700
                      text-sm
                    "
                  >
                    Ready
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-2">

                    <button
                      className="
                        bg-blue-100
                        text-blue-700
                        px-3
                        py-2
                        rounded-lg
                        hover:bg-blue-200
                      "
                    >
                      Preview
                    </button>

                    <button
                      onClick={() =>
                        handleDownload(
                          student._id,
                          student.name
                        )
                      }
                      className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-3
                        py-2
                        rounded-lg
                      "
                    >
                      Download PDF
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  ) : (

    <div className="bg-white rounded-2xl shadow p-12 text-center">

      <h2 className="text-xl font-semibold">
        No Students Found
      </h2>

      <p className="text-gray-500 mt-2">
        Select a class to generate report cards.
      </p>

    </div>

  )}

</div>
    </TeacherLayout>
  );
}

export default TeacherReportCard;