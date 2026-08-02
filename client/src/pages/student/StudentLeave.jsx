import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaClipboardList } from "react-icons/fa";

function StudentLeave() {
  const [loading, setLoading] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    leaveType: "Sick Leave",
    fromDate: "",
    toDate: "",
    reason: "",
  });
  const approvedLeaves = leaves.filter((l) => l.status === "approved").length;

  const pendingLeaves = leaves.filter((l) => l.status === "pending").length;

  const rejectedLeaves = leaves.filter((l) => l.status === "rejected").length;

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await api.get("/leaves/me");

      setLeaves(res.data.data || res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api.post("/leaves/apply", form);

      toast.success("Leave Applied Successfully");

      setForm({
        leaveType: "Sick Leave",
        fromDate: "",
        toDate: "",
        reason: "",
      });

      fetchLeaves();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to apply leave");
    } finally {
      setLoading(false);
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
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg mb-6">
          <h1 className="text-3xl font-bold">Leave Management</h1>

          <p className="mt-2 text-blue-100">
            Apply leave requests and track approval status from school
            administration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Total Requests</p>

            <h2 className="text-3xl font-bold text-blue-600">
              {leaves.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Approved</p>

            <h2 className="text-3xl font-bold text-green-600">
              {approvedLeaves}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Pending</p>

            <h2 className="text-3xl font-bold text-yellow-600">
              {pendingLeaves}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Rejected</p>

            <h2 className="text-3xl font-bold text-red-600">
              {rejectedLeaves}
            </h2>
          </div>
        </div>
        {/* Apply Leave */}

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Apply Leave</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={form.leaveType}
              onChange={(e) =>
                setForm({
                  ...form,
                  leaveType: e.target.value,
                })
              }
              className="border rounded-lg p-3"
            >
              <option>Sick Leave</option>

              <option>Casual Leave</option>

              <option>Emergency</option>

              <option>Other</option>
            </select>

            <div></div>

            <input
              type="date"
              value={form.fromDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  fromDate: e.target.value,
                })
              }
              className="border rounded-lg p-3"
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
              className="border rounded-lg p-3"
            />
          </div>

          <textarea
            rows="4"
            placeholder="Reason for leave..."
            value={form.reason}
            onChange={(e) =>
              setForm({
                ...form,
                reason: e.target.value,
              })
            }
            className="border rounded-lg p-3 w-full mt-4"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
    mt-5
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-6
    py-3
    rounded-xl
    transition
  "
          >
            {loading ? "Submitting..." : "Apply Leave"}
          </button>
        </div>

        {/* Leave History */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaClipboardList className="text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Leave History</h2>
                <p className="text-sm text-white/80">View your leave request history</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto p-6">
          {leaves.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow">
              <h3 className="text-lg font-semibold">No Leave Requests Found</h3>

              <p className="text-gray-500 mt-2">
                Apply your first leave request.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left">Type</th>

                    <th className="p-3 text-left">From</th>
                    <th className="p-3 text-left">Days</th>

                    <th className="p-3 text-left">To</th>

                    <th className="p-3 text-left">Reason</th>

                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {leaves.map((leave) => (
                    <tr key={leave._id} className="border-b">
                      <td className="p-3">{leave.leaveType}</td>

                      <td className="p-3">
                        {new Date(leave.fromDate).toLocaleDateString()}
                      </td>

                      <td className="p-3">
                        {Math.ceil(
                          (new Date(leave.toDate) - new Date(leave.fromDate)) /
                            (1000 * 60 * 60 * 24)
                        ) + 1}
                      </td>

                      <td className="p-3">{leave.toDate}</td>

                      <td className="p-3">{leave.reason}</td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            leave.status
                          )}`}
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
    </DashboardLayout>
  );
}

export default StudentLeave;