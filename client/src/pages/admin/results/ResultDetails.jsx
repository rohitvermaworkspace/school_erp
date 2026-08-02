import {
  FaClipboardCheck,
  FaRegUser,
  FaSchool,
  FaPercentage,
  FaBookmark,
} from "react-icons/fa";

function ResultDetails({ result, onClose }) {
  if (!result) return null;
  // Determine color accents for passing status
  const isPassed = result.status?.toLowerCase() === "pass";
  const totalObtained =
    result.subjects?.reduce(
      (sum, subject) => sum + Number(subject.marksObtained || 0),
      0
    ) || 0;

  const totalMarks =
    result.subjects?.reduce(
      (sum, subject) => sum + Number(subject.maxMarks || 0),
      0
    ) || 0;

  const totalSubjects = result.subjects?.length || 0;

  return (
    <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden w-full max-w-3xl shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white relative">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaClipboardCheck className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {result.examName || "Examination Report"}
              </h2>
              <p className="text-white/80 text-sm">
                Detailed academic performance statement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition text-lg"
          >
            ✕
          </button>
        </div>

        {/* DETAILS OVERVIEW */}
        <div className="p-6 space-y-6">
          {/* STUDENT PROFILE */}

          <div className="bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-black shadow-lg">
                  {result.student?.name?.charAt(0)}
                </div>

                <div>
                  <h3 className="text-2xl font-bold dark:text-white">
                    {result.student?.name}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400">
                    Roll No: {result.student?.rollNumber || "N/A"}
                  </p>

                  <p className="text-gray-500 dark:text-gray-400">
                    Admission No: {result.student?.admissionNumber || "N/A"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Class
                  </p>

                  <h4 className="font-bold text-lg dark:text-white">
                    {result.className}
                  </h4>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Exam
                  </p>

                  <h4 className="font-bold text-lg dark:text-white">
                    {result.examName}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* RESULT SUMMARY */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-900 rounded-2xl p-5">
              <p className="text-sm text-blue-600 font-medium">Subjects</p>

              <h3 className="text-3xl font-black text-blue-700 dark:text-blue-400 mt-2">
                {totalSubjects}
              </h3>
            </div>

            <div className="bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-900 rounded-2xl p-5">
              <p className="text-sm text-green-600 font-medium">
                Obtained Marks
              </p>

              <h3 className="text-3xl font-black text-green-700 dark:text-green-400 mt-2">
                {totalObtained}
              </h3>
            </div>

            <div className="bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-900 rounded-2xl p-5">
              <p className="text-sm text-purple-600 font-medium">Total Marks</p>

              <h3 className="text-3xl font-black text-purple-700 dark:text-purple-400 mt-2">
                {totalMarks}
              </h3>
            </div>

            <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-900 rounded-2xl p-5">
              <p className="text-sm text-orange-600 font-medium">Percentage</p>

              <h3 className="text-3xl font-black text-orange-700 dark:text-orange-400 mt-2">
                {result.percentage}%
              </h3>
            </div>
          </div>
          {/* RESULT STATUS BANNER */}

          <div
            className={`
      rounded-2xl
      p-6
      border
      text-center
      ${
        isPassed
          ? "bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-900"
          : "bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-900"
      }
    `}
          >
            <h2
              className={`
        text-4xl
        font-black
        uppercase
        ${
          isPassed
            ? "text-green-700 dark:text-green-400"
            : "text-red-700 dark:text-red-400"
        }
      `}
            >
              {result.status}
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {isPassed
                ? "Student has successfully completed this examination."
                : "Student did not achieve the minimum passing criteria."}
            </p>
          </div>

          {/* SUBJECT MARKS TABLE */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FaBookmark className="text-indigo-500 text-sm" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Subject Breakdown
              </h3>
            </div>

            <div className="overflow-hidden border border-gray-100 dark:border-slate-800 rounded-2xl">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold tracking-wide border-b border-gray-100 dark:border-slate-800">
                    <th className="px-5 py-4 text-left">Subject</th>
                    <th className="px-5 py-4 text-left">Code</th>
                    <th className="px-5 py-4 text-center">Marks Obtained</th>
                    <th className="px-5 py-4 text-center">Max Marks</th>
                    <th className="px-5 py-4 text-center">Grade</th>
                  </tr>
                </thead>

                <tbody>
                  {result.subjects?.map((item, index) => {
                    const percentage =
                      (item.marksObtained / item.maxMarks) * 100;

                    const grade =
                      percentage >= 90
                        ? "A+"
                        : percentage >= 80
                        ? "A"
                        : percentage >= 70
                        ? "B+"
                        : percentage >= 60
                        ? "B"
                        : percentage >= 50
                        ? "C"
                        : percentage >= 40
                        ? "D"
                        : "F";

                    return (
                      <tr
                        key={index}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                      >
                        <td className="px-5 py-4 font-semibold dark:text-white">
                          {item.subject?.subjectName}
                        </td>

                        <td className="px-5 py-4 text-slate-500">
                          {item.subject?.subjectCode || "-"}
                        </td>

                        <td className="px-5 py-4 text-center">
                          {item.marksObtained.toFixed(1)}%
                        </td>

                        <td className="px-5 py-4 text-center">
                          {item.maxMarks}
                        </td>

                        <td className="px-5 py-4 text-center">
                          <span className="px-3 py-1 rounded-xl bg-indigo-100 text-indigo-700 text-sm font-bold">
                            {grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* MODAL FOOTER */}
          <div className="flex justify-end gap-3 pt-5 border-t border-gray-100 dark:border-slate-800">
            <button
              onClick={() => window.print()}
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Print Result
            </button>

            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultDetails;