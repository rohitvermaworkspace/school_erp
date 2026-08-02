import { useEffect, useState } from "react";
import api from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Receipt from "../../components/fees/Receipt";
import { useNavigate } from "react-router-dom";

import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPercentage,
  FaSearch,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function StudentFees() {
  const [fees, setFees] = useState([]);
  const [selectedFee, setSelectedFee] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await api.get("/fees/my");
      setFees(res.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ===============================
  // CALCULATIONS
  // ===============================

  const totalFees = fees.reduce(
    (acc, fee) => acc + fee.amount,
    0
  );

  const totalPaid = fees.reduce(
    (acc, fee) =>
      acc + (fee.status === "Paid" ? fee.amount : 0),
    0
  );

  const totalPending = fees.reduce(
    (acc, fee) =>
      acc + (fee.status === "Pending" ? fee.amount : 0),
    0
  );

  const paidPercentage =
    totalFees > 0
      ? Math.round((totalPaid / totalFees) * 100)
      : 0;

  // ===============================
  // FILTERS
  // ===============================

  const filteredFees = fees.filter((fee) => {
    const matchesSearch =
      fee.month
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      fee.feeType
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : fee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ===============================
  // CHART DATA
  // ===============================

  const chartData = fees.map((fee) => ({
    month: fee.month,
    amount: fee.amount,
  }));

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">

        {/* ================= HERO ================= */}

        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-3xl font-bold">
            Fees Management
          </h1>

          <p className="mt-2 opacity-90">
            Track payments, pending dues and receipts.
          </p>
        </div>

        {/* ================= KPI CARDS ================= */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between">
              <div>
                <p>Total Fees</p>

                <h2 className="text-3xl font-bold">
                  ₹{totalFees}
                </h2>
              </div>

              <FaMoneyBillWave size={40} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between">
              <div>
                <p>Paid</p>

                <h2 className="text-3xl font-bold">
                  ₹{totalPaid}
                </h2>
              </div>

              <FaCheckCircle size={40} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between">
              <div>
                <p>Pending</p>

                <h2 className="text-3xl font-bold">
                  ₹{totalPending}
                </h2>
              </div>

              <FaExclamationTriangle size={40} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between">
              <div>
                <p>Paid %</p>

                <h2 className="text-3xl font-bold">
                  {paidPercentage}%
                </h2>
              </div>

              <FaPercentage size={40} />
            </div>
          </div>

        </div>

        {/* ================= CHART ================= */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">

          <h3 className="font-bold mb-5">
            Monthly Fee Trend
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ================= SEARCH + FILTER ================= */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-5">

          <div className="flex flex-col md:flex-row gap-4 justify-between">

            <div className="relative">

              <FaSearch className="absolute left-3 top-3 text-gray-400" />

              <input
                type="text"
                placeholder="Search fees..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="border rounded-xl pl-10 pr-4 py-2 w-full md:w-80"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border rounded-xl px-4 py-2"
            >
              <option value="All">
                All Status
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Pending">
                Pending
              </option>
            </select>

          </div>
        </div>

        {/* ================= TABLE ================= */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaMoneyBillWave className="text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Fee Ledger</h2>
                <p className="text-sm text-white/80">View your fee payment history</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto">
            <table className="w-full min-w-[900px]">

              <thead className="bg-gray-100 dark:bg-slate-800">
                <tr>
                  <th className="p-4 text-left">
                    Month
                  </th>

                  <th className="p-4 text-left">
                    Fee Type
                  </th>

                  <th className="p-4 text-left">
                    Amount
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Payment Date
                  </th>

                  <th className="p-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredFees.map((fee) => (

                  <tr
                    key={fee._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {fee.month}
                    </td>

                    <td className="p-4">
                      {fee.feeType}
                    </td>

                    <td className="p-4 font-semibold">
                      ₹{fee.amount}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          fee.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {fee.status}
                      </span>

                    </td>

                    <td className="p-4">

                      {fee.paymentDate
                        ? new Date(
                            fee.paymentDate
                          ).toLocaleDateString()
                        : "-"}

                    </td>

                    <td className="p-4">

                      {fee.status === "Paid" ? (

                        <button
                          onClick={() =>
                            setSelectedFee(fee)
                          }
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Receipt
                        </button>

                      ) : (

                        <button
                          onClick={() =>
                            navigate(
                              `/student/pay/${fee._id}`
                            )
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >
                          Pay Now
                        </button>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* ================= RECEIPT MODAL ================= */}

        {selectedFee && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

            <Receipt
              fee={selectedFee}
              onClose={() =>
                setSelectedFee(null)
              }
            />

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default StudentFees;