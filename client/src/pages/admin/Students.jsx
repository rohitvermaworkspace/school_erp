import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layout/AppLayout";
import StudentTable from "../../components/students/StudentTable";
import AddStudentModal from "../../components/students/AddStudentModal";
import EditStudentModal from "../../components/students/EditStudentModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaSchool, FaUsers, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
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
      <div className="space-y-4">
        {/* ========================= */}
        {/* HERO SECTION - Compact */}
        {/* ========================= */}

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5 shadow-lg">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <FaUserGraduate className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Students</h1>
                <div className="flex gap-3 text-white/80 text-xs">
                  <span>{students.length} students</span>
                  <span>·</span>
                  <span>{uniqueClasses.length} classes</span>
                  <span>·</span>
                  <span>2026-27</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/admin/student-admission")}
              className="px-4 py-1.5 rounded-lg bg-white text-indigo-700 font-semibold text-xs shadow hover:scale-105 transition"
            >
              + Add Student
            </button>
          </div>
        </div>

        {/* ========================= */}
        {/* KPI CARDS - Compact */}
        {/* ========================= */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3 text-white shadow flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs font-medium">Total Students</p>
              <h2 className="text-2xl font-bold mt-1">{students.length}</h2>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <FaUsers className="text-lg" />
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 p-3 text-white shadow flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs font-medium">Active Classes</p>
              <h2 className="text-2xl font-bold mt-1">{uniqueClasses.length}</h2>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <FaChalkboardTeacher className="text-lg" />
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 p-3 text-white shadow flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-xs font-medium">Present Today</p>
              <h2 className="text-2xl font-bold mt-1">-</h2>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <FaUserGraduate className="text-lg" />
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-rose-500 to-red-600 p-3 text-white shadow flex items-center justify-between">
            <div>
              <p className="text-red-100 text-xs font-medium">Pending Fees</p>
              <h2 className="text-2xl font-bold mt-1">-</h2>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <FaUsers className="text-lg" />
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* QUICK STATS - Compact */}
        {/* ========================= */}

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-900 rounded-lg p-2 text-center">
            <p className="text-[10px] uppercase text-blue-600 font-semibold">Students</p>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">{students.length}</h3>
          </div>
          <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-900 rounded-lg p-2 text-center">
            <p className="text-[10px] uppercase text-green-600 font-semibold">Classes</p>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">{uniqueClasses.length}</h3>
          </div>
          <div className="bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-900 rounded-lg p-2 text-center">
            <p className="text-[10px] uppercase text-purple-600 font-semibold">Admissions</p>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">-</h3>
          </div>
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-900 rounded-lg p-2 text-center">
            <p className="text-[10px] uppercase text-red-600 font-semibold">Pending</p>
            <h3 className="text-lg font-bold text-red-500">-</h3>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-900 rounded-lg p-2 text-center">
            <p className="text-[10px] uppercase text-emerald-600 font-semibold">Present</p>
            <h3 className="text-lg font-bold text-emerald-500">-</h3>
          </div>
          <div className="bg-pink-50 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-900 rounded-lg p-2 text-center">
            <p className="text-[10px] uppercase text-pink-600 font-semibold">Top</p>
            <h3 className="text-lg font-bold text-pink-500">-</h3>
          </div>
        </div>

        {/* ========================= QUICK FILTERS ========================= */}

        <div className="flex flex-wrap gap-2">
          {["All Students", "Active", "New Admission", "Pending Fees"].map((item) => (
            <button
              key={item}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border dark:border-slate-800 dark:text-white text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-500/20 transition"
            >
              {item}
            </button>
          ))}
        </div>

        {/* ========================= TABLE CONTAINER ========================= */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow overflow-hidden">
          <div className="p-4">
            {/* SEARCH + FILTER */}
            <div className="flex flex-col lg:flex-row gap-3 mb-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by student name..."
                className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white text-sm"
              />

              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white text-sm"
              >
                <option value="">All Classes</option>
                {uniqueClasses.map((className) => (
                  <option key={className} value={className}>{className}</option>
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
          </div>
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