import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const ClassDistributionChart = ({ data = [], onSelect }) => {
  const safeData = data || [];

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow">

      <h2 className="text-lg font-semibold mb-4 dark:text-white">
        Class Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>

          <Pie
            data={safeData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
            onClick={(entry) => {
              if (onSelect) {
                onSelect(entry);
              }
            }}
          >
            {safeData.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

      {/* hint */}
      <p className="text-xs text-gray-400 mt-2">
        Click on a class to view details
      </p>

    </div>
  );
};

export default ClassDistributionChart;