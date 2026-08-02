const AdminKPI = ({ stats = {} }) => {
  const cards = [
    { label: "Total Students", value: stats.totalStudents || 0 },
    { label: "Total Attendance", value: stats.totalAttendance || 0 },
    { label: "Attendance Rate", value: `${stats.attendanceRate?.toFixed?.(2) || 0}%` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {cards.map((c, i) => (
        <div
          key={i}
          className="p-5 rounded-xl bg-white dark:bg-slate-900 shadow"
        >
          <p className="text-gray-500">{c.label}</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
            {c.value}
          </h2>
        </div>
      ))}

    </div>
  );
};

export default AdminKPI;