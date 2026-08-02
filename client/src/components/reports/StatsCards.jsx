import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaBook,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

function StatsCards({
  students,
  teachers,
  classes,
  subjects,
  totalCollection,
  paidCollection,
}) {
  const cards = [
    {
      title: "Students",
      value: students,
      icon: FaUserGraduate,
      cardBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      title: "Teachers",
      value: teachers,
      icon: FaChalkboardTeacher,
      cardBg: "bg-gradient-to-br from-purple-500 to-indigo-600",
    },
    {
      title: "Classes",
      value: classes,
      icon: FaSchool,
      cardBg: "bg-gradient-to-br from-green-500 to-emerald-600",
    },
    {
      title: "Subjects",
      value: subjects,
      icon: FaBook,
      cardBg: "bg-gradient-to-br from-orange-500 to-amber-500",
    },
    {
      title: "Total Revenue",
      value: `₹${Number(totalCollection).toLocaleString()}`,
      icon: FaMoneyBillWave,
      cardBg: "bg-gradient-to-br from-emerald-500 to-green-700",
    },
    {
      title: "Collected Revenue",
      value: `₹${Number(paidCollection).toLocaleString()}`,
      icon: FaCheckCircle,
      cardBg: "bg-gradient-to-br from-pink-500 to-rose-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className={`relative overflow-hidden rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-white ${card.cardBg}`}
          >
            {/* Decorative Shape */}
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full bg-black/10" />

            <div className="relative flex justify-between items-center">
              <div>
                <p className="text-white/80 text-sm font-medium">{card.title}</p>
                <h3 className="text-4xl font-bold mt-3">{card.value}</h3>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;