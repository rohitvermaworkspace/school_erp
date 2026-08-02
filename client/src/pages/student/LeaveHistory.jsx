import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaHistory } from "react-icons/fa";

function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    const res = await api.get("/leaves/my");
    setLeaves(res.data.data);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
      {/* TABLE HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
        <div className="flex items-center gap-3 text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <FaHistory className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Leave History</h2>
            <p className="text-sm text-white/80">View your past leave requests</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-x-auto p-6">
        {leaves.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No leave history found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">From</th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">To</th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Type</th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Reason</th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4">{leave.fromDate?.substring(0, 10)}</td>
                  <td className="p-4">{leave.toDate?.substring(0, 10)}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                      {leave.leaveType}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{leave.reason}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default LeaveHistory;
