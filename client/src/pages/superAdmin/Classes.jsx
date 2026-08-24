import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaSchool,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaLayerGroup,
} from "react-icons/fa";

import SchoolPicker from "../../components/superAdmin/SchoolPicker";
import ActionModal from "../../components/superAdmin/ActionModal";
import academicConfigService from "../../services/academicConfigService";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition";
const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";

const emptyForm = { className: "", section: "", status: "Active" };

function SuperAdminClasses() {
  const [schoolId, setSchoolId] = useState("");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [statusTarget, setStatusTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  const fetchClasses = useCallback(async () => {
    if (!schoolId) {
      setClasses([]);
      return;
    }
    try {
      setLoading(true);
      const res = await academicConfigService.getClasses({ schoolId });
      setClasses(res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load classes");
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchClasses();
    setSearch("");
  }, [fetchClasses]);

  const filtered = useMemo(
    () =>
      classes.filter(
        (cls) =>
          cls.className?.toLowerCase().includes(search.toLowerCase()) ||
          cls.section?.toLowerCase().includes(search.toLowerCase())
      ),
    [classes, search]
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (cls) => {
    setEditingId(cls._id);
    setForm({
      className: cls.className || "",
      section: cls.section || "",
      classTeacher: cls.classTeacher?._id || "",
      status: cls.status || "Active",
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      if (editingId) {
        await academicConfigService.updateClass(editingId, form);
        toast.success("Class updated successfully");
      } else {
        await academicConfigService.createClass({ ...form, schoolId });
        toast.success("Class created successfully");
      }

      setShowModal(false);
      fetchClasses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save class");
    } finally {
      setSaving(false);
    }
  };

  const confirmToggleStatus = async () => {
    try {
      setBusy(true);
      const res = await academicConfigService.updateClassStatus(
        statusTarget._id,
        statusTarget.status === "Active" ? "Inactive" : "Active"
      );
      toast.success(res.data?.message || "Status updated");
      setStatusTarget(null);
      fetchClasses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setBusy(true);
      await academicConfigService.deleteClass(deleteTarget._id);
      toast.success("Class deleted successfully");
      setDeleteTarget(null);
      fetchClasses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete class");
      setDeleteTarget(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    
      <div className="space-y-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-sm font-medium mb-3">
                Academic Configuration
              </div>
              <h1 className="text-3xl xl:text-4xl font-black">Classes</h1>
              <p className="text-blue-100 mt-2">
                Create and manage school-specific classes across the platform.
              </p>
            </div>
            <button
              onClick={openCreate}
              disabled={!schoolId}
              className="px-6 py-3 rounded-2xl bg-white text-indigo-700 font-semibold shadow-xl hover:scale-105 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPlus /> Add Class
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-card p-5 flex flex-col md:flex-row gap-4 md:items-center">
          <SchoolPicker value={schoolId} onChange={setSchoolId} />
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by class name or section..."
              disabled={!schoolId}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-60"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-card overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <FaLayerGroup />
            </div>
            <div>
              <h2 className="text-lg font-bold">Classes</h2>
              <p className="text-xs text-white/80">
                {schoolId ? `${filtered.length} class(es)` : "Select a school to view its classes"}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {["Class", "Section", "Class Teacher", "Students", "Subjects", "Status", "Actions"].map(
                    (head) => (
                      <th
                        key={head}
                        className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {!schoolId ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-slate-500">
                      Select a school above to manage its classes.
                    </td>
                  </tr>
                ) : loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-slate-500">
                      Loading classes...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-slate-500">
                      No classes found for this school yet.
                    </td>
                  </tr>
                ) : (
                  filtered.map((cls) => (
                    <tr
                      key={cls._id}
                      className="border-b border-gray-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                    >
                      <td className="px-6 py-4 font-medium text-slate-800 dark:text-white">
                        <span className="inline-flex items-center gap-2">
                          <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-bold">
                            {cls.className?.charAt(0)}
                          </span>
                          {cls.className}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                          {cls.section}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm">
                        {cls.classTeacher?.name || (
                          <span className="italic text-slate-400">Not assigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm">
                        {cls.studentCount ?? 0}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm">
                        {cls.subjectCount ?? 0}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            cls.status === "Active"
                              ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300"
                              : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {cls.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            title={cls.status === "Active" ? "Deactivate" : "Activate"}
                            onClick={() => setStatusTarget(cls)}
                            className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center hover:scale-110 transition"
                          >
                            {cls.status === "Active" ? <FaToggleOn /> : <FaToggleOff />}
                          </button>
                          <button
                            title="Edit Class"
                            onClick={() => openEdit(cls)}
                            className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center hover:scale-110 transition"
                          >
                            <FaEdit />
                          </button>
                          <button
                            title="Delete Class"
                            onClick={() => setDeleteTarget(cls)}
                            className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center hover:scale-110 transition"
                          >
                            <FaTrash />
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
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <FaSchool className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {editingId ? "Edit Class" : "Add New Class"}
                    </h2>
                    <p className="text-xs text-white/80 mt-0.5">
                      Configuration applies only to the selected school
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white text-xl leading-none">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className={labelClass}>Class Name *</label>
                  <input
                    type="text"
                    required
                    value={form.className}
                    onChange={(e) => setForm({ ...form, className: e.target.value })}
                    placeholder='e.g. "Class 1" or "Grade 10"'
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Section *</label>
                  <input
                    type="text"
                    required
                    value={form.section}
                    onChange={(e) => setForm({ ...form, section: e.target.value })}
                    placeholder='e.g. "A"'
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
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg disabled:opacity-50 transition"
                  >
                    {saving ? "Saving..." : editingId ? "Update Class" : "Create Class"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Activate / Deactivate confirmation */}
        <ActionModal
          isOpen={!!statusTarget}
          tone={statusTarget?.status === "Active" ? "warning" : "success"}
          title={
            statusTarget?.status === "Active"
              ? "Deactivate Class"
              : "Activate Class"
          }
          confirmLabel={statusTarget?.status === "Active" ? "Deactivate" : "Activate"}
          loading={busy}
          message={
            statusTarget?.status === "Active"
              ? `Deactivate "${statusTarget?.className} - ${statusTarget?.section}"?\n\nThe class will stop appearing in admission forms for this school. Existing students and records are NOT affected.`
              : `Activate "${statusTarget?.className} - ${statusTarget?.section}"? The class will become available again.`
          }
          onConfirm={confirmToggleStatus}
          onCancel={() => setStatusTarget(null)}
        />

        {/* Delete confirmation */}
        <ActionModal
          isOpen={!!deleteTarget}
          title="Delete Class"
          confirmLabel="Delete"
          loading={busy}
          message={`Permanently delete the empty class "${deleteTarget?.className} - ${deleteTarget?.section}"? Deletion is blocked if the class still has students or subjects assigned.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    
  );
}

export default SuperAdminClasses;
