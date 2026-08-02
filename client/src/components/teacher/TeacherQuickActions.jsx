import {
  FaClipboardCheck,
  FaChartLine,
  FaFilePdf,
  FaGraduationCap,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const actions = [
  {
    title: "Attendance",
    icon: FaClipboardCheck,
    path: "/teacher/attendance",
  },
  {
    title: "Marks Entry",
    icon: FaGraduationCap,
    path: "/teacher/marks",
  },
  {
    title: "Results",
    icon: FaChartLine,
    path: "/teacher/results",
  },
  {
    title: "Report Cards",
    icon: FaFilePdf,
    path: "/teacher/report-cards",
  },
];

function TeacherQuickActions() {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.title}
            to={action.path}
            className="
              bg-white
              dark:bg-slate-900
              border
              dark:border-slate-800
              rounded-2xl
              p-5
              flex
              flex-col
              items-center
              gap-3
              hover:shadow-lg
              transition-all
            "
          >
            <Icon className="text-3xl text-blue-600" />

            <span className="font-medium dark:text-white">
              {action.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default TeacherQuickActions;