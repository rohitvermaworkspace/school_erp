import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaMoneyBillWave } from "react-icons/fa";

function AddFeeModal({ isOpen, onClose, fetchFees }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    student: "",
    amount: "",
    feeType: "Tuition",
    month: "",
    year: new Date().getFullYear(),
    status: "Pending",
  });

  useEffect(() => {
    if (isOpen) {
      fetchStudents();
    }
  }, [isOpen]);

  const fetchStudents = async () => {
    try {
      console.log("Fee Payload:", formData);
      const res = await api.get("/students");
      setStudents(res.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load students");
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
      await api.post("/fees", formData);
      toast.success("Fee added successfully");
      fetchFees();
      setFormData({
        student: "",
        amount: "",
        feeType: "Tuition",
        month: "",
        year: new Date().getFullYear(),
        status: "Pending",
      });
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to add fee"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden w-full max-w-3xl shadow-2xl border border-gray-100 dark:border-slate-800">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaMoneyBillWave className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Add Fee Record</h2>
              <p className="text-white/80 text-sm">Create new student fee entry</p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* STUDENT */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Student
            </label>
            <select
              name="student"
              value={formData.student}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} • {student.rollNumber} • {student.className}
                </option>
              ))}
            </select>
          </div>

          {/* AMOUNT */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* FEE TYPE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Fee Type
            </label>
            <select
            name="feeType"
            value={formData.feeType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
          >
            <option value="Tuition">Tuition</option>
            <option value="Admission">Admission</option>
            <option value="Transport">Transport</option>
            <option value="Exam">Exam</option>
            <option value="Library">Library</option>
            <option value="Sports">Sports</option>
            <option value="Other">Other</option>
          </select>
          </div>

          {/* MONTH */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Month
            </label>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
            >
              <option value="">Select Month</option>
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* YEAR */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Year
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* STATUS */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Payment Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          {/* FOOTER */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-5 border-t border-gray-100 dark:border-slate-800">
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
              {loading ? "Saving..." : "Save Fee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFeeModal;