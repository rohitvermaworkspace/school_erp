import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const OverviewBarChart = ({ data = [] }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">
        Overview of Classes
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default OverviewBarChart;