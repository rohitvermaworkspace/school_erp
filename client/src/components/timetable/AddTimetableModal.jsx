import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaClock,
  FaBook,
  FaChalkboardTeacher,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

function AddTimetableModal({ isOpen, onClose, fetchTimetables }) {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    className: "",
    day: "Monday",
    periods: [
      {
        startTime: "",
        endTime: "",
        subject: "",
        teacher: "",
      },
    ],
  });

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const [classesRes, subjectsRes, teachersRes] = await Promise.all([
        api.get("/classes"),
        api.get("/subjects"),
        api.get("/teachers"),
      ]);

      setClasses(classesRes.data);
      setSubjects(subjectsRes.data);
      setTeachers(teachersRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePeriodChange = (index, field, value) => {
    const updatedPeriods = [...formData.periods];

    updatedPeriods[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      periods: updatedPeriods,
    }));
  };

  const addPeriod = () => {
    setFormData((prev) => ({
      ...prev,
      periods: [
        ...prev.periods,
        {
          startTime: "",
          endTime: "",
          subject: "",
          teacher: "",
        },
      ],
    }));
  };

  const removePeriod = (index) => {
    const updatedPeriods = formData.periods.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      periods: updatedPeriods,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/timetables", formData);

      toast.success("Timetable created successfully");

      fetchTimetables();

      onClose();

      setFormData({
        className: "",
        day: "Monday",
        periods: [
          {
            startTime: "",
            endTime: "",
            subject: "",
            teacher: "",
          },
        ],
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create timetable"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaCalendarAlt className="text-2xl" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Create Timetable</h2>

                <p className="text-white/80 text-sm">
                  Manage classes, subjects and teacher schedules
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* BODY */}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* CLASS + DAY */}

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2 dark:text-white">
                Class
              </label>

              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
              >
                <option value="">Select Class</option>

                {classes.map((cls) => (
                  <option
                    key={cls._id}
                    value={cls.section}
                  >
                  {cls.section}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 dark:text-white">
                Day
              </label>

              <select
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
              >
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
              </select>
            </div>
          </div>

          {/* PERIODS */}

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold dark:text-white">
                Class Periods
              </h3>

              <button
                type="button"
                onClick={addPeriod}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
              >
                <FaPlus />
                Add Period
              </button>
            </div>

            {formData.periods.map((period, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold dark:text-white">
                    Period {index + 1}
                  </h4>

                  {formData.periods.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePeriod(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  {/* START */}

                  <div>
                    <label className="text-sm font-medium mb-2 block dark:text-gray-300">
                      Start Time
                    </label>

                    <div className="relative">
                      <FaClock className="absolute left-3 top-4 text-gray-400" />

                      <input
                        type="time"
                        value={period.startTime}
                        onChange={(e) =>
                          handlePeriodChange(index, "startTime", e.target.value)
                        }
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* END */}

                  <div>
                    <label className="text-sm font-medium mb-2 block dark:text-gray-300">
                      End Time
                    </label>

                    <div className="relative">
                      <FaClock className="absolute left-3 top-4 text-gray-400" />

                      <input
                        type="time"
                        value={period.endTime}
                        onChange={(e) =>
                          handlePeriodChange(index, "endTime", e.target.value)
                        }
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* SUBJECT */}

                  <div>
                    <label className="text-sm font-medium mb-2 block dark:text-gray-300">
                      Subject
                    </label>

                    <div className="relative">
                      <FaBook className="absolute left-3 top-4 text-gray-400" />

                      <select
                        value={period.subject}
                        onChange={(e) =>
                          handlePeriodChange(index, "subject", e.target.value)
                        }
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
                      >
                        <option value="">Select Subject</option>

                        {subjects.map((subject) => (
                          <option key={subject._id} value={subject._id}>
                            {subject.subjectName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* TEACHER */}

                  <div>
                    <label className="text-sm font-medium mb-2 block dark:text-gray-300">
                      Teacher
                    </label>

                    <div className="relative">
                      <FaChalkboardTeacher className="absolute left-3 top-4 text-gray-400" />

                      <select
                        value={period.teacher}
                        onChange={(e) =>
                          handlePeriodChange(index, "teacher", e.target.value)
                        }
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
                      >
                        <option value="">Select Teacher</option>

                        {teachers.map((teacher) => (
                          <option key={teacher._id} value={teacher._id}>
                            {teacher.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}

          <div className="flex justify-end gap-3 pt-5 border-t border-gray-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 dark:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Timetable"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTimetableModal;