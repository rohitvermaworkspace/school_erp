import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layout/AppLayout";
import NoticeTable from "../../components/notices/NoticeTable";
import AddNoticeModal from "../../components/notices/AddNoticeModal";
import EditNoticeModal from "../../components/notices/EditNoticeModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaBell, FaUsers, FaUserGraduate, FaSchool } from "react-icons/fa";

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("All Audience");
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 5;

  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);
  const latestNotice = useMemo(() => {
    return [...notices].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
  }, [notices]);
  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notices");
      setNotices(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to load notices");
    } finally {
      setLoading(false);
    }
  };

  const deleteNotice = async () => {
    try {
      setDeleteLoading(true);
      await api.delete(`/notices/${deleteId}`);
      toast.success("Notice deleted successfully");
      fetchNotices();
      setConfirmOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete notice");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Dynamic filter for both search input AND audience dropdown select
  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchesSearch =
        notice.title?.toLowerCase().includes(search.toLowerCase()) ||
        notice.description?.toLowerCase().includes(search.toLowerCase());

      const matchesAudience =
        selectedAudience === "All Audience" ||
        notice.audience?.toLowerCase() === selectedAudience.toLowerCase();

      return matchesSearch && matchesAudience;
    });
  }, [notices, search, selectedAudience]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedAudience]);

  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(indexOfFirstNotice, indexOfLastNotice);

  const allAudienceCount = notices.filter((notice) => notice.audience === "all").length;
  const studentAudienceCount = notices.filter((notice) => notice.audience === "students").length;

  const teacherAudienceCount = notices.filter(
    (notice) => notice.audience === "teachers"
  ).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
       <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold">
            Notice Board Management
          </h1>

          <p className="mt-2 text-white/90">
            Create, publish and manage announcements for students,
            teachers and parents.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Total Notices */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 p-6 text-white shadow-lg">
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-white/10" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">
                  Total Notices
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {notices.length}
                </h2>

                <p className="mt-2 text-xs text-white/70">
                  Published notices
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <FaBell className="text-3xl" />
              </div>
            </div>
          </div>

          {/* Public Notices */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 p-6 text-white shadow-lg">
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-white/10" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">
                  Public Notices
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {allAudienceCount}
                </h2>

                <p className="mt-2 text-xs text-white/70">
                  Visible to everyone
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <FaUsers className="text-3xl" />
              </div>
            </div>
          </div>

          {/* Student Notices */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-600 p-6 text-white shadow-lg">
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-white/10" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">
                  Student Notices
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {studentAudienceCount}
                </h2>

                <p className="mt-2 text-xs text-white/70">
                  Student specific
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <FaUserGraduate className="text-3xl" />
              </div>
            </div>
          </div>

          {/* Teacher Notices */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-6 text-white shadow-lg">
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-white/10" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">
                  Teacher Notices
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {teacherAudienceCount}
                </h2>

                <p className="mt-2 text-xs text-white/70">
                  Teacher specific
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <FaUsers className="text-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* QUICK TRACKING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-800 shadow-sm">
            <p className="text-gray-500 text-sm">Latest Notice</p>
            <h4 className="font-semibold mt-2 dark:text-white truncate">
              {notices[0]?.title || "-"}
            </h4>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-800 shadow-sm">
            <p className="text-gray-500 text-sm">Active Notices</p>
            <h4 className="font-semibold mt-2 dark:text-white">{notices.length}</h4>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-800 shadow-sm">
            <p className="text-gray-500 text-sm">Student Audience</p>
            <h4 className="font-semibold mt-2 dark:text-white">{studentAudienceCount}</h4>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-800 shadow-sm">
            <p className="text-gray-500 text-sm">Public Audience</p>
            <h4 className="font-semibold mt-2 dark:text-white">{allAudienceCount}</h4>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <FaSchool className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Notice Board</h2>
                  <p className="text-sm text-white/80">Manage school notices and announcements</p>
                </div>
              </div>
              <button
                onClick={() => setOpenModal(true)}
                className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
              >
                + Add Notice
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto p-6">

          {/* SEARCH & FILTERS CONTROLS */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search notice..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
              className="px-4 py-3 rounded-xl border dark:border-slate-700 bg-gray-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="All Audience">All Audience</option>
              <option value="students">Students</option>
              <option value="teachers">Teachers</option>
            </select>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-md shadow-indigo-500/10"
            >
              + Add Notice
            </button>
          </div>

          <NoticeTable
            notices={currentNotices}
            loading={loading}
            onEdit={(notice) => {
              setSelectedNotice(notice);
              setEditModal(true);
            }}
            onDelete={(id) => {
              setDeleteId(id);
              setConfirmOpen(true);
            }}
          />

          <div className="flex justify-between items-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            <span>
              Showing {filteredNotices.length === 0 ? 0 : indexOfFirstNotice + 1} to{" "}
              {Math.min(indexOfLastNotice, filteredNotices.length)} of {filteredNotices.length} notices
            </span>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8 flex-wrap">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl border dark:border-slate-700 dark:text-white disabled:opacity-50 transition hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-xl font-medium transition ${
                    currentPage === index + 1
                      ? "bg-primary text-white shadow-md"
                      : "border dark:border-slate-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 rounded-xl border dark:border-slate-700 dark:text-white disabled:opacity-50 transition hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Next
              </button>
            </div>
          )}
          </div>
        </div>

        {/* MODALS */}
        <AddNoticeModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          fetchNotices={fetchNotices}
        />

        <EditNoticeModal
          isOpen={editModal}
          onClose={() => setEditModal(false)}
          notice={selectedNotice}
          fetchNotices={fetchNotices}
        />

        <ConfirmModal
          isOpen={confirmOpen}
          title="Delete Notice"
          message="Are you sure you want to delete this notice?"
          onConfirm={deleteNotice}
          onCancel={() => {
            setConfirmOpen(false);
            setDeleteId(null);
          }}
          loading={deleteLoading}
        />
      </div>
    </AdminLayout>
  );
}

export default Notices;