import { FaEdit, FaTrash, FaBell } from "react-icons/fa";
import { MdGroups, MdSchool } from "react-icons/md";
import { PiChalkboardTeacherFill } from "react-icons/pi";

function NoticeTable({
  notices,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

        <p className="text-gray-500 dark:text-gray-400">
          Loading notices...
        </p>
      </div>
    );
  }

  if (!notices || notices.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl">
        <FaBell className="mx-auto text-4xl text-gray-300 mb-4" />

        <h3 className="font-semibold text-lg dark:text-white">
          No Notices Found
        </h3>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Create your first notice to get started.
        </p>
      </div>
    );
  }

  const getAudienceBadge = (audience) => {
    switch (audience) {
      case "students":
        return {
          icon: <MdSchool />,
          className:
            "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
          label: "Students",
        };

      case "teachers":
        return {
          icon: <PiChalkboardTeacherFill />,
          className:
            "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
          label: "Teachers",
        };

      default:
        return {
          icon: <MdGroups />,
          className:
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
          label: "All Audience",
        };
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-slate-800">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                Notice
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                Audience
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                Created By
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                Published
              </th>

              <th className="px-6 py-4 text-center text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-100 dark:divide-slate-800">
            {notices.map((notice) => {
              const badge = getAudienceBadge(
                notice.audience
              );

              return (
                <tr
                  key={notice._id}
                  className="
                    hover:bg-gray-50/70
                    dark:hover:bg-slate-800/40
                    transition-all
                    duration-200
                  "
                >
                  {/* Notice */}
                  <td className="px-6 py-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600">
                        <FaBell />
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {notice.title}
                        </h4>

                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md truncate mt-1">
                          {notice.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Audience */}
                  <td className="px-6 py-5">
                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-1.5
                        rounded-full
                        text-xs
                        font-semibold
                        ${badge.className}
                      `}
                    >
                      {badge.icon}
                      {badge.label}
                    </span>
                  </td>

                  {/* Created By */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {notice.createdBy?.name ||
                          "System Admin"}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {notice.createdBy?.email || "-"}
                      </p>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(
                          notice.createdAt
                        ).toLocaleDateString()}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(
                          notice.createdAt
                        ).toLocaleTimeString()}
                      </p>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 p-1.5 rounded-xl">
                        <button
                          onClick={() => onEdit(notice)}
                          className="
                            w-9
                            h-9
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-blue-600
                            hover:bg-blue-50
                            dark:hover:bg-blue-500/10
                            transition
                          "
                          title="Edit Notice"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() =>
                            onDelete(notice._id)
                          }
                          className="
                            w-9
                            h-9
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-red-600
                            hover:bg-red-50
                            dark:hover:bg-red-500/10
                            transition
                          "
                          title="Delete Notice"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NoticeTable;