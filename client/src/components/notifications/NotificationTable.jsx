import {
  FaEdit,
  FaTrash,
  FaBell,
  FaBullhorn,
} from "react-icons/fa";

function NotificationTable({
  notifications,
  onEdit,
  onDelete,
}) {
  const getTypeColor = (type) => {
    switch (type) {
      case "HOLIDAY":
        return "bg-green-100 text-green-700";
      case "EXAM":
        return "bg-red-100 text-red-700";
      case "EVENT":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };
  const getCategoryColor = (category) => {
  switch (category) {
    case "HOLIDAY":
      return "bg-green-100 text-green-700";

    case "EXAM":
      return "bg-red-100 text-red-700";

    case "EVENT":
      return "bg-purple-100 text-purple-700";

    case "FEE":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-blue-100 text-blue-700";
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-red-700";

    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-green-100 text-green-700";
  }
};
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">

      {/* Header */}
       <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
          <div className="flex items-center gap-3 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaBullhorn className="text-xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Notifications List</h2>
              <p className="text-sm text-white/80">
                School announcements and alerts
              </p>
            </div>
          </div>
        </div>
      <div className="overflow-x-auto">
        <table className="w-full">
        <thead className="bg-slate-50 dark:bg-slate-800">
          <tr className="text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Notification</th>
            <th className="px-6 py-4">Message</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Audience</th>
            <th className="px-6 py-4">Priority</th>
            <th className="px-6 py-4">Publish Date</th>
            <th className="px-6 py-4">Expiry Date</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

          <tbody>
            {notifications.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-16 text-gray-500">
                  No notifications found
                </td>
              </tr>
            ) : (
              notifications.map((item, index) => (
               <tr
                key={item._id}
                className="
                  border-t
                  dark:border-slate-800
                  hover:bg-slate-50
                  dark:hover:bg-slate-800/50
                  transition
                "
              >
                <td className="px-6 py-4 font-medium">
                  {index + 1}
                </td>

                {/* Notification */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center">
                      <FaBell />
                    </div>

                    <div>
                      <p className="font-semibold dark:text-white">
                        {item.title}
                      </p>

                      <p className="text-xs text-gray-500">
                        Announcement
                      </p>
                    </div>
                  </div>
                </td>

                {/* Message */}
                <td className="px-6 py-4 max-w-xs">
                  <p className="truncate">
                    {item.message}
                  </p>
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                      item.category || item.type
                    )}`}
                  >
                    {item.category || item.type}
                  </span>
                </td>

                {/* Audience */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                    {item.audience || item.role || "ALL"}
                  </span>
                </td>

                {/* Priority */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                      item.priority || "MEDIUM"
                    )}`}
                  >
                    {item.priority || "MEDIUM"}
                  </span>
                </td>

                {/* Publish Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.publishDate
                    ? new Date(
                        item.publishDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                {/* Expiry Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.expiryDate
                    ? new Date(
                        item.expiryDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.isActive !== false
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.isActive !== false
                      ? "Active"
                      : "Expired"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(item)}
                      className="
                        w-9 h-9 rounded-xl
                        bg-blue-100 text-blue-600
                        hover:bg-blue-200
                        transition flex items-center justify-center
                      "
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(item._id)}
                      className="
                        w-9 h-9 rounded-xl
                        bg-red-100 text-red-600
                        hover:bg-red-200
                        transition flex items-center justify-center
                      "
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default NotificationTable;