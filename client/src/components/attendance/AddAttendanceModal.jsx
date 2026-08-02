import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function AddAttendanceModal({
  isOpen,
  onClose,
  fetchAttendance,
}) {
  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
  useState({
    studentId: "",
    className: "",
    date: new Date()
      .toISOString()
      .split("T")[0],
    status: "present",
  });

  useEffect(() => {
    if (isOpen) {
      fetchStudents();
    }
  }, [isOpen]);

  const fetchStudents = async () => {
    try {
      const res =
        await api.get("/students");

      setStudents(res.data);
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load students"
      );
    }
  };

  const handleStudentChange = (
    e
  ) => {
    const studentId =
      e.target.value;

    const selectedStudent =
      students.find(
        (student) =>
          student._id === studentId
      );

    setFormData({
      ...formData,
      student: studentId,
      className:
        selectedStudent?.className ||
        "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        studentId: formData.student,
        className: formData.className,
        date: formData.date,
        status: formData.status,
      };

      await api.post(
        "/attendance/mark",
        payload
      );

      toast.success(
        "Attendance marked successfully"
      );

      await fetchAttendance();

      setFormData({
        student: "",
        className: "",
        date: new Date()
          .toISOString()
          .split("T")[0],
        status: "present",
      });

      onClose();
    } catch (error) {
      console.error(error);

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg p-6 border border-gray-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
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
            value={
              formData.student
            }
            onChange={
              handleStudentChange
            }
            required
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
          >
            <option value="">
              Select Student
            </option>

            {students.map(
              (student) => (
                <option
                  key={
                    student._id
                  }
                  value={
                    student._id
                  }
                >
                  {student.name} (
                  {
                    student.rollNumber
                  }
                  )
                </option>
              )
            )}
          </select>

          <input
            type="text"
            value={
              formData.className
            }
            readOnly
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 dark:text-white"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={
              handleChange
            }
            required
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
          />

          <select
            name="status"
            value={
              formData.status
            }
            onChange={
              handleChange
            }
            required
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
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
              className="flex-1 border border-gray-300 dark:border-slate-700 p-3 rounded-xl"
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

export default AddAttendanceModal;