import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import schoolService from "../../services/schoolService";
import SuperAdminLayout from "./SuperAdminLayout";
import {
  FaSchool,
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaBan,
  FaUser,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaBookOpen,
} from "react-icons/fa";

const SchoolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchool();
  }, [id]);

  const fetchSchool = async () => {
    try {
      const res = await schoolService.getSchoolById(id);
      setSchool(res.data);
    } catch (err) {
      console.error("Failed to fetch school:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SuperAdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-500 dark:text-slate-400">Loading school details...</div>
        </div>
      </SuperAdminLayout>
    );
  }

  if (!school) {
    return (
      <SuperAdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-500 dark:text-slate-400">School not found</div>
        </div>
      </SuperAdminLayout>
    );
  }

  const users = school.users || [];
  const roleBreakdown = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaSchool className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl xl:text-4xl font-black text-white leading-tight">
                  {school.name}
                </h1>
                <p className="text-purple-100 text-lg mt-1">
                  School Code: {school.code}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/super-admin/schools")}
              className="px-6 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition font-medium flex items-center gap-2"
            >
              <FaArrowLeft /> Back to Schools
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Users</p>
                <h2 className="text-3xl font-black mt-2">{school.userCount || users.length}</h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaUsers className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Teachers</p>
                <h2 className="text-3xl font-black mt-2">{school.teacherCount || 0}</h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaChalkboardTeacher className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">Students</p>
                <h2 className="text-3xl font-black mt-2">{school.studentCount || 0}</h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaGraduationCap className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 p-6 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rose-100 text-sm font-medium">Classes</p>
                <h2 className="text-3xl font-black mt-2">{school.classCount || 0}</h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaBookOpen className="text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* School Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Details Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-card p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">
              School Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                  <FaSchool className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">School Name</p>
                  <p className="font-medium text-slate-800 dark:text-white">{school.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                  <FaEnvelope className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="font-medium text-slate-800 dark:text-white">{school.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                  <FaPhone className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="font-medium text-slate-800 dark:text-white">{school.phone}</p>
                </div>
              </div>

              {school.address && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Address</p>
                    <p className="font-medium text-slate-800 dark:text-white">
                      {school.address}
                      {school.city && `, ${school.city}`}
                      {school.state && `, ${school.state}`}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  {school.status === "Active" ? (
                    <FaCheckCircle className="text-green-600 dark:text-green-400" />
                  ) : (
                    <FaBan className="text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-slate-500">Status</p>
                  <p className="font-medium text-slate-800 dark:text-white capitalize">
                    {school.status}
                  </p>
                </div>
              </div>

              {school.plan && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                    <FaSchool className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Plan</p>
                    <p className="font-medium text-slate-800 dark:text-white capitalize">
                      {school.plan}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Users List */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-card p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">
              Users ({users.length})
            </h2>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-medium capitalize">
                      {user.role}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-500">No users found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default SchoolDetail;
