import { useState } from "react";
import api from "../../../services/api";
import toast from "react-hot-toast";
import { FaClipboardCheck } from "react-icons/fa";

function EditResult({ result, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    examName: result?.examName || "",
    className: result?.className || "",
    subjects:
      result?.subjects?.map((s) => ({
        subject: s.subject?._id,
        subjectName: s.subject?.subjectName,
        marksObtained: s.marksObtained,
        maxMarks: s.maxMarks,
      })) || [],
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/results/${result._id}`, {
        examName: formData.examName,
        className: formData.className,
        subjects: formData.subjects.map((s) => ({
          subject: s.subject,
          marksObtained: Number(s.marksObtained),
          maxMarks: Number(s.maxMarks),
        })),
      });

      toast.success("Result updated successfully");

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update result");
    }
  };

  const calculatePercentage = () => {
    const obtained = formData.subjects.reduce(
      (sum, s) => sum + Number(s.marksObtained || 0),
      0
    );

    const total = formData.subjects.reduce(
      (sum, s) => sum + Number(s.maxMarks || 0),
      0
    );

    return total ? ((obtained / total) * 100).toFixed(2) : 0;
  };

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    return "F";
  };
  const handleMarksChange = (index, field, value) => {
    const updated = [...formData.subjects];

    updated[index][field] = value;

    setFormData({
      ...formData,
      subjects: updated,
    });
  };

  if (!result) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden w-full max-w-xl shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white relative">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaClipboardCheck className="text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Edit Result Record</h2>

              <p className="text-white/80 text-sm">
                Update examination performance and marks
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition text-lg"
          >
            ✕
          </button>
        </div>
        {/* FORM */}
        <form
          onSubmit={handleUpdate}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* Student Info */}
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <label className="text-xs uppercase tracking-wider text-slate-500">
              Student
            </label>

            <p className="text-xl font-bold text-slate-800 dark:text-white mt-1">
              {result.student?.name}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Roll No: {result.student?.rollNumber || "N/A"}
            </p>
          </div>

          {/* Exam Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Exam Name
              </label>

              <input
                type="text"
                value={formData.examName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    examName: e.target.value,
                  })
                }
                className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-slate-200
              dark:border-slate-700
              bg-slate-50
              dark:bg-slate-800
              dark:text-white
              focus:ring-2
              focus:ring-indigo-500
              outline-none
            "
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Class Name
              </label>

              <input
                type="text"
                value={formData.className}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    className: e.target.value,
                  })
                }
                className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-slate-200
              dark:border-slate-700
              bg-slate-50
              dark:bg-slate-800
              dark:text-white
              focus:ring-2
              focus:ring-indigo-500
              outline-none
            "
              />
            </div>
          </div>

          {/* Subject Evaluation */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              Subject Evaluation
            </h3>

            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800">
                    <th className="px-4 py-3 text-left">Subject</th>

                    <th className="px-4 py-3 text-center">Obtained</th>

                    <th className="px-4 py-3 text-center">Max Marks</th>
                  </tr>
                </thead>

                <tbody>
                  {formData.subjects.map((subject, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-200 dark:border-slate-700"
                    >
                      <td className="px-4 py-3 font-medium dark:text-white">
                        {subject.subjectName}
                      </td>

                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={subject.marksObtained}
                          onChange={(e) =>
                            handleMarksChange(
                              index,
                              "marksObtained",
                              e.target.value
                            )
                          }
                          className="
                        w-full
                        px-3
                        py-2
                        rounded-lg
                        border
                        border-slate-200
                        dark:border-slate-700
                        bg-white
                        dark:bg-slate-800
                        dark:text-white
                      "
                        />
                      </td>

                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={subject.maxMarks}
                          onChange={(e) =>
                            handleMarksChange(index, "maxMarks", e.target.value)
                          }
                          className="
                        w-full
                        px-3
                        py-2
                        rounded-lg
                        border
                        border-slate-200
                        dark:border-slate-700
                        bg-white
                        dark:bg-slate-800
                        dark:text-white
                      "
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Preview Cards */}

          {/* <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-xs uppercase">Percentage</p>

              <p className="text-2xl font-bold">{calculatePercentage()}%</p>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <p className="text-xs uppercase">Grade</p>

              <p className="text-2xl font-bold">
                {calculateGrade(Number(calculatePercentage()))}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-xs uppercase">Status</p>

              <p className="text-2xl font-bold">
                {Number(calculatePercentage()) >= 40 ? "Pass" : "Fail"}
              </p>
            </div>
          </div> */}
          {/* Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-5 text-center">
              <p className="text-xs uppercase tracking-wider text-blue-500 font-semibold">
                Percentage
              </p>

              <h3 className="text-3xl font-black text-blue-600 mt-2">
                {calculatePercentage()}%
              </h3>
            </div>

            <div className="rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-5 text-center">
              <p className="text-xs uppercase tracking-wider text-purple-500 font-semibold">
                Grade
              </p>

              <h3 className="text-3xl font-black text-purple-600 mt-2">
                {calculateGrade(Number(calculatePercentage()))}
              </h3>
            </div>

            <div
              className="rounded-2xl bg-green-50 border p-5 text-center  dark:bg-green-950/30 border-green-200"
            >
              <p className="text-xs uppercase tracking-wider font-semibold">
                Result Status
              </p>

              <h3
                className={`
              text-3xl
              font-black
              mt-2
              text-green-700
            `}
              >
               {Number(calculatePercentage()) >= 40 ? "Pass" : "Fail"}
              </h3>
            </div>
          </div>
        </form>
        {/* FOOTER */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-5 bg-white dark:bg-slate-900">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
            px-5
            py-3
            rounded-xl
            border
            border-slate-300
            dark:border-slate-700
            dark:text-white
          "
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="
            px-6
            py-3
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            font-semibold
          "
            >
              Update Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditResult;