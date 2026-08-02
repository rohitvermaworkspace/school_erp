import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import api from "../../../services/api";

function ResultList() {
  const [results, setResults] = useState([]);
  const [deleteId, setDeleteId] =
    useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res =
        await api.get("/results");

      setResults(
        res.data.data || []
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load results"
      );
    }
  };

  const handleDelete = async (
    id
  ) => {
    try {
      await api.delete(
        `/results/${id}`
      );

      toast.success(
        "Result deleted successfully"
      );

      setDeleteId(null);

      fetchResults();
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to delete result"
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Results
          </h1>

          <Link
            to="/admin/results/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Create Result
          </Link>

        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead>
              <tr className="bg-gray-100">

                <th className="p-3 text-left">
                  Student
                </th>

                <th className="text-left">
                  Exam
                </th>

                <th className="text-left">
                  Class
                </th>

                <th className="text-left">
                  %
                </th>

                <th className="text-left">
                  Status
                </th>

                <th className="text-left">
                  Published
                </th>

                <th className="text-center">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {results.map(
                (result) => (
                  <tr
                    key={result._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {
                        result.student
                          ?.name
                      }
                    </td>

                    <td>
                      {
                        result.examName
                      }
                    </td>

                    <td>
                      {
                        result.className
                      }
                    </td>

                    <td>
                      {
                        result.percentage
                      }
                      %
                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          result.status ===
                          "Pass"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {
                          result.status
                        }
                      </span>

                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          result.published
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {result.published
                          ? "Published"
                          : "Draft"}
                      </span>

                    </td>

                    <td>

                      <div className="flex gap-2 justify-center">

                        <Link
                          to={`/admin/results/view/${result._id}`}
                          className="px-3 py-1 rounded bg-blue-100 text-blue-700 text-sm"
                        >
                          View
                        </Link>

                        <Link
                          to={`/admin/results/edit/${result._id}`}
                          className="px-3 py-1 rounded bg-green-100 text-green-700 text-sm"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            setDeleteId(
                              result._id
                            )
                          }
                          className="px-3 py-1 rounded bg-red-100 text-red-700 text-sm"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        {/* Delete Confirmation Modal */}

        {deleteId && (
          <ConfirmModal
            title="Delete Result"
            message="Are you sure you want to delete this result? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            onCancel={() =>
              setDeleteId(null)
            }
            onConfirm={() =>
              handleDelete(
                deleteId
              )
            }
          />
        )}

      </div>
    </DashboardLayout>
  );
}

export default ResultList;