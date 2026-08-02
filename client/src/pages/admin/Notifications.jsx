import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  FaBullhorn,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaSchool,
} from "react-icons/fa";

import AdminLayout from "../../components/layout/AppLayout";
import NotificationTable from "../../components/notifications/NotificationTable";
import AddNotificationModal from "../../components/notifications/AddNotificationModal";
import EditNotificationModal from "../../components/notifications/EditNotificationModal";

import api from "../../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [deleteModal, setDeleteModal] = useState({
  open: false,
  id: null,
});
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch {
      toast.error("Failed to load notices");
    }
  };

  const handleDelete = (id) => {
  setDeleteModal({
    open: true,
    id,
  });
};

  const filteredNotifications = useMemo(() => {
    let data = [...notifications];

    if (search) {
      data = data.filter(
        (item) =>
          item.title?.toLowerCase().includes(search.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (priorityFilter !== "all") {
      data = data.filter(
        (item) =>
          item.priority?.toLowerCase() === priorityFilter.toLowerCase()
      );
    }

    return data;
  }, [notifications, search, priorityFilter]);

  const totalPages = Math.ceil(
    filteredNotifications.length / recordsPerPage
  );

  const currentRecords = filteredNotifications.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const totalNotices = notifications.length;

  const highPriority = notifications.filter(
    (n) => n.priority === "HIGH"
  ).length;

  const recentNotices = notifications.filter((n) => {
    const created = new Date(n.createdAt);
    const diff =
      (Date.now() - created.getTime()) /
      (1000 * 60 * 60 * 24);

    return diff <= 7;
  }).length;

  const confirmDelete = async () => {
  try {
    await api.delete(
      `/notifications/${deleteModal.id}`
    );

    toast.success(
      "Notification deleted successfully"
    );

    fetchNotifications();

    setDeleteModal({
      open: false,
      id: null,
    });

  } catch {
    toast.error("Delete failed");
  }
};
  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Hero Section */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-xl">

          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

          <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col lg:flex-row justify-between gap-6">

            <div>
              <h1 className="text-4xl font-black">
                Notice Board
              </h1>

              <p className="text-white/80 mt-2">
                Create and manage school announcements
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="
                bg-white
                text-indigo-700
                px-6
                py-3
                rounded-2xl
                font-bold
                shadow-lg
                hover:scale-105
                transition
              "
            >
              + Add Notice
            </button>

          </div>
        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-5">

          <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100">
                  Total Notices
                </p>
                <h2 className="text-4xl font-black mt-2">
                  {totalNotices}
                </h2>
              </div>

              <FaBullhorn className="text-4xl text-white/80" />
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-orange-100">
                  High Priority
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {highPriority}
                </h2>
              </div>

              <FaExclamationTriangle className="text-4xl text-white/80" />
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-100">
                  Last 7 Days
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {recentNotices}
                </h2>
              </div>

              <FaCalendarAlt className="text-4xl text-white/80" />
            </div>
          </div>

        </div>

        {/* Filters */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-gray-100 dark:border-slate-800 shadow-lg">

          <div className="flex flex-col md:flex-row gap-4">

            <div className="relative flex-1">

              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search notices..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3
                  rounded-2xl
                  border
                  border-gray-200
                  dark:border-slate-700
                  bg-gray-50
                  dark:bg-slate-800
                  dark:text-white
                "
              />
            </div>

            <div className="relative w-full md:w-60">

              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(e.target.value)
                }
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3
                  rounded-2xl
                  border
                  border-gray-200
                  dark:border-slate-700
                  bg-gray-50
                  dark:bg-slate-800
                  dark:text-white
                "
              >
                <option value="all">
                  All Priority
                </option>

                <option value="high">
                  High
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="low">
                  Low
                </option>

              </select>
            </div>

          </div>

        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaSchool className="text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Notification Center</h2>
                <p className="text-sm text-white/80">Manage all notifications and alerts</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto p-6">
          <NotificationTable
            notifications={currentRecords}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onEdit={setSelectedNotification}
            onDelete={handleDelete}
          />
          </div>
        </div>

        {/* Modals */}

        {showAddModal && (
          <AddNotificationModal
            onClose={() =>
              setShowAddModal(false)
            }
            onSuccess={fetchNotifications}
          />
        )}

        {selectedNotification && (
          <EditNotificationModal
            notification={selectedNotification}
            onClose={() =>
              setSelectedNotification(null)
            }
            onSuccess={fetchNotifications}
          />
        )}

      </div>
      {
  deleteModal.open && (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 p-5 text-white">

          <h2 className="text-xl font-bold">
            Delete Notification
          </h2>

          <p className="text-sm text-red-100 mt-1">
            This action cannot be undone.
          </p>

        </div>

        {/* Body */}
        <div className="p-6">

          <p className="text-slate-600 dark:text-slate-300">
            Are you sure you want to permanently
            delete this notification?
          </p>

          <div className="flex justify-end gap-3 mt-8">

            <button
              onClick={() =>
                setDeleteModal({
                  open: false,
                  id: null,
                })
              }
              className="
                px-5 py-2
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
              "
            >
              Cancel
            </button>

            <button
              onClick={confirmDelete}
              className="
                px-5 py-2
                rounded-xl
                bg-gradient-to-r
                from-red-500
                to-rose-600
                text-white
                font-semibold
                shadow-lg
              "
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}
    </AdminLayout>
  );
}

export default Notifications;