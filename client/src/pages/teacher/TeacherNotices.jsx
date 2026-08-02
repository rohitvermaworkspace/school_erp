import { useEffect, useState } from "react";
import TeacherLayout from "../../components/layout/TeacherLayout";
import { getNotices } from "../../services/noticeService";

function TeacherNotices() {
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const data = await getNotices();

      setNotices(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalNotices = notices.length;
  const todayNotices = notices.filter((n) => {
    const today = new Date().toDateString();
    return new Date(n.createdAt).toDateString() === today;
  }).length;

  const monthNotices = notices.filter((n) => {
    const today = new Date();
    const noticeDate = new Date(n.createdAt);

    return (
      noticeDate.getMonth() === today.getMonth() &&
      noticeDate.getFullYear() === today.getFullYear()
    );
  }).length;

  const filteredNotices = notices.filter((notice) =>
    notice.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TeacherLayout>
      <div className="p-6 space-y-6">
        {/* Hero */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-3xl font-bold">Notice Management</h1>

          <p className="mt-2 text-blue-100">
            View announcements and updates from administration
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Total Notices</p>

            <h2 className="text-3xl font-bold text-blue-600">{totalNotices}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Today's Notices</p>

            <h2 className="text-3xl font-bold text-green-600">
              {todayNotices}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">This Month</p>

            <h2 className="text-3xl font-bold text-purple-600">
              {monthNotices}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Latest Notice</p>

            <h2 className="font-bold truncate">{notices[0]?.title || "-"}</h2>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow p-4">
          <input
            type="text"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            focus:ring-2
            focus:ring-blue-500
            outline-none
          "
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            Loading notices...
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredNotices.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <h2 className="text-xl font-semibold">No Notices Found</h2>

            <p className="text-gray-500 mt-2">No announcements available.</p>
          </div>
        )}

        {/* Notice List */}
        {!loading && filteredNotices.length > 0 && (
          <div className="grid gap-5">
            {filteredNotices.map((notice) => (
              <div
                key={notice._id}
                className="
                  bg-white
                  rounded-2xl
                  shadow
                  border
                  border-gray-200
                  p-6
                  hover:shadow-lg
                  transition
                "
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      📢 {notice.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Posted on{" "}
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className="
                    bg-blue-100
                    text-blue-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                  "
                  >
                    Notice
                  </span>
                </div>

                <div className="mt-4 text-gray-700 leading-relaxed">
                  {notice.description}
                </div>

                <div
                  className="
                  mt-5
                  pt-4
                  border-t
                  text-sm
                  text-gray-500
                "
                >
                  Posted By: {notice.createdBy?.name || "Administration"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}

export default TeacherNotices;