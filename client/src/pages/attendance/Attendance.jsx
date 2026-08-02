import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layout/AppLayout";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import AddAttendanceModal from "../../components/attendance/AddAttendanceModal";
import AttendanceTrendChart from "../../components/attendance/AttendanceTrendChart";
import ClassWiseAttendanceChart from "../../components/attendance/ClassWiseAttendanceChart";
import api from "../../services/api";
import toast from "react-hot-toast";

import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaClock,
  FaChartBar,
} from "react-icons/fa";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [classes, setClasses] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  const [classFilter, setClassFilter] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [attendanceTrend, setAttendanceTrend] = useState([]);
  const [classAttendance, setClassAttendance] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    present: 0,
    absent: 0,
    late: 0,
    attendancePercentage: 0,
  });
  const statusOptions = ["present", "absent", "late"];

  const recordsPerPage = 10;

  useEffect(() => {
    fetchAttendance();
    fetchDashboard();
    fetchClasses();
  }, []);

  useEffect(() => {
  }, [attendanceTrend]);

  useEffect(() => {
  }, [classAttendance]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await api.get("/attendance");
      setAttendance(res.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/attendance/dashboard");
      setAttendanceTrend(res.data.attendanceTrend || []);
      setClassAttendance(res.data.classAttendance || []);
      setDashboardData(res.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load dashboard stats");
    }
  };

  const filteredAttendance = useMemo(() => {
    return attendance.filter((record) => {
      const matchesSearch = record.studentId?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "" || record.status === statusFilter;

      const matchesClass =
        classFilter === "" || record.studentId?.className === classFilter;

      const matchesDate =
        dateFilter === "" || record.date?.split("T")[0] === dateFilter;

      return matchesSearch && matchesStatus && matchesClass && matchesDate;
    });
  }, [attendance, search, statusFilter, classFilter, dateFilter]);

  const exportToCSV = () => {
    if (!filteredAttendance.length) {
      toast.error("No records available to export");
      return;
    }
    const csvData = filteredAttendance.map((record) => ({
      Student: record.studentId?.name || "",
      RollNumber: record.studentId?.rollNumber || "",
      Class: record.studentId?.className || "",
      Date: new Date(record.date).toLocaleDateString(),
      Status: record.status,
      MarkedBy: record.markedBy?.name || "",
    }));

    const headers = Object.keys(csvData[0]);

    const csvRows = [
      headers.join(","),
      ...csvData.map((row) =>
        headers.map((field) => `"${row[field]}"`).join(",")
      ),
    ];

    const csvString = csvRows.join("\n");

    const blob = new Blob([csvString], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute("download", `attendance-${Date.now()}.csv`);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filteredAttendance.length / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;

  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentAttendance = filteredAttendance.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const uniqueClasses = [
    ...new Map(classes.map((item) => [item.section, item])).values(),
  ];

  // ======================
  // Dashboard Statistics
  // ======================

  const { totalStudents, present, absent, late, attendancePercentage } =
    dashboardData;

  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes");

      setClasses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold">Attendance Dashboard</h2>

          <p className="mt-2 opacity-80">
            View attendance records, filter by class, date and status.
          </p>
        </div>
        {/* STATS */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="rounded-3xl p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-purple-100">Total Students</p>

                  <h2 className="text-3xl font-bold dark:text-white mt-2">
                    {totalStudents}
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                  <FaUsers />
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-green-100">Present</p>

                  <h2 className="text-4xl font-bold mt-2">{present}</h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                  <FaUserCheck />
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-6 bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-red-100">Absent</p>

                  <h2 className="text-3xl font-bold dark:text-white mt-2">
                    {absent}
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                  <FaUserTimes />
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-6 bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-yellow-100">Late</p>

                  <h2 className="text-3xl font-bold dark:text-white mt-2">
                    {late}
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                  <FaClock />
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-100">Attendance %</p>

                  <h2 className="text-3xl font-bold dark:text-white mt-2">
                    {attendancePercentage}%
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                  <FaChartBar />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <AttendanceTrendChart
            data={attendanceTrend}
          />

          <ClassWiseAttendanceChart
            data={classAttendance}
          />
        </div>

        {/* TABLE CARD */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6">
          <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold dark:text-white">Attendance</h1>

              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage student attendance
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setOpenModal(true)}
                className="bg-primary text-white px-5 py-3 rounded-xl"
              >
                + Mark Attendance
              </button>

              <button
                onClick={exportToCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
              >
                Export CSV
              </button>
            </div>
          </div>

          {/* SEARCH */}

          {/* FILTERS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* Search */}
            <input
              type="text"
              placeholder="Search Student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-white px-4 py-3 rounded-xl"
            />

            {/* Class Filter */}
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-white px-4 py-3 rounded-xl"
            >
              <option value="">All Classes</option>

              {uniqueClasses.map((cls) => (
                <option key={cls._id} value={cls.section}>
                  {cls.className} - {cls.section}
                </option>
              ))}
            </select>
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-white px-4 py-3 rounded-xl"
            >
              <option value="">All Status</option>

              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            {/* Date Filter */}
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-white px-4 py-3 rounded-xl"
            />

            {/* Reset Button */}
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("");
                setClassFilter("");
                setDateFilter("");
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl transition"
            >
              Clear Filters
            </button>
          </div>

          <AttendanceTable attendance={currentAttendance} loading={loading} />

          <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
            <span>
              Showing {indexOfFirstRecord + 1} to{" "}
              {Math.min(indexOfLastRecord, filteredAttendance.length)} of{" "}
              {filteredAttendance.length} records
            </span>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
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
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 border rounded-xl"
              >
                Next
              </button>
            </div>
          )}
        </div>

        <AddAttendanceModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          fetchAttendance={fetchAttendance}
        />
      </div>
    </AdminLayout>
  );
}

export default Attendance;