import { FaEdit, FaTrash, FaUserGraduate, FaMoneyBillWave } from "react-icons/fa";

function FeeTable({ fees, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading fee records...</p>
      </div>
    );
  }

  if (!fees?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-200 dark:border-slate-700 rounded-2xl">
        <FaMoneyBillWave className="text-5xl text-gray-300 dark:text-slate-600 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">No Fee Records Found</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Add a fee record to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-slate-800">
      <table className="w-full min-w-[1100px]">
        <thead className="bg-gray-50 dark:bg-slate-800/50">
          <tr className="text-left text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider">
            <th className="p-4">Student</th>
            <th className="p-4">Class</th>
            <th className="p-4">Fee Type</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Month</th>
            <th className="p-4">Payment Date</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {fees.map((fee) => (
            <tr key={fee._id} className="border-t border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/40 transition">
              {/* Student */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                    <FaUserGraduate className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{fee.student?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Roll No: {fee.student?.rollNumber}</p>
                  </div>
                </div>
              </td>

              {/* Class */}
              <td className="p-4">
                <span className="font-medium text-gray-700 dark:text-gray-300">{fee.student?.className}</span>
              </td>

              {/* Fee Type */}
              <td className="p-4">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
                  {fee.feeType}
                </span>
              </td>

              {/* Amount */}
              <td className="p-4">
                <span className="font-bold text-green-600 text-base">
                  ₹{Number(fee.amount).toLocaleString("en-IN")}
                </span>
              </td>

              {/* Month */}
              <td className="p-4">
                <span className="text-gray-600 dark:text-gray-400">{fee.month}</span>
              </td>

              {/* Payment Date */}
              <td className="p-4">
                <span className="text-gray-600 dark:text-gray-400">
                  {fee.paymentDate
                    ? new Date(fee.paymentDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "-"}
                </span>
              </td>

              {/* Status */}
              <td className="p-4">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                  fee.status === "Paid"
                    ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                }`}>
                  {fee.status}
                </span>
              </td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => onEdit(fee)}
                    className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 transition flex items-center justify-center"
                    title="Edit Fee"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onDelete(fee._id)}
                    className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 transition flex items-center justify-center"
                    title="Delete Fee"
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

export default FeeTable;