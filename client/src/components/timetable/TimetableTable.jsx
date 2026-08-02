import {
  FaEdit,
  FaTrash,
  FaClock,
  FaBook,
  FaChalkboardTeacher,
} from "react-icons/fa";

function TimetableTable({
  timetables = [],
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-3">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Loading timetable...
        </p>
      </div>
    );
  }

  if (!timetables.length) {
    return (
      <div className="text-center py-16 border border-dashed rounded-2xl border-gray-200 dark:border-slate-800">
        <p className="text-gray-400 dark:text-gray-500 font-medium">
          No timetable records found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-slate-800">
      <table className="w-full min-w-[1300px] text-sm text-left">
        <thead className="bg-gray-50 dark:bg-slate-800/50 text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800">
          <tr>
            <th className="p-4">Class</th>
            <th className="p-4">Day</th>
            <th className="p-4">Periods</th>
            <th className="p-4">Period Count</th>
            <th className="p-4">Created By</th>
            <th className="p-4">Created At</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-slate-800 bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300">
          {timetables.map((timetable) => (
            <tr
              key={timetable._id}
              className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition"
            >
              {/* CLASS */}
              <td className="p-4 font-semibold text-gray-900 dark:text-white">
                {timetable.className}
              </td>

              {/* DAY */}
              <td className="p-4">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                  {timetable.day}
                </span>
              </td>

              {/* PERIODS */}
              <td className="p-4 max-w-[500px]">
                <div className="grid gap-2">
                  {timetable.periods?.map((period, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-3"
                    >
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <FaClock />
                        <span>
                          {period.startTime} - {period.endTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-white">
                        <FaBook className="text-indigo-500" />
                        {period.subject?.subjectName || "-"}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <FaChalkboardTeacher />
                        {period.teacher?.name || "-"}
                      </div>
                    </div>
                  ))}
                </div>
              </td>

              {/* COUNT */}
              <td className="p-4">
                <span className="inline-flex px-3 py-1 rounded-full bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 text-xs font-medium">
                  {timetable.periods?.length || 0} Periods
                </span>
              </td>

              {/* CREATED BY */}
              <td className="p-4 text-gray-500 dark:text-gray-400">
                {timetable.createdBy?.name || "System Admin"}
              </td>

              {/* CREATED DATE */}
              <td className="p-4 text-gray-500 dark:text-gray-400">
                {new Date(
                  timetable.createdAt
                ).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>

              {/* ACTIONS */}
              <td className="p-4">
                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() => onEdit(timetable)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition"
                    title="Edit Timetable"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(timetable._id)
                    }
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition"
                    title="Delete Timetable"
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

export default TimetableTable;