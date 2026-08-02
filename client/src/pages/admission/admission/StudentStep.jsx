import React from "react";
import { FaUserGraduate } from "react-icons/fa";

function StudentStep({ formData, handleChange, errors }) {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white flex items-center justify-center shadow-lg">
          <FaUserGraduate className="text-xl" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Student Information
          </h2>

          <p className="text-slate-500">Enter student's personal details.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* ================= USER INFORMATION ================= */}

          <div>
            <label className="block mb-2 text-sm font-semibold">
              Student Name *
            </label>

            <input
              type="text"
              name="user.name"
              value={formData?.user?.name || ""}
              onChange={handleChange}
              placeholder="Student Name"
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.name
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              } bg-slate-50 dark:bg-slate-800 dark:text-white`}
            />

            {errors?.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Email *</label>

            <input
              type="email"
              name="user.email"
              value={formData?.user?.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.email
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              } bg-slate-50 dark:bg-slate-800 dark:text-white`}
            />

            {errors?.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">
              Mobile Number
            </label>

            <input
              type="text"
              name="user.phone"
              value={formData?.user?.phone || ""}
              onChange={handleChange}
              placeholder="Mobile Number"
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.phone
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              } bg-slate-50 dark:bg-slate-800 dark:text-white`}
            />

            {errors?.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* ================= PERSONAL INFORMATION ================= */}

          <div>
            <label className="block mb-2 text-sm font-semibold">
              Date of Birth *
            </label>

            <input
              type="date"
              name="personal.dob"
              value={formData?.personal?.dob || ""}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.dob
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              } bg-slate-50 dark:bg-slate-800 dark:text-white`}
            />

            {errors?.dob && (
              <p className="mt-1 text-sm text-red-500">{errors.dob}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Gender *</label>

            <select
              name="personal.gender"
              value={formData?.personal?.gender || ""}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.gender
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              } bg-slate-50 dark:bg-slate-800 dark:text-white`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {errors?.gender && (
              <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">
              Blood Group
            </label>

            <input
              type="text"
              name="personal.bloodGroup"
              value={formData?.personal?.bloodGroup || ""}
              onChange={handleChange}
              placeholder="Blood Group"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Religion</label>

            <input
              type="text"
              name="personal.religion"
              value={formData?.personal?.religion || ""}
              onChange={handleChange}
              placeholder="Religion"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Category</label>

            <input
              type="text"
              name="personal.category"
              value={formData?.personal?.category || ""}
              onChange={handleChange}
              placeholder="Category"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Caste</label>

            <input
              type="text"
              name="personal.caste"
              value={formData?.personal?.caste || ""}
              onChange={handleChange}
              placeholder="Caste"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">
              Nationality
            </label>

            <input
              type="text"
              name="personal.nationality"
              value={formData?.personal?.nationality || ""}
              onChange={handleChange}
              placeholder="Nationality"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">
              Birth Place
            </label>

            <input
              type="text"
              name="personal.birthPlace"
              value={formData?.personal?.birthPlace || ""}
              onChange={handleChange}
              placeholder="Birth Place"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">
              Mother Tongue
            </label>

            <input
              type="text"
              name="personal.motherTongue"
              value={formData?.personal?.motherTongue || ""}
              onChange={handleChange}
              placeholder="Mother Tongue"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">
              Aadhaar Number
            </label>

            <input
              type="text"
              name="personal.aadhaarNumber"
              value={formData?.personal?.aadhaarNumber || ""}
              onChange={handleChange}
              placeholder="Aadhaar Number"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">
              PEN Number
            </label>

            <input
              type="text"
              name="personal.penNumber"
              value={formData?.personal?.penNumber || ""}
              onChange={handleChange}
              placeholder="PEN Number"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">APAAR ID</label>

            <input
              type="text"
              name="personal.apaarId"
              value={formData?.personal?.apaarId || ""}
              onChange={handleChange}
              placeholder="APAAR ID"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentStep;