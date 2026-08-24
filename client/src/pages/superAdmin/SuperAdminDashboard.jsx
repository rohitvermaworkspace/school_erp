import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import platformService from "../../services/platformService";
import {
  FaSchool,
  FaUsers,
  FaCheckCircle,
  FaBan,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaBookOpen,
  FaUserShield,
} from "react-icons/fa";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [totals, setTotals] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schoolsRes, statsRes] = await Promise.all([
          platformService.getSchools(),
          platformService.getPlatformStats(),
        ]);
        setSchools(schoolsRes.data || []);
        setTotals(statsRes.data?.totals || null);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalSchools = totals?.schools ?? schools.length;
  const totalUsers = schools.reduce((acc, school) => acc + (school.userCount || 0), 0);
  const totalTeachers = totals?.teachers ?? schools.reduce((acc, school) => acc + (school.teacherCount || 0), 0);
  const totalStudents = totals?.students ?? schools.reduce((acc, school) => acc + (school.studentCount || 0), 0);
  const totalClasses = schools.reduce((acc, school) => acc + (school.classCount || 0), 0);
  const activeSchools = totals?.activeSchools ?? schools.filter((s) => s.status === "Active").length;
  const inactiveSchools = totals?.inactiveSchools ?? (totalSchools - activeSchools);
  const totalSchoolAdmins = totals?.schoolAdmins ?? 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500 dark:text-slate-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-4">
            Platform Administration
          </div>
          <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight">
            Platform Dashboard
          </h1>
          <p className="text-purple-100 text-lg mt-3 max-w-2xl">
            Manage all schools, users, and platform-wide settings from a central hub.
          </p>

          <div className="flex flex-wrap gap-6 mt-6 text-white">
            <div>
              <p className="text-purple-200 text-sm">Total Schools</p>
              <h3 className="text-2xl font-bold">{totalSchools}</h3>
            </div>
            <div>
              <p className="text-purple-200 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold">{totalUsers}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Schools */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Schools</p>
              <h2 className="text-3xl font-black mt-2">{totalSchools}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <FaSchool className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Users</p>
              <h2 className="text-3xl font-black mt-2">{totalUsers}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <FaUsers className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Total Teachers */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Teachers</p>
              <h2 className="text-3xl font-black mt-2">{totalTeachers}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <FaChalkboardTeacher className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Total Students */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium">Total Students</p>
              <h2 className="text-3xl font-black mt-2">{totalStudents}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <FaGraduationCap className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Classes */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-rose-100 text-sm font-medium">Total Classes</p>
              <h2 className="text-3xl font-black mt-2">{totalClasses}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <FaBookOpen className="text-2xl" />
            </div>
          </div>
        </div>

        {/* School Admins */}
        <button
          onClick={() => navigate("/super-admin/school-admins")}
          className="text-left relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 p-6 text-white shadow-lg hover:scale-[1.02] transition"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium">School Admins</p>
              <h2 className="text-3xl font-black mt-2">{totalSchoolAdmins}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <FaUserShield className="text-2xl" />
            </div>
          </div>
        </button>

        {/* Active Schools */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm font-medium">Active Schools</p>
              <h2 className="text-3xl font-black mt-2">{activeSchools}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <FaCheckCircle className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Inactive Schools */}
        <button
          onClick={() => navigate("/super-admin/schools")}
          className="text-left relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 p-6 text-white shadow-lg hover:scale-[1.02] transition"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Inactive Schools</p>
              <h2 className="text-3xl font-black mt-2">{inactiveSchools}</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <FaBan className="text-2xl" />
            </div>
          </div>
        </button>
      </div>

      {/* Recent Schools */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-card overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
          <div className="flex items-center gap-3 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaSchool className="text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Recent Schools</h2>
              <p className="text-sm text-white/80">Latest registered schools</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  School
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {schools.length > 0 ? (
                schools.slice(0, 5).map((school) => (
                  <tr
                    key={school._id}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                          {school.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">
                            {school.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
                        {school.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {school.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          school.status === "Active"
                            ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300"
                            : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300"
                        }`}
                      >
                        {school.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-slate-500">
                    No schools found
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

export default SuperAdminDashboard;
