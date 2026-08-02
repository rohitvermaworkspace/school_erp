import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layout/AppLayout";
import StudentTable from "../../components/students/StudentTable";
import AddStudentModal from "../../components/students/AddStudentModal";
import EditStudentModal from "../../components/students/EditStudentModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaUserGraduate, FaUsers, FaChalkboardTeacher, FaSchool } from "react-icons/fa";
import ViewStudentDrawer from "../../components/students/ViewStudentDrawer";
import { useNavigate } from "react-router-dom";

function Students() {

  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  // Search
  const [search, setSearch] = useState("");
  // Filter
  const [classFilter, setClassFilter] = useState("");
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  // Edit Modal
  const [editModal, setEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  // Delete Modal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);

  // ===============================
  // FETCH STUDENTS
  // ===============================

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/students");
      const sortedStudents = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setStudents(sortedStudents);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
  setSelectedStudent(student);
  // Close View Drawer
  setViewDrawerOpen(false);
  // Open Edit Modal
  setEditModal(true);
};
  // ===============================
  // DELETE STUDENT
  // ===============================

  const deleteStudent = async () => {
    try {
      setDeleteLoading(true);
      await api.delete(`/students/${deleteId}`);
      toast.success("Student deleted successfully");
      fetchStudents();
      setConfirmOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete student");
    } finally {
      setDeleteLoading(false);
    }
  };

  // ===============================
  // FILTER STUDENTS
  // ===============================

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = student.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const studentClass =
        student.academic?.className || student.className;

      const matchesClass =
        classFilter === "" || studentClass === classFilter;

      return matchesSearch && matchesClass;
    });
  }, [students, search, classFilter]);

  // ===============================
  // PAGINATION
  // ===============================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / studentsPerPage)
  );
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Reset page when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, classFilter]);

  // ===============================
  // UNIQUE CLASSES
  // ===============================

 const uniqueClasses = [
    ...new Set(
      students
        .map(
          (student) =>
            student.academic?.className || student.className
        )
        .filter(Boolean)
    ),
  ];
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* ========================= */}
        {/* HERO SECTION */}
        {/* ========================= */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-xl">
          {/* Background Effects */}
          <div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

            <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
              {/* Left Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-4">
                  🎓 Student Management Module
                </div>
                <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight">
                  Students Management
                </h1>
                <p className="text-blue-100 text-lg mt-3 max-w-2xl">
                  Manage admissions, attendance, academic performance, fee
                  records and student lifecycle from a single dashboard.
                </p>

                <div className="flex flex-wrap gap-6 mt-6 text-white">
                  <div>
                    <p className="text-blue-200 text-sm">Total Students</p>
                    <h3 className="text-2xl font-bold">{students.length}</h3>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Active Classes</p>
                    <h3 className="text-2xl font-bold">
                      {uniqueClasses.length}
                    </h3>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Academic Year</p>
                    <h3 className="text-2xl font-bold">2026-27</h3>
                  </div>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition">
                  Import Excel
                </button>

                <button className="px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition">
                  Export Excel
                </button>

                <button
                 onClick={() => navigate("/admin/student-admission")}
                  className="px-6 py-3 rounded-2xl bg-white text-indigo-700 font-semibold shadow-xl hover:scale-105 transition"
                >
                  + Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ========================= */}
        {/* KPI CARDS */}
        {/* ========================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Total Students */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Total Students
                </p>

                <h2 className="text-4xl font-black mt-2">{students.length}</h2>

                <p className="text-sm mt-3 text-blue-100">
                  +12% from last month
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaUsers className="text-3xl" />
              </div>
            </div>
          </div>

          {/* Active Classes */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Active Classes
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {uniqueClasses.length}
                </h2>

                <p className="text-sm mt-3 text-green-100">
                  +2 this academic year
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaChalkboardTeacher className="text-3xl" />
              </div>
            </div>
          </div>

          {/* Present Today */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  Present Today
                </p>

                <h2 className="text-4xl font-black mt-2">810</h2>

                <p className="text-sm mt-3 text-purple-100">92% attendance</p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaUserGraduate className="text-3xl" />
              </div>
            </div>
          </div>

          {/* Pending Fees */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 to-red-600 p-6 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-6 translate-x-6" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Pending Fees</p>

                <h2 className="text-4xl font-black mt-2">₹75K</h2>

                <p className="text-sm mt-3 text-red-100">75 Students Pending</p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <FaUsers className="text-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* QUICK STATS OVERVIEW */}
        {/* ========================= */}

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200 dark:border-blue-900 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">
              Students
            </p>

            <h3 className="text-2xl font-black mt-2 text-slate-800 dark:text-white">
              {students.length}
            </h3>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 dark:border-green-900 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-green-600 font-semibold">
              Classes
            </p>

            <h3 className="text-2xl font-black mt-2 text-slate-800 dark:text-white">
              {uniqueClasses.length}
            </h3>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-200 dark:border-purple-900 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-purple-600 font-semibold">
              Admissions
            </p>

            <h3 className="text-2xl font-black mt-2 text-slate-800 dark:text-white">
              24
            </h3>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-200 dark:border-red-900 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-red-600 font-semibold">
              Pending Fees
            </p>

            <h3 className="text-2xl font-black mt-2 text-red-500">75</h3>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-200 dark:border-emerald-900 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">
              Present
            </p>

            <h3 className="text-2xl font-black mt-2 text-emerald-500">810</h3>
          </div>

          <div className="bg-gradient-to-r from-pink-500/10 to-fuchsia-500/10 border border-pink-200 dark:border-pink-900 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-pink-600 font-semibold">
              Top Performers
            </p>

            <h3 className="text-2xl font-black mt-2 text-pink-500">120</h3>
          </div>
        </div>

        {/* ========================= QUICK FILTERS ========================= */}

        <div className="flex flex-wrap gap-3">
          {[
            "All Students",
            "Active",
            "New Admission",
            "Pending Fees",
            "Top Performers",
          ].map((item) => (
            <button
              key={item}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border dark:border-slate-800 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-500/20 transition"
            >
              {item}
            </button>
          ))}
        </div>

        {/* ========================= TABLE CONTAINER ========================= */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaSchool className="text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Student Directory</h2>
                <p className="text-sm text-white/80">Manage all student records and enrollment</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto p-6">
          {/* SEARCH + FILTER */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, roll no, phone..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white"
            />

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white"
            >
              <option value="">All Classes</option>
              {uniqueClasses.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          {/* TABLE */}
          <StudentTable
              students={currentStudents}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onDelete={(id) => {
                setDeleteId(id);
                setConfirmOpen(true);
              }}
              onEdit={(student) => {
                setSelectedStudent(student);
                setEditModal(true);
              }}
              onView={(student) => {
                setViewStudent(student);
                setViewDrawerOpen(true);
              }}
            />
          <ViewStudentDrawer
            isOpen={viewDrawerOpen}
            student={viewStudent}
            onClose={() => {
              setViewDrawerOpen(false);
              setViewStudent(null);
            }}
            onEdit={handleEdit}
          />
        </div>
      </div>
      <EditStudentModal
        isOpen={editModal}
        onClose={() => {
          setEditModal(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
        fetchStudents={fetchStudents}
      />
      <ConfirmModal
        isOpen={confirmOpen}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
        onConfirm={deleteStudent}
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

export default Students;