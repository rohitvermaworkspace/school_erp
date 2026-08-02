import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

import {
  FaBell,
  FaHeading,
  FaAlignLeft,
  FaUsers,
  FaFlag,
  FaCalendarAlt,
  FaTimes,
  FaSave,
} from "react-icons/fa";

function AddNotificationModal({
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      message: "",
      category: "GENERAL",
      audience: "ALL",
      priority: "MEDIUM",
      publishDate: "",
      expiryDate: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(
        "/notifications",
        formData
      );

      toast.success(
        "Notification Created Successfully"
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to Create Notification"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white flex justify-between items-center">

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaBell className="text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Create Notification
              </h2>

              <p className="text-white/80 text-sm">
                Publish announcements
                across the ERP system
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center"
          >
            <FaTimes />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >

          {/* Title */}

          <div>
            <label className="block text-sm font-semibold mb-2">
              Notification Title
            </label>

            <div className="relative">
              <FaHeading className="absolute left-4 top-4 text-slate-400" />

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                required
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3
                  rounded-2xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                "
              />
            </div>
          </div>

          {/* Message */}

          <div>
            <label className="block text-sm font-semibold mb-2">
              Notification Message
            </label>

            <div className="relative">
              <FaAlignLeft className="absolute left-4 top-4 text-slate-400" />

              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write notification message..."
                required
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3
                  rounded-2xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                "
              />
            </div>
          </div>

          {/* Dropdown Grid */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Category */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border
                  p-3
                  dark:bg-slate-800
                  dark:border-slate-700
                "
              >
                <option value="GENERAL">
                  General
                </option>

                <option value="ACADEMIC">
                  Academic
                </option>

                <option value="EXAM">
                  Exam
                </option>

                <option value="FEES">
                  Fees
                </option>

                <option value="HOLIDAY">
                  Holiday
                </option>

                <option value="EMERGENCY">
                  Emergency
                </option>
              </select>
            </div>

            {/* Audience */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Audience
              </label>

              <select
                name="audience"
                value={formData.audience}
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border
                  p-3
                  dark:bg-slate-800
                  dark:border-slate-700
                "
              >
                <option value="ALL">
                  All Users
                </option>

                <option value="STUDENTS">
                  Students
                </option>

                <option value="TEACHERS">
                  Teachers
                </option>

                <option value="PARENTS">
                  Parents
                </option>
              </select>
            </div>

            {/* Priority */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border
                  p-3
                  dark:bg-slate-800
                  dark:border-slate-700
                "
              >
                <option value="LOW">
                  Low
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="HIGH">
                  High
                </option>
              </select>
            </div>
          </div>

          {/* Dates */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-semibold mb-2">
                Publish Date
              </label>

              <input
                type="date"
                name="publishDate"
                value={
                  formData.publishDate
                }
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border
                  p-3
                  dark:bg-slate-800
                  dark:border-slate-700
                "
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Expiry Date
              </label>

              <input
                type="date"
                name="expiryDate"
                value={
                  formData.expiryDate
                }
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border
                  p-3
                  dark:bg-slate-800
                  dark:border-slate-700
                "
              />
            </div>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 pt-4 border-t dark:border-slate-800">

            <button
              type="button"
              onClick={onClose}
              className="
                px-5
                py-3
                rounded-2xl
                border
                border-slate-300
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                px-6
                py-3
                rounded-2xl
                text-white
                font-semibold
                bg-gradient-to-r
                from-indigo-600
                via-purple-600
                to-pink-600
                shadow-lg
              "
            >
              {loading
                ? "Creating..."
                : "Create Notification"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AddNotificationModal;