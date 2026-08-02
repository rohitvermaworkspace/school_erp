import React from "react";

function ParentStep({ formData, handleChange, errors }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Parent / Guardian Details
        </h2>

        <p className="text-slate-500">Enter parent or guardian information.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Primary Contact */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Primary Contact
            </label>

            <select
              name="family.primaryContactType"
              value={formData?.family?.primaryContactType}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
            >
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Guardian">Guardian</option>
            </select>
          </div>

          {/* Guardian Name */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
             <label>
                {formData.family.primaryContactType} Name *
              </label>
            </label>

            <input
              type="text"
              name="family.guardian.name"
              value={formData?.family?.guardian.name}
              onChange={handleChange}
              placeholder={`${formData.family.primaryContactType} Name`}
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.guardianName
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              } bg-slate-50 dark:bg-slate-800 dark:text-white`}
            />

            {errors?.guardianName && (
              <p className="mt-1 text-sm text-red-500">{errors.guardianName}</p>
            )}
          </div>

          {/* Relationship */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Relationship
            </label>

            <select
              name="family.guardian.relationship"
              value={formData?.family?.guardian.relationship}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.relationship
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              } bg-slate-50 dark:bg-slate-800 dark:text-white`}
            >
              <option value="">Select</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
              <option value="Grandfather">Grandfather</option>
              <option value="Grandmother">Grandmother</option>
              <option value="Uncle">Uncle</option>
              <option value="Aunt">Aunt</option>
              <option value="Guardian">Guardian</option>
            </select>

            {errors?.relationship && (
              <p className="mt-1 text-sm text-red-500">{errors.relationship}</p>
            )}
          </div>

          {/* Phone */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Mobile Number *
            </label>

            <input
              type="text"
              name="family.guardian.phone"
              value={formData?.family?.guardian.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.guardianPhone
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              } bg-slate-50 dark:bg-slate-800 dark:text-white`}
            />

            {errors?.guardianPhone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.guardianPhone}
              </p>
            )}
          </div>

          {/* Email */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="family.guardian.email"
              value={formData?.family?.guardian.email}
              onChange={handleChange}
              placeholder="guardian@email.com"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
            />
          </div>

          {/* Qualification */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Qualification
            </label>

            <input
              type="text"
              name="family.guardian.qualification"
              value={formData?.family?.guardian.qualification}
              onChange={handleChange}
              placeholder="Graduate"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
            />
          </div>

          {/* Occupation */}

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Occupation
            </label>

            <input
              type="text"
              name="family.guardian.occupation"
              value={formData?.family?.guardian.occupation}
              onChange={handleChange}
              placeholder="Software Engineer"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentStep;