import { FaEye, FaTrash } from "react-icons/fa";

function FileTable({
  files,
  loading,
  onDelete,
  onPreview,
}) {
  if (loading) {
    return (
      <div className="text-center py-10 dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-slate-800">
            <th className="p-3 text-left">File</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Uploaded</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {files.map((file) => (
            <tr
              key={file._id}
              className="border-b dark:border-slate-700"
            >
              <td className="p-3 dark:text-white">
                {file.fileName}
              </td>

              <td className="p-3 dark:text-gray-300">
                {file.fileType}
              </td>

              <td className="p-3 dark:text-gray-300">
                {new Date(
                  file.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="p-3">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() =>
                      onPreview(file)
                    }
                    className="text-blue-500"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(file._id)
                    }
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileTable;