import { useState } from "react";
import api from "../../services/api";

function UploadFileModal({
  onClose,
  onSuccess,
}) {
  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      await api.post(
        "/files",
        formData
      );

      onSuccess();

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Upload File
        </h2>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
            className="w-full mb-4 dark:text-white"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              {loading
                ? "Uploading..."
                : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadFileModal;