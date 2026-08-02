import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const TeacherAnalyticsCard = ({ data, onClick }) => {
  const chartData = [
    {
      name: "Active",
      value: data?.active || 0,
    },
    {
      name: "On Leave",
      value: data?.leave || 0,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-6 shadow-sm">
      <div
        onClick={onClick}
        className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-6 shadow-sm cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
      >
        <h2 className="text-lg font-semibold mb-5 dark:text-white">
          Teacher Overview
        </h2>

        <div className="text-center mb-4">
          <h3 className="text-3xl font-bold text-blue-600">
            {data?.total || 0}
          </h3>

          <p className="text-sm text-slate-500">Total Teachers</p>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeacherAnalyticsCard;