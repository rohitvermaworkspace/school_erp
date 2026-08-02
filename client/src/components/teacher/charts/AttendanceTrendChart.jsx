import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AttendanceTrendChart = ({ data = [] }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">
        Attendance Trend
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="attendance" stroke="#10b981" />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default AttendanceTrendChart;