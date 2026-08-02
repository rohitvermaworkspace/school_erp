import { FaEdit, FaTrash } from "react-icons/fa";

function TeacherTable({
  teachers = [],
  loading = false,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500 dark:text-gray-400">
        Loading teachers...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-slate-800">
      <table className="w-full min-w-[1100px]">
        {/* HEADER */}
        <thead className="sticky top-0 bg-gray-50 dark:bg-slate-800 z-10">
          <tr>
            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
              Teacher
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
              Email
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
              Phone
            </th>
            <th className="p-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
              Subject
            </th>
            <th className="p-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
              Experience
            </th>
            <th className="p-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
              Classes
            </th>
            <th className="p-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
              Created By
            </th>
            <th className="p-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
              Joined
            </th>
            <th className="p-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <tr
                key={teacher._id}
                className="border-t border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/40 transition"
              >
                {/* TEACHER */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center font-semibold">
                      {teacher.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {teacher.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Teacher ID: {teacher._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* EMAIL */}
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {teacher.email}
                </td>

                {/* PHONE */}
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {teacher.phone || "-"}
                </td>

                {/* SUBJECT */}
                <td className="p-4 text-center">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400">
                    {teacher.subject || "N/A"}
                  </span>
                </td>

                {/* EXPERIENCE */}
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      Number(teacher.experience || 0) >= 5
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400"
                        : "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400"
                    }`}
                  >
                    {teacher.experience || 0} Years
                  </span>
                </td>

                {/* CLASSES */}
                <td className="p-4 text-center">
                  <div className="flex flex-wrap justify-center gap-1">
                    {teacher.classes?.length > 0 ? (
                      <>
                        {teacher.classes.slice(0, 2).map((cls) => (
                          <span
                            key={cls}
                            className="px-2 py-1 rounded-lg text-xs bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                          >
                            {cls}
                          </span>
                        ))}

                        {teacher.classes.length > 2 && (
                          <span className="px-2 py-1 rounded-lg text-xs bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300">
                            +{teacher.classes.length - 2}
                          </span>
                        )}
                      </>
                    ) : (
                      "-"
                    )}
                  </div>
                </td>

                {/* CREATED BY */}
                <td className="p-4 text-center text-gray-600 dark:text-gray-300">
                  {teacher.createdBy?.name || "-"}
                </td>

                {/* JOINED */}
                <td className="p-4 text-center text-gray-600 dark:text-gray-300">
                  {new Date(teacher.createdAt).toLocaleDateString("en-IN")}
                </td>

                {/* ACTIONS */}
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(teacher)}
                      className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:scale-105 transition"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(teacher._id)}
                      className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center hover:scale-105 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="py-12 text-center text-gray-500 dark:text-gray-400">
                No teachers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherTable;