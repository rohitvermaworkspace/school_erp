import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
 FaCalendarAlt
} from "react-icons/fa";

function EditTimetableModal({ isOpen, onClose, timetable, fetchTimetables }) {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    className: "",
    day: "",
    periods: [],
  });

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (timetable) {
      setFormData({
        className: timetable.className || "",
        day: timetable.day || "",
        periods:
          timetable.periods?.map((period) => ({
            startTime: period.startTime,
            endTime: period.endTime,
            subject: period.subject?._id || "",
            teacher: period.teacher?._id || "",
          })) || [],
      });
    }
  }, [timetable]);

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
    setFormData((prev) => ({
      ...prev,
      periods: prev.periods.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(`/timetables/${timetable._id}`, formData);

      toast.success("Timetable updated successfully");

      fetchTimetables();

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update timetable"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
    <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaCalendarAlt className="text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Edit Timetable
              </h2>

              <p className="text-white/80 text-sm">
                Update class schedule, periods and teacher allocation
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>
      </div>

      {/* BODY */}
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6"
      >

        {/* CLASS + DAY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Class
            </label>

            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-200
                dark:border-slate-700
                bg-gray-50
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Day
            </label>

            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-200
                dark:border-slate-700
                bg-gray-50
                dark:bg-slate-800
                dark:text-white
              "
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

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Period Schedule
            </h3>

            <button
              type="button"
              onClick={addPeriod}
              className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-4
                py-2
                rounded-xl
                transition
              "
            >
              + Add Period
            </button>
          </div>

          {formData.periods.map(
            (period, index) => (
              <div
                key={index}
                className="
                  bg-gray-50
                  dark:bg-slate-800
                  border
                  border-gray-200
                  dark:border-slate-700
                  rounded-2xl
                  p-5
                "
              >

                <div className="flex justify-between items-center mb-4">

                  <h4 className="font-semibold dark:text-white">
                    Period {index + 1}
                  </h4>

                  {formData.periods.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removePeriod(index)
                      }
                      className="
                        text-red-500
                        hover:text-red-600
                        text-sm
                        font-medium
                      "
                    >
                      Remove
                    </button>
                  )}

                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Start Time
                    </label>

                    <input
                      type="time"
                      value={period.startTime}
                      onChange={(e) =>
                        handlePeriodChange(
                          index,
                          "startTime",
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        border
                        border-gray-200
                        dark:border-slate-700
                        bg-white
                        dark:bg-slate-900
                        dark:text-white
                      "
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      End Time
                    </label>

                    <input
                      type="time"
                      value={period.endTime}
                      onChange={(e) =>
                        handlePeriodChange(
                          index,
                          "endTime",
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        border
                        border-gray-200
                        dark:border-slate-700
                        bg-white
                        dark:bg-slate-900
                        dark:text-white
                      "
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Subject
                    </label>

                    <select
                      value={period.subject}
                      onChange={(e) =>
                        handlePeriodChange(
                          index,
                          "subject",
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        border
                        border-gray-200
                        dark:border-slate-700
                        bg-white
                        dark:bg-slate-900
                        dark:text-white
                      "
                    >
                      <option value="">
                        Select Subject
                      </option>

                      {subjects.map(
                        (subject) => (
                          <option
                            key={subject._id}
                            value={subject._id}
                          >
                            {
                              subject.subjectName
                            }
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Teacher
                    </label>

                    <select
                      value={period.teacher}
                      onChange={(e) =>
                        handlePeriodChange(
                          index,
                          "teacher",
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        border
                        border-gray-200
                        dark:border-slate-700
                        bg-white
                        dark:bg-slate-900
                        dark:text-white
                      "
                    >
                      <option value="">
                        Select Teacher
                      </option>

                      {teachers.map(
                        (teacher) => (
                          <option
                            key={teacher._id}
                            value={teacher._id}
                          >
                            {teacher.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                </div>

              </div>
            )
          )}

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-slate-800">

          <button
            type="button"
            onClick={onClose}
            className="
              px-5
              py-3
              rounded-xl
              border
              border-gray-300
              dark:border-slate-700
              dark:text-white
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              px-6
              py-3
              rounded-xl
              bg-primary
              text-white
              font-semibold
              disabled:opacity-50
            "
          >
            {loading
              ? "Updating..."
              : "Update Timetable"}
          </button>

        </div>

      </form>
    </div>
  </div>
)
}

export default EditTimetableModal;