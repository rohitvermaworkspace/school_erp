import { FaEdit, FaTrash } from "react-icons/fa";

function SubjectTable({
  subjects = [],
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="text-center p-8">
        Loading subjects...
      </div>
    );
  }

  if (!subjects.length) {
    return (
      <div className="text-center p-8 text-gray-500">
        No subjects found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px]">
        <thead className="bg-gray-50 dark:bg-slate-800">
          <tr>
            <th className="p-4 text-left">
              Subject Name
            </th>

            <th className="p-4 text-left">
              Subject Code
            </th>

            <th className="p-4 text-left">
              Class
            </th>

            <th className="p-4 text-left">
              Teacher
            </th>

            <th className="p-4 text-left">
              Created By
            </th>

            <th className="p-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((subject) => (
            <tr
              key={subject._id}
              className="border-t"
            >
              <td className="p-4">
                {subject.subjectName}
              </td>

              <td className="p-4">
                {subject.subjectCode}
              </td>

              <td className="p-4">
                {subject.className}
              </td>

              <td className="p-4">
                {subject.teacher?.name || "N/A"}
              </td>

              <td className="p-4">
                {subject.createdBy?.name || "N/A"}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() =>
                      onEdit(subject)
                    }
                    className="text-blue-600"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(subject._id)
                    }
                    className="text-red-600"
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

export default SubjectTable;