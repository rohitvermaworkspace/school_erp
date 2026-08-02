import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaBook } from "react-icons/fa";

function EditSubjectModal({ isOpen, onClose, subject, fetchSubjects }) {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    className: "",
    teacher: "",
  });

  useEffect(() => {
    if (isOpen) {
      fetchDropdownData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (subject) {
      setFormData({
        subjectName: subject.subjectName || "",
        subjectCode: subject.subjectCode || "",
        className: subject.className || "",
        teacher: subject.teacher?._id || "",
      });
    }
  }, [subject]);

  const fetchDropdownData = async () => {
    try {
      const [teacherRes, classRes] = await Promise.all([
        api.get("/teachers"),
        api.get("/classes"),
      ]);

      setTeachers(teacherRes.data);
      setClasses(classRes.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load dropdown data");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.put(`/subjects/${subject._id}`, formData);
      toast.success("Subject updated successfully");
      fetchSubjects();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update subject");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold dark:text-white">
              Edit Subject
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Update subject details
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Subject Name */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Subject Name
            </label>

            <input
              type="text"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              required
              placeholder="Enter subject name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Subject Code */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Subject Code
            </label>

            <input
              type="text"
              name="subjectCode"
              value={formData.subjectCode}
              onChange={handleChange}
              required
              placeholder="MATH101"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Class */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Class
            </label>

            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls.className}>
                  {cls.className} - {cls.section}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Teacher
            </label>

            <select
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          {/* Footer */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-50 shadow-lg shadow-indigo-500/20"
            >
              {loading ? "Updating..." : "Update Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSubjectModal;