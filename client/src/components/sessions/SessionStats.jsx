function SessionStats({ sessions }) {
  const total = sessions.length;
  const active = sessions.filter((s) => s.isActive).length;
  const archived = sessions.filter((s) => s.status === "Archived").length;

  const upcoming = sessions.filter(
    (s) => new Date(s.startDate) > new Date()
  ).length;

  const cards = [
    {
      title: "Total Sessions",
      value: total,
    },
    {
      title: "Active",
      value: active,
    },
    {
      title: "Archived",
      value: archived,
    },
    {
      title: "Upcoming",
      value: upcoming,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-5 shadow-sm"
        >
          <p className="text-sm text-slate-500">{card.title}</p>

          <h2 className="text-3xl font-bold dark:text-white mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default SessionStats;