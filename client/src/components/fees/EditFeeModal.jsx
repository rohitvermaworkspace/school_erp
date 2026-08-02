import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaMoneyBillWave } from "react-icons/fa";

function EditFeeModal({ isOpen, onClose, fee, fetchFees }) {
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

  useEffect(() => {
    if (fee) {
      setFormData({
        student: fee.student?._id || "",
        amount: fee.amount || "",
        feeType: fee.feeType || "Tuition",
        month: fee.month || "",
        year: fee.year || new Date().getFullYear(),
        status: fee.status || "Pending",
      });
    }
  }, [fee]);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(Array.isArray(res.data?.data) ? res.data.data : res.data || []);
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

  const resetForm = () => {
    setFormData({
      student: "",
      amount: "",
      feeType: "Tuition",
      month: "",
      year: new Date().getFullYear(),
      status: "Pending",
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(`/fees/${fee._id}`, formData);

      toast.success("Fee updated successfully");

      fetchFees();

      handleClose();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to update fee");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - 2 + i);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-2xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaMoneyBillWave className="text-2xl" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Edit Fee Record</h2>
                <p className="text-sm text-white/80">
                  Update student fee information
                </p>
              </div>
            </div>

            <button onClick={handleClose} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition">
              ✕
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Student */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Student
            </label>

            <select
              name="student"
              value={formData.student}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
            >
              <option value="">Select Student</option>

              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} • {student.rollNumber} • {student.className}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
            />
          </div>

          {/* Fee Type */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Fee Type
            </label>

            <select
              name="feeType"
              value={formData.feeType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
            >
              <option value="Tuition">Tuition</option>
              <option value="Transport">Transport</option>
              <option value="Exam">Exam</option>
              <option value="Library">Library</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Month */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Month
            </label>

            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
            >
              <option value="">Select Month</option>

              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Academic Year
            </label>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Payment Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          {/* Footer */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-5 mt-2 border-t border-gray-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Fee"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditFeeModal;