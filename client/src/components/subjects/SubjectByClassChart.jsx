import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const COLORS = [
  "#6366F1",
  "#8B5CF6",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

function SubjectByClassChart({ data = [] }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 shadow-card">
      <div className="flex justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold dark:text-white">
            Subjects By Class
          </h3>

          <p className="text-gray-500">Total Classes: {data.length}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Total Subjects</p>

          <p className="text-2xl font-bold text-indigo-600">
            {data.reduce((sum, item) => sum + item.count, 0)}
          </p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data} >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis type="number" />
            <YAxis
            type="category"
            dataKey="_id"
            />

            <Tooltip />

            <Bar dataKey="count" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SubjectByClassChart;