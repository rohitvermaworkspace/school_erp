function StatCard({ title, value, icon, color }) {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900
      rounded-2xl
      shadow-card
      p-6
      hover:shadow-xl
      transition-all
      border
      border-gray-100
      dark:border-slate-800"
    >
      <div
        className="
        flex
        items-center
        justify-between"
      >
        <div>
          <p
            className="
            text-gray-500
            dark:text-gray-400
            text-sm"
          >
            {title}
          </p>

          <h2
            className="
            text-3xl
            font-bold
            mt-2 text-black
            dark:text-white"
          >
            {value}
          </h2>
        </div>

        <div
          className={`
          text-5xl
          ${color}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
