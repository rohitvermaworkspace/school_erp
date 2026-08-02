import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ConfirmModal from "../../components/ui/ConfirmModal";
import CreateResult from "./results/CreateResult";
import EditResult from "./results/EditResult";
import ResultDetails from "./results/ResultDetails";

import api from "../../services/api";
import {
  FaClipboardCheck,
  FaGraduationCap,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaBullhorn,
  FaSchool,
} from "react-icons/fa";

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [examFilter, setExamFilter] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await api.get("/results");

      setResults(res.data.data || []);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load results");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/results/${deleteId}`);
      toast.success("Result deleted successfully");
      setDeleteId(null);
     fetchResults();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete result");
    }
  };

  const handlePublish = async (id) => {
    try {
      await api.put(`/results/${id}/publish`);
      toast.success("Result published successfully");
      fetchResults();
    } catch (error) {
      console.log(error);

      toast.error("Failed to publish result");
    }
  };

  const filteredResults = results.filter((result) => {
    const studentName = result.student?.name?.toLowerCase() || "";
    return (
      studentName.includes(search.toLowerCase()) &&
      (classFilter === "" || result.className === classFilter) &&
      (examFilter === "" || result.examName === examFilter)
    );
  });

  return (
  <DashboardLayout>
    <div className="space-y-8">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Results Management</h1>
            <p className="text-white/80 text-lg">
              Create, publish and manage student examination results.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-white text-indigo-700 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
          >
            + Create Result
          </button>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80">Total Results</p>
          <h3 className="text-3xl font-bold mt-2">{results.length}</h3>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80">Published</p>
          <h3 className="text-3xl font-bold mt-2">
            {results.filter((r) => r.published).length}
          </h3>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80">Draft</p>
          <h3 className="text-3xl font-bold mt-2">
            {results.filter((r) => !r.published).length}
          </h3>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-80">Pass Rate</p>
          <h3 className="text-3xl font-bold mt-2">
            {results.length
              ? Math.round(
                  (results.filter((r) => r.status === "Pass").length /
                    results.length) *
                    100
                )
              : 0}
            %
          </h3>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold dark:text-white">
            Search & Filters
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <input
            type="text"
            placeholder="Search Student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
          />

          <input
            type="text"
            placeholder="Filter by Class..."
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
          />

          <input
            type="text"
            placeholder="Filter by Exam..."
            value={examFilter}
            onChange={(e) => setExamFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* RESULTS TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-lg">
        {/* TABLE HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
          <div className="flex items-center gap-3 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaGraduationCap className="text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Examination Results</h2>
              <p className="text-sm text-white/80">View and manage student examination results</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-x-auto p-6">

        {loading ? (
          <div className="p-10 text-center dark:text-white">
            Loading Results...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Exam</th>
                  <th className="px-6 py-4 text-left font-semibold">Class</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Percentage
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Grade</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Published
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredResults.length > 0 ? (
                  filteredResults.map((result) => (
                    <tr
                      key={result._id}
                      className="border-t border-gray-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                    >
                      <td className="px-6 py-4 font-medium dark:text-white">
                        {result.student?.name}
                      </td>

                      <td className="px-6 py-4 dark:text-gray-300">
                        {result.examName}
                      </td>

                      <td className="px-6 py-4 dark:text-gray-300">
                        {result.className}
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-indigo-600">
                          {result.percentage}%
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                          {result.grade}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            result.status === "Pass"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {result.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            result.published
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {result.published ? "Published" : "Draft"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2 flex-wrap">
                          <button
                            onClick={() => {
                              setSelectedResult(result);
                              setShowViewModal(true);
                            }}
                            className="px-3 py-2 rounded-xl bg-blue-500 text-white text-sm hover:bg-blue-600"
                          >
                            View
                          </button>

                          <button
                            onClick={() => {
                              setSelectedResult(result);
                              setShowEditModal(true);
                            }}
                            className="px-3 py-2 rounded-xl bg-yellow-500 text-white text-sm hover:bg-yellow-600"
                          >
                            Edit
                          </button>

                          {!result.published && (
                            <button
                              onClick={() => handlePublish(result._id)}
                              className="px-3 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700"
                            >
                              Publish
                            </button>
                          )}

                          <button
                            onClick={() => setDeleteId(result._id)}
                            className="px-3 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-10 text-gray-500"
                    >
                      No Results Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        </div>
      </div>

      {/* MODALS */}
      {showCreateModal && (
        <CreateResult
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchResults();
          }}
        />
      )}

      {showViewModal && selectedResult && (
        <ResultDetails
          result={selectedResult}
          onClose={() => setShowViewModal(false)}
        />
      )}

      {showEditModal && selectedResult && (
        <EditResult
          result={selectedResult}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            fetchResults();
          }}
        />
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Result"
        message="Are you sure you want to delete this result?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  </DashboardLayout>
);
}

export default Results;