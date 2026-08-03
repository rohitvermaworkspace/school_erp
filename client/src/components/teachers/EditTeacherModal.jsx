import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  FaUserEdit,
  FaUserTie,
  FaPhone,
  FaBook,
  FaBriefcase,
} from "react-icons/fa";

function EditTeacherModal({
  isOpen,
  onClose,
  teacher,
  fetchTeachers,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    experience: "",
    classes: [],
  });

  const [loading, setLoading] = useState(false);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [showClassDropdown, setShowClassDropdown] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchClasses();
    }
  }, [isOpen]);

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name || "",
        email: teacher.email || "",
        phone: teacher.phone || "",
        subject: teacher.subject || "",
        experience: teacher.experience || "",
        classes: teacher.classes || [],
      });
    }
  }, [teacher]);

  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes");
      const classList = res.data.map(
        (cls) => `${cls.className}${cls.section}`
      );
      setAvailableClasses([...new Set(classList)]);
    } catch (err) {
      console.error("Failed to fetch classes:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClassToggle = (cls) => {
    setFormData((prev) => {
      const selected = prev.classes.includes(cls)
        ? prev.classes.filter((c) => c !== cls)
        : [...prev.classes, cls];
      return { ...prev, classes: selected };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(
        `/teachers/${teacher._id}`,
        formData
      );

      toast.success("Teacher updated successfully");
      fetchTeachers();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update teacher"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !teacher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-800">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FaUserEdit />
                Edit Teacher
              </h2>
              <p className="text-white/80 mt-1 text-sm">
                Update teacher profile information
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Teacher Preview */}
          <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold">
                {formData.name?.charAt(0)?.toUpperCase() || (
                  <FaUserTie />
                )}
              </div>

              <div>
                <h4 className="font-semibold dark:text-white">
                  {formData.name || "Teacher Name"}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formData.subject || "Subject"}
                </p>
              </div>
            </div>
          </div>

          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Teacher Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter teacher name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="teacher@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Phone + Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Phone Number
              </label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Subject
              </label>
              <div className="relative">
                <FaBook className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Mathematics"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Experience + Classes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Experience (Years)
              </label>
              <div className="relative">
                <FaBriefcase className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="5"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Assigned Classes
              </label>
              <button
                type="button"
                onClick={() => setShowClassDropdown(!showClassDropdown)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white text-left flex items-center justify-between focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <span className={formData.classes.length ? "" : "text-gray-400"}>
                  {formData.classes.length
                    ? formData.classes.join(", ")
                    : "Select classes"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showClassDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showClassDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {availableClasses.length > 0 ? (
                    availableClasses.map((cls) => (
                      <label
                        key={cls}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.classes.includes(cls)}
                          onChange={() => handleClassToggle(cls)}
                          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="dark:text-white">{cls}</span>
                      </label>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 text-sm">
                      No classes found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTeacherModal;