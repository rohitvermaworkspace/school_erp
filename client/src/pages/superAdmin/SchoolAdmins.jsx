import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaUserShield,
  FaPlus,
  FaSearch,
  FaEdit,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

import ActionModal from "../../components/superAdmin/ActionModal";
import platformService from "../../services/platformService";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition";
const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  schoolId: "",
};

function SchoolAdmins() {
  const [admins, setAdmins] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [statusTarget, setStatusTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [adminsRes, schoolsRes] = await Promise.all([
        platformService.getSchoolAdmins(),
        platformService.getSchools(),
      ]);
      setAdmins(adminsRes.data || []);
      setSchools(schoolsRes.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load school admins");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered = useMemo(
    () =>
      admins.filter(
        (admin) =>
          (!statusFilter || admin.status === statusFilter) &&
          (admin.name?.toLowerCase().includes(search.toLowerCase()) ||
            admin.email?.toLowerCase().includes(search.toLowerCase()) ||
            admin.schoolId?.name?.toLowerCase().includes(search.toLowerCase()))
      ),
    [admins, search, statusFilter]
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (admin) => {
    setEditingId(admin._id);
    setForm({
      name: admin.name || "",
      email: admin.email || "",
      password: "",
      phone: admin.phone || "",
      schoolId: admin.schoolId?._id || "",
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (String(form.password).length > 0 && String(form.password).length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        await platformService.updateSchoolAdmin(editingId, payload);
        toast.success("School admin updated successfully");
      } else {
        await platformService.createSchoolAdmin(form);
        toast.success("School admin created successfully");
      }

      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save school admin");
    } finally {
      setSaving(false);
    }
  };

  const confirmToggleStatus = async () => {
    try {
      setBusy(true);
      const res = await platformService.updateSchoolAdminStatus(
        statusTarget._id,
        statusTarget.status === "Active" ? "Inactive" : "Active"
      );
      toast.success(res.data?.message || "Status updated");
      setStatusTarget(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setBusy(false);
    }
  };

  return (
    
      <div className="space-y-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-amber-600 to-yellow-600 p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-sm font-medium mb-3">
                Platform Administration
              </div>
              <h1 className="text-3xl xl:text-4xl font-black">School Admins</h1>
              <p className="text-amber-100 mt-2 max-w-2xl">
                Every administrator belongs to exactly one school and can only manage that school.
              </p>
            </div>
            <button
              onClick={openCreate}
              className="px-6 py-3 rounded-2xl bg-white text-amber-700 font-semibold shadow-xl hover:scale-105 transition flex items-center gap-2"
            >
              <FaPlus /> Add School Admin
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-card p-5 flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or school..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-48 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-card overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4 flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <FaUserShield />
            </div>
            <div>
              <h2 className="text-lg font-bold">Administrator Directory</h2>
              <p className="text-xs text-white/80">{filtered.length} admin(s)</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {["Name", "Email", "School", "Status", "Joined", "Actions"].map((head) => (
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
                      Loading...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-500">
                      No school admins found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((admin) => (
                    <tr
                      key={admin._id}
                      className="border-b border-gray-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white flex items-center justify-center font-semibold">
                            {admin.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <p className="font-medium text-slate-800 dark:text-white">
                            {admin.name}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm">
                        {admin.email}
                        {admin.phone && (
                          <span className="block text-xs text-slate-400">{admin.phone}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {admin.schoolId ? (
                          <div>
                            <p className="text-sm font-medium text-slate-800 dark:text-white">
                              {admin.schoolId.name}
                            </p>
                            <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-[11px] font-mono">
                              {admin.schoolId.code}
                            </span>
                          </div>
                        ) : (
                          <span className="italic text-slate-400 text-sm">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            admin.status === "Active"
                              ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300"
                              : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {admin.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {new Date(admin.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            title={admin.status === "Active" ? "Deactivate" : "Activate"}
                            onClick={() => setStatusTarget(admin)}
                            className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center hover:scale-110 transition"
                          >
                            {admin.status === "Active" ? <FaToggleOn /> : <FaToggleOff />}
                          </button>
                          <button
                            title="Edit School Admin"
                            onClick={() => openEdit(admin)}
                            className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:scale-110 transition"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add / Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-gray-100 dark:border-slate-800 my-8">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <FaUserShield className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {editingId ? "Edit School Admin" : "Add School Admin"}
                    </h2>
                    <p className="text-xs text-white/80 mt-0.5">
                      The admin will only see the assigned school's data
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white text-xl leading-none">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder='e.g. "Rajesh Kumar"'
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="admin@school.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Assign to School *</label>
                  <select
                    required
                    value={form.schoolId}
                    onChange={(e) => setForm({ ...form, schoolId: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select School</option>
                    {schools.map((school) => (
                      <option key={school._id} value={school._id}>
                        {school.name} ({school.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    {editingId ? "New Password (leave blank to keep current)" : "Password *"}
                  </label>
                  <input
                    type="password"
                    required={!editingId}
                    minLength={editingId ? undefined : 6}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder={editingId ? "••••••••" : "Min. 6 characters"}
                    className={inputClass}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold shadow-lg disabled:opacity-50 transition"
                  >
                    {saving
                      ? "Saving..."
                      : editingId
                        ? "Update Admin"
                        : "Create Admin"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ActionModal
          isOpen={!!statusTarget}
          tone={statusTarget?.status === "Active" ? "warning" : "success"}
          title={
            statusTarget?.status === "Active"
              ? "Deactivate School Admin"
              : "Activate School Admin"
          }
          confirmLabel={statusTarget?.status === "Active" ? "Deactivate" : "Activate"}
          loading={busy}
          message={
            statusTarget?.status === "Active"
              ? `Deactivate "${statusTarget?.name}" (${statusTarget?.email})?\n\nThey will no longer be able to log in or manage "${statusTarget?.schoolId?.name}". Their data is NOT deleted.`
              : `Re-activate "${statusTarget?.name}"? They will be able to log in again.`
          }
          onConfirm={confirmToggleStatus}
          onCancel={() => setStatusTarget(null)}
        />
      </div>
    
  );
}

export default SchoolAdmins;
