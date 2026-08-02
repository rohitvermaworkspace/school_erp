import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layout/AppLayout";
import TeacherTable from "../../components/teachers/TeacherTable";
import AddTeacherModal from "../../components/teachers/AddTeacherModal";
import EditTeacherModal from "../../components/teachers/EditTeacherModal";
import ConfirmModal from "../../components/ui/ConfirmModal";

import api from "../../services/api";
import toast from "react-hot-toast";

import {
  FaChalkboardTeacher,
  FaBook,
  FaUserTie,
  FaChartLine,
  FaSchool,
} from "react-icons/fa";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/teachers");

      setTeachers(res.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch teachers");
    } finally {
      setLoading(false);
    }
  };

  const deleteTeacher = async () => {
    try {
      setDeleteLoading(true);
      await api.delete(`/teachers/${deleteId}`);
      toast.success("Teacher deleted successfully");
      fetchTeachers();
      setConfirmOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete teacher");
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesSearch =
        teacher.name?.toLowerCase().includes(search.toLowerCase()) ||
        teacher.email?.toLowerCase().includes(search.toLowerCase());

      const matchesSubject =
        subjectFilter === "" || teacher.subject === subjectFilter;

      return matchesSearch && matchesSubject;
    });
  }, [teachers, search, subjectFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, subjectFilter]);

  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  const uniqueSubjects = [
    ...new Set(teachers.map((teacher) => teacher.subject).filter(Boolean)),
  ];

  const seniorTeachers = teachers.filter(
    (teacher) => Number(teacher.experience || 0) >= 5
  ).length;

  const averageExperience =
    teachers.length > 0
      ? (
          teachers.reduce(
            (sum, teacher) => sum + Number(teacher.experience || 0),
            0
          ) / teachers.length
        ).toFixed(1)
      : 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6">
          <h2 className="text-2xl font-bold">Teacher Management</h2>

          <p className="mt-2 opacity-80">
            Manage faculty records, subjects, experience and teaching
            allocations.
          </p>
        </div>
        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">
                  Total Teachers
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {teachers.length}
                </h2>
              </div>

              <FaChalkboardTeacher className="text-4xl opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">
                  Subjects Covered
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {uniqueSubjects.length}
                </h2>
              </div>

              <FaBook className="text-4xl opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">
                Senior Faculty
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {seniorTeachers}
              </h2>
            </div>

            <FaUserTie className="text-4xl opacity-80" />
          </div>
        </div>

          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">
                Avg Experience
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {averageExperience}
              </h2>
            </div>

            <FaChartLine className="text-4xl opacity-80" />
          </div>
        </div>
        </div>

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
                  <h2 className="text-xl font-bold">Teacher Directory</h2>
                  <p className="text-sm text-white/80">Manage faculty records, subjects and experience</p>
                </div>
              </div>
              <button
                onClick={() => setOpenModal(true)}
                className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
              >
                + Add Teacher
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto p-6">

          {/* SEARCH + FILTER */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by teacher name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-white px-4 py-3 rounded-xl"
            />

            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-white px-4 py-3 rounded-xl"
            >
              <option value="">All Subjects</option>

              {uniqueSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 font-medium">
              Total Teachers: {teachers.length}
            </div>

            <div className="px-4 py-2 rounded-xl bg-green-50 dark:bg-green-500/10 text-green-600 font-medium">
              Subjects: {uniqueSubjects.length}
            </div>

            <div className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 font-medium">
              Senior Faculty: {seniorTeachers}
            </div>

            <div className="px-4 py-2 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 font-medium">
              Avg Experience: {averageExperience} yrs
            </div>
          </div>
          <TeacherTable
            teachers={currentTeachers}
            loading={loading}
            onEdit={(teacher) => {
              console.log("Teacher Data:", teacher);
              setSelectedTeacher(teacher);
              setEditModal(true);
            }}
            onDelete={(id) => {
              setDeleteId(id);
              setConfirmOpen(true);
            }}
          />
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>
              Showing {indexOfFirstTeacher + 1} to{" "}
              {Math.min(indexOfLastTeacher, filteredTeachers.length)} of{" "}
              {filteredTeachers.length} teachers
            </span>
          </div>
          {/* PAGINATION */}

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

        <AddTeacherModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          fetchTeachers={fetchTeachers}
        />

        <EditTeacherModal
          isOpen={editModal}
          onClose={() => setEditModal(false)}
          teacher={selectedTeacher}
          fetchTeachers={fetchTeachers}
        />

        <ConfirmModal
          isOpen={confirmOpen}
          title="Delete Teacher"
          message="Are you sure you want to delete this teacher?"
          onConfirm={deleteTeacher}
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

export default Teachers;