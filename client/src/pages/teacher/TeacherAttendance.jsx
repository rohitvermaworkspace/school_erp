import TeacherLayout from "../../components/layout/TeacherLayout";
import { useState, useEffect, useMemo } from "react";
import api from "../../services/api";
import { FaUsers, FaUserCheck, FaUserTimes, FaClock, FaClipboardCheck } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  getStudentsByClassId,
  markClassAttendance,
  getAttendanceByClass,
} from "../../services/attendanceService";

function TeacherAttendance() {
  const [selectedClassId, setSelectedClassId] = useState("");

  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const selectedClass = classes.find((cls) => cls._id === selectedClassId);

  const loadStudents = async () => {
    if (!selectedClassId) return;

    try {
      const studentsData = await getStudentsByClassId(selectedClassId);

      console.log("Students:", studentsData);

      setStudents(studentsData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!students.length) return;

    const initialAttendance = {};

    students.forEach((student) => {
      initialAttendance[student._id] = "present";
    });

    setAttendance(initialAttendance);
  }, [students]);
  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes");
      console.log("Classes:", classes);
      setClasses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    console.log("Selected Class:", selectedClassId);
    loadStudents();
  }, [selectedClassId]);

  const handleStatusChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const handleSave = async () => {
    try {
      const attendanceData = students.map((student) => ({
        studentId: student._id,
        status: attendance[student._id],
      }));

      await markClassAttendance({
        classId: selectedClass._id,
        className: selectedClass.className,
        section: selectedClass.section,
        date: attendanceDate,
        attendanceData,
      });
      toast.success("Attendance saved successfully");
    } catch (error) {
      console.error(error);
    }
  };
  const totalStudents = students.length;

  const presentStudents = Object.values(attendance).filter(
    (status) => status === "present"
  ).length;

  const absentStudents = Object.values(attendance).filter(
    (status) => status === "absent"
  ).length;

  const lateStudents = Object.values(attendance).filter(
    (status) => status === "late"
  ).length;

  const markAllPresent = () => {
    const updated = {};

    students.forEach((student) => {
      updated[student._id] = "present";
    });

    setAttendance(updated);
  };

  const markAllAbsent = () => {
    const updated = {};

    students.forEach((student) => {
      updated[student._id] = "absent";
    });

    setAttendance(updated);
  };

  const markAllLate = () => {
    const updated = {};

    students.forEach((student) => {
      updated[student._id] = "late";
    });

    setAttendance(updated);
  };
  console.log("Students State:", students);
  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* HERO */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-center">

            <div>
              <h1 className="text-3xl font-bold">
                Attendance Management
              </h1>

              <p className="mt-2 text-green-100">
                Monitor, track and manage student attendance records.
              </p>

              <div className="flex flex-wrap gap-3 mt-5">

                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  📅 Current Month
                </span>

                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  👨‍🎓 Total Students: {students.length}
                </span>

                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  🟢 Attendance Updated
                </span>

              </div>
            </div>

            <div className="mt-6 lg:mt-0">

              <div className="bg-white/15 backdrop-blur-md rounded-2xl px-8 py-6 text-center">

                <p className="text-green-100 text-sm">
                  Average Attendance
                </p>

                <h2 className="text-5xl font-bold mt-2">
                  92%
                </h2>

                <p className="text-green-100 text-sm mt-2">
                  School Attendance Rate
                </p>

              </div>

            </div>

          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Select Class
          </label>

          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="
                w-full
                md:w-80
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                focus:ring-2
                focus:ring-blue-500
                outline-none
              ">
            <option value="">Choose Class</option>

            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className} - {cls.section}
              </option>
            ))}
          </select>
        </div>

        {/* ADD HERE */}
        {selectedClassId && students.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center mb-6">
            <h3 className="font-semibold text-yellow-700">No students found</h3>

            <p className="text-sm text-yellow-600 mt-2">
              No students are assigned to this class yet.
            </p>
          </div>
        )}

        {/* Existing attendance UI */}

        {students.length > 0 && (
          <>
            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="rounded-3xl p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-purple-100">Total Students</p>
                    <h2 className="text-4xl font-bold mt-2">{totalStudents}</h2>
                  </div>
                  <FaUsers size={40} />
                </div>
              </div>

              <div className="rounded-3xl p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-green-100">Present</p>
                    <h2 className="text-4xl font-bold mt-2">
                      {presentStudents}
                    </h2>
                  </div>
                  <FaUserCheck size={40} />
                </div>
              </div>

              <div className="rounded-3xl p-6 bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-red-100">Absent</p>
                    <h2 className="text-4xl font-bold mt-2">
                      {absentStudents}
                    </h2>
                  </div>
                  <FaUserTimes size={40} />
                </div>
              </div>

              <div className="rounded-3xl p-6 bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-yellow-100">Late</p>
                    <h2 className="text-4xl font-bold mt-2">{lateStudents}</h2>
                  </div>
                  <FaClock size={40} />
                </div>
              </div>
            </div>

            {/* ATTENDANCE INFO */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-6 shadow-xl">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div>
                  <h2 className="text-2xl font-bold">Attendance Management</h2>

                  <p className="mt-2 text-blue-100">
                    Class {selectedClass?.className} - {selectedClass?.section}
                  </p>
                </div>

                <div>
                  <label className="block text-sm mb-2">Attendance Date</label>

                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    className="
              bg-white
              text-slate-900
              px-4
              py-3
              rounded-xl
              border-0
            "
                  />
                </div>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-slate-700">
                  Attendance Progress
                </span>

                <span className="font-semibold text-slate-700">
                  {presentStudents}/{totalStudents}
                </span>
              </div>

              <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${(presentStudents / totalStudents) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* BULK ACTIONS */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={markAllPresent}
                className="
          bg-green-600
          hover:bg-green-700
          text-white
          px-5
          py-3
          rounded-xl
          font-medium
        "
              >
                Mark All Present
              </button>

              <button
                onClick={markAllAbsent}
                className="
          bg-red-600
          hover:bg-red-700
          text-white
          px-5
          py-3
          rounded-xl
          font-medium
        "
              >
                Mark All Absent
              </button>

              <button
                onClick={markAllLate}
                className="
          bg-yellow-500
          hover:bg-yellow-600
          text-white
          px-5
          py-3
          rounded-xl
          font-medium
        "
              >
                Mark All Late
              </button>
            </div>

            {/* SEARCH */}
            <div className="bg-white rounded-2xl shadow p-4">
              <input
                type="text"
                placeholder="Search student..."
                className="
          w-full
          border
          rounded-xl
          px-4
          py-3
          focus:ring-2
          focus:ring-blue-500
          outline-none
        "
              />
            </div>

            {/* TABLE */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
              {/* TABLE HEADER */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                      <FaClipboardCheck className="text-xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Student Attendance</h2>
                      <p className="text-sm text-white/80">{students.length} Students</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow overflow-x-auto">

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left">#</th>

                      <th className="px-6 py-4 text-left">Photo</th>

                      <th className="px-6 py-4 text-left">Student Name</th>

                      <th className="px-6 py-4 text-left">Roll No</th>

                      <th className="px-6 py-4 text-left">Class</th>

                      <th className="px-6 py-4 text-center">Attendance</th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student, index) => (
                      <tr
                        key={student._id}
                        className="border-t hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">{index + 1}</td>

                        <td className="px-6 py-4">
                          <img
                            src={
                              student.profileImage
                                ? `http://localhost:8000/uploads/${student.profileImage}`
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    student.name
                                  )}&background=random`
                            }
                            alt={student.name}
                            className="
                      w-10
                      h-10
                      rounded-full
                      object-cover
                    "
                          />
                        </td>

                        <td className="px-6 py-4 font-medium">
                          {student.name}
                        </td>

                        <td className="px-6 py-4">{student.rollNumber}</td>

                        <td className="px-6 py-4">{student.className}</td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() =>
                                handleStatusChange(student._id, "present")
                              }
                              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                attendance[student._id] === "present"
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-100"
                              }`}
                            >
                              P
                            </button>

                            <button
                              onClick={() =>
                                handleStatusChange(student._id, "absent")
                              }
                              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                attendance[student._id] === "absent"
                                  ? "bg-red-600 text-white"
                                  : "bg-gray-100"
                              }`}
                            >
                              A
                            </button>

                            <button
                              onClick={() =>
                                handleStatusChange(student._id, "late")
                              }
                              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                attendance[student._id] === "late"
                                  ? "bg-yellow-500 text-white"
                                  : "bg-gray-100"
                              }`}
                            >
                              L
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>

            {/* SAVE SECTION */}
            <div className="bg-white rounded-3xl shadow-lg p-5 flex justify-end">
              <button
                onClick={handleSave}
                className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-8
          py-3
          rounded-xl
          font-medium
          shadow
        "
              >
                Save Attendance
              </button>
            </div>
          </>
        )}
      </div>
    </TeacherLayout>
  );
}

export default TeacherAttendance;