import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function EditProfileModal({
  profile,
  onClose,
  onSuccess,
}) {
  const [formData, setFormData] =
    useState({
      name: profile.name,
      email: profile.email,
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
        "/users/profile",
        formData
      );

      toast.success(
        "Profile updated successfully"
      );

      onSuccess();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Update failed"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md">

        <h2 className="text-xl font-bold mb-5 dark:text-white">
          Edit Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            placeholder="Name"
            className="w-full border rounded-lg p-3 dark:bg-slate-800 dark:border-slate-700"
          />

          <input
            type="email"
            name="email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            placeholder="Email"
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
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Update
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;