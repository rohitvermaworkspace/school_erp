import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AttendanceChart({ attendance = 0 }) {
  // Convert single value into chart format
  const data = [
    { name: "Present", value: attendance },
    { name: "Absent", value: 100 - attendance },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">
      
      <h3 className="text-xl font-bold mb-4">
        Attendance Overview
      </h3>

      <div className="h-64 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            
            <CartesianGrid strokeDasharray="3 3" />
            
            <XAxis dataKey="name" />
            
            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default AttendanceChart;