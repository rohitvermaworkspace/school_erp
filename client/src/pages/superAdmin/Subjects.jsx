import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBook,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

import SchoolPicker from "../../components/superAdmin/SchoolPicker";
import ActionModal from "../../components/superAdmin/ActionModal";
import academicConfigService from "../../services/academicConfigService";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition";
const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";

const emptyForm = { subjectName: "", subjectCode: "", className: "" };

function SuperAdminSubjects() {
  const [schoolId, setSchoolId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [statusTarget, setStatusTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  const fetchSubjects = useCallback(async () => {
    if (!schoolId) {
      setSubjects([]);
      return;
    }
    try {
      setLoading(true);
      const res = await academicConfigService.getSubjects({ schoolId });
      setSubjects(res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load subjects");
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchSubjects();
    setSearch("");
    setClassFilter("");
  }, [fetchSubjects]);

  const classOptions = useMemo(
    () => [...new Set(subjects.map((s) => s.className).filter(Boolean))].sort(),
    [subjects]
  );

  const filtered = useMemo(
    () =>
      subjects.filter(
        (s) =>
          (s.subjectName?.toLowerCase().includes(search.toLowerCase()) ||
            s.subjectCode?.toLowerCase().includes(search.toLowerCase())) &&
          (!classFilter || s.className === classFilter)
      ),
    [subjects, search, classFilter]
  );

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm, className: classFilter });
    setShowModal(true);
  };

  const openEdit = (subject) => {
    setEditingId(subject._id);
    setForm({
      subjectName: subject.subjectName || "",
      subjectCode: subject.subjectCode || "",
      className: subject.className || "",
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      if (editingId) {
        await academicConfigService.updateSubject(editingId, form);
        toast.success("Subject updated successfully");
      } else {
        await academicConfigService.createSubject({ ...form, schoolId });
        toast.success("Subject created and assigned to the class");
      }

      setShowModal(false);
      fetchSubjects();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save subject");
    } finally {
      setSaving(false);
    }
  };

  const confirmToggleStatus = async () => {
    try {
      setBusy(true);
      const res = await academicConfigService.updateSubjectStatus(
        statusTarget._id,
        statusTarget.status === "Active" ? "Inactive" : "Active"
      );
      toast.success(res.data?.message || "Status updated");
      setStatusTarget(null);
      fetchSubjects();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setBusy(true);
      await academicConfigService.deleteSubject(deleteTarget._id);
      toast.success("Subject deleted successfully");
      setDeleteTarget(null);
      fetchSubjects();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete subject");
      setDeleteTarget(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    
      <div className="space-y-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-sm font-medium mb-3">
                Academic Configuration
              </div>
              <h1 className="text-3xl xl:text-4xl font-black">Subjects</h1>
              <p className="text-purple-100 mt-2">
                Every school has its own subject catalogue — configure them here.
              </p>
            </div>
            <button
              onClick={openCreate}
              disabled={!schoolId}
              className="px-6 py-3 rounded-2xl bg-white text-purple-700 font-semibold shadow-xl hover:scale-105 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPlus /> Add Subject
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-card p-5 flex flex-col md:flex-row gap-4 md:items-center">
          <SchoolPicker value={schoolId} onChange={setSchoolId} />
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            disabled={!schoolId}
            className="w-full md:w-56 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-60"
          >
            <option value="">All Classes</option>
            {classOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by subject name or code..."
              disabled={!schoolId}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-60"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-card overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <FaBook />
            </div>
            <div>
              <h2 className="text-lg font-bold">Subject Catalogue</h2>
              <p className="text-xs text-white/80">
                {schoolId
                  ? `${filtered.length} subject(s)`
                  : "Select a school to view its subjects"}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {["Subject", "Code", "Class", "Teacher", "Status", "Actions"].map(
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
                    <td colSpan="6" className="text-center py-12 text-slate-500">
                      Select a school above to manage its subjects.
                    </td>
                  </tr>
                ) : loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-500">
                      Loading subjects...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-500">
                      No subjects configured for this school yet.
                    </td>
                  </tr>
                ) : (
                  filtered.map((subject) => (
                    <tr
                      key={subject._id}
                      className="border-b border-gray-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800 dark:text-white">
                          {subject.subjectName}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-mono font-semibold">
                          {subject.subjectCode}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                          {subject.className}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm">
                        {subject.teacher?.name || (
                          <span className="italic text-slate-400">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            subject.status === "Active"
                              ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300"
                              : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {subject.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            title={subject.status === "Active" ? "Deactivate" : "Activate"}
                            onClick={() => setStatusTarget(subject)}
                            className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center hover:scale-110 transition"
                          >
                            {subject.status === "Active" ? (
                              <FaToggleOn />
                            ) : (
                              <FaToggleOff />
                            )}
                          </button>
                          <button
                            title="Edit Subject"
                            onClick={() => openEdit(subject)}
                            className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center hover:scale-110 transition"
                          >
                            <FaEdit />
                          </button>
                          <button
                            title="Delete Subject"
                            onClick={() => setDeleteTarget(subject)}
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
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <FaBook className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {editingId ? "Edit Subject" : "Add Subject"}
                    </h2>
                    <p className="text-xs text-white/80 mt-0.5">
                      Leave the code empty to auto-generate one
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white text-xl leading-none">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className={labelClass}>Subject Name *</label>
                  <input
                    type="text"
                    required
                    value={form.subjectName}
                    onChange={(e) => setForm({ ...form, subjectName: e.target.value })}
                    placeholder='e.g. "English"'
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Subject Code</label>
                  <input
                    type="text"
                    value={form.subjectCode}
                    onChange={(e) => setForm({ ...form, subjectCode: e.target.value })}
                    placeholder="Auto-generated if left blank"
                    className={`${inputClass} uppercase`}
                  />
                </div>

                <div>
                  <label className={labelClass}>Class *</label>
                  <input
                    type="text"
                    required
                    list="super-admin-class-options"
                    value={form.className}
                    onChange={(e) => setForm({ ...form, className: e.target.value })}
                    placeholder='e.g. "Class 1"'
                    className={inputClass}
                  />
                  <datalist id="super-admin-class-options">
                    {classOptions.map((name) => (
                      <option key={name} value={name} />
                    ))}
                  </datalist>
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
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg disabled:opacity-50 transition"
                  >
                    {saving ? "Saving..." : editingId ? "Update Subject" : "Create Subject"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ActionModal
          isOpen={!!statusTarget}
          tone={statusTarget?.status === "Active" ? "warning" : "success"}
          title={statusTarget?.status === "Active" ? "Deactivate Subject" : "Activate Subject"}
          confirmLabel={statusTarget?.status === "Active" ? "Deactivate" : "Activate"}
          loading={busy}
          message={
            statusTarget?.status === "Active"
              ? `Deactivate "${statusTarget?.subjectName}" for ${statusTarget?.className}? Existing marks and results are kept.`
              : `Activate "${statusTarget?.subjectName}" for ${statusTarget?.className}?`
          }
          onConfirm={confirmToggleStatus}
          onCancel={() => setStatusTarget(null)}
        />

        <ActionModal
          isOpen={!!deleteTarget}
          title="Delete Subject"
          confirmLabel="Delete"
          loading={busy}
          message={`Remove "${deleteTarget?.subjectName}" from ${deleteTarget?.className}? Deletion is blocked when marks or results already reference this subject — deactivate it instead.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    
  );
}

export default SuperAdminSubjects;
