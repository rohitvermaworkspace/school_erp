import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import TeacherLayout from "../../components/layout/TeacherLayout";
import {
  FaUserGraduate,
  FaUserCheck,
  FaUserTimes,
  FaClipboardCheck,
} from "react-icons/fa";

function TeacherStudentAttendance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent();
    fetchAttendance();
    if (id) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      const res = await api.get(`/students/${id}`);
      setStudent(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await api.get(`/attendance/student/${id}`);
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const present = attendance.filter((a) => a.status === "present").length;

  const absent = attendance.filter((a) => a.status === "absent").length;

  const late = attendance.filter((a) => a.status === "late").length;

  const percentage =
    attendance.length > 0 ? Math.round((present / attendance.length) * 100) : 0;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const imageUrl = student?.profileImage
    ? `${API_URL}/uploads/${student.profileImage}`
    : null;
  return (
    <TeacherLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Student Attendance</h1>

          <p className="text-gray-500">View complete attendance details</p>
        </div>

        <button
          onClick={() => navigate("/teacher/students")}
          className="
            px-4 py-2
            rounded-lg
            bg-slate-100
            hover:bg-slate-200
            dark:bg-slate-800
            dark:hover:bg-slate-700
          "
        >
          ← Back
        </button>
      </div>

      {/* STUDENT CARD */}
      {student && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="w-24 h-24">
              {imageUrl && !imageError ? (
                <img
                  src={imageUrl}
                  alt={student?.name}
                  onError={() => setImageError(true)}
                  className="
      w-24 h-24
      rounded-full
      object-cover
      border-4 border-white
      shadow-lg
    "
                />
              ) : (
                <div
                  className="
      w-24 h-24
      rounded-full
      bg-blue-100
      flex items-center
      justify-center
      text-3xl
      font-bold
      text-blue-700
    "
                >
                  {student?.name?.charAt(0)}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>

              <p className="text-gray-500">Roll No: {student.rollNumber}</p>

              <p className="text-gray-500">Class: {student.className}</p>

              <p className="text-gray-500">{student.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-5 mb-6">
        <div className="bg-blue-600 text-white rounded-2xl p-5">
          <div className="flex justify-between">
            <div>
              <p>Attendance</p>
              <h2 className="text-3xl font-bold">{percentage}%</h2>
            </div>

            <FaClipboardCheck className="text-3xl" />
          </div>
        </div>

        <div className="bg-green-600 text-white rounded-2xl p-5">
          <div className="flex justify-between">
            <div>
              <p>Present</p>
              <h2 className="text-3xl font-bold">{present}</h2>
            </div>

            <FaUserCheck className="text-3xl" />
          </div>
        </div>

        <div className="bg-red-600 text-white rounded-2xl p-5">
          <div className="flex justify-between">
            <div>
              <p>Absent</p>
              <h2 className="text-3xl font-bold">{absent}</h2>
            </div>

            <FaUserTimes className="text-3xl" />
          </div>
        </div>

        <div className="bg-yellow-500 text-white rounded-2xl p-5">
          <div>
            <p>Late</p>
            <h2 className="text-3xl font-bold">{late}</h2>
          </div>
        </div>
      </div>

      {/* HISTORY TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
        {/* TABLE HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
          <div className="flex items-center gap-3 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaClipboardCheck className="text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Attendance History</h2>
              <p className="text-sm text-white/80">Daily attendance records for this student</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Day</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {attendance.length > 0 ? (
              attendance.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-4">
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </td>

                  <td className="p-4">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          item.status === "present"
                            ? "bg-green-100 text-green-700"
                            : item.status === "absent"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </TeacherLayout>
  );
}

export default TeacherStudentAttendance;