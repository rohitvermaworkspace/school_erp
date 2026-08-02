  import { FaEdit, FaTrash, FaEye, FaSchool } from "react-icons/fa";

  function StudentTable({
    students = [],
    onDelete,
    onEdit,
    onView,
    showActions = true,
    currentPage,
    totalPages,
    onPageChange,
  }) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
          <div className="flex items-center gap-3 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaSchool className="text-xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Student List</h2>
              <p className="text-sm text-white/80">
                Student Admission Records
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="p-4 text-left text-sm font-semibold">Student</th>

                <th className="p-4 text-left text-sm font-semibold">
                  Admission No
                </th>

                <th className="p-4 text-left text-sm font-semibold">
                  Class
                </th>

                <th className="p-4 text-left text-sm font-semibold">
                  Gender
                </th>

                <th className="p-4 text-left text-sm font-semibold">
                  Parent Details
                </th>

                <th className="p-4 text-left text-sm font-semibold">
                  Status
                </th>

                {showActions && (
                  <th className="p-4 text-left text-sm font-semibold">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((student) => {
                  // Supports both old schema and new schema
                  const studentName =
                    student.name || student.personal?.name || "-";

                  const studentEmail =
                    student.email || student.personal?.email || "-";

                  const admissionNo =
                    student.admission?.admissionNo ||
                    student.rollNumber ||
                    "-";

                  const className =
                    student.academic?.className ||
                    student.className ||
                    "-";

                  const gender =
                    student.personal?.gender ||
                    student.gender ||
                    "-";

                  const fatherName =
                    student.family?.guardian?.name || "-";

                  const fatherMobile =
                    student.family?.guardian?.mobile || "-";

                  const status =
                    student.admission?.status ||
                    student.status ||
                    "Active";

                  const imageName =
                    student.profileImage ||
                    student.personal?.profileImage;

                  const profileImage = imageName
                    ? `http://localhost:8000/uploads/students/${imageName}`
                    : null;

                  return (
                    <tr
                      key={student._id}
                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                    >
                      {/* Student */}

                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt={studentName}
                              className="w-11 h-11 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                              {studentName.charAt(0).toUpperCase()}
                            </div>
                          )}

                          <div>
                            <h4 className="font-semibold text-slate-800 dark:text-white">
                              {studentName}
                            </h4>

                            <p className="text-xs text-slate-500">
                              {studentEmail}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Admission */}

                      <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
                        {admissionNo}
                      </td>

                      {/* Class */}

                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-300 text-sm font-medium">
                          {className}
                        </span>
                      </td>

                      {/* Gender */}

                      <td className="p-4 text-slate-700 dark:text-slate-300">
                        {gender}
                      </td>

                      {/* Parent */}

                      <td className="p-4">
                        <div className="text-sm">
                          <p className="font-medium text-slate-800 dark:text-white">
                            {fatherName}
                          </p>

                          <p className="text-slate-500">
                            {fatherMobile}
                          </p>
                        </div>
                      </td>

                      {/* Status */}

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            status === "Active"
                              ? "bg-green-100 text-green-700 dark:bg-green-600/20 dark:text-green-300"
                              : "bg-red-100 text-red-700 dark:bg-red-600/20 dark:text-red-300"
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      {/* Actions */}

                      {showActions && (
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => onView(student)}
                              className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition"
                            >
                              <FaEye />
                            </button>

                            <button
                              onClick={() => onEdit(student)}
                              className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-600/20 text-blue-600 hover:bg-blue-200 dark:hover:bg-blue-600/30 flex items-center justify-center transition"
                            >
                              <FaEdit />
                            </button>

                            <button
                              onClick={() => onDelete(student._id)}
                              className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-600/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-600/30 flex items-center justify-center transition"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={showActions ? 7 : 6}
                    className="text-center py-16 text-slate-500 dark:text-slate-400"
                  >
                    No Students Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* ========================= PAGINATION ========================= */}

  <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
    <p className="text-sm text-slate-500 dark:text-slate-400">
      Showing page{" "}
      <span className="font-semibold text-slate-700 dark:text-white">
        {currentPage}
      </span>{" "}
      of{" "}
      <span className="font-semibold text-slate-700 dark:text-white">
        {totalPages}
      </span>
    </p>

    <div className="flex items-center gap-2">
      {/* Previous */}

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-4 py-2 rounded-xl border transition
          ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50 border-slate-200 dark:border-slate-700"
              : "hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border-slate-300 dark:border-slate-700"
          }`}
      >
        Previous
      </button>

      {/* Page Numbers */}

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`w-10 h-10 rounded-xl font-medium transition
            ${
              currentPage === index + 1
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white"
            }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next */}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-4 py-2 rounded-xl border transition
          ${
            currentPage === totalPages
              ? "cursor-not-allowed opacity-50 border-slate-200 dark:border-slate-700"
              : "hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border-slate-300 dark:border-slate-700"
          }`}
      >
        Next
      </button>
    </div>
  </div>
      </div>
    );
  }

  export default StudentTable;