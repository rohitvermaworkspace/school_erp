import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

// COMPONENTS
import StudentTable from "../../components/students/StudentTable";
import AddStudentModal from "../../components/students/AddStudentModal";
import EditStudentModal from "../../components/students/EditStudentModal";
import ConfirmModal from "../../components/ui/ConfirmModal";

function Students() {
  // =====================
  // DATA
  // =====================
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // =====================
  // MODALS
  // =====================
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // =====================
  // SEARCH / FILTER
  // =====================
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");

  // =====================
  // FETCH STUDENTS
  // =====================
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/students");
      setStudents(res.data || []);
    } catch (err) {
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // =====================
  // DELETE STUDENT
  // =====================
  const handleDelete = async () => {
    try {
      await api.delete(`/students/${deleteId}`);
      toast.success("Student deleted");
      setConfirmOpen(false);
      setDeleteId(null);
      fetchStudents();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // =====================
  // FILTER STUDENTS
  // =====================
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch = s.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchClass =
        classFilter === "" || s.className === classFilter;

      return matchSearch && matchClass;
    });
  }, [students, search, classFilter]);

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Students</h1>

        <button
          onClick={() => setAddOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Student
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-3">
        <input
          className="border p-2 rounded w-full"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        >
          <option value="">All Classes</option>
          <option value="10A">10A</option>
          <option value="10B">10B</option>
        </select>
      </div>

      {/* TABLE */}
      <StudentTable
        students={filteredStudents}
        loading={loading}
        onEdit={(student) => {
          setSelectedStudent(student);
          setEditOpen(true);
        }}
        onDelete={(id) => {
          setDeleteId(id);
          setConfirmOpen(true);
        }}
      />

      {/* ADD MODAL */}
      <AddStudentModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        refresh={fetchStudents}
      />

      {/* EDIT MODAL */}
      <EditStudentModal
        isOpen={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
        refresh={fetchStudents}
      />

      {/* DELETE MODAL */}
      <ConfirmModal
        isOpen={confirmOpen}
        title="Delete Student"
        message="Are you sure you want to delete this student?"
        onConfirm={handleDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
      />
    </div>
  );
}

export default Students;