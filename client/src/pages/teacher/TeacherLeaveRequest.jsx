import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import TeacherLayout from "../../components/layout/TeacherLayout";
import api from "../../services/api";
import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function TeacherLeaveRequest() {
  const [loading, setLoading] = useState(false);
  const [leaves, setLeaves] = useState([]);

  const [form, setForm] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  // ==========================
  // FETCH LEAVES
  // ==========================
  const fetchLeaves = async () => {
    try {
      const res = await api.get("/leaves/me");

      setLeaves(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load leaves");
    }
  };

  // ==========================
  // APPLY LEAVE
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.leaveType || !form.fromDate || !form.toDate || !form.reason) {
      return toast.error("Please fill all fields");
    }

    if (new Date(form.toDate) < new Date(form.fromDate)) {
      return toast.error("To Date cannot be earlier than From Date");
    }

    try {
      setLoading(true);

      await api.post("/leaves/apply", form);

      toast.success("Leave request submitted successfully");

      setForm({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
      });

      fetchLeaves();
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to submit leave");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // COUNTS
  // ==========================
  const pendingCount = leaves.filter((l) => l.status === "pending").length;

  const approvedCount = leaves.filter((l) => l.status === "approved").length;

  const rejectedCount = leaves.filter((l) => l.status === "rejected").length;

  const getStatusBadge = (status) => {
  switch (status) {

    case "approved":
      return `
      bg-green-100
      text-green-700
      border
      border-green-200
      `;

    case "rejected":
      return `
      bg-red-100
      text-red-700
      border
      border-red-200
      `;

    default:
      return `
      bg-yellow-100
      text-yellow-700
      border
      border-yellow-200
      `;
  }
};
  

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-3xl font-bold">Leave Management</h1>

          <p className="mt-2 text-blue-100">
            Apply leave requests and track approval status
          </p>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Requests</p>

              <h2 className="text-3xl font-bold text-blue-600">
                {leaves.length}
              </h2>
            </div>

            <FaClipboardList className="text-blue-500 text-4xl" />
          </div>

          <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Pending</p>

              <h2 className="text-3xl font-bold text-yellow-600">
                {pendingCount}
              </h2>
            </div>

            <FaClock className="text-yellow-500 text-4xl" />
          </div>

          <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Approved</p>

              <h2 className="text-3xl font-bold text-green-600">
                {approvedCount}
              </h2>
            </div>

            <FaCheckCircle className="text-green-500 text-4xl" />
          </div>

          <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Rejected</p>

              <h2 className="text-3xl font-bold text-red-600">
                {rejectedCount}
              </h2>
            </div>

            <FaTimesCircle className="text-red-500 text-4xl" />
          </div>
        </div>

        {/* APPLY LEAVE */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b">
            <h2 className="text-xl font-semibold">Apply Leave Request</h2>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                value={form.leaveType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    leaveType: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Emergency">Emergency</option>
                <option value="Other">Other</option>
              </select>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={form.fromDate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      fromDate: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />

                <input
                  type="date"
                  value={form.toDate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      toDate: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              <textarea
                rows="4"
                placeholder="Reason"
                value={form.reason}
                onChange={(e) =>
                  setForm({
                    ...form,
                    reason: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                {loading ? "Submitting..." : "Submit Leave"}
              </button>
            </form>
          </div>
        </div>

        {/* HISTORY */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <FaClipboardList className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Leave History</h2>
                  <p className="text-sm text-white/80">Track all leave requests and approval status</p>
                </div>
              </div>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                {leaves.length} Records
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto">

          {leaves.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <FaClipboardList className="text-blue-500 text-4xl" />
              </div>

              <h3 className="text-xl font-semibold text-gray-700">
                No Leave Requests Found
              </h3>

              <p className="text-gray-500 mt-2 text-center max-w-md">
                You haven't submitted any leave requests yet.
                Apply for leave using the form above and it
                will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Leave Type
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Duration
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Reason
                    </th>

                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {leaves.map((leave) => (
                    <tr
                      key={leave._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium">
                          {leave.leaveType}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span>
                            {new Date(
                              leave.fromDate
                            ).toLocaleDateString()}
                          </span>

                          <span className="text-gray-500 text-sm">
                            to{" "}
                            {new Date(
                              leave.toDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 max-w-md">
                        <p className="truncate">
                          {leave.reason}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`
                            inline-flex
                            items-center
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-medium
                            ${getStatusBadge(leave.status)}
                          `}
                        >
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}

export default TeacherLeaveRequest;