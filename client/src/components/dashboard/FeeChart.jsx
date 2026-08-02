import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { month: "Apr", collected: 85000, pending: 15000 },
  { month: "May", collected: 92000, pending: 18000 },
  { month: "Jun", collected: 105000, pending: 12000 },
  { month: "Jul", collected: 118000, pending: 22000 },
  { month: "Aug", collected: 125000, pending: 17000 },
  { month: "Sep", collected: 132000, pending: 9000 },
  { month: "Oct", collected: 145000, pending: 12000 },
  { month: "Nov", collected: 138000, pending: 8000 },
  { month: "Dec", collected: 152000, pending: 6000 },
];

function FeeChart() {
  const totalCollected = data.reduce(
    (sum, item) => sum + item.collected,
    0
  );

  const totalPending = data.reduce(
    (sum, item) => sum + item.pending,
    0
  );

  const collectionRate = (
    (totalCollected / (totalCollected + totalPending)) *
    100
  ).toFixed(1);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Fee Analytics
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Academic Session 2026-2027
          </p>
        </div>

        <div className="flex gap-6">

          <div>
            <p className="text-xs uppercase text-slate-500">
              Collected
            </p>

            <p className="text-lg font-bold text-green-600">
              ₹{totalCollected.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">
              Pending
            </p>

            <p className="text-lg font-bold text-red-500">
              ₹{totalPending.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">
              Collection Rate
            </p>

            <p className="text-lg font-bold text-blue-600">
              {collectionRate}%
            </p>
          </div>

        </div>
      </div>

      {/* CHART */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.15}
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              `₹${value.toLocaleString()}`,
            ]}
          />

          <Legend />

          <Bar
            dataKey="collected"
            name="Collected Fees"
            fill="#16a34a"
            radius={[8, 8, 0, 0]}
          />

          <Bar
            dataKey="pending"
            name="Pending Fees"
            fill="#ef4444"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* FOOTER STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <div className="bg-green-50 dark:bg-green-500/10 rounded-xl p-4">
          <p className="text-sm text-slate-500">
            Total Collected
          </p>

          <h3 className="text-2xl font-bold text-green-600">
            ₹{totalCollected.toLocaleString()}
          </h3>
        </div>

        <div className="bg-red-50 dark:bg-red-500/10 rounded-xl p-4">
          <p className="text-sm text-slate-500">
            Total Pending
          </p>

          <h3 className="text-2xl font-bold text-red-500">
            ₹{totalPending.toLocaleString()}
          </h3>
        </div>

        <div className="bg-blue-50 dark:bg-blue-500/10 rounded-xl p-4">
          <p className="text-sm text-slate-500">
            Recovery Percentage
          </p>

          <h3 className="text-2xl font-bold text-blue-600">
            {collectionRate}%
          </h3>
        </div>

      </div>
    </div>
  );
}

export default FeeChart;