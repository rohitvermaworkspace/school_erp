import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  FaBullhorn,
  FaExclamationCircle,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";

function StudentNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);

      const res = await api.get("/notices");

      setNotices(res.data?.data || []);
    } catch (err) {
      console.log("NOTICE ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotices = useMemo(() => {
    return notices.filter(
      (notice) =>
        notice.title?.toLowerCase().includes(search.toLowerCase()) ||
        notice.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [notices, search]);

  const totalNotices = notices.length;

  const importantNotices = notices.filter(
    (n) =>
      n.priority === "High" ||
      n.priority === "Important"
  ).length;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
              <FaBullhorn />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Notice Board
              </h1>

              <p className="text-blue-100 mt-1">
                Stay updated with school announcements and important information.
              </p>
            </div>

          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">
              Total Notices
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalNotices}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">
              Important Notices
            </p>

            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {importantNotices}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">
              Latest Update
            </p>

            <h2 className="text-lg font-semibold mt-2">
              {notices.length > 0
                ? new Date(
                    notices[0].createdAt
                  ).toLocaleDateString()
                : "-"}
            </h2>
          </div>

        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-2xl shadow p-4">

          <div className="relative">

            <FaSearch
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search notices..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            Loading notices...
          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          filteredNotices.length === 0 && (
            <div className="bg-white rounded-2xl shadow p-10 text-center">

              <FaBullhorn
                size={50}
                className="mx-auto text-gray-300"
              />

              <h3 className="text-lg font-semibold mt-4">
                No Notices Found
              </h3>

              <p className="text-gray-500">
                There are currently no notices available.
              </p>

            </div>
          )}

        {/* NOTICE LIST */}
        <div className="space-y-5">

          {filteredNotices.map((notice) => (
            <div
              key={notice._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
            >

              {/* TOP BAR */}
              <div className="h-2 bg-blue-500" />

              <div className="p-6">

                <div className="flex justify-between items-start gap-4">

                  <div>

                    <h2 className="text-xl font-bold">
                      {notice.title}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      {notice.description}
                    </p>

                  </div>

                  <div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        notice.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {notice.priority || "Normal"}
                    </span>

                  </div>

                </div>

                {/* META */}
                <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">

                  <span className="flex items-center gap-2">
                    <FaCheckCircle />
                    {notice.createdBy?.name ||
                      "Admin"}
                  </span>

                  <span>
                    📅{" "}
                    {new Date(
                      notice.createdAt
                    ).toLocaleDateString()}
                  </span>

                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    {notice.audience}
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default StudentNotices;