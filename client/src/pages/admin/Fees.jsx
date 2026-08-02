import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layout/AppLayout";
import FeeTable from "../../components/fees/FeeTable";
import AddFeeModal from "../../components/fees/AddFeeModal";
import EditFeeModal from "../../components/fees/EditFeeModal";
import ConfirmModal from "../../components/ui/ConfirmModal";

import api from "../../services/api";
import toast from "react-hot-toast";

import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaRupeeSign,
  FaSchool,
} from "react-icons/fa";

function Fees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const feesPerPage = 5;

  const [openModal, setOpenModal] = useState(false);

  const [editModal, setEditModal] = useState(false);

  const [selectedFee, setSelectedFee] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await api.get("/fees");

      const feesData = Array.isArray(res.data?.data) ? res.data.data : [];

      setFees(feesData);
    } catch (err) {
      console.log(err);
      setFees([]); // important fallback
    }
  };

  const deleteFee = async () => {
    try {
      setDeleteLoading(true);

      await api.delete(`/fees/${deleteId}`);

      toast.success("Fee deleted successfully");

      fetchFees();

      setConfirmOpen(false);

      setDeleteId(null);
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete fee");
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredFees = useMemo(() => {
    return fees.filter((fee) => {
      const matchesSearch =
        fee.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
        fee.student?.rollNumber?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "" || fee.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [fees, search, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filteredFees.length / feesPerPage);

  const indexOfLastFee = currentPage * feesPerPage;

  const indexOfFirstFee = indexOfLastFee - feesPerPage;

  const currentFees = filteredFees.slice(indexOfFirstFee, indexOfLastFee);

  const totalFees = fees.reduce((sum, fee) => sum + Number(fee.amount), 0);

  const collectedFees = fees
    .filter((fee) => fee.status === "Paid")
    .reduce((sum, fee) => sum + Number(fee.amount), 0);

  const pendingFees = fees
    .filter((fee) => fee.status === "Pending")
    .reduce((sum, fee) => sum + Number(fee.amount), 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HERO HEADER */}
        <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold">
            Fees Management
          </h2>

          <p className="mt-2 opacity-90">
            Track fee collection, pending payments and student financial records.
          </p>
        </div>
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Total Fees */}

          <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="opacity-80 text-sm">
                  Total Fees
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  ₹{totalFees.toLocaleString()}
                </h2>
              </div>

              <FaMoneyBillWave className="text-4xl opacity-80" />
            </div>
          </div>

          {/* Collected */}

          <div className="rounded-2xl p-6 bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="opacity-80 text-sm">
                  Collected
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  ₹{collectedFees.toLocaleString()}
                </h2>
              </div>

              <FaCheckCircle className="text-4xl opacity-80" />
            </div>
          </div>

          {/* Pending */}

          <div className="rounded-2xl p-6 bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="opacity-80 text-sm">
                  Pending
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  ₹{pendingFees.toLocaleString()}
                </h2>
              </div>

              <FaClock className="text-4xl opacity-80" />
            </div>
          </div>

          {/* Records */}

          <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="opacity-80 text-sm">
                  Records
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {fees.length}
                </h2>
              </div>

              <FaRupeeSign className="text-4xl opacity-80" />
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-800 shadow-sm">
            <p className="text-gray-500 text-sm">
              Collection Rate
            </p>

            <h4 className="font-semibold mt-2 dark:text-white">
              {totalFees > 0
                ? Math.round(
                    (collectedFees / totalFees) * 100
                  )
                : 0}
              %
            </h4>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-800 shadow-sm">
            <p className="text-gray-500 text-sm">
              Paid Records
            </p>

            <h4 className="font-semibold mt-2 dark:text-white">
              {
                fees.filter(
                  (fee) => fee.status === "Paid"
                ).length
              }
            </h4>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-800 shadow-sm">
            <p className="text-gray-500 text-sm">
              Pending Records
            </p>

            <h4 className="font-semibold mt-2 dark:text-white">
              {
                fees.filter(
                  (fee) => fee.status === "Pending"
                ).length
              }
            </h4>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-800 shadow-sm">
            <p className="text-gray-500 text-sm">
              Outstanding Amount
            </p>

            <h4 className="font-semibold mt-2 text-red-500">
              ₹{pendingFees.toLocaleString()}
            </h4>
          </div>

        </div>

        {/* MAIN CARD */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaSchool className="text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Fees Management</h2>
                <p className="text-sm text-white/80">Manage student fee records and payments</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto p-6">

          {/* SEARCH */}

         <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:opacity-90"
            >
              + Add Fee
            </button>
          </div>

          <FeeTable
            fees={currentFees}
            loading={loading}
            onEdit={(fee) => {
              setSelectedFee(fee);
              setEditModal(true);
            }}
            onDelete={(id) => {
              setDeleteId(id);
              setConfirmOpen(true);
            }}
          />

          <div className="flex justify-between items-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            <span>
              Showing {indexOfFirstFee + 1} to{" "}
              {Math.min(indexOfLastFee, filteredFees.length)} of{" "}
              {filteredFees.length} records
            </span>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 border rounded-xl"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-xl ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "border"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 border rounded-xl"
              >
                Next
              </button>
            </div>
          )}
          </div>
        </div>

        <AddFeeModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          fetchFees={fetchFees}
        />

        <EditFeeModal
          isOpen={editModal}
          onClose={() => setEditModal(false)}
          fee={selectedFee}
          fetchFees={fetchFees}
        />

        <ConfirmModal
          isOpen={confirmOpen}
          title="Delete Fee"
          message="Are you sure you want to delete this fee record?"
          onConfirm={deleteFee}
          onCancel={() => {
            setConfirmOpen(false);
            setDeleteId(null);
          }}
          loading={deleteLoading}
        />
      </div>
    </AdminLayout>
  );
}

export default Fees;