import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaBullhorn,
} from "react-icons/fa";

const DashboardStats = ({ stats }) => {
  const cards = [
    {
      title: "Students",
      value: stats.totalStudents,
      icon: <FaUserGraduate />,
      gradient: "from-blue-500/80 to-blue-700/80",
    },
    {
      title: "Attendance",
      value: `${stats.attendanceRate?.toFixed(2) || 0}%`,
      icon: <FaClipboardCheck />,
      gradient: "from-green-500/80 to-green-700/80",
    },
    {
      title: "Classes",
      value: stats.totalClasses,
      icon: <FaChalkboardTeacher />,
      gradient: "from-purple-500/80 to-purple-700/80",
    },
    {
      title: "Notices",
      value: stats.totalNotices,
      icon: <FaBullhorn />,
      gradient: "from-orange-500/80 to-orange-700/80",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className="
            relative overflow-hidden
            rounded-2xl p-6
            bg-white/10 dark:bg-slate-800/30
            backdrop-blur-xl
            border border-white/20
            shadow-lg
            hover:scale-[1.02]
            transition
          "
        >

          {/* gradient glow */}
          <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-95`} />

          <div className="relative z-10 flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-200">{card.title}</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {card.value}
              </h2>
            </div>

            <div className="text-white text-2xl opacity-80">
              {card.icon}
            </div>

          </div>

        </div>
      ))}

    </div>
  );
};

export default DashboardStats;