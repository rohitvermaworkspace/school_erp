import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaSchool } from "react-icons/fa";

function EditClassModal({
  isOpen,
  onClose,
  classData,
  fetchClasses,
}) {
  const [teachers, setTeachers] = useState([]);

  const [formData, setFormData] = useState({
    className: "",
    section: "",
    classTeacher: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchTeachers();
    }
  }, [isOpen]);

  useEffect(() => {
    if (classData) {
      setFormData({
        className: classData.className || "",
        section: classData.section || "",
        classTeacher:
          classData.classTeacher?._id ||
          classData.classTeacher ||
          "",
      });
    }
  }, [classData]);

  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teachers");
      setTeachers(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load teachers");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClose = () => {
    setFormData({
      className: "",
      section: "",
      classTeacher: "",
    });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(
        `/classes/${classData._id}`,
        formData
      );

      toast.success("Class updated successfully");
      fetchClasses();
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update class"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaSchool className="text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Edit Class</h2>
                <p className="text-indigo-100 mt-1">
                  Update class details and teacher allocation
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-xl bg-white/20 hover:bg-red-500/30 transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* CLASS NAME */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Class Name
              </label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleChange}
                placeholder="Enter class name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* SECTION */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Section
              </label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="Enter section"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* TEACHER */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Class Teacher
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Current Teacher: {classData?.classTeacher?.name || "Not Assigned"}
              </p>
              <select
                name="classTeacher"
                value={formData.classTeacher}
                onChange={handleChange}
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

            {/* FOOTER */}
            <div className="md:col-span-2 flex justify-end gap-3 pt-5 mt-2 border-t border-gray-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 transition disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Class"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditClassModal;