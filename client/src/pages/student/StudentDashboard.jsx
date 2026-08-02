import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminLayout from "../../components/layout/AppLayout";
import AttendanceCalendar from "../../components/students/AttendanceCalendar";
import AttendanceHeatmap from "../../components/students/AttendanceHeatmap";
import {
  FaUserCheck,
  FaBookOpen,
  FaPercentage,
  FaTrophy,
  FaClipboardList,
  FaCalendarAlt,
  FaFire,
} from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function StudentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendanceRaw, setAttendanceRaw] = useState([]);
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetchDashboard();
    fetchAttendance();
  }, []);

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "ST";

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/students/dashboard");
      setData(res.data);
    } catch (err) {
      console.log("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    const res = await api.get("/attendance/my");
    setAttendanceRaw(res.data);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          Loading Dashboard...
        </div>
      </AdminLayout>
    );
  }

  const stats = data?.stats || {};
  const notices = data?.notices || [];
  const attendanceTrend = data?.attendanceTrend || [];
  const feesTrend = data?.feesTrend || [];

  const feesChartData =
    feesTrend.map((item) => ({
      month: item.month,
      paid: item.paid,
      pending: item.pending,
    })) || [];

  const totalPaid = feesChartData.reduce((a, b) => a + (b.paid || 0), 0);
  const totalPending = feesChartData.reduce(
    (a, b) => a + (b.pending || 0),
    0
  );

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000";

  const imageUrl = user?.profileImage
    ? `${API_URL}/uploads/${user.profileImage}`
    : null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            <div className="flex items-center gap-5">
              {imageUrl && !imageError ? (
                <img
                  src={imageUrl}
                  alt={user?.name}
                  onError={() => setImageError(true)}
                  className="w-20 h-20 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white flex items-center justify-center text-2xl font-bold text-white">
                  {initials}
                </div>
              )}

              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-3">
                  🎓 Student Portal
                </div>
                <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight">
                  Welcome, {user?.name}
                </h1>
                <p className="text-purple-100 text-lg mt-2">
                  Class {user?.className} · Roll No: {user?.rollNumber} ·{" "}
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Attendance */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Attendance</p>
                <h2 className="text-3xl font-black mt-2">
                  {stats.attendance || 0}%
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaPercentage className="text-2xl" />
              </div>
            </div>
          </div>

          {/* Present Days */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Present Days
                </p>
                <h2 className="text-3xl font-black mt-2">
                  {stats.presentDays || 0}
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaUserCheck className="text-2xl" />
              </div>
            </div>
          </div>

          {/* Fees Status */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 p-6 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Fees Status</p>
                <h2 className="text-3xl font-black mt-2">
                  {stats.feesPaid ? "Paid" : "Pending"}
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <MdPayments className="text-2xl" />
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Subjects</p>
                <h2 className="text-3xl font-black mt-2">
                  {stats.subjects || 0}
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaBookOpen className="text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-6 shadow-card">
            <h3 className="font-bold mb-4 dark:text-white">
              Attendance Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrend}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={4}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-6 shadow-card">
            <h3 className="font-bold mb-4 dark:text-white">Fees Analytics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={feesChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="paid"
                  stroke="#16a34a"
                  strokeWidth={3}
                  name="Paid"
                />
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Pending"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-4">
              <span className="text-green-600 font-semibold">
                Paid ₹{totalPaid}
              </span>
              <span className="text-red-500 font-semibold">
                Pending ₹{totalPending}
              </span>
            </div>
          </div>
        </div>

        {/* SECONDARY STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-200 dark:border-yellow-900 rounded-2xl p-5 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-yellow-600 font-semibold">
                Class Rank
              </p>
              <h3 className="text-2xl font-black mt-2 text-slate-800 dark:text-white">
                #5
              </h3>
            </div>
            <FaTrophy className="text-yellow-500 text-3xl" />
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200 dark:border-blue-900 rounded-2xl p-5 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">
                Assignments
              </p>
              <h3 className="text-2xl font-black mt-2 text-slate-800 dark:text-white">
                3
              </h3>
            </div>
            <FaClipboardList className="text-blue-500 text-3xl" />
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-200 dark:border-red-900 rounded-2xl p-5 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-red-600 font-semibold">
                Upcoming Exams
              </p>
              <h3 className="text-2xl font-black mt-2 text-slate-800 dark:text-white">
                2
              </h3>
            </div>
            <FaCalendarAlt className="text-red-500 text-3xl" />
          </div>

          <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-200 dark:border-orange-900 rounded-2xl p-5 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-orange-600 font-semibold">
                Attendance Streak
              </p>
              <h3 className="text-2xl font-black mt-2 text-slate-800 dark:text-white">
                15
              </h3>
            </div>
            <FaFire className="text-orange-500 text-3xl" />
          </div>
        </div>

        {/* CALENDAR + HEATMAP */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceHeatmap data={attendanceRaw} />
          <AttendanceCalendar data={attendanceRaw} />
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* RECENT ATTENDANCE */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-card overflow-hidden">
            <div className="p-5 border-b dark:border-slate-800">
              <h3 className="font-bold dark:text-white">Recent Attendance</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {attendanceRaw
                .slice()
                .reverse()
                .map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between p-4 border-b dark:border-slate-800"
                  >
                    <div>
                      <p className="font-medium dark:text-white">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        item.status === "present"
                          ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                          : item.status === "absent"
                          ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* NOTICES */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-card p-6">
            <h3 className="font-bold mb-4 dark:text-white">Latest Notices</h3>
            {notices.length > 0 ? (
              notices.map((notice, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-500/10 p-4 rounded-xl mb-3"
                >
                  <p className="font-semibold dark:text-white">
                    {notice.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {notice.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No notices available</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default StudentDashboard;
