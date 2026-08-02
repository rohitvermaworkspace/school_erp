import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import QuickActions from "../../components/admin/QuickActions";
import ClassStrengthChart from "../../components/admin/ClassStrengthChart";
import FeeCollectionChart from "../../components/admin/FeeCollectionChart";
import TeacherAnalyticsCard from "../../components/admin/TeacherAnalyticsChart";
import AttendanceAnalyticsCard from "../../components/admin/AttendanceAnalyticsCard";
import AdmissionTrendChart from "../../components/admin/AdmissionTrendChart";
import TeacherAnalyticsChart from "../../components/admin/TeacherAnalyticsChart";
import {
  FaUsers,
  FaUserPlus,
  FaEnvelope,
  FaRupeeSign,
  FaPercentage,
  FaUserCheck,
  FaUserTimes,
  FaChalkboardTeacher,
  FaHome,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [notices, setNotices] = useState([]);
  const [recentAdmissions, setRecentAdmissions] = useState([]);
  const navigate = useNavigate();
  const [classStrength, setClassStrength] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [feeAnalytics, setFeeAnalytics] = useState({
    totalCollected: 0,
    pendingFees: 0,
    todayCollection: 0,
    monthlyCollection: [],
  });
  const [attendanceAnalytics, setAttendanceAnalytics] = useState({
    present: 0,
    absent: 0,
    late: 0,
  });
  const [teacherAnalytics, setTeacherAnalytics] = useState({});
  const [admissionTrend, setAdmissionTrend] = useState([]);

  const fetchDashboard = async () => {
    setRefreshing(true);
    try {
      const res = await api.get("/admin-analytics/dashboard");
      setStats(res.data.stats || {});
      setClassStrength(res.data.classStrength || []);
      setNotices(res.data.notices || []);
      setRecentAdmissions(res.data.recentAdmissions || []);
      setActivities(res.data.activities || []);
      setFeeAnalytics(res.data.feeAnalytics || {});
      setAttendanceAnalytics(res.data.attendanceAnalytics || {});
      setTeacherAnalytics(res.data.teacherAnalytics || {});
      setAdmissionTrend(res.data.admissionTrend || []);
    } catch (err) {
      console.error("Admin Dashboard Error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading Dashboard...
      </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-4">
                🏫 Admin Control Panel
              </div>
              <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight">
                Dashboard
              </h1>
              <p className="text-purple-100 text-lg mt-3 max-w-2xl">
                Welcome back, Administrator. Here&apos;s what&apos;s happening
                across your school today.
              </p>

              <div className="flex flex-wrap gap-6 mt-6 text-white">
                <div>
                  <p className="text-purple-200 text-sm">Academic Session</p>
                  <h3 className="text-2xl font-bold">
                    {stats.session || "2026-2027"}
                  </h3>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">Total Students</p>
                  <h3 className="text-2xl font-bold">
                    {stats.totalStudents || 0}
                  </h3>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">Total Teachers</p>
                  <h3 className="text-2xl font-bold">
                    {stats.totalTeachers || 0}
                  </h3>
                </div>
              </div>
            </div>

            <button
              onClick={fetchDashboard}
              disabled={refreshing}
              className="px-6 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition font-medium"
            >
              {refreshing ? "Refreshing..." : "↻ Refresh Dashboard"}
            </button>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Total Students */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Total Students
                </p>
                <h2 className="text-3xl font-black mt-2">
                  {stats.totalStudents || 0}
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaUsers className="text-2xl" />
              </div>
            </div>
          </div>

          {/* New Admissions */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  New Admissions
                </p>
                <h2 className="text-3xl font-black mt-2">
                  {stats.newAdmissions || 0}
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaUserPlus className="text-2xl" />
              </div>
            </div>
          </div>

          {/* Enquiries */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  Enquiries
                </p>
                <h2 className="text-3xl font-black mt-2">
                  {stats.enquiries || 0}
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaEnvelope className="text-2xl" />
              </div>
            </div>
          </div>

          {/* Pending Fees */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 p-6 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">
                  Pending Fees
                </p>
                <h2 className="text-3xl font-black mt-2">
                  ₹{stats.pendingFees || 0}
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaRupeeSign className="text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200 dark:border-blue-900 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">
              Attendance
            </p>
            <h3 className="text-2xl font-black mt-2 text-slate-800 dark:text-white">
              {stats.attendance || "0%"}
            </h3>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 dark:border-green-900 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-green-600 font-semibold">
              Present Students
            </p>
            <h3 className="text-2xl font-black mt-2 text-green-500">
              {stats.presentStudents || 0}
            </h3>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-200 dark:border-red-900 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-red-600 font-semibold">
              Absent Students
            </p>
            <h3 className="text-2xl font-black mt-2 text-red-500">
              {stats.absentStudents || 0}
            </h3>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-200 dark:border-purple-900 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-purple-600 font-semibold">
              Teachers Present
            </p>
            <h3 className="text-2xl font-black mt-2 text-purple-500">
              {stats.presentTeachers || 0}
            </h3>
          </div>

          <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-200 dark:border-orange-900 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-orange-600 font-semibold">
              Teachers Absent
            </p>
            <h3 className="text-2xl font-black mt-2 text-orange-500">
              {stats.absentTeachers || 0}
            </h3>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-200 dark:border-cyan-900 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-cyan-600 font-semibold">
              Total Teachers
            </p>
            <h3 className="text-2xl font-black mt-2 text-cyan-500">
              {stats.totalTeachers || 0}
            </h3>
          </div>
        </div>

        {/* FEE ANALYTICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 dark:border-green-900 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wide text-green-600 font-semibold">
              Total Collection
            </p>
            <h2 className="text-2xl font-black text-green-600 mt-2">
              ₹{feeAnalytics.totalCollected?.toLocaleString() || 0}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-200 dark:border-red-900 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wide text-red-600 font-semibold">
              Pending Fees
            </p>
            <h2 className="text-2xl font-black text-red-500 mt-2">
              ₹{feeAnalytics.pendingFees?.toLocaleString() || 0}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200 dark:border-blue-900 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">
              Today&apos;s Collection
            </p>
            <h2 className="text-2xl font-black text-blue-600 mt-2">
              ₹{feeAnalytics.todayCollection?.toLocaleString() || 0}
            </h2>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <FeeCollectionChart data={feeAnalytics.monthlyCollection} />
          <AdmissionTrendChart data={admissionTrend} />
        </div>

        {/* QUICK ACTIONS */}
        <QuickActions />

        {/* ANALYTICS + NOTICES */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {classStrength.length > 0 ? (
            <div className="space-y-6">
              <ClassStrengthChart data={classStrength} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TeacherAnalyticsChart data={teacherAnalytics} />
                <AttendanceAnalyticsCard
                  data={attendanceAnalytics}
                  onClick={() => navigate("/admin/attendance")}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-10 text-center shadow-card">
              No class data available
            </div>
          )}

          {/* RECENT NOTICES */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-card p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold dark:text-white">
                Recent Notices
              </h2>
              <button
                onClick={() => navigate("/admin/notices")}
                className="text-blue-600 text-sm font-medium"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {notices.length > 0 ? (
                notices.slice(0, 5).map((notice) => (
                  <div
                    key={notice.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800"
                  >
                    <h3 className="font-medium dark:text-white">
                      {notice.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {notice.date}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-500">No notices available</p>
                  <button
                    onClick={() => navigate("/admin/notices")}
                    className="mt-3 text-blue-600 text-sm"
                  >
                    Create Notice
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITIES */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold dark:text-white">
              Recent Activities
            </h2>
          </div>

          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div
                  key={activity._id}
                  className="flex items-start gap-3 border-b border-slate-100 dark:border-slate-800 pb-3"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <p className="text-sm font-medium dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500">No recent activity found</p>
            )}
          </div>
        </div>

        {/* RECENT ADMISSIONS */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-card overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaHome className="text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Recent Admissions</h2>
                <p className="text-sm text-white/80">
                  Latest student admissions
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/admin/students")}
              className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Class
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Admission Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentAdmissions.length > 0 ? (
                  recentAdmissions.slice(0, 5).map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                            {student.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800 dark:text-white">
                              {student.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {student.className}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
                          {student.className}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {new Date(student.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 text-xs font-medium">
                          Admitted
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-12 text-slate-500"
                    >
                      No Recent Admissions Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default AdminDashboard;
