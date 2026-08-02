import {
  FaSchool,
  FaBook,
  FaCalendarAlt,
  FaPercentage,
  FaClipboardList,
  FaFileAlt,
} from "react-icons/fa";

function PreviousSchoolStep({ formData, handleChange }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg">
          <FaSchool className="text-xl" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Previous School Details
          </h2>

          <p className="text-slate-500">
            Enter previous academic information (if applicable)
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* School Name */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              School Name
            </label>

            <div className="relative">
              <FaSchool className="absolute left-4 top-4 text-slate-400" />

              <input
                type="text"
                name="previousSchool.schoolName"
                value={formData.previousSchool.schoolName}
                onChange={handleChange}
                placeholder="ABC Public School"
                className="w-full pl-11 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
              />
            </div>
          </div>

          {/* Board */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Board
            </label>

            <div className="relative">
              <FaBook className="absolute left-4 top-4 text-slate-400" />

              <select
                name="previousSchool.board"
                value={formData.previousSchool.board}
                onChange={handleChange}
                className="w-full pl-11 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
              >
                <option value="">Select Board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State Board">State Board</option>
                <option value="IB">IB</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Medium */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Medium
            </label>

            <select
              name="previousSchool.medium"
              value={formData.previousSchool.medium}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
            >
              <option value="">Select Medium</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Kannada">Kannada</option>
            </select>
          </div>

          {/* Last Class */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Last Studied Class
            </label>

            <input
              type="text"
              name="previousSchool.lastClass"
              value={formData.previousSchool.lastClass}
              onChange={handleChange}
              placeholder="Class 8"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
            />
          </div>

          {/* Last Session */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Academic Session
            </label>

            <div className="relative">
              <FaCalendarAlt className="absolute left-4 top-4 text-slate-400" />

              <input
                type="text"
                name="previousSchool.lastSession"
                value={formData.previousSchool.lastSession}
                onChange={handleChange}
                placeholder="2025-2026"
                className="w-full pl-11 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
              />
            </div>
          </div>

          {/* TC Number */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Transfer Certificate No.
            </label>

            <div className="relative">
              <FaFileAlt className="absolute left-4 top-4 text-slate-400" />

              <input
                type="text"
                name="previousSchool.tcNumber"
                value={formData.previousSchool.tcNumber}
                onChange={handleChange}
                placeholder="TC-2026-001"
                className="w-full pl-11 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
              />
            </div>
          </div>

          {/* Percentage */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Percentage / CGPA
            </label>

            <div className="relative">
              <FaPercentage className="absolute left-4 top-4 text-slate-400" />

              <input
                type="text"
                name="previousSchool.percentageMarks"
                value={formData.previousSchool.percentageMarks}
                onChange={handleChange}
                placeholder="89%"
                className="w-full pl-11 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
              />
            </div>
          </div>

          {/* Reason */}
          <div className="md:col-span-2 xl:col-span-3">
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Reason For Leaving
            </label>

            <div className="relative">
              <FaClipboardList className="absolute left-4 top-4 text-slate-400" />

              <textarea
                rows="4"
                name="previousSchool.reasonForLeaving"
                value={formData.previousSchool.reasonForLeaving}
                onChange={handleChange}
                placeholder="Mention reason..."
                className="w-full pl-11 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3 resize-none"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PreviousSchoolStep;