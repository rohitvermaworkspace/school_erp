import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const AttendanceAnalyticsCard = ({ data, onClick }) => {
  const chartData = [
    {
      name: "Present",
      value: data?.present || 0,
    },
    {
      name: "Absent",
      value: data?.absent || 0,
    },
    {
      name: "Late",
      value: data?.late || 0,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-6 shadow-sm">
        <div
            onClick={onClick}
            className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-6 shadow-sm cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
        <h2 className="text-lg font-semibold mb-5 dark:text-white">
            Attendance Overview
        </h2>

        <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={chartData}
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                >
                {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                ))}
                </Pie>

                <Tooltip />
            </PieChart>
            </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center">
            <p className="text-green-600 font-semibold">{data?.present || 0}</p>
            <p className="text-xs text-slate-500">Present</p>
            </div>

            <div className="text-center">
            <p className="text-red-500 font-semibold">{data?.absent || 0}</p>
            <p className="text-xs text-slate-500">Absent</p>
            </div>

            <div className="text-center">
            <p className="text-amber-500 font-semibold">{data?.late || 0}</p>
            <p className="text-xs text-slate-500">Late</p>
            </div>
        </div>
        </div>
    </div>
  );
};

export default AttendanceAnalyticsCard;