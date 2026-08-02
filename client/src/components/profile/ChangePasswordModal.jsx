import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function ChangePasswordModal({
  onClose,
}) {
  const [formData, setFormData] =
    useState({
      currentPassword: "",
      newPassword: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await api.put(
        "/users/change-password",
        formData
      );

      toast.success(
        "Password changed successfully"
      );

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md">

        <h2 className="text-xl font-bold mb-5 dark:text-white">
          Change Password
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="password"
            name="currentPassword"
            value={
              formData.currentPassword
            }
            onChange={
              handleChange
            }
            placeholder="Current Password"
            className="w-full border rounded-lg p-3 dark:bg-slate-800 dark:border-slate-700"
          />

          <input
            type="password"
            name="newPassword"
            value={
              formData.newPassword
            }
            onChange={
              handleChange
            }
            placeholder="New Password"
            className="w-full border rounded-lg p-3 dark:bg-slate-800 dark:border-slate-700"
          />

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={
                onClose
              }
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Update Password
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;