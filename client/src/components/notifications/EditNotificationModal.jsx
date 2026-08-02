import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import {
  FaBell,
  FaTag,
  FaUsers,
  FaFlag,
  FaCalendarAlt,
} from "react-icons/fa";

function EditNotificationModal({
  notification,
  onClose,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    title: notification.title || "",
    message: notification.message || "",
    category: notification.category || "GENERAL",
    audience: notification.audience || "ALL",
    priority: notification.priority || "MEDIUM",
    publishDate: notification.publishDate ? notification.publishDate.substring(0, 10) : "",
    expiryDate: notification.expiryDate ? notification.expiryDate.substring(0, 10) : "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/notifications/${notification._id}`, formData);
      toast.success("Notification updated successfully");
      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update notification");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5 text-white">
          <h2 className="text-2xl font-bold">Edit Notification</h2>
          <p className="text-sm text-white/80">Update school announcement</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Title */}
          <div>
            <label className="text-sm font-medium mb-2 block dark:text-white">Title</label>
            <div className="relative">
              <FaBell className="absolute left-4 top-4 text-slate-400" />
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-medium mb-2 block dark:text-white">Message</label>
            <textarea
              rows="4"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white p-4"
              required
            />
          </div>

          {/* Configuration Dropdowns Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Category */}
            <div>
              <label className="text-sm font-medium mb-2 block dark:text-white">Category</label>
              <div className="relative">
                <FaTag className="absolute left-4 top-4 text-slate-400" />
                <select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full pl-12 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white"
                >
                  <option value="GENERAL">General</option>
                  <option value="EXAM">Exam</option>
                  <option value="EVENT">Event</option>
                  <option value="HOLIDAY">Holiday</option>
                </select>
              </div>
            </div>

            {/* Audience */}
            <div>
              <label className="text-sm font-medium mb-2 block dark:text-white">Audience</label>
              <div className="relative">
                <FaUsers className="absolute left-4 top-4 text-slate-400" />
                <select
                  value={formData.audience}
                  onChange={(e) => handleChange("audience", e.target.value)}
                  className="w-full pl-12 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white"
                >
                  <option value="ALL">All Users</option>
                  <option value="STUDENTS">Students</option>
                  <option value="TEACHERS">Teachers</option>
                  <option value="PARENTS">Parents</option>
                </select>
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="text-sm font-medium mb-2 block dark:text-white">Priority</label>
              <div className="relative">
                <FaFlag className="absolute left-4 top-4 text-slate-400" />
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                  className="w-full pl-12 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
            </div>

          </div>

          {/* Validity Timing Dates Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Publish Date */}
            <div>
              <label className="text-sm font-medium mb-2 block dark:text-white">Publish Date</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-4 text-slate-400" />
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => handleChange("publishDate", e.target.value)}
                  className="w-full pl-12 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Expiry Date */}
            <div>
              <label className="text-sm font-medium mb-2 block dark:text-white">Expiry Date</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-4 text-slate-400" />
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleChange("expiryDate", e.target.value)}
                  className="w-full pl-12 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

          </div>

          {/* Action Callbacks Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 dark:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold"
            >
              Update Notification
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditNotificationModal;