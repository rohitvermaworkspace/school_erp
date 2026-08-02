import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  {
    day: "Mon",
    attendance: 92,
  },

  {
    day: "Tue",
    attendance: 88,
  },

  {
    day: "Wed",
    attendance: 95,
  },

  {
    day: "Thu",
    attendance: 91,
  },

  {
    day: "Fri",
    attendance: 97,
  },
];

function AttendanceChart() {
  return (
    <div
      className="
      bg-white dark:bg-slate-900
      rounded-2xl
      shadow-card
      p-6
      border
      border-gray-100"
    >
      <h2
        className="
        text-xl
        font-semibold
        mb-6 text-gray-500 dark:text-gray-300"
      >
        Attendance Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceChart;
