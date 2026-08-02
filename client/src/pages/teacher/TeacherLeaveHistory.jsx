import { useEffect, useState } from "react";
import TeacherLayout from "../../components/layout/TeacherLayout";
import api from "../../services/api";
import { FaHistory } from "react-icons/fa";

function TeacherLeaveHistory() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const { data } = await api.get("/leaves/me");
      setLeaves(data);
    } catch (error) {
      console.error(error);
    }
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
    <TeacherLayout>
      <div className="space-y-6">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-4">
                📋 Leave Records
              </div>
              <h1 className="text-4xl font-black text-white leading-tight">
                Leave History
              </h1>
              <p className="text-purple-100 text-lg mt-3">
                View all your past leave requests and their status
              </p>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaHistory className="text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Leave Records</h2>
                <p className="text-sm text-white/80">{leaves.length} total records</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Type</th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">From</th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">To</th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Reason</th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave._id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                        {leave.leaveType}
                      </span>
                    </td>
                    <td className="p-4">{leave.fromDate}</td>
                    <td className="p-4">{leave.toDate}</td>
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
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}

export default TeacherLeaveHistory;
