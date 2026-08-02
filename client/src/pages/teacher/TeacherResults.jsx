import { useEffect, useState } from "react";
import TeacherLayout from "../../components/layout/TeacherLayout";
import {
  getClassResults,
  getTopPerformers,
  getSubjectSummary,
} from "../../services/resultService";
import {
  FaUsers,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaChartBar,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function TeacherResults() {
  const [className, setClassName] = useState("10A");
  const [summary, setSummary] = useState(null);
  const [topPerformers, setTopPerformers] = useState([]);
  const [subjectSummary, setSubjectSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadResults();
  }, [className]);

  const loadResults = async () => {
    try {
      setLoading(true);

      const [summaryData, performersData, subjectData] = await Promise.all([
        getClassResults(className),
        getTopPerformers(className),
        getSubjectSummary(className),
      ]);

      setSummary(summaryData);
      setTopPerformers(performersData);
      setSubjectSummary(subjectData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resultData = [
    {
      name: "Pass",
      value: summary?.passPercentage || 0,
    },
    {
      name: "Fail",
      value: summary?.failPercentage || 0,
    },
  ];

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Results & Analytics</h1>

              <p className="mt-2 text-blue-100">
                Monitor class performance and academic insights
              </p>
            </div>

            <div>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="
          bg-white
          text-gray-700
          rounded-xl
          px-4
          py-3
          font-medium
        "
              >
                <option value="10A">10A</option>
                <option value="10B">10B</option>
                <option value="9A">9A</option>
                <option value="9B">9B</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <>
            {/* STATS */}
            {summary && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-6 shadow-lg flex justify-between items-center">
                  <div>
                    <p>Total Students</p>
                    <h2 className="text-4xl font-bold">
                      {summary.totalStudents}
                    </h2>
                  </div>
                  <FaUsers size={40} />
                </div>

                <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-2xl p-6 shadow-lg flex justify-between items-center">
                  <div>
                    <p>Average Marks</p>
                    <h2 className="text-4xl font-bold">
                      {summary.averageMarks}%
                    </h2>
                  </div>
                  <FaChartLine size={40} />
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl p-6 shadow-lg flex justify-between items-center">
                  <div>
                    <p>Pass %</p>
                    <h2 className="text-4xl font-bold">
                      {summary.passPercentage}%
                    </h2>
                  </div>
                  <FaCheckCircle size={40} />
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-700 text-white rounded-2xl p-6 shadow-lg flex justify-between items-center">
                  <div>
                    <p>Fail %</p>
                    <h2 className="text-4xl font-bold">
                      {summary.failPercentage}%
                    </h2>
                  </div>
                  <FaTimesCircle size={40} />
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Pass Fail */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">Pass vs Fail</h2>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={resultData}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis type="number" />

                    <YAxis
                      dataKey="name"
                      type="category"
                    />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      radius={[0, 10, 10, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Subject Chart */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">Subject Performance</h2>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectSummary}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="average"
                      fill="#4f46e5"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* TOP PERFORMERS */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
              {/* TABLE HEADER */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <FaChartBar className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Top Performers</h2>
                    <p className="text-sm text-white/80">Highest scoring students</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4">Rank</th>
                    <th className="p-4 text-left">Student</th>
                    <th className="p-4">Roll No</th>
                    <th className="p-4">Percentage</th>
                  </tr>
                </thead>

                <tbody>
                  {topPerformers.map((student, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-4 text-center font-bold">
                        🏆 #{index + 1}
                      </td>

                      <td className="p-4 font-medium">{student.name}</td>

                      <td className="p-4 text-center">{student.rollNumber}</td>

                      <td className="p-4 text-center font-bold text-green-600">
                        {student.percentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>

            {/* SUBJECT ANALYTICS */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Subject Analytics</h2>

              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-slate-700">
                    <th className="text-left p-3">Subject</th>

                    <th className="text-left p-3">Average</th>
                  </tr>
                </thead>

                <tbody>
                  {subjectSummary.map((subject, index) => (
                    <tr key={index} className="border-b dark:border-slate-800">
                      <td className="p-3">{subject.subject}</td>

                      <td className="p-3">{subject.average}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </TeacherLayout>
  );
}

export default TeacherResults;