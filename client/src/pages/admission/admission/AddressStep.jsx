import React from "react";
import { FaMapMarkedAlt } from "react-icons/fa";

function AddressStep({ formData, handleChange, errors }) {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white flex items-center justify-center shadow-lg">
          <FaMapMarkedAlt className="text-xl" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Address Details
          </h2>

          <p className="text-slate-500">
            Enter student's current and permanent address.
          </p>
        </div>
      </div>

      {/* Current Address */}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <h3 className="text-lg font-semibold mb-6 dark:text-white">
          Current Address
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="md:col-span-2 xl:col-span-3">
            <label className="block mb-2 text-sm font-semibold">
              Address Line
            </label>

            <textarea
              rows="3"
              name="address.current.addressLine"
              value={formData.address.current.addressLine}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.currentAddress
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              } bg-slate-50 dark:bg-slate-800 dark:text-white`}
            />

            {errors?.currentAddress && (
              <p className="mt-1 text-sm text-red-500">
                {errors.currentAddress}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">City</label>

            <input
              type="text"
              name="address.current.city"
              value={formData.address.current.city}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.currentCity
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />

            {errors?.currentCity && (
              <p className="mt-1 text-sm text-red-500">{errors.currentCity}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">State</label>

            <input
              type="text"
              name="address.current.state"
              value={formData.address.current.state}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.currentState
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />

            {errors?.currentState && (
              <p className="mt-1 text-sm text-red-500">{errors.currentState}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Country</label>

            <input
              type="text"
              name="address.current.country"
              value={formData.address.current.country}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Pincode</label>

            <input
              type="text"
              name="address.current.pincode"
              value={formData.address.current.pincode}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.currentPincode
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />

            {errors?.currentPincode && (
              <p className="mt-1 text-sm text-red-500">
                {errors.currentPincode}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Checkbox */}

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="address.isPermanentSameAsCurrent"
          checked={formData.address.isPermanentSameAsCurrent}
          onChange={handleChange}
          className="w-5 h-5"
        />

        <label className="font-medium">
          Permanent Address is same as Current Address
        </label>
      </div>

      {/* Permanent Address */}

      {!formData.address.isPermanentSameAsCurrent && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 dark:text-white">
            Permanent Address
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="md:col-span-2 xl:col-span-3">
              <label className="block mb-2 text-sm font-semibold">
                Address Line
              </label>

              <textarea
                rows="3"
                name="address.permanent.addressLine"
                value={formData.address.permanent.addressLine}
                onChange={handleChange}
                className={`w-full rounded-xl px-4 py-3 border ${
                  errors?.permanentAddress
                    ? "border-red-500"
                    : "border-slate-300 dark:border-slate-700"
                }`}
              />

              {errors?.permanentAddress && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.permanentAddress}
                </p>
              )}
            </div>

            <input
              type="text"
              name="address.permanent.city"
              value={formData.address.permanent.city}
              onChange={handleChange}
              placeholder="City"
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.permanentCity
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />

            {errors?.permanentCity && (
              <p className="mt-1 text-sm text-red-500">
                {errors.permanentCity}
              </p>
            )}

            <input
              type="text"
              name="address.permanent.state"
              value={formData.address.permanent.state}
              onChange={handleChange}
              placeholder="State"
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.permanentState
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />

            {errors?.permanentState && (
              <p className="mt-1 text-sm text-red-500">
                {errors.permanentState}
              </p>
            )}

            <input
              type="text"
              name="address.permanent.country"
              value={formData.address.permanent.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full rounded-xl border px-4 py-3"
            />

            <input
              type="text"
              name="address.permanent.pincode"
              value={formData.address.permanent.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className={`w-full rounded-xl px-4 py-3 border ${
                errors?.permanentPincode
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />

            {errors?.permanentPincode && (
              <p className="mt-1 text-sm text-red-500">
                {errors.permanentPincode}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressStep;