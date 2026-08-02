import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../components/layout/AppLayout";
import AuditLogTable from "../../components/audit/AuditLogTable";
import AuditFilters from "../../components/audit/AuditFilters";

import api from "../../services/api";

function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    module: "",
    action: "",
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    applyFilters();
    setCurrentPage(1);
  }, [logs, filters]);

  const fetchLogs = async () => {
    try {
      const res =
        await api.get("/audit-logs");

      setLogs(res.data);
    } catch (error) {
      toast.error(
        "Failed to load audit logs"
      );
    }
  };

  const applyFilters = () => {
    let data = [...logs];

    if (filters.search) {
      data = data.filter(
        (log) =>
          log.details
            ?.toLowerCase()
            .includes(
              filters.search.toLowerCase()
            ) ||
          log.performedBy?.name
            ?.toLowerCase()
            .includes(
              filters.search.toLowerCase()
            )
      );
    }

    if (filters.module) {
      data = data.filter(
        (log) =>
          log.module ===
          filters.module
      );
    }

    if (filters.action) {
      data = data.filter(
        (log) =>
          log.action ===
          filters.action
      );
    }

    setFilteredLogs(data);
  };
  const totalLogs = logs.length;

const createCount = logs.filter(
  (log) => log.action === "CREATE"
).length;

const updateCount = logs.filter(
  (log) => log.action === "UPDATE"
).length;

const deleteCount = logs.filter(
  (log) => log.action === "DELETE"
).length;

const todayLogs = logs.filter((log) => {
  const today = new Date().toDateString();

  return (
    new Date(log.createdAt).toDateString() === today
  );
}).length;

const [currentPage, setCurrentPage] = useState(1);

const recordsPerPage = 10;

const indexOfLastRecord =
  currentPage * recordsPerPage;

const indexOfFirstRecord =
  indexOfLastRecord - recordsPerPage;

const currentLogs =
  filteredLogs.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

const totalPages = Math.ceil(
  filteredLogs.length / recordsPerPage
);
  return (
  <AdminLayout>
    <div className="space-y-6">

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

        <div className="relative flex flex-col lg:flex-row lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black">
              Audit Logs
            </h1>

            <p className="mt-2 text-white/80 text-lg">
              Monitor every action performed
              inside the ERP system
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-3xl px-6 py-5">
            <p className="text-xs uppercase tracking-wider text-white/70">
              Today's Activities
            </p>

            <h2 className="text-5xl font-black">
              {todayLogs}
            </h2>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 shadow-lg">
          <p className="text-sm text-white/80">
            Total Activities
          </p>

          <h2 className="text-4xl font-black mt-2">
            {totalLogs}
          </h2>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 shadow-lg">
          <p className="text-sm text-white/80">
            Create Actions
          </p>

          <h2 className="text-4xl font-black mt-2">
            {createCount}
          </h2>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 shadow-lg">
          <p className="text-sm text-white/80">
            Update Actions
          </p>

          <h2 className="text-4xl font-black mt-2">
            {updateCount}
          </h2>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-rose-500 to-red-600 text-white p-6 shadow-lg">
          <p className="text-sm text-white/80">
            Delete Actions
          </p>

          <h2 className="text-4xl font-black mt-2">
            {deleteCount}
          </h2>
        </div>

      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
          <h2 className="text-white font-bold text-xl">
            Audit Filters
          </h2>

          <p className="text-white/70 text-sm">
            Filter and search activity logs
          </p>
        </div>

        <div className="p-6">
          <AuditFilters
            filters={filters}
            setFilters={setFilters}
          />
        </div>

      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
          <h2 className="text-white font-bold text-xl">
            Activity Logs
          </h2>

          <p className="text-white/70 text-sm">
            Detailed record of all ERP actions
          </p>
        </div>

        <div className="p-4">
          <AuditLogTable
            logs={currentLogs}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

      </div>

    </div>
  </AdminLayout>
);
}

export default AuditLogs;