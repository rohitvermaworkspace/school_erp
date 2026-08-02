import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function MonthlyAttendanceChart({ data = [] }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">

      <h3 className="text-xl font-bold mb-4">
        Monthly Attendance
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default MonthlyAttendanceChart;