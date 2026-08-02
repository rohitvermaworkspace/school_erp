import {
  FaBus,
  FaBed,
  FaSchool,
  FaRoute,
  FaMapMarkerAlt,
} from "react-icons/fa";

function FacilitiesStep({ formData, handleChange }) {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg">
          <FaBus className="text-xl" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            School Facilities
          </h2>

          <p className="text-slate-500">
            Transport, Hostel and RTE Quota Information
          </p>
        </div>
      </div>

      {/* ================= Transport ================= */}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaBus className="text-blue-600 text-xl" />

          <h3 className="text-xl font-semibold dark:text-white">
            Transport Facility
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Required */}

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="facilities.transport.isRequired"
              checked={formData?.facilities?.transport?.isRequired}
              onChange={handleChange}
              className="w-5 h-5"
            />

            <label className="font-medium dark:text-white">
              Transport Required
            </label>
          </div>

          <div></div>

          {/* Route */}

          <div>
            <label className="block mb-2 font-semibold dark:text-white">
              Route
            </label>

            <select
              name="facilities.transport.routeId"
              value={formData?.facilities?.transport.routeId}
              onChange={handleChange}
              disabled={!formData?.facilities?.transport.isRequired}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3 disabled:opacity-50"
            >
              <option value="">Select Route</option>

              <option value="route1">Route 1</option>
              <option value="route2">Route 2</option>
              <option value="route3">Route 3</option>
            </select>
          </div>

          {/* Stop */}

          <div>
            <label className="block mb-2 font-semibold dark:text-white">
              Pickup Stop
            </label>

            <select
              name="facilities.transport.stopId"
              value={formData?.facilities?.transport.stopId}
              onChange={handleChange}
              disabled={!formData?.facilities?.transport.isRequired}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3 disabled:opacity-50"
            >
              <option value="">Select Stop</option>

              <option value="stop1">Stop 1</option>
              <option value="stop2">Stop 2</option>
              <option value="stop3">Stop 3</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= Hostel ================= */}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaBed className="text-purple-600 text-xl" />

          <h3 className="text-xl font-semibold dark:text-white">
            Hostel Facility
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="facilities.hostel.isRequired"
              checked={formData?.facilities?.hostel.isRequired}
              onChange={handleChange}
              className="w-5 h-5"
            />

            <label className="font-medium dark:text-white">
              Hostel Required
            </label>
          </div>

          <div></div>

          <div>
            <label className="block mb-2 font-semibold dark:text-white">
              Hostel Block
            </label>

            <select
              name="facilities.hostel.blockId"
              value={formData?.facilities?.hostel.blockId}
              onChange={handleChange}
              disabled={!formData?.facilities?.hostel.isRequired}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3 disabled:opacity-50"
            >
              <option value="">Select Block</option>

              <option value="A">Block A</option>
              <option value="B">Block B</option>
              <option value="C">Block C</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold dark:text-white">
              Room
            </label>

            <select
              name="facilities.hostel.roomId"
              value={formData?.facilities?.hostel.roomId}
              onChange={handleChange}
              disabled={!formData?.facilities?.hostel.isRequired}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3 disabled:opacity-50"
            >
              <option value="">Select Room</option>

              <option value="101">Room 101</option>
              <option value="102">Room 102</option>
              <option value="103">Room 103</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= RTE ================= */}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaSchool className="text-green-600 text-xl" />

          <h3 className="text-xl font-semibold dark:text-white">
            RTE Quota
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="facilities.rteQuota.isEligible"
              checked={formData?.facilities?.rteQuota.isEligible}
              onChange={handleChange}
              className="w-5 h-5"
            />

            <label className="font-medium dark:text-white">
              Eligible under RTE Quota
            </label>
          </div>

          <div></div>

          <div>
            <label className="block mb-2 font-semibold dark:text-white">
              Document Status
            </label>

            <select
              name="facilities.rteQuota.documentStatus"
              value={formData?.facilities?.rteQuota.documentStatus}
              onChange={handleChange}
              disabled={!formData?.facilities?.rteQuota.isEligible}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white px-4 py-3 disabled:opacity-50"
            >
              <option value="NA">NA</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilitiesStep;