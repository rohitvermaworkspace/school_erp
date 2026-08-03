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
            <thead className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Student</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Admission No</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Class</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Roll No</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Gender</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Guardian</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Status</th>
                {showActions && (
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300">Actions</th>
                )}
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((student) => {
                  const studentName = student.name || "-";
                  const studentEmail = student.email || "-";
                  const admissionNo = student.admission?.admissionNo || "-";
                  const className = student.academic?.className || "-";
                  const section = student.academic?.section || "";
                  const rollNumber = student.academic?.rollNumber || "-";
                  const gender = student.personal?.gender || "-";
                  const guardianName = student.family?.guardian?.name || "-";
                  const guardianPhone = student.family?.guardian?.phone || "-";
                  const status = student.admission?.status || student.status || "Active";

                  const imageName = student.profileImage || student.userId?.profileImage;
                  const profileImage = imageName
                    ? `http://localhost:8000/uploads/students/${imageName}`
                    : null;

                  return (
                    <tr
                      key={student._id}
                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                    >
                      {/* Student Name + Email */}
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2.5">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt={studentName}
                              className="w-9 h-9 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                              {studentName.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold text-sm text-slate-800 dark:text-white">
                              {studentName}
                            </h4>
                            <p className="text-xs text-slate-500">{studentEmail}</p>
                          </div>
                        </div>
                      </td>

                      {/* Admission No */}
                      <td className="px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {admissionNo}
                      </td>

                      {/* Class + Section */}
                      <td className="px-4 py-2.5">
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
                          {className} {section}
                        </span>
                      </td>

                      {/* Roll Number */}
                      <td className="px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {rollNumber}
                      </td>

                      {/* Gender */}
                      <td className="px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300">
                        {gender}
                      </td>

                      {/* Guardian Name + Phone */}
                      <td className="px-4 py-2.5">
                        <div className="text-xs">
                          <p className="font-medium text-slate-800 dark:text-white">
                            {guardianName}
                          </p>
                          {guardianPhone !== "-" && (
                            <p className="text-slate-500">{guardianPhone}</p>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
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
                        <td className="px-4 py-2.5">
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => onView(student)}
                              className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition text-xs"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => onEdit(student)}
                              className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-600/20 text-blue-600 hover:bg-blue-200 dark:hover:bg-blue-600/30 flex items-center justify-center transition text-xs"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => onDelete(student._id)}
                              className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-600/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-600/30 flex items-center justify-center transition text-xs"
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
                    colSpan={showActions ? 8 : 7}
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

  <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
    <p className="text-xs text-slate-500 dark:text-slate-400">
      Page <span className="font-semibold text-slate-700 dark:text-white">{currentPage}</span> of <span className="font-semibold text-slate-700 dark:text-white">{totalPages}</span>
    </p>

    <div className="flex items-center gap-1.5">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-3 py-1.5 rounded-lg text-xs border transition ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50 border-slate-200 dark:border-slate-700"
            : "hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border-slate-300 dark:border-slate-700"
        }`}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`w-7 h-7 rounded-lg text-xs font-medium transition ${
            currentPage === index + 1
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow"
              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-3 py-1.5 rounded-lg text-xs border transition ${
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