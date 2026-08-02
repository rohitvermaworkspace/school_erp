import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const ClassWiseAttendanceChart = ({ data = [] }) => {
  const getColor = (value) => {
    if (value >= 90) return "#22c55e";
    if (value >= 75) return "#3b82f6";
    if (value >= 50) return "#f59e0b";

    return "#ef4444";
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-5 dark:text-white">
        Class Wise Attendance
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            domain={[0, 100]}
          />

          <YAxis
            type="category"
            dataKey="className"
          />

          <Tooltip
            formatter={(value) => [`${value}%`, "Attendance"]}
          />

          <Bar
            dataKey="percentage"
            radius={[0, 8, 8, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={getColor(entry.percentage)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClassWiseAttendanceChart;