import {
  useEffect,
  useState,
} from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function AddSubjectModal({
  isOpen,
  onClose,
  fetchSubjects,
}) {
  const [teachers, setTeachers] =
    useState([]);

  const [classes, setClasses] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      subjectName: "",
      subjectCode: "",
      className: "",
      teacher: "",
    });

  useEffect(() => {
    if (isOpen) {
      fetchDropdowns();
    }
  }, [isOpen]);

  const fetchDropdowns =
    async () => {
      try {
        const [teacherRes, classRes] =
          await Promise.all([
            api.get("/teachers"),
            api.get("/classes"),
          ]);

        setTeachers(teacherRes.data);
        setClasses(classRes.data);
      } catch (error) {
        console.log(error);
      }
    };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(
        "/subjects",
        formData
      );

      toast.success(
        "Subject added successfully"
      );

      fetchSubjects();

      onClose();

      setFormData({
        subjectName: "",
        subjectCode: "",
        className: "",
        teacher: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to add subject"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-lg">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-white">
            Add Subject
          </h2>

          <button
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="subjectName"
            placeholder="Subject Name"
            value={
              formData.subjectName
            }
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border"
          />

          <input
            type="text"
            name="subjectCode"
            placeholder="Subject Code"
            value={
              formData.subjectCode
            }
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border"
          />

          <select
            name="className"
            value={
              formData.className
            }
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border"
          >
            <option value="">
              Select Class
            </option>

            {classes.map((cls) => (
              <option
                key={cls._id}
                value={cls.section}
              >
                {cls.section}
              </option>
            ))}
          </select>

          <select
            name="teacher"
            value={
              formData.teacher
            }
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border"
          >
            <option value="">
              Select Teacher
            </option>

            {teachers.map(
              (teacher) => (
                <option
                  key={
                    teacher._id
                  }
                  value={
                    teacher._id
                  }
                >
                  {
                    teacher.name
                  }
                </option>
              )
            )}
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl"
            >
              {loading
                ? "Saving..."
                : "Add Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSubjectModal;