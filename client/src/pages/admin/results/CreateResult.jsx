import { useEffect, useState } from "react";
import api from "../../../services/api";
import { FaClipboardCheck, FaPlus, FaTrash } from "react-icons/fa";

function CreateResult({ onClose, onSuccess }) {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    student: "",
    examName: "",
    className: "",
    subjects: [],
  });

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data.data || res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects");
      setSubjects(res.data.data || res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index][field] = value;
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [
        ...formData.subjects,
        { subject: "", marksObtained: "", maxMarks: 100 },
      ],
    });
  };

  const removeSubject = (index) => {
    const updatedSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/results", formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden w-full max-w-3xl shadow-2xl border border-gray-100 dark:border-slate-800 my-8">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white relative">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaClipboardCheck className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Create Result Record</h2>
              <p className="text-white/80 text-sm">Enter student examination marks evaluation</p>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white transition text-lg">✕</button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* STUDENT */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Student</label>
            <select
              value={formData.student}
              onChange={(e) => setFormData({ ...formData, student: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition"
              required
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} • ({student.rollNumber})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* EXAM NAME */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Exam Name</label>
              <input
                type="text"
                placeholder="e.g. Mid Term, Final Exam"
                value={formData.examName}
                onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition"
                required
              />
            </div>

            {/* CLASS NAME */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Class Name</label>
              <input
                type="text"
                placeholder="e.g. Class 10-A"
                value={formData.className}
                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition"
                required
              />
            </div>
          </div>

          {/* SUBJECTS & MARKS SECTION */}
          <div className="pt-2">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">Subjects & Marks Evaluation</h3>
              <button
                type="button"
                onClick={addSubject}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
              >
                <FaPlus size={12} /> Add Subject
              </button>
            </div>

            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {formData.subjects.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/40 p-3 rounded-xl items-center">
                  
                  {/* Select Subject */}
                  <div className="col-span-5">
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-green-500 outline-none"
                      value={item.subject}
                      required
                      onChange={(e) => handleSubjectChange(index, "subject", e.target.value)}
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((subject) => (
                        <option key={subject._id} value={subject._id}>
                          {subject.subjectName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Marks Obtained */}
                  <div className="col-span-3">
                    <input
                      type="number"
                      placeholder="Obtained"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-green-500 outline-none"
                      value={item.marksObtained}
                      required
                      min="0"
                      onChange={(e) => handleSubjectChange(index, "marksObtained", Number(e.target.value))}
                    />
                  </div>

                  {/* Max Marks */}
                  <div className="col-span-3">
                    <input
                      type="number"
                      placeholder="Max Marks"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-green-500 outline-none"
                      value={item.maxMarks}
                      required
                      min="1"
                      onChange={(e) => handleSubjectChange(index, "maxMarks", Number(e.target.value))}
                    />
                  </div>

                  {/* Remove CTA */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 transition"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>

                </div>
              ))}
              
              {formData.subjects.length === 0 && (
                <p className="text-sm text-center text-gray-400 dark:text-gray-500 py-4 border border-dashed border-gray-200 dark:border-slate-800 rounded-xl">
                  No subjects appended yet. Click "+ Add Subject" to begin tracking evaluation scores.
                </p>
              )}
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex justify-end gap-3 pt-5 border-t border-gray-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition"
            >
              Save Result
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateResult;