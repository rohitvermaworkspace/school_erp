import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function FeeCollectionChart({
  data,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-card border border-gray-100 dark:border-slate-800 p-6">
      <h2 className="text-xl font-semibold mb-5 dark:text-white">
        Fee Collection
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="name"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="amount"
              radius={[
                8, 8, 0, 0,
              ]}
              fill="#6366f1"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FeeCollectionChart;