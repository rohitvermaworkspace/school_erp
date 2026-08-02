import { FaSchool, FaUsers } from "react-icons/fa";

function ClassSummaryTable({ data }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
        <div className="flex items-center gap-3 text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <FaSchool className="text-xl" />
          </div>

          <div>
            <h2 className="text-xl font-bold">Class Summary</h2>
            <p className="text-sm text-white/80">Student distribution across classes</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800">
                <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                  Class
                </th>
                <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                  Students
                </th>
                <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.length > 0 ? (
                data.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-800/60 transition"
                  >
                    {/* Class */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                          <FaSchool className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-semibold dark:text-white">
                            {item.className}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Students */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-slate-400" />
                        <span className="font-semibold dark:text-white">
                          {item.students}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          item.students > 20
                            ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                            : item.students > 10
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
                            : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                        }`}
                      >
                        {item.students > 20
                          ? "High Strength"
                          : item.students > 10
                          ? "Medium Strength"
                          : "Low Strength"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <FaSchool className="text-4xl text-slate-300" />
                      <p className="text-slate-500 dark:text-slate-400">
                        No class data available
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        {data?.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Total Classes
            </span>
            <span className="font-bold text-lg dark:text-white">
              {data.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassSummaryTable;