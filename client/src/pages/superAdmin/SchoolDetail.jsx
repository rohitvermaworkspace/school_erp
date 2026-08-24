import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import platformService from "../../services/platformService";
import ActionModal from "../../components/superAdmin/ActionModal";
import {
  FaSchool,
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaBan,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaBookOpen,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition";
const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";

const emptyForm = {
  name: "",
  code: "",
  board: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "",
  academicYear: "",
  principalName: "",
};

function SchoolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [statusAction, setStatusAction] = useState(null); // "Active" | "Inactive"
  const [showDelete, setShowDelete] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [busy, setBusy] = useState(false);

  const fetchSchool = async () => {
    try {
      const res = await platformService.getSchoolById(id);
      setSchool(res.data);
    } catch (err) {
      console.error("Failed to fetch school:", err);
      setSchool(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchool();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const openEdit = () => {
    setForm({
      name: school.name || "",
      code: school.code || "",
      board: school.board || "",
      email: school.email || "",
      phone: school.phone || "",
      address: school.address || "",
      city: school.city || "",
      state: school.state || "",
      country: school.country || "",
      academicYear: school.academicYear || "",
      principalName: school.principalName || "",
    });
    setShowEdit(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await platformService.updateSchool(school._id, form);
      toast.success("School updated successfully");
      setShowEdit(false);
      fetchSchool();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update school");
    } finally {
      setSaving(false);
    }
  };

  const confirmStatusChange = async () => {
    try {
      setBusy(true);
      const res = await platformService.updateSchoolStatus(
        school._id,
        statusAction
      );
      toast.success(res.data?.message || "Status updated");
      setStatusAction(null);
      fetchSchool();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setBusy(true);
      const res = await platformService.deleteSchool(school._id);
      toast.success(res.data?.message || "School deleted permanently");
      navigate("/super-admin/schools");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete school");
      setShowDelete(false);
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-500 dark:text-slate-400">Loading school details...</div>
        </div>
      
    );
  }

  if (!school) {
    return (
      
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-500 dark:text-slate-400">School not found</div>
        </div>
      
    );
  }

  const users = school.users || [];
  const isActive = school.status === "Active";

  return (
    
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
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
                  {school.board ? ` · ${school.board}` : ""}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate("/super-admin/schools")}
                className="px-5 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition font-medium flex items-center gap-2"
              >
                <FaArrowLeft /> Back to Schools
              </button>

              <button
                onClick={() => setStatusAction(isActive ? "Inactive" : "Active")}
                className={`px-5 py-2.5 rounded-2xl font-semibold shadow-lg transition flex items-center gap-2 text-white ${
                  isActive
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isActive ? <FaToggleOff /> : <FaToggleOn />}
                {isActive ? "Deactivate School" : "Activate School"}
              </button>

              <button
                onClick={openEdit}
                className="px-5 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition font-medium flex items-center gap-2"
              >
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => {
                  setDeleteConfirmText("");
                  setShowDelete(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-slate-900/60 border border-red-400/40 text-red-200 hover:bg-red-600 hover:text-white transition font-medium flex items-center gap-2"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        </div>

        {/* Deactivated banner */}
        {!isActive && (
          <div className="rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 p-4 text-sm text-red-700 dark:text-red-300 flex items-center gap-3">
            <FaBan className="text-lg shrink-0" />
            This school is currently <strong>deactivated</strong>. Its admins, teachers and
            students cannot log in or use the system until it is activated again. No data is lost.
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            { label: "Total Users", value: school.userCount || users.length, icon: FaUsers, grad: "from-blue-500 to-cyan-500" },
            { label: "Teachers", value: school.teacherCount || 0, icon: FaChalkboardTeacher, grad: "from-violet-500 to-purple-600" },
            { label: "Students", value: school.studentCount || 0, icon: FaGraduationCap, grad: "from-amber-500 to-orange-600" },
            { label: "Classes", value: school.classCount || 0, icon: FaBookOpen, grad: "from-rose-500 to-pink-600" },
          ].map(({ label, value, icon: Icon, grad }) => (
            <div key={label} className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${grad} p-6 text-white shadow-lg`}>
              <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{label}</p>
                  <h2 className="text-3xl font-black mt-2">{value}</h2>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Icon className="text-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* School Info + Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Details Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-card p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">
              School Information
            </h2>

            <div className="space-y-4">
              {[
                { icon: FaSchool, chip: "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400", label: "School Name", value: school.name },
                { icon: FaEnvelope, chip: "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400", label: "Email", value: school.email },
                { icon: FaPhone, chip: "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400", label: "Phone", value: school.phone },
                {
                  icon: FaMapMarkerAlt,
                  chip: "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400",
                  label: "Address",
                  value:
                    school.address
                      ? `${school.address}${school.city ? `, ${school.city}` : ""}${school.state ? `, ${school.state}` : ""}${school.country ? `, ${school.country}` : ""}`
                      : "",
                },
                { icon: FaBookOpen, chip: "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400", label: "Board", value: school.board },
                { icon: FaSchool, chip: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300", label: "Academic Year", value: school.academicYear },
              ]
                .filter((row) => row.value)
                .map(({ icon: Icon, chip, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${chip}`}>
                      <Icon />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="font-medium text-slate-800 dark:text-white">{value}</p>
                    </div>
                  </div>
                ))}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  {isActive ? (
                    <FaCheckCircle className="text-green-600 dark:text-green-400" />
                  ) : (
                    <FaBan className="text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-slate-500">Status</p>
                  <span
                    className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold ${
                      isActive
                        ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300"
                        : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {school.status}
                  </span>
                </div>
              </div>
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

        {/* Edit Modal */}
        {showEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-gray-100 dark:border-slate-800 my-8">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <FaEdit className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Edit School</h2>
                    <p className="text-xs text-white/80 mt-0.5">
                      Only the fields below are changed — all other data stays untouched
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowEdit(false)} className="text-white/80 hover:text-white text-xl leading-none">✕</button>
              </div>

              <form onSubmit={handleSave} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className={labelClass}>School Name *</label>
                  <input type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter school name" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>School Code *</label>
                  <input type="text" required value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    placeholder="Unique login code, e.g. ABPS01" className={`${inputClass} uppercase`} />
                </div>
                <div>
                  <label className={labelClass}>Board</label>
                  <input type="text" list="school-board-options" value={form.board}
                    onChange={(e) => setForm({ ...form, board: e.target.value })}
                    placeholder='e.g. "CBSE"' className={inputClass} />
                  <datalist id="school-board-options">
                    {["CBSE", "ICSE", "State Board", "IB"].map((b) => (
                      <option key={b} value={b} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className={labelClass}>Academic Year</label>
                  <input type="text" value={form.academicYear}
                    onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
                    placeholder='e.g. "2026-2027"' className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="school@example.com" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Contact Number *</label>
                  <input type="tel" required value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 9876543210" className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Address</label>
                  <input type="text" value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Enter school address" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>City</label>
                  <input type="text" value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Enter city" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>State</label>
                  <input type="text" value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    placeholder="Enter state" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Country</label>
                  <input type="text" value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    placeholder="Enter country" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Principal Name</label>
                  <input type="text" value={form.principalName}
                    onChange={(e) => setForm({ ...form, principalName: e.target.value })}
                    placeholder="Enter principal name" className={inputClass} />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowEdit(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg disabled:opacity-50 transition"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Activate / Deactivate confirmation */}
        <ActionModal
          isOpen={!!statusAction}
          tone={statusAction === "Inactive" ? "warning" : "success"}
          title={statusAction === "Inactive" ? "Deactivate School" : "Activate School"}
          confirmLabel={statusAction === "Inactive" ? "Deactivate" : "Activate"}
          loading={busy}
          message={
            statusAction === "Inactive"
              ? `Deactivate "${school.name}"?\n\nAll of its admins, teachers and students will be blocked from logging in and using the system until you activate it again.\n\nNo data will be deleted.`
              : `Activate "${school.name}"?\n\nIts staff and students will regain full access immediately.`
          }
          onConfirm={confirmStatusChange}
          onCancel={() => setStatusAction(null)}
        />

        {/* Delete confirmation with typed safety phrase */}
        {showDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-gray-100 dark:border-slate-800">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                      <FaTrash />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Delete School Permanently</h2>
                      <p className="text-white/80 text-sm">This action cannot be undone</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Deleting <strong>"{school.name}"</strong> permanently removes{" "}
                    <strong>{school.userCount || users.length} user account(s)</strong>,{" "}
                    <strong>{school.studentCount || 0} student record(s)</strong>,{" "}
                    <strong>{school.teacherCount || 0} teacher record(s)</strong>, classes,
                    subjects, attendance, fees, marks, results and every other record belonging
                    to this school.
                  </p>
                  <p className="mt-3 text-sm text-red-600 dark:text-red-300 font-medium">
                    Consider deactivating the school instead — deactivation blocks access while
                    keeping all data.
                  </p>

                  <label className={`${labelClass} mt-5`}>
                    Type <strong>DELETE {school.code}</strong> to confirm
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder={`DELETE ${school.code}`}
                    className={inputClass}
                  />

                  <div className="mt-8 flex justify-end gap-3">
                    <button
                      onClick={() => setShowDelete(false)}
                      disabled={busy}
                      className="px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      disabled={
                        busy ||
                        deleteConfirmText.trim().toUpperCase() !==
                          `DELETE ${school.code}`
                      }
                      className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {busy ? "Deleting..." : "Delete Forever"}
                    </button>
                  </div>
                 </div>
               </div>
             </div>
           )}
       </div>
     
   );
 }

export default SchoolDetail;
