import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function ClassDistributionChart({
  data = [],
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 shadow-card mb-6">

      <h3 className="text-lg font-semibold mb-4 dark:text-white">
        Students Per Class
      </h3>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.3}
          />

          <XAxis dataKey="className" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="students"
            fill="#3b82f6"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ClassDistributionChart;