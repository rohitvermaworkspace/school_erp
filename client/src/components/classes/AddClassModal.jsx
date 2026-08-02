import { useEffect, useState } from "react";
import { FaSchool } from "react-icons/fa";
import api from "../../services/api";
import toast from "react-hot-toast";

function AddClassModal({ isOpen, onClose, fetchClasses }) {
  const [formData, setFormData] = useState({
    className: "",
    section: "",
    classTeacher: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isOpen) {
      fetchTeachers();
    }
  }, [isOpen]);
  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teachers");

      setTeachers(res.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load teachers");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post("/classes", formData);
      toast.success("Class added successfully");
      fetchClasses();
      onClose();

      setFormData({
        className: "",
        section: "",
        classTeacher: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create class");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaSchool className="text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Add New Class</h2>
              <p className="text-indigo-100 mt-1">
                Create a new class and assign a class teacher
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Class Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Class Name
              </label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleChange}
                placeholder="e.g. Grade 10"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Section
              </label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="e.g. A"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Teacher */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Class Teacher
            </label>

            <select
              name="classTeacher"
              value={formData.classTeacher}
              onChange={handleChange}
              required
              className="
      w-full
      px-4 py-3
      rounded-xl
      border
      border-gray-200
      dark:border-slate-700
      bg-gray-50
      dark:bg-slate-800
      dark:text-white
      focus:ring-2
      focus:ring-indigo-500
      outline-none
    "
            >
              <option value="">Select Teacher</option>

              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-5 border-t border-gray-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-50 shadow-lg shadow-indigo-500/20"
            >
              {loading ? "Creating..." : "Create Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddClassModal;