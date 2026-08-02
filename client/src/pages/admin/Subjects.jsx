import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layout/AppLayout";
import SubjectTable from "../../components/subjects/SubjectTable";
import AddSubjectModal from "../../components/subjects/AddSubjectModal";
import EditSubjectModal from "../../components/subjects/EditSubjectModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaBook, FaSchool, FaChalkboardTeacher, FaChartBar} from "react-icons/fa";
import SubjectByClassChart from "../../components/subjects/SubjectByClassChart";
import TeacherAllocationChart from "../../components/subjects/TeacherAllocationChart";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [classFilter, setClassFilter] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("");
  const [classWiseSubjects, setClassWiseSubjects] = useState([]); 
  const [teacherAllocation, setTeacherAllocation] = useState([]);

  useEffect(() => {
    fetchSubjects();
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
  try {
    const res =
      await api.get("/subjects/dashboard");
    setClassWiseSubjects(
      res.data.classWiseSubjects || []
    );
    setTeacherAllocation(
      res.data.teacherAllocation || []
    );
  } catch (error) {
    console.log(error);
  }
};
  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await api.get("/subjects");
      setSubjects(res.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch subjects");
    } finally {
      setLoading(false);
    }
  };

  const deleteSubject = async () => {
    try {
      setDeleteLoading(true);
      await api.delete(`/subjects/${deleteId}`);
      toast.success("Subject deleted successfully");
      fetchSubjects();
      setConfirmOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete subject");
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredSubjects = useMemo(() => {
    return subjects.filter(subject => {

      const matchesSearch =
        subject.subjectName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        subject.subjectCode
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesClass =
        classFilter === "" ||
        subject.className === classFilter;

      return (
        matchesSearch &&
        matchesClass
      );
    });

  }, [
    subjects,
    search,
    classFilter
  ]);
  

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filteredSubjects.length / subjectsPerPage);
  const indexOfLastSubject = currentPage * subjectsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
  const currentSubjects = filteredSubjects.slice(
    indexOfFirstSubject,
    indexOfLastSubject
  );

  const uniqueClasses = new Set(subjects.map((subject) => subject.className))
    .size;
  const avgSubjectsPerClass =
  uniqueClasses > 0
    ? (
        subjects.length /
        uniqueClasses
      ).toFixed(1)
    : 0;

  const uniqueTeachers = new Set(
    subjects.map((subject) => subject.teacher?._id)
  ).size;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6">
          <h2 className="text-2xl font-bold">
            Subject Management
          </h2>

          <p className="mt-2 opacity-80">
            Manage curriculum, class subjects and teacher allocations.
          </p>
        </div>
        {/* STATS */}
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Total Subjects */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100">
                  Total Subjects
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {subjects.length}
                </h2>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                <FaBook />
              </div>
            </div>
          </div>

          {/* Classes */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-100">
                  Classes
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {uniqueClasses}
                </h2>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                <FaSchool />
              </div>
            </div>
          </div>

          {/* Teachers */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-purple-100">
                  Teachers
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {uniqueTeachers}
                </h2>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                <FaChalkboardTeacher />
              </div>
            </div>
          </div>

          {/* Avg Subjects */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-orange-100">
                  Subjects / Class
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {avgSubjectsPerClass}
                </h2>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                <FaChartBar />
              </div>
            </div>
          </div>

        </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SubjectByClassChart
          data={classWiseSubjects}
        />
        <TeacherAllocationChart
          data={teacherAllocation}
        />
      </div>
        {/* MAIN CARD */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <FaBook className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Subject Management</h2>
                  <p className="text-sm text-white/80">Manage all subjects and teacher allocations</p>
                </div>
              </div>
              <button
                onClick={() => setOpenModal(true)}
                className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
              >
                + Add Subject
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto p-6">

          {/* SEARCH */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search Subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                bg-gray-50
                dark:bg-slate-800
                border
                border-gray-200
                dark:border-slate-700
                dark:text-white
                px-4
                py-3
                rounded-xl
              "
            />
            <select
              value={classFilter}
              onChange={(e) =>
                setClassFilter(e.target.value)
              }
              className="
                bg-gray-50
                dark:bg-slate-800
                border
                border-gray-200
                dark:border-slate-700
                dark:text-white
                px-4
                py-3
                rounded-xl
              "
            >
              <option value="">
                All Classes
              </option>

              {[...new Set(subjects.map(
                s => s.className
              ))].map(cls => (
                <option key={cls}>
                  {cls}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setSearch("");
                setClassFilter("");
                setTeacherFilter("");
              }}
              className="
                bg-red-500
                hover:bg-red-600
                text-white
                rounded-xl
                px-4
                py-3
              "
            >
              Clear Filters
            </button>
          </div>

          <SubjectTable
            subjects={currentSubjects}
            loading={loading}
            onEdit={(subject) => {
              setSelectedSubject(subject);
              setEditModal(true);
            }}
            onDelete={(id) => {
              setDeleteId(id);
              setConfirmOpen(true);
            }}
          />

          <div className="flex justify-between items-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            <span>
              Showing {indexOfFirstSubject + 1} to{" "}
              {Math.min(indexOfLastSubject, filteredSubjects.length)} of{" "}
              {filteredSubjects.length} subjects
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

        <AddSubjectModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          fetchSubjects={fetchSubjects}
        />

        <EditSubjectModal
          isOpen={editModal}
          onClose={() => setEditModal(false)}
          subject={selectedSubject}
          fetchSubjects={fetchSubjects}
        />

        <ConfirmModal
          isOpen={confirmOpen}
          title="Delete Subject"
          message="Are you sure you want to delete this subject?"
          onConfirm={deleteSubject}
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

export default Subjects;