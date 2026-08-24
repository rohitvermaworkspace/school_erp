import { useState } from "react";
import { useNavigate } from "react-router-dom";
import schoolService from "../../services/schoolService";
import { FaSchool, FaSave, FaArrowLeft } from "react-icons/fa";

const CreateSchool = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    board: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    academicYear: "",
    principalName: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await schoolService.createSchool(formData);
      navigate("/super-admin/schools");
    } catch (err) {
      console.error("Failed to create school:", err);
      alert(err.response?.data?.message || "Failed to create school");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition";
  const labelClass =
    "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2";

  return (
    
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaSchool className="text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl xl:text-4xl font-black text-white leading-tight">
                Create New School
              </h1>
              <p className="text-emerald-100 text-lg mt-1">
                Register a new school on the platform
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* School Information */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-card p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">
              School Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>School Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter school name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>School Code *</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  placeholder="Unique login code, e.g. ABPS01"
                  className={`${inputClass} uppercase`}
                />
              </div>

              <div>
                <label className={labelClass}>Board</label>
                <input
                  type="text"
                  name="board"
                  list="create-school-board-options"
                  value={formData.board}
                  onChange={handleChange}
                  placeholder='e.g. "CBSE"'
                  className={inputClass}
                />
                <datalist id="create-school-board-options">
                  {["CBSE", "ICSE", "State Board", "IB"].map((b) => (
                    <option key={b} value={b} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="school@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter school address"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Academic Year</label>
                <input
                  type="text"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  placeholder='e.g. "2026-2027"'
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Principal Name</label>
                <input
                  type="text"
                  name="principalName"
                  value={formData.principalName}
                  onChange={handleChange}
                  placeholder="Enter principal name"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Admin Account */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-card p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">
              Admin Account
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Admin Name *</label>
                <input
                  type="text"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  required
                  placeholder="Enter admin name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Admin Email *</label>
                <input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  required
                  placeholder="admin@example.com"
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Admin Password *</label>
                <input
                  type="password"
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleChange}
                  required
                  placeholder="Enter admin password"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-xl hover:scale-105 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave />
              {loading ? "Creating..." : "Create School"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/super-admin/schools")}
              className="px-6 py-3 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition flex items-center gap-2"
            >
              <FaArrowLeft /> Cancel
            </button>
          </div>
        </form>
      </div>
    
  );
};

export default CreateSchool;
