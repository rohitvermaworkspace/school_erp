import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import {
  FaSearch,
} from "react-icons/fa";

function StudentResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalExams = results.length;
  const [search, setSearch] = useState("");

  const avgPercentage =
    results.length > 0
      ? (
          results.reduce((sum, r) => sum + r.percentage, 0) / results.length
        ).toFixed(1)
      : 0;

  const passedExams = results.filter((r) => r.status === "Pass").length;

  const highestScore =
    results.length > 0 ? Math.max(...results.map((r) => r.percentage)) : 0;
  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await api.get("/student-results");

      setResults(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const filteredResults = results.filter((r) =>
    r.examName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Total Exams</p>
            <h2 className="text-3xl font-bold text-blue-600">{totalExams}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Average Score</p>
            <h2 className="text-3xl font-bold text-green-600">
              {avgPercentage}%
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Passed Exams</p>
            <h2 className="text-3xl font-bold text-purple-600">
              {passedExams}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Highest Score</p>
            <h2 className="text-3xl font-bold text-orange-600">
              {highestScore}%
            </h2>
          </div>
         <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">
              Overall Grade
            </p>

            <h2 className="text-3xl font-bold text-indigo-600">
              {results[0]?.grade || "-"}
            </h2>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg mb-8">
            <h1 className="text-3xl font-bold">Academic Results</h1>

            <p className="mt-2 text-blue-100">
              Track your performance, grades and report cards.
            </p>
          </div>

          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search by exam name..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                pl-12
                pr-4
                py-3
                border
                rounded-xl
                focus:ring-2
                focus:ring-blue-500
                focus:outline-none
              "
            />
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : filteredResults.length === 0 ? (
          <div className="bg-white rounded-xl p-6 shadow">
            No Results Available
          </div>
        ) : (
          <div className="space-y-6">
            {filteredResults.map((result) => (
              <div
                key={result._id}
                className="bg-white rounded-2xl shadow overflow-hidden"
              >
                {/* Header */}

                <div className="bg-blue-600 text-white p-5">
                  <h2 className="text-2xl font-bold">{result.examName}</h2>

                  <p>Class: {result.className}</p>
                </div>

                {/* Summary */}

                <div className="grid md:grid-cols-4 gap-4 p-5">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-500">Obtained</p>

                    <h3 className="text-2xl font-bold">
                      {result.obtainedMarks}
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-500">Total</p>

                    <h3 className="text-2xl font-bold">{result.totalMarks}</h3>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-500">Percentage</p>

                    <h3 className="text-2xl font-bold text-blue-600">
                      {result.percentage}%
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-500">Grade</p>

                    <h3
                      className={`text-2xl font-bold ${
                        result.grade === "A+"
                          ? "text-green-600"
                          : result.grade === "A"
                          ? "text-blue-600"
                          : result.grade === "B"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {result.grade}
                    </h3>
                  </div>
                </div>

                {/* Subject Table */}

                <div className="px-5 pb-5 overflow-x-auto">
                  <table className="w-full border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left">Subject</th>

                        <th className="p-3 text-left">Code</th>

                        <th className="p-3 text-center">Obtained</th>

                        <th className="p-3 text-center">Max</th>
                      </tr>
                    </thead>

                    <tbody>
                      {result.subjects.map((item) => (
                        <tr key={item._id} className="border-t">
                          <td className="p-3">{item.subject?.subjectName}</td>

                          <td className="p-3">{item.subject?.subjectCode}</td>

                          <td className="p-3 text-center">
                            {item.marksObtained}
                          </td>

                          <td className="p-3 text-center">{item.maxMarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}

                <div className="bg-gray-50 px-5 py-4 flex justify-between items-center">
                  <div>
                    <span>
                      Status:
                      <span
                        className={`ml-2 font-semibold ${
                          result.status === "Pass"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {result.status}
                      </span>
                    </span>

                    <span className="ml-6">
                      Published:
                      <span
                        className={`ml-2 font-semibold ${
                          result.published
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {result.published ? "Yes" : "No"}
                      </span>
                    </span>
                  </div>

                  <Link
                    to={`/student/report-card/${result._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    View Report Card
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default StudentResults;