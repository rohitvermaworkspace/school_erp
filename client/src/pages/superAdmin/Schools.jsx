import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import schoolService from "../../services/schoolService";
import SuperAdminLayout from "./SuperAdminLayout";
import { FaSchool, FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Schools = () => {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const res = await schoolService.getSchools();
      setSchools(res.data);
    } catch (err) {
      console.error("Failed to fetch schools:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this school? This action cannot be undone.")) {
      return;
    }

    try {
      await schoolService.deleteSchool(id);
      setSchools(schools.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete school:", err);
      alert("Failed to delete school");
    }
  };

  const filteredSchools = schools.filter(
    (school) =>
      school.name?.toLowerCase().includes(search.toLowerCase()) ||
      school.code?.toLowerCase().includes(search.toLowerCase()) ||
      school.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-4">
                School Management
              </div>
              <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight">
                Schools
              </h1>
              <p className="text-blue-100 text-lg mt-3 max-w-2xl">
                Manage all registered schools on the platform.
              </p>

              <div className="flex flex-wrap gap-6 mt-6 text-white">
                <div>
                  <p className="text-blue-200 text-sm">Total Schools</p>
                  <h3 className="text-2xl font-bold">{schools.length}</h3>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/super-admin/schools/create")}
              className="px-6 py-3 rounded-2xl bg-white text-indigo-700 font-semibold shadow-xl hover:scale-105 transition flex items-center gap-2"
            >
              <FaPlus /> Add School
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col lg:flex-row gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by school name, code, or email..."
            className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white"
          />
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-card overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaSchool className="text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">School Directory</h2>
                <p className="text-sm text-white/80">All registered schools</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Code
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Users
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Teachers
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Students
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Classes
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="text-center py-12 text-slate-500">
                      Loading...
                    </td>
                  </tr>
                ) : filteredSchools.length > 0 ? (
                  filteredSchools.map((school) => (
                    <tr
                      key={school._id}
                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                            {school.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <p className="font-medium text-slate-800 dark:text-white">
                            {school.name}
                          </p>
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
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {school.phone}
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
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {school.userCount || 0}
                      </td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {school.teacherCount || 0}
                      </td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {school.studentCount || 0}
                      </td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {school.classCount || 0}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/super-admin/schools/${school._id}`)}
                            className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-500/30 transition"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => navigate(`/super-admin/schools/${school._id}`)}
                            className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center hover:bg-amber-200 dark:hover:bg-amber-500/30 transition"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(school._id)}
                            className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-500/30 transition"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center py-12 text-slate-500">
                      No schools found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default Schools;
