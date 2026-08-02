import { useEffect, useState } from "react";
import TeacherLayout from "../../components/layout/TeacherLayout";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

function TeacherMarks() {
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [examType, setExamType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadStudents = async () => {
    if (!className) return;

    try {
      setLoading(true);

      const { data } = await api.get(`/students/class/${className}`);

      setStudents(data);

      const initialMarks = {};

      data.forEach((student) => {
        initialMarks[student._id] = "";
      });

      setMarks(initialMarks);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };
  const loadExistingMarks = async () => {
    try {
      const { data } = await api.get(`/marks/class/${className}`, {
        params: {
          subject,
          examType,
        },
      });

      const existingMarks = {};

      data.forEach((mark) => {
        if (mark.student) {
          existingMarks[mark.student._id] = mark.marksObtained;
        }
      });

      setMarks(existingMarks);
    } catch (error) {
      console.error(error);
    }
  };
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!className) return;
    loadStudents();
  }, [className]);

  useEffect(() => {
    if (!className || !subject || !examType) return;

    loadExistingMarks();
  }, [className, subject, examType]);

  const handleMarkChange = (studentId, value) => {
    setMarks({
      ...marks,
      [studentId]: value,
    });
  };

  const handleSaveMarks = async () => {
    if (!className || !subject || !examType) {
      toast.success("Please select Class, Subject and Exam Type");
      return;
    }

    try {
      setSaving(true);

      const marksData = students.map((student) => ({
        studentId: student._id,
        marksObtained: Number(marks[student._id]) || 0,
      }));

      await api.post("/marks/bulk", {
        className,
        subject,
        examType,
        marksData,
      });
      toast.success("Marks saved successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to save marks");
    } finally {
      setSaving(false);
    }
  };

  return (
    <TeacherLayout>
      <div className="p-6 space-y-6">
        {/* HERO */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-3xl font-bold">Marks Management</h1>
          <p className="mt-2 text-blue-100">
            Enter, upload and manage student exam marks efficiently.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Total Students</p>
            <h2 className="text-3xl font-bold text-blue-600">
              {students.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Passed</p>
            <h2 className="text-3xl font-bold text-green-600">
              {students.filter((s) => Number(marks[s._id] || 0) >= 35).length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Failed</p>
            <h2 className="text-3xl font-bold text-red-600">
              {students.filter((s) => Number(marks[s._id] || 0) < 35).length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Average Marks</p>
            <h2 className="text-3xl font-bold text-purple-600">
              {students.length
                ? Math.round(
                    students.reduce(
                      (acc, s) => acc + Number(marks[s._id] || 0),
                      0
                    ) / students.length
                  )
                : 0}
            </h2>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-2xl shadow p-5">
          <div className="grid md:grid-cols-4 gap-4">
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="border rounded-xl p-3"
            >
              <option value="">Select Class</option>
              <option value="10A">10A</option>
              <option value="10B">10B</option>
              <option value="9A">9A</option>
              <option value="9B">9B</option>
            </select>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border rounded-xl p-3"
            >
              <option value="">Select Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Computer">Computer</option>
            </select>

            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="border rounded-xl p-3"
            >
              <option value="">Select Exam</option>
              <option value="Unit Test 1">Unit Test 1</option>
              <option value="Unit Test 2">Unit Test 2</option>
              <option value="Mid Term">Mid Term</option>
              <option value="Final Exam">Final Exam</option>
            </select>

            <input
              type="text"
              placeholder="Search Student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-xl p-3"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3 mt-5">
            <button className="bg-green-600 text-white px-4 py-2 rounded-xl">
              Download Template
            </button>

            <label className="bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer">
              Upload Excel
              <input type="file" accept=".xlsx,.xls" className="hidden" />
            </label>

            <button className="bg-purple-600 text-white px-4 py-2 rounded-xl">
              Import Previous Exam
            </button>
          </div>
        </div>

        {/* TABLE */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            Loading students...
          </div>
        ) : filteredStudents.length > 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">

          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <FaEdit className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Student Marks Register</h2>
                  <p className="text-sm text-white/80">Enter and manage examination marks</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
                  {students.length} Students
                </span>
                <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
                  {subject || "Subject"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto">
            <table className="w-full">

              <thead>

                <tr className="bg-slate-100 text-slate-700">

                  <th className="px-5 py-4 text-left font-semibold">
                    Student
                  </th>
                   <th className="px-5 py-4 text-left font-semibold">
                    Email
                  </th>
                  <th className="px-5 py-4 text-left font-semibold">
                    Roll No
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Grade
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Result
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Marks
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredStudents.map((student, index) => {
                  const mark = Number(marks[student._id] || 0);

                  const grade =
                    mark >= 90
                      ? "A+"
                      : mark >= 80
                      ? "A"
                      : mark >= 70
                      ? "B"
                      : mark >= 60
                      ? "C"
                      : mark >= 40
                      ? "D"
                      : "F";

                  const passed = mark >= 35;

                  return (
                    <tr
                      key={student._id}
                      className={`
                        border-b
                        hover:bg-blue-50
                        transition
                        ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                      `}
                    >
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div
                            className="
                              h-10
                              w-10
                              rounded-full
                              bg-gradient-to-r
                              from-blue-500
                              to-indigo-600
                              text-white
                              flex
                              items-center
                              justify-center
                              font-semibold
                            "
                          >
                            {student.name?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {student.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {student.className}
                            </p>
                          </div>

                        </div>

                      </td>
                       <td className="px-5 py-4">
                            {student.email}
                          </td>
                      <td className="px-5 py-4">
                        {student.rollNumber}
                      </td>

                      <td className="px-5 py-4">

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                            ${
                              grade === "A+"
                                ? "bg-green-100 text-green-700"
                                : grade === "A"
                                ? "bg-blue-100 text-blue-700"
                                : grade === "B"
                                ? "bg-indigo-100 text-indigo-700"
                                : grade === "C"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {grade}
                        </span>

                      </td>

                      <td className="px-5 py-4">

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                            ${
                              passed
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {passed ? "Pass" : "Fail"}
                        </span>

                      </td>

                      <td className="px-5 py-4">

                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={marks[student._id] || ""}
                          onChange={(e) =>
                            handleMarkChange(
                              student._id,
                              e.target.value
                            )
                          }
                          className="
                            w-28
                            rounded-xl
                            border
                            border-slate-300
                            px-3
                            py-2
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            outline-none
                          "
                        />

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </div>
        ) : (
          className && (
            <div className="bg-white rounded-2xl shadow p-10 text-center">
              No students found
            </div>
          )
        )}

        {/* SAVE BUTTON */}
        {students.length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={handleSaveMarks}
              disabled={saving}
              className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              py-3
              rounded-xl
              font-medium
            "
            >
              {saving ? "Saving..." : "Save Marks"}
            </button>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}

export default TeacherMarks;