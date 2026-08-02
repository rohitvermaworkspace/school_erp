import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AdminLayout from "../../components/layout/AppLayout";
import api from "../../services/api";
import { Cell } from "recharts";

import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSearch,
  FaFilter,
  FaSchool,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AdminLeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [actionModal, setActionModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;

  useEffect(() => {
    fetchLeaves();
    fetchLeaveStats();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/leaves");

      setLeaves(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load leaves");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/leaves/${id}`, {
        status,
      });

      toast.success(`Leave ${status}`);

      fetchLeaves();
      fetchLeaveStats();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update leave");
    }
  };

  const getLeaveDays = (fromDate, toDate) => {
  const start = new Date(fromDate);
  const end = new Date(toDate);

  const diff =
    Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  return diff;
};

  const filteredLeaves = leaves.filter((leave) => {
    const statusMatch = filter === "all" || leave.status === filter;
    const userName = leave.applicant?.name || "";
    const searchMatch = userName.toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  const pendingCount = leaves.filter((l) => l.status === "pending").length;
  const approvedCount = leaves.filter((l) => l.status === "approved").length;
  const rejectedCount = leaves.filter((l) => l.status === "rejected").length;
  const totalLeaves = leaves.length;
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = filteredLeaves.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredLeaves.length / recordsPerPage);
  const [chartData, setChartData] = useState([]);

  const fetchLeaveStats = async () => {
    try {
      const { data } = await api.get("/leaves/leave-stats");

      console.log("Chart Data", data);

      setChartData(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black mb-2">Leave Management</h1>

              <p className="text-blue-100 text-lg">
                Review, approve and manage leave requests from students and
                teachers.
              </p>
            </div>

            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
              <FaCalendarAlt className="text-2xl" />

              <div>
                <p className="text-xs uppercase tracking-wider text-blue-100">
                  Total Requests
                </p>

                <h3 className="text-3xl font-black">{leaves.length}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Total Request */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-lg">
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full" />

            <div className="relative flex justify-between items-center">
              <div>
                <p className="text-amber-100 text-sm font-medium">
                  Total Requests
                </p>

                <h2 className="text-4xl font-black mt-2">{totalLeaves}</h2>
              </div>

              <FaClock className="text-4xl text-white/80" />
            </div>
          </div>

          {/* Pending */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 p-6 text-white shadow-lg">
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full" />

            <div className="relative flex justify-between items-center">
              <div>
                <p className="text-amber-100 text-sm font-medium">
                  Pending Requests
                </p>

                <h2 className="text-4xl font-black mt-2">{pendingCount}</h2>
              </div>

              <FaClock className="text-4xl text-white/80" />
            </div>
          </div>

          {/* Approved */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 p-6 text-white shadow-lg">
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full" />

            <div className="relative flex justify-between items-center">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Approved Requests
                </p>

                <h2 className="text-4xl font-black mt-2">{approvedCount}</h2>
              </div>

              <FaCheckCircle className="text-4xl text-white/80" />
            </div>
          </div>

          {/* Rejected */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 to-red-600 p-6 text-white shadow-lg">
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full" />

            <div className="relative flex justify-between items-center">
              <div>
                <p className="text-red-100 text-sm font-medium">
                  Rejected Requests
                </p>

                <h2 className="text-4xl font-black mt-2">{rejectedCount}</h2>
              </div>

              <FaTimesCircle className="text-4xl text-white/80" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <h2 className="text-xl font-bold text-white">Leave Statistics</h2>

            <p className="text-white/80 text-sm">
              Current leave request distribution
            </p>
          </div>

          {chartData.length > 0 && (
           <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="status" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                  {chartData.map((entry, index) => {
                    let color = "#f59e0b"; // Pending

                    if (entry.status.toLowerCase() === "approved")
                      color = "#10b981";

                    if (entry.status.toLowerCase() === "rejected")
                      color = "#ef4444";

                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={color}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Filters */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search student or teacher..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Filter Select */}
            <div className="relative w-full md:w-64">
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Requests</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* Table */}
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaSchool className="text-xl" />
              </div>

              <div>
                <h2 className="text-xl font-bold">Leave Summary</h2>
                <p className="text-sm text-white/80">
                  Student distribution across classes
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow overflow-x-auto">
            {loading ? (
              <div className="p-10 text-center">Loading...</div>
            ) : filteredLeaves.length === 0 ? (
              <div className="p-10 text-center">No Leave Requests Found</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left">User</th>
                    <th className="p-4 text-left">Role</th>
                    <th className="p-4 text-left">Leave Type</th>
                    <th className="p-4 text-left">Dates</th>
                    <th className="p-4 text-left">Duration</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Reason</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentRecords.map((leave) => {
                    const user = leave.applicant;

                    const role = leave.role;

                    return (
                      <tr
                        key={leave._id}
                        className="border-t hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                      >
                        <td className="p-4">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {user?.name || "Unknown User"}
                            </p>

                            <p className="text-xs text-gray-500">
                              {user?.email}
                            </p>
                          </div>
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              role === "teacher"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {role}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                            {leave.leaveType}
                          </span>
                        </td>

                        <td className="p-4">
                          <div>
                            <p className="font-medium">
                              {new Date(leave.fromDate).toLocaleDateString()}
                            </p>

                            <p className="text-xs text-slate-500">
                              to {new Date(leave.toDate).toLocaleDateString()}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                            {getLeaveDays(leave.fromDate, leave.toDate)} Day
                            {getLeaveDays(leave.fromDate, leave.toDate) > 1 ? "s" : ""}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(
                              leave.status
                            )}`}
                          >
                            {leave.status}
                          </span>
                        </td>

                        <td className="p-4">
                          <button
                            onClick={() => setSelectedLeave(leave)}
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </button>
                        </td>

                        <td className="p-4 flex gap-2">
                          {leave.status === "pending" ? (
                            <>
                              <button
                                onClick={() =>
                                  setActionModal({
                                    leaveId: leave._id,
                                    status: "approved",
                                    applicantName: user?.name,
                                  })
                                }
                                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition"
                              >
                                Approve
                              </button>

                              <button
                                onClick={() =>
                                  setActionModal({
                                    leaveId: leave._id,
                                    status: "rejected",
                                    applicantName: user?.name,
                                  })
                                }
                                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold transition"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-gray-500 text-sm">
                              Action Completed
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <div className="flex justify-between items-center p-5 border-t">
              <p className="text-sm text-gray-500">
                Showing {indexOfFirstRecord + 1} -
                {Math.min(indexOfLastRecord, filteredLeaves.length)} of{" "}
                {filteredLeaves.length}
              </p>

              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-4 py-2 rounded-xl border disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-xl ${
                      currentPage === i + 1 ? "bg-primary text-white" : "border"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-4 py-2 rounded-xl border disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Reason Modal */}

        {selectedLeave && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white relative">
                <h2 className="text-2xl font-bold">Leave Details</h2>

                <p className="text-white/80 text-sm">
                  Complete leave request information
                </p>

                <button
                  onClick={() => setSelectedLeave(null)}
                  className="absolute right-6 top-6 text-xl hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* User Profile */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                      {selectedLeave?.applicant?.name?.charAt(0) || "U"}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold dark:text-white">
                        {selectedLeave?.applicant?.name || "Unknown User"}
                      </h3>

                      <p className="text-gray-500">
                        {selectedLeave?.applicant?.email || "No Email"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Leave Information */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs uppercase text-gray-400">Role</p>

                    <p className="font-semibold dark:text-white">
                      {selectedLeave.role}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-gray-400">
                      Leave Type
                    </p>

                    <p className="font-semibold dark:text-white">
                      {selectedLeave.leaveType || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-gray-400">From Date</p>

                    <p className="font-semibold dark:text-white">
                      {new Date(selectedLeave.fromDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-gray-400">To Date</p>

                    <p className="font-semibold dark:text-white">
                      {new Date(selectedLeave.toDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-gray-400">
                      Total Days
                    </p>

                    <p className="font-semibold dark:text-white">
                      {Math.ceil(
                        (new Date(selectedLeave.toDate) -
                          new Date(selectedLeave.fromDate)) /
                          (1000 * 60 * 60 * 24)
                      ) + 1}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-gray-400">
                      Applied Date
                    </p>

                    <p className="font-semibold dark:text-white">
                      {new Date(selectedLeave.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <p className="text-xs uppercase text-gray-400 mb-2">
                    Current Status
                  </p>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      selectedLeave.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : selectedLeave.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {selectedLeave.status}
                  </span>
                </div>

                {/* Reason */}
                <div>
                  <p className="text-xs uppercase text-gray-400 mb-2">
                    Leave Reason
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4">
                    <p className="dark:text-white">
                      {selectedLeave.reason || "No reason provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-200 dark:border-slate-800 p-5 flex justify-end">
                <button
                  onClick={() => setSelectedLeave(null)}
                  className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {actionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-5 text-white">
              <h2 className="text-xl font-bold">Confirm Action</h2>

              <p className="text-white/80 text-sm">
                Leave request approval workflow
              </p>
            </div>

            <div className="p-6">
              <p className="text-slate-700 dark:text-slate-300">
                Are you sure you want to
                <span
                  className={`font-bold mx-1 ${
                    actionModal.status === "approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {actionModal.status}
                </span>
                leave request of
                <span className="font-bold ml-1">
                  {actionModal.applicantName}
                </span>
                ?
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setActionModal(null)}
                  className="px-4 py-2 rounded-xl border"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    updateStatus(actionModal.leaveId, actionModal.status);

                    setActionModal(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-white ${
                    actionModal.status === "approved"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminLeaveManagement;