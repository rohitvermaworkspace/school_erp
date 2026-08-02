import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaBell } from "react-icons/fa";

function AddNoticeModal({ isOpen, onClose, fetchNotices }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    audience: "all",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      audience: "all",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post("/notices", formData);
      toast.success("Notice added successfully");
      fetchNotices();
      resetForm();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to create notice"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden w-full max-w-2xl shadow-2xl border border-gray-100 dark:border-slate-800">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaBell className="text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Create Notice</h2>
              <p className="text-white/80 text-sm">
                Publish announcements for students, teachers and everyone.
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* TITLE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Notice Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter notice title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition"
            />
          </div>

          {/* AUDIENCE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Target Audience
            </label>
            <select
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition"
            >
              <option value="all">All Audience</option>
              <option value="students">Students</option>
              <option value="teachers">Teachers</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              rows="5"
              placeholder="Write your notice here..."
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white resize-none focus:ring-2 focus:ring-orange-500 outline-none transition"
            />
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-5 border-t border-gray-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Notice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNoticeModal;