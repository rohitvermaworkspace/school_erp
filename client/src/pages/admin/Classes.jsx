import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layout/AppLayout";
import ClassTable from "../../components/classes/ClassTable";
import AddClassModal from "../../components/classes/AddClassModal";
import EditClassModal from "../../components/classes/EditClassModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import ClassDistributionChart from "../../components/classes/ClassDistributionChart";
import api from "../../services/api";
import toast from "react-hot-toast";

import { FaSchool, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [sectionFilter, setSectionFilter] = useState("");

  useEffect(() => {
    fetchClasses();
  }, []);
  useEffect(() => {
  }, [classes]);

  const sections = [
    ...new Set(classes.map(c => c.section))
  ];

  const classDistribution = classes.map(c => ({
    className: `${c.className}-${c.section}`,
    students: c.totalStudents || 0
  }));

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/classes");
      setClasses(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch classes");
    } finally {
      setLoading(false);
    }
  };

  const deleteClass = async () => {
    try {
      setDeleteLoading(true);
      await api.delete(`/classes/${deleteId}`);
      toast.success("Class deleted successfully");
      fetchClasses();
      setConfirmOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete class");
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredClasses = useMemo(() => {
    return classes.filter((cls) => {

      const matchesSearch =
        cls.className?.toLowerCase().includes(search.toLowerCase()) ||
        cls.section?.toLowerCase().includes(search.toLowerCase()) ||
        cls.classTeacher?.toLowerCase().includes(search.toLowerCase());

      const matchesSection =
        sectionFilter === "" ||
        cls.section === sectionFilter;

      return matchesSearch && matchesSection;
    });
  }, [classes, search, sectionFilter]);

  const totalStudents = classes.reduce(
    (total, cls) => total + (cls.totalStudents || 0),
    0
  );
  const uniqueTeachers = new Set(
  classes
      .filter((cls) => cls.classTeacher?._id)
      .map((cls) => cls.classTeacher._id.toString())
  ).size;

  const avgStudentsPerClass =
    classes.length > 0
      ? (totalStudents / classes.length).toFixed(1)
      : 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = filteredClasses.slice(
    indexOfFirstClass,
    indexOfLastClass
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6">
          <h2 className="text-2xl font-bold">Class Management</h2>

          <p className="mt-2 opacity-80">
            Manage classes, sections, teachers and student distribution.
          </p>
        </div>
        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Total Classes */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-purple-100">
                  Total Classes
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {classes.length}
                </h2>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                <FaSchool />
              </div>
            </div>
          </div>
          {/* Students */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-100">
                  Students
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {totalStudents}
                </h2>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                <FaUsers />
              </div>
            </div>
          </div>
          {/* Teachers */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-orange-100">
                  Teachers Assigned
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {uniqueTeachers}
                </h2>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                <FaChalkboardTeacher />
              </div>
            </div>
          </div>
          {/* Average */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100">
                  Avg Students/Class
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {avgStudentsPerClass}
                </h2>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                <FaUsers />
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CARD */}
         <ClassDistributionChart
            data={classDistribution}
          />

        {/* MAIN CARD */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <FaSchool className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Class Management</h2>
                  <p className="text-sm text-white/80">Manage all classes and sections</p>
                </div>
              </div>
              <button
                onClick={() => setOpenModal(true)}
                className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
              >
                + Add Class
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto p-6">

          {/* SEARCH */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search class..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-white px-4 py-3 rounded-xl"
            />

            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-white px-4 py-3 rounded-xl"
            >
              <option value="">All Sections</option>

              {sections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setSearch("");
                setSectionFilter("");
              }}
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-3"
            >
              Clear Filters
            </button>
          </div>

          <ClassTable
            classes={currentClasses}
            loading={loading}
            onEdit={(cls) => {
              setSelectedClass(cls);
              setEditModal(true);
            }}
            onDelete={(id) => {
              setDeleteId(id);
              setConfirmOpen(true);
            }}
          />

          <div className="flex justify-between items-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            <span>
              Showing {indexOfFirstClass + 1} to{" "}
              {Math.min(indexOfLastClass, filteredClasses.length)} of{" "}
              {filteredClasses.length} classes
            </span>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8 flex-wrap">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl border dark:border-slate-700 dark:text-white disabled:opacity-50"
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
                      : "border dark:border-slate-700 dark:text-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 rounded-xl border dark:border-slate-700 dark:text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
          </div>
        </div>

        <AddClassModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          fetchClasses={fetchClasses}
        />

        <EditClassModal
          isOpen={editModal}
          onClose={() => setEditModal(false)}
          classData={selectedClass}
          fetchClasses={fetchClasses}
        />

        <ConfirmModal
          isOpen={confirmOpen}
          title="Delete Class"
          message="Are you sure you want to delete this class?"
          onConfirm={deleteClass}
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

export default Classes;