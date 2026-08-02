import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function MarkAttendanceModal({
  isOpen,
  onClose,
  fetchAttendance,
}) {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] =
    useState({
      student: "",
      className: "",
      date: "",
      status: "present",
    });

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchStudents();
    }
  }, [isOpen]);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "student") {
      const selectedStudent =
        students.find(
          (s) => s._id === value
        );

      setFormData((prev) => ({
        ...prev,
        student: value,
        className:
          selectedStudent?.className ||
          "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(
        "/attendance",
        formData
      );

      toast.success(
        "Attendance marked successfully"
      );

      fetchAttendance();

      onClose();

      setFormData({
        student: "",
        className: "",
        date: "",
        status: "present",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to mark attendance"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">
            Mark Attendance
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <select
            name="student"
            value={formData.student}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:text-white"
          >
            <option value="">
              Select Student
            </option>

            {students.map(
              (student) => (
                <option
                  key={student._id}
                  value={student._id}
                >
                  {student.name} (
                  {student.rollNumber})
                </option>
              )
            )}
          </select>

          <input
            type="text"
            name="className"
            value={formData.className}
            readOnly
            className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:text-white"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:text-white"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:text-white"
          >
            <option value="present">
              Present
            </option>

            <option value="absent">
              Absent
            </option>

            <option value="late">
              Late
            </option>
          </select>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border p-3 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-white p-3 rounded-xl"
            >
              {loading
                ? "Saving..."
                : "Mark Attendance"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MarkAttendanceModal;