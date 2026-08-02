import {
  FaGraduationCap,
  FaUser,
  FaUsers,
  FaMapMarkerAlt,
  FaUniversity,
  FaSchool,
  FaBus,
  FaFileAlt,
  FaStickyNote,
  FaClipboardCheck,
} from "react-icons/fa";

const icons = [
  FaGraduationCap, // Academic
  FaUser,          // Student
  FaUsers,         // Parents
  FaMapMarkerAlt,  // Address
  FaUniversity,    // Bank
  FaSchool,        // Previous School
  FaBus,           // Facilities
  FaFileAlt,       // Documents
  FaStickyNote,    // Notes
  FaClipboardCheck // Review
];

function AdmissionSidebar({
  steps = ["Academic", "Student", "Parents", "Address", "Bank Details", "Previous School", "Facilities", "Documents", "Notes", "Review"],
  currentStep = 1,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
        Admission Progress
      </h2>

      <p className="text-sm text-slate-500 mb-8">
        Complete each step to finish the student admission.
      </p>

      <div className="space-y-5">
        {steps.map((step, index) => {
          const Icon = icons[index] || FaClipboardCheck;
          const completed = index + 1 < currentStep;
          const active = index + 1 === currentStep;

          return (
            <div key={step} className="flex items-start gap-4 relative">
              {/* Vertical Line */}

              {index !== steps.length - 1 && (
                <div
                  className={`absolute left-6 top-12 w-0.5 h-10 ${
                    completed
                      ? "bg-green-500"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              )}

              {/* Icon */}

              <div
                className={`
                  w-12
                  h-12
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  shadow-md
                  transition-all

                  ${
                    completed
                      ? "bg-green-500 text-white"
                      : active
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white scale-110"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  }
                `}
              >
                {completed ? (
                  <span className="font-bold text-lg">✓</span>
                ) : (
                  <Icon />
                )}
              </div>

              {/* Text */}

              <div className="pt-1">
                <h3
                  className={`
                    font-semibold

                    ${
                      active
                        ? "text-blue-600 dark:text-blue-400"
                        : completed
                        ? "text-green-600"
                        : "text-slate-700 dark:text-slate-300"
                    }
                  `}
                >
                  {step}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {active
                    ? "Currently Editing"
                    : completed
                    ? "Completed"
                    : "Pending"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Progress */}

      <div className="mt-10">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium dark:text-white">Progress</span>

          <span className="font-bold text-blue-600">
            {Math.round((currentStep / steps.length) * 100)}%
          </span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-500"
            style={{
              width: `${(currentStep / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdmissionSidebar;