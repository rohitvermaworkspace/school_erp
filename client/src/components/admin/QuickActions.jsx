import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaBook,
  FaBullhorn,
  FaChartBar,
  FaCalendarAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const modules = [
  {
    title: "Students",
    icon: FaUserGraduate,
    path: "/admin/students",
  },
  {
    title: "Teachers",
    icon: FaChalkboardTeacher,
    path: "/admin/teachers",
  },
  {
    title: "Attendance",
    icon: FaClipboardCheck,
    path: "/admin/attendance",
  },
  {
    title: "Fees",
    icon: FaMoneyBillWave,
    path: "/admin/fees",
  },
  {
    title: "Subjects",
    icon: FaBook,
    path: "/admin/subjects",
  },
  {
    title: "Notices",
    icon: FaBullhorn,
    path: "/admin/notices",
  },
  {
    title: "Reports",
    icon: FaChartBar,
    path: "/admin/reports",
  },
  {
    title: "Timetable",
    icon: FaCalendarAlt,
    path: "/admin/timetable",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-5 dark:text-white">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {modules.map((module) => {
          const Icon = module.icon;

          return (
            <button
              key={module.title}
              onClick={() => navigate(module.path)}
              className="
                p-5
                rounded-xl
                border
                dark:border-slate-700
                hover:border-blue-500
                hover:shadow-lg
                transition
                text-center
              "
            >
              <Icon className="mx-auto text-2xl text-blue-600 mb-3" />

              <p className="font-medium dark:text-white">
                {module.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;