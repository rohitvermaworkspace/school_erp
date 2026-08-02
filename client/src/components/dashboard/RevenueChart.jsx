import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "Jan",
    revenue: 4000,
  },
  {
    month: "Feb",
    revenue: 7000,
  },
  {
    month: "Mar",
    revenue: 5000,
  },
  {
    month: "Apr",
    revenue: 9000,
  },
];

function RevenueChart() {
  return (
    <div
      className="
      bg-white dark:bg-slate-900
      p-6
      rounded-xl
      shadow-md"
    >
      <h2
        className="
        text-xl
        font-bold
        mb-4"
      >
        Revenue Analytics
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line type="monotone" dataKey="revenue" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
