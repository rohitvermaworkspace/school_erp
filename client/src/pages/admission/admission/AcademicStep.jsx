import { useState, useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa";
import api from "../../../services/api";

function AcademicStep({ formData, handleChange, errors }) {
  const admission = formData?.admission || {};
  const academic = formData?.academic || {};

  const [classOptions, setClassOptions] = useState([]);
  const [sections, setSections] = useState([]);
  const [loadingRoll, setLoadingRoll] = useState(false);

  useEffect(() => {
    fetchClassNames();
  }, []);

  useEffect(() => {
    if (academic.className) {
      const selected = classOptions.find(
        (c) => c.className === academic.className
      );
      setSections(selected ? selected.sections : []);
    } else {
      setSections([]);
    }
  }, [academic.className, classOptions]);

  useEffect(() => {
    if (academic.className && academic.section) {
      fetchNextRollNumber();
    }
  }, [academic.className, academic.section]);

  const fetchClassNames = async () => {
    try {
      const res = await api.get("/classes/names");
      setClassOptions(res.data);
    } catch (err) {
      console.error("Failed to fetch class names:", err);
    }
  };

  const fetchNextRollNumber = async () => {
    try {
      setLoadingRoll(true);
      const res = await api.get(
        `/classes/next-roll-number?className=${academic.className}&section=${academic.section}`
      );
      updateNestedField("academic.rollNumber", res.data.rollNumber);
    } catch (err) {
      console.error("Failed to fetch roll number:", err);
    } finally {
      setLoadingRoll(false);
    }
  };

  const updateNestedField = (path, value) => {
    const event = {
      target: { name: path, value, type: "text" },
    };
    handleChange(event);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg">
          <FaGraduationCap className="text-xl" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Academic Information
          </h2>

          <p className="text-slate-500">
            Student admission and academic details
          </p>
        </div>
      </div>

      {/* Academic Details */}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Admission Number */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Admission Number
            </label>
            <input
              type="text"
              value="Auto-generated on submission"
              readOnly
              className="w-full rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-slate-400">Assigned automatically by the system</p>
          </div>

          {/* Admission Date */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Admission Date *
            </label>
            <input
              type="date"
              name="admission.admissionDate"
              value={admission.admissionDate}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.admissionDate
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              } bg-slate-50 dark:bg-slate-800 dark:text-white`}
            />
            {errors?.admissionDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.admissionDate}
              </p>
            )}
          </div>

          {/* Academic Session */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Academic Session *
            </label>
            <select
              name="admission.academicSession"
              value={admission.academicSession}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.academicSession
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              } bg-slate-50 dark:bg-slate-800 dark:text-white`}
            >
              <option value="">Select Session</option>
              <option value="2026-2027">2026-2027</option>
              <option value="2027-2028">2027-2028</option>
            </select>
            {errors?.academicSession && (
              <p className="mt-1 text-sm text-red-500">
                {errors.academicSession}
              </p>
            )}
          </div>

          {/* Admission Type */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Admission Type
            </label>

            <select
              name="admission.admissionType"
              value={formData?.admission?.admissionType}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
            >
              <option value="New">New</option>
              <option value="Transfer">Transfer</option>
              <option value="Re-Admission">Re-Admission</option>
            </select>
          </div>
          {/* Medium */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Medium
            </label>

            <select
              name="admission.medium"
              value={formData?.admission?.medium}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Kannada">Kannada</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Admission Status
            </label>

            <select
              name="admission.status"
              value={formData?.admission?.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Transferred">Transferred</option>
            </select>
          </div>
          {/* Current Class */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Current Class *
            </label>

            <select
              name="academic.className"
              value={academic.className}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.className
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              } bg-slate-50 dark:bg-slate-800 dark:text-white`}
            >
              <option value="">Select Class</option>
              {classOptions.map((cls) => (
                <option key={cls.className} value={cls.className}>
                  {cls.className}
                </option>
              ))}
            </select>
            {errors?.className && (
              <p className="mt-1 text-sm text-red-500">{errors.className}</p>
            )}
          </div>

          {/* Section */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Section *
            </label>

            <select
              name="academic.section"
              value={academic.section}
              onChange={handleChange}
              disabled={!academic.className}
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.section
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              } bg-slate-50 dark:bg-slate-800 dark:text-white ${
                !academic.className ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <option value="">Select Section</option>
              {sections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
            {errors?.section && (
              <p className="mt-1 text-sm text-red-500">{errors.section}</p>
            )}
          </div>

          {/* Roll Number */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Roll Number *
            </label>

            <input
              type="text"
              name="academic.rollNumber"
              value={loadingRoll ? "Generating..." : academic.rollNumber}
              readOnly
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.rollNumber
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              } bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed`}
            />
            <p className="mt-1 text-xs text-slate-400">
              Auto-generated based on class and section
            </p>
            {errors?.rollNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.rollNumber}</p>
            )}
          </div>

          {/* House */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              House
            </label>

            <select
              name="academic.house"
              value={formData?.academic?.house || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
            >
              <option value="">Select House</option>

              {["Red", "Blue", "Green", "Yellow"].map((house) => (
                <option key={house} value={house}>
                  {house}
                </option>
              ))}
            </select>
          </div>

          {/* Board */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Board
            </label>

            <select
              name="academic.board"
              value={formData?.academic?.board || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
            >
              <option value="">Select Board</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="State Board">State Board</option>
              <option value="IB">IB</option>
            </select>
          </div>

          {/* Stream */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Stream
            </label>

            <select
              name="academic.stream"
              value={formData?.academic?.stream || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
            >
              <option value="">Select Stream</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicStep;