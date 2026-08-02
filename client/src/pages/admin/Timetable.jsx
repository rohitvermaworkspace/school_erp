import { useEffect, useMemo, useState } from "react";

import AdminLayout from "../../components/layout/AppLayout";
import TimetableTable from "../../components/timetable/TimetableTable";
import AddTimetableModal from "../../components/timetable/AddTimetableModal";
import EditTimetableModal from "../../components/timetable/EditTimetableModal";
import ConfirmModal from "../../components/ui/ConfirmModal";

import api from "../../services/api";
import toast from "react-hot-toast";

import {
  FaCalendarAlt,
  FaSchool,
  FaClock,
  FaChalkboardTeacher,
} from "react-icons/fa";

function Timetable() {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchClass, setSearchClass] = useState("");
  const [searchDay, setSearchDay] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    fetchTimetables();
  }, []);
  useEffect(() => {
  setCurrentPage(1);
}, [searchClass, searchDay]);

  const fetchTimetables = async () => {
    try {
      setLoading(true);
      const res = await api.get("/timetables");
      const timetableData = Array.isArray(res.data)
      ? res.data
      : [];

    const filtered = timetableData.filter(
      (item) => item.className
    );

    setTimetables(filtered);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch timetable");
    } finally {
      setLoading(false);
    }
  };

  const deleteTimetable = async () => {
    try {
      await api.delete(`/timetables/${deleteId}`);

      toast.success("Timetable deleted successfully");

      fetchTimetables();

      setConfirmOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  const filteredTimetables = useMemo(() => {
    return timetables.filter((item) => {
      const matchClass = item.className
        ?.toLowerCase()
        .includes(searchClass.toLowerCase());

      const matchDay = searchDay === "" || item.day === searchDay;

      return matchClass && matchDay;
    });
  }, [timetables, searchClass, searchDay]);

  const totalPages = Math.ceil(filteredTimetables.length / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;

  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = filteredTimetables.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

 const totalTeachers = new Set(
  timetables.flatMap(
    (item) =>
      item.periods?.map(
        (p) => p.teacher?._id || p.teacher
      ) || []
  )
).size;

const totalPeriods = timetables.reduce(
  (sum, item) =>
    sum + (item.periods?.length || 0),
  0
);

const uniqueClasses = new Set(
  timetables.map(
    (item) => item.className
  )
).size;
  return (
  <AdminLayout>
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold">Timetable Management</h2>
        <p className="mt-2 opacity-90">
          Create and manage class schedules, subjects and teacher allocations.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Timetables
              </p>
              <h2 className="text-3xl font-bold mt-2 dark:text-white">
                {timetables.length}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 text-2xl">
              <FaCalendarAlt />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Classes Covered
              </p>
              <h2 className="text-3xl font-bold mt-2 dark:text-white">
                {uniqueClasses}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center text-green-600 text-2xl">
              <FaSchool />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Teachers Assigned
              </p>
              <h2 className="text-3xl font-bold mt-2 dark:text-white">
                {totalTeachers}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 text-2xl">
              <FaChalkboardTeacher />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Periods
              </p>
              <h2 className="text-3xl font-bold mt-2 dark:text-white">
                {totalPeriods}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 text-2xl">
              <FaClock />
            </div>
          </div>
        </div>

      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
        {/* TABLE HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaCalendarAlt className="text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Timetable Management</h2>
                <p className="text-sm text-white/80">Schedule classes, subjects, teachers and academic periods</p>
              </div>
            </div>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
            >
              + Add Timetable
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-x-auto p-6">

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <input
            type="text"
            placeholder="Search by class..."
            value={searchClass}
            onChange={(e) => setSearchClass(e.target.value)}
            className="flex-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-4 py-3 rounded-xl dark:text-white"
          />

          <select
            value={searchDay}
            onChange={(e) => setSearchDay(e.target.value)}
            className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-4 py-3 rounded-xl dark:text-white"
          >
            <option value="">All Days</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>

        </div>

        <TimetableTable
          timetables={currentRecords}
          loading={loading}
          onEdit={(timetable) => {
            setSelectedTimetable(timetable);
            setEditModal(true);
          }}
          onDelete={(id) => {
            setDeleteId(id);
            setConfirmOpen(true);
          }}
        />

        {/* Record Count */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          <span>
            Showing {filteredTimetables.length === 0 ? 0 : indexOfFirstRecord + 1}
            {" "}to{" "}
            {Math.min(indexOfLastRecord, filteredTimetables.length)}
            {" "}of {filteredTimetables.length} records
          </span>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-6">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 border rounded-xl disabled:opacity-50"
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
              className="px-4 py-2 border rounded-xl disabled:opacity-50"
            >
              Next
            </button>

          </div>
        )}
        </div>
      </div>

      <AddTimetableModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        fetchTimetables={fetchTimetables}
      />

      <EditTimetableModal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        timetable={selectedTimetable}
        fetchTimetables={fetchTimetables}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        title="Delete Timetable"
        message="Are you sure you want to delete this timetable record?"
        onConfirm={deleteTimetable}
        onCancel={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
      />

    </div>
  </AdminLayout>
);
}

export default Timetable;