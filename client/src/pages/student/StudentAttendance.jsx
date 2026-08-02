import { useEffect, useState } from "react";
import api from "../../services/api";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { FaClipboardCheck, FaUserCheck, FaUserTimes, FaClock } from "react-icons/fa";
import AttendanceCalendar from "../../components/students/AttendanceCalendar";
import AttendanceHeatmap from "../../components/students/AttendanceHeatmap";
import AttendanceRing from "../../components/students/AttendanceRing";
import { useAuth } from "../../context/AuthContext";


import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function StudentAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("month");
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);


  useEffect(() => {
    fetchAttendance();
  }, []);

  const initials =
  user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "ST";
  // ================= API =================
  const fetchAttendance = async () => {
    setLoading(true);

    try {
      const res = await api.get("/attendance/my");
      setAttendance(res.data || []);
    } catch (err) {
      console.log("Attendance Error:", err);
    } finally {
      setLoading(false);
    }
  };
  // ================= FILTER =================
  const getFilteredData = () => {
    const now = new Date();

    return attendance.filter((item) => {
      const d = new Date(item.date);
      if (isNaN(d.getTime())) return false;

      if (filter === "month") {
        return d.getMonth() === now.getMonth();
      }

      if (filter === "3months") {
        return now - d <= 90 * 24 * 60 * 60 * 1000;
      }

      if (filter === "year") {
        return d.getFullYear() === now.getFullYear();
      }

      return true;
    });
  };

  const filtered = getFilteredData();

  // ================= CALCULATION =================
  const presentCount = filtered.filter((a) => a.status === "present").length;
  const absentCount = filtered.filter((a) => a.status === "absent").length;
  const lateCount = filtered.filter((a) => a.status === "late").length;
  const total = filtered.length || 1;
  const percent = Math.round((presentCount / total) * 100);
  const monthlyAttendance = filtered.reduce((acc, item) => {
    const date = new Date(item.date);
    const month = date.toLocaleString("default", {
      month: "short",
    });

    let existing = acc.find((m) => m.month === month);

    if (!existing) {
      existing = {
        month,
        present: 0,
        absent: 0,
        late: 0,
      };

      acc.push(existing);
    }

    if (item.status === "present") existing.present++;
    if (item.status === "absent") existing.absent++;
    if (item.status === "late") existing.late++;

    return acc;
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">Loading attendance...</div>
      </DashboardLayout>
    );
  }
 const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

  const imageUrl = user?.profileImage
    ? `${API_URL}/uploads/${user.profileImage}`
    : null;
  return (
    <DashboardLayout>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-4">
        <div className="flex items-center gap-4">
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt={user?.name}
              onError={() => setImageError(true)}
              className="w-20 h-20 rounded-full border-4 border-white object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white flex items-center justify-center text-2xl font-bold">
              {initials}
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold">Welcome, {user?.name}</h2>
            <p>Class {user?.className}</p>
            <p>Roll No: {user?.rollNumber}</p>
            <p>Email: {user?.email}</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Attendance</h2>

          <select
            className="border p-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="month">This Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Attendance % */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-purple-100">Attendance Rate</p>

                <h2 className="text-3xl font-bold dark:text-white mt-2">
                  {percent} %
                </h2>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                <FaClipboardCheck />
              </div>
            </div>
          </div>

          {/* Present */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-100">Present</p>

                <h2 className="text-4xl font-bold text-white mt-2">
                  {presentCount}
                </h2>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                <FaUserCheck />
              </div>
            </div>
          </div>

          {/* Absent */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-red-100">Absent</p>

                <h2 className="text-3xl font-bold dark:text-white mt-2">
                  {absentCount}
                </h2>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                <FaUserTimes />
              </div>
            </div>
          </div>

          {/* Late */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-yellow-100">Late</p>

                <h2 className="text-3xl font-bold dark:text-white mt-2">
                  {lateCount}
                </h2>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                <FaClock />
              </div>
            </div>
          </div>
        </div>

        {/* ================= ATTENDANCE RING ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Ring */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Attendance Overview</h3>

            <div className="flex flex-col items-center">
              <AttendanceRing percent={percent} />
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">
              Monthly Attendance Trend
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyAttendance}>
                console.log(data);
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ================= CALENDAR + HEATMAP ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AttendanceCalendar data={filtered} />

          <AttendanceHeatmap data={filtered} />
        </div>
      </div>
      {/* ATTENDANCE TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
        {/* TABLE HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
          <div className="flex items-center gap-3 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaClipboardCheck className="text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Attendance History</h2>
              <p className="text-sm text-white/80">Your daily attendance records</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Day
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Month
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>

         <tbody>
            {filtered.length > 0 ? (
              filtered
                .slice()
                .reverse()
                .map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-600">
                      {index + 1}
                    </td>

                    <td className="px-4 py-3">
                      {new Date(item.date).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </td>

                    <td className="px-4 py-3">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "long",
                      })}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          item.status === "present"
                            ? "bg-green-100 text-green-700"
                            : item.status === "absent"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
        <div className="bg-white rounded-xl p-5 shadow">
          <p className="text-gray-500">Total Days</p>

          <h2 className="text-3xl font-bold">{filtered.length}</h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <p className="text-gray-500">Best Streak</p>

          <h2 className="text-3xl font-bold text-green-600">15 Days</h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <p className="text-gray-500">Last Absent</p>

          <h2 className="font-bold">04 Jun 2026</h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <p className="text-gray-500">Working Days</p>

          <h2 className="text-3xl font-bold">120</h2>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentAttendance;