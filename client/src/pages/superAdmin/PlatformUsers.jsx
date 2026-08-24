import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaUsers,
  FaSearch,
  FaToggleOn,
  FaToggleOff,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import SchoolPicker from "../../components/superAdmin/SchoolPicker";
import ActionModal from "../../components/superAdmin/ActionModal";
import platformService from "../../services/platformService";

const roleBadge = {
  super_admin: "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300",
  admin: "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300",
  teacher: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  student: "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300",
};

function PlatformUsers() {
  const [data, setData] = useState({ users: [], total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [schoolId, setSchoolId] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const [statusTarget, setStatusTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await platformService.getPlatformUsers({
        page,
        limit: 10,
        schoolId: schoolId || undefined,
        role: role || undefined,
        status: status || undefined,
        search: search || undefined,
      });
      setData(res.data || { users: [], total: 0, totalPages: 1 });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [page, schoolId, role, status]);

  // Debounce the free-text search so we don't hammer the API per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => fetchUsers(), 350);
    return () => clearTimeout(timer);
  }, [fetchUsers, search]);

  useEffect(() => setPage(1), [schoolId, role, status, search]);

  const confirmToggleStatus = async () => {
    try {
      setBusy(true);
      const res = await platformService.updateUserStatus(
        statusTarget._id,
        statusTarget.status === "Active" ? "Inactive" : "Active"
      );
      toast.success(res.data?.message || "Status updated");
      setStatusTarget(null);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
      setStatusTarget(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    
      <div className="space-y-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-sm font-medium mb-3">
                Platform Administration
              </div>
              <h1 className="text-3xl xl:text-4xl font-black">Platform Users</h1>
              <p className="text-slate-300 mt-2">
                {data.total} user(s) across all registered schools.
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <FaUsers className="text-3xl" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-card p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <SchoolPicker value={schoolId} onChange={setSchoolId} />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
          >
            <option value="">All Roles</option>
            <option value="admin">School Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {["User", "Role", "School", "Status", "Joined", "Actions"].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-500">
                      Loading users...
                    </td>
                  </tr>
                ) : data.users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-500">
                      No users match these filters.
                    </td>
                  </tr>
                ) : (
                  data.users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold">
                            {user.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800 dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-xs text-slate-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            roleBadge[user.role] ||
                            "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {user.role.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {user.schoolId ? (
                          <>
                            {user.schoolId.name}
                            <span className="block text-[11px] font-mono text-slate-400">
                              {user.schoolId.code}
                            </span>
                          </>
                        ) : (
                          <span className="italic text-slate-400">Platform</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === "Active"
                              ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300"
                              : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        {user.role === "super_admin" ? (
                          <span className="text-xs italic text-slate-400">Protected</span>
                        ) : (
                          <button
                            title={user.status === "Active" ? "Deactivate" : "Activate"}
                            onClick={() => setStatusTarget(user)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center hover:scale-110 transition ${
                              user.status === "Active"
                                ? "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400"
                                : "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            }`}
                          >
                            {user.status === "Active" ? <FaToggleOff /> : <FaToggleOn />}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-slate-800">
              <p className="text-sm text-slate-500">
                Page {page} of {data.totalPages} · {data.total} users
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page <= 1}
                  className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1 text-sm"
                >
                  <FaChevronLeft /> Prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, data.totalPages))}
                  disabled={page >= data.totalPages}
                  className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1 text-sm"
                >
                  Next <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>

        <ActionModal
          isOpen={!!statusTarget}
          tone={statusTarget?.status === "Active" ? "warning" : "success"}
          title={
            statusTarget?.status === "Active"
              ? "Deactivate User"
              : "Activate User"
          }
          confirmLabel={statusTarget?.status === "Active" ? "Deactivate" : "Activate"}
          loading={busy}
          message={
            statusTarget?.status === "Active"
              ? `Deactivate "${statusTarget?.name}" (${statusTarget?.email})?\n\nThey will no longer be able to log in. Their records are NOT deleted.`
              : `Re-activate "${statusTarget?.name}"? They will be able to log in again.`
          }
          onConfirm={confirmToggleStatus}
          onCancel={() => setStatusTarget(null)}
        />
      </div>
    
  );
}

export default PlatformUsers;
