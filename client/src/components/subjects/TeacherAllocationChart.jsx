import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = [
  "#10B981",
  "#059669",
  "#34D399",
  "#6EE7B7",
  "#22C55E",
  "#16A34A",
];

function TeacherAllocationChart({ data = [] }) {
  const totalSubjects = data.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 shadow-card">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold dark:text-white">
            Teacher Allocation
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Subject distribution by teacher
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Subjects
          </p>

          <p className="text-2xl font-bold text-emerald-600">
            {totalSubjects}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              type="number"
              allowDecimals={false}
            />

            <YAxis
              type="category"
              dataKey="teacherName"
              width={120}
            />

            <Tooltip />

            <Bar
              dataKey="count"
              radius={[0, 10, 10, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TeacherAllocationChart;