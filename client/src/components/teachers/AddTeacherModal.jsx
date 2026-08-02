import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  FaChalkboardTeacher,
  FaBook,
  FaPhone,
  FaEnvelope,
  FaUserTie,
} from "react-icons/fa";

function AddTeacherModal({ isOpen, onClose, fetchTeachers }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    classes: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      classes: "",
      experience: "",
    });
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

      await api.post("/teachers", {
        ...formData,
        classes: formData.classes
          .split(",")
          .map((cls) => cls.trim())
          .filter(Boolean),
      });

      toast.success("Teacher added successfully");
      fetchTeachers();
      resetForm();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add teacher");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
              <FaChalkboardTeacher />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Add Teacher</h2>
              <p className="text-white/80 text-sm">Create a new faculty profile</p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Preview */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center text-2xl font-bold">
              {formData.name ? formData.name.charAt(0).toUpperCase() : "T"}
            </div>

            <div>
              <h3 className="font-semibold text-lg dark:text-white">
                {formData.name || "Teacher Name"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {formData.subject || "Subject"}
              </p>
            </div>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium dark:text-gray-300 mb-2 block">
                Teacher Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter teacher name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium dark:text-gray-300 mb-2 block">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="teacher@email.com"
                  required
                  className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium dark:text-gray-300 mb-2 block">
                Phone
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm font-medium dark:text-gray-300 mb-2 block">
                Subject
              </label>
              <div className="relative">
                <FaBook className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Mathematics"
                  className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="text-sm font-medium dark:text-gray-300 mb-2 block">
                Experience
              </label>
              <div className="relative">
                <FaUserTie className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="5"
                  className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Classes */}
            <div>
              <label className="text-sm font-medium dark:text-gray-300 mb-2 block">
                Assigned Classes
              </label>
              <input
                type="text"
                name="classes"
                value={formData.classes}
                onChange={handleChange}
                placeholder="10A,10B,9A"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 dark:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-primary text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeacherModal;