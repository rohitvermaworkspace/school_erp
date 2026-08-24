import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaLink,
  FaPlus,
  FaSyncAlt,
  FaCheckCircle,
  FaRegSquare,
  FaCheckSquare,
} from "react-icons/fa";

import SchoolPicker from "../../components/superAdmin/SchoolPicker";
import ActionModal from "../../components/superAdmin/ActionModal";
import academicConfigService from "../../services/academicConfigService";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition";

function ClassSubjects() {
  const [schoolId, setSchoolId] = useState("");
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");

  const [assigned, setAssigned] = useState([]);
  const [catalogue, setCatalogue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [newSubject, setNewSubject] = useState("");
  const [removeTarget, setRemoveTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  const fetchAssignment = useCallback(async () => {
    if (!schoolId || !className) return;

    try {
      setLoading(true);
      const res = await academicConfigService.getClassAssignment({
        schoolId,
        className,
      });
      setAssigned(res.data?.assignedSubjects || []);
      setCatalogue(res.data?.availableSubjectNames || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load assignment");
    } finally {
      setLoading(false);
    }
  }, [schoolId, className]);

  useEffect(() => {
    if (!schoolId) {
      setClasses([]);
      setClassName("");
      setAssigned([]);
      setCatalogue([]);
      return;
    }

    academicConfigService
      .getClasses({ schoolId })
      .then((res) => setClasses(res.data || []))
      .catch(() => toast.error("Failed to load classes for this school"))
      .finally(() => setClassName(""));
  }, [schoolId]);

  useEffect(() => {
    fetchAssignment();
    setNewSubject("");
  }, [fetchAssignment]);

  // ---------- toggle / assign ----------
  const isAssigned = (name) =>
    assigned.some(
      (s) => s.subjectName.toLowerCase() === name.toLowerCase() && s.status === "Active"
    );

  const handleToggle = async (name) => {
    const existing = assigned.find(
      (s) => s.subjectName.toLowerCase() === name.toLowerCase()
    );

    if (!existing) {
      try {
        setSaving(true);
        await academicConfigService.assignSubjects({ schoolId, className, subjectNames: [name] });
        toast.success(`"${name}" assigned to ${className}`);
        fetchAssignment();
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to assign subject");
      } finally {
        setSaving(false);
      }
      return;
    }

    setRemoveTarget(existing);
  };

  const confirmRemove = async () => {
    try {
      setBusy(true);
      await academicConfigService.deleteSubject(removeTarget._id);
      toast.success(`"${removeTarget.subjectName}" removed from ${className}`);
      setRemoveTarget(null);
      fetchAssignment();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove subject");
      setRemoveTarget(null);
    } finally {
      setBusy(false);
    }
  };

  const handleAddNew = async (e) => {
    e.preventDefault();
    const name = newSubject.trim();
    if (!name) return;

    try {
      setSaving(true);
      await academicConfigService.assignSubjects({
        schoolId,
        className,
        subjectNames: [name],
      });
      toast.success(`"${name}" added to ${className}`);
      setNewSubject("");
      fetchAssignment();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add subject");
    } finally {
      setSaving(false);
    }
  };

  const inactiveCount = assigned.filter((s) => s.status === "Inactive").length;

  return (
    
      <div className="space-y-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-sm font-medium mb-3">
              Academic Configuration
            </div>
            <h1 className="text-3xl xl:text-4xl font-black">Class Subjects</h1>
            <p className="text-emerald-100 mt-2 max-w-2xl">
              Assign subjects to each class. Changes appear instantly in the School Admin portal — no duplication.
            </p>
          </div>
        </div>

        {/* Pickers */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-card p-5 flex flex-col md:flex-row gap-4 md:items-center">
          <SchoolPicker value={schoolId} onChange={setSchoolId} />
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            disabled={!schoolId}
            className="w-full md:w-72 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-60"
          >
            <option value="">
              {schoolId ? "Select Class" : "Select School first"}
            </option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls.className}>
                {cls.className} - {cls.section}
              </option>
            ))}
          </select>
          {className && (
            <button
              onClick={fetchAssignment}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-2 text-sm font-medium w-fit"
            >
              <FaSyncAlt /> Refresh
            </button>
          )}
        </div>

        {/* Assignment Matrix */}
        {!schoolId || !className ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-card p-16 text-center text-slate-500">
            Select a school and then a class to configure its subjects.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Checklist */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-card overflow-hidden self-start">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <FaLink />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{className}</h2>
                    <p className="text-xs text-white/80">Assigned Subjects</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-semibold">
                  {assigned.filter((s) => s.status === "Active").length} assigned
                </span>
              </div>

              <div className="p-6 space-y-3">
                {loading ? (
                  <p className="text-center py-8 text-slate-500">Loading...</p>
                ) : (
                  <>
                    {[...new Set([...catalogue, ...assigned.map((s) => s.subjectName)])]
                      .sort()
                      .map((name) => {
                        const record = assigned.find(
                          (s) => s.subjectName.toLowerCase() === name.toLowerCase()
                        );
                        const checked = !!record && record.status === "Active";

                        return (
                          <label
                            key={name}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition ${
                              checked
                                ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/40"
                                : "border-gray-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500/40"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              {checked ? (
                                <FaCheckSquare className="text-emerald-600 dark:text-emerald-400 text-lg" />
                              ) : (
                                <FaRegSquare className="text-slate-400 text-lg" />
                              )}
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={checked}
                                disabled={saving || busy}
                                onChange={() => handleToggle(name)}
                              />
                              <span className="font-medium text-slate-800 dark:text-white">
                                {name}
                              </span>
                            </span>

                            <span className="flex items-center gap-2">
                              {checked && (
                                <>
                                  <span className="hidden sm:inline px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                                    {record.subjectCode}
                                  </span>
                                  <FaCheckCircle className="text-emerald-500" />
                                </>
                              )}
                              {record && record.status === "Inactive" && (
                                <span className="px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300 text-[11px] font-semibold">
                                  Inactive
                                </span>
                              )}
                            </span>
                          </label>
                        );
                      })}

                    {/* Add brand-new subject inline */}
                    <form onSubmit={handleAddNew} className="flex gap-3 pt-3 border-t border-gray-100 dark:border-slate-800">
                      <input
                        type="text"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        placeholder="New subject not listed? Type its name..."
                        className={inputClass}
                      />
                      <button
                        type="submit"
                        disabled={!newSubject.trim() || saving}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
                      >
                        <FaPlus /> Add
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-card p-6 self-start">
              <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-4">
                Assignment Summary
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Assigned</dt>
                  <dd className="font-semibold text-slate-800 dark:text-white">
                    {assigned.filter((s) => s.status === "Active").length}
                  </dd>
                </div>
                {inactiveCount > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Inactive</dt>
                    <dd className="font-semibold text-red-500">{inactiveCount}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-slate-500">Subjects in school</dt>
                  <dd className="font-semibold text-slate-800 dark:text-white">
                    {catalogue.length}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-xs leading-relaxed text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                Ticking a subject assigns it to this class immediately; the School
                Admin of this school sees the change on their Classes &amp; Subjects pages.
              </p>
            </div>
          </div>
        )}

        <ActionModal
          isOpen={!!removeTarget}
          tone="warning"
          title="Remove Subject"
          confirmLabel="Remove"
          loading={busy}
          message={
            removeTarget
              ? `Remove "${removeTarget.subjectName}" (${removeTarget.subjectCode}) from ${className}? If marks or results already exist for it, removal is blocked — deactivate it instead.`
              : ""
          }
          onConfirm={confirmRemove}
          onCancel={() => setRemoveTarget(null)}
        />
      </div>
    
  );
}

export default ClassSubjects;
