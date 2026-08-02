const StatCard = ({
  title,
  value
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow">

      <h3 className="text-gray-500 dark:text-gray-300">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
};

export default StatCard;