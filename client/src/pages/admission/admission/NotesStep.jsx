import { FaStickyNote } from "react-icons/fa";

function NotesStep({ formData, handleChange }) {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white flex items-center justify-center shadow-lg">
          <FaStickyNote className="text-xl" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Notes & Remarks
          </h2>

          <p className="text-slate-500">
            Additional information about the student
          </p>
        </div>
      </div>

      {/* Notes */}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Future Goal */}

          <div>
            <label className="block mb-3 font-semibold text-slate-700 dark:text-slate-300">
              Future Goal
            </label>

            <textarea
              rows={5}
              name="notes.futureGoal"
              value={formData?.notes?.futureGoal}
              onChange={handleChange}
              placeholder="Example: Wants to become a Doctor, Engineer, IAS Officer..."
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                dark:border-slate-700
                bg-slate-50
                dark:bg-slate-800
                dark:text-white
                px-5
                py-4
                resize-none
                focus:ring-2
                focus:ring-orange-500
                outline-none
              "
            />
          </div>

          {/* Remarks */}

          <div>
            <label className="block mb-3 font-semibold text-slate-700 dark:text-slate-300">
              Admission Remarks
            </label>

            <textarea
              rows={6}
              name="notes.remarks"
              value={formData?.notes?.remarks}
              onChange={handleChange}
              placeholder="Write any additional notes, medical information, behaviour observations, special instructions, or admission remarks..."
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                dark:border-slate-700
                bg-slate-50
                dark:bg-slate-800
                dark:text-white
                px-5
                py-4
                resize-none
                focus:ring-2
                focus:ring-orange-500
                outline-none
              "
            />
          </div>
        </div>
      </div>

      {/* Information Card */}

      <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 p-6">
        <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
          Optional Information
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-6">
          These notes are visible only to school administrators and staff.
          You can mention behavioural observations, medical conditions,
          counselling recommendations, extracurricular interests, or any
          important admission remarks.
        </p>
      </div>
    </div>
  );
}

export default NotesStep;