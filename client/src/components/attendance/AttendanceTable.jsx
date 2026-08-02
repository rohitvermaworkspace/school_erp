import React from "react";

function AttendanceTable({ attendance = [], loading }) {
  if (loading) {
    return <div className="text-center p-8">Loading attendance...</div>;
  }

  if (!attendance.length) {
    return (
      <div className="text-center p-8 text-gray-500">
        No attendance records found
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-700";

      case "absent":
        return "bg-red-100 text-red-700";

      case "late":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      className="bg-white
      dark:bg-slate-900
      rounded-2xl
      shadow-card
      border
      border-gray-100
      dark:border-slate-800
      overflow-x-auto"
    >
      <table className="w-full min-w-[1000px]">
        <thead className="bg-gray-50 dark:bg-slate-800">
          <tr>
            <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Student
            </th>

            <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Roll Number
            </th>

            <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Class
            </th>

            <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Date
            </th>

            <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Status
            </th>

            <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Marked By
            </th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((record) => (
            <tr
              key={record._id}
              className="
                  border-b
                  border-gray-100
                  dark:border-slate-800
                  hover:bg-gray-50
                  dark:hover:bg-slate-800/60
                  transition
                "
            >
              <td className="p-4 text-gray-700 dark:text-gray-200">
                {record.studentId?.name || "N/A"}
              </td>

              <td className="p-4 text-gray-700 dark:text-gray-200">
                {record.studentId?.rollNumber || "N/A"}
              </td>

              <td className="p-4 text-gray-700 dark:text-gray-200">
                {record.studentId?.className || "N/A"}
              </td>

              <td className="p-4 text-gray-700 dark:text-gray-200">
                {new Date(record.date).toLocaleDateString()}
              </td>

              <td className="p-4 text-gray-700 dark:text-gray-200">
                <span
                  className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(
                    record.status
                  )}`}
                >
                  {record.status}
                </span>
              </td>

              <td className="p-4 text-gray-700 dark:text-gray-200">
                {record.markedBy?.name || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;