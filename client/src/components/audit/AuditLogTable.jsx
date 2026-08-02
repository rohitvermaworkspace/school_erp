function AuditLogTable({
  logs,
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">

      {/* Table Header */}
      <div className="px-6 py-5 border-b dark:border-slate-800">
        <h3 className="text-lg font-bold dark:text-white">
          Activity Records
        </h3>

        <p className="text-sm text-gray-500">
          System audit trail and user actions
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr className="text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
              <th className="px-6 py-4">#</th>

              <th className="px-6 py-4">Date & Time</th>

              <th className="px-6 py-4">User</th>

              <th className="px-6 py-4">Module</th>

              <th className="px-6 py-4">Action</th>

              <th className="px-6 py-4">Details</th>
            </tr>
          </thead>

          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-16 text-gray-500"
                >
                  No audit logs found
                </td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr
                  key={log._id}
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

                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold dark:text-white">
                        {log.performedBy?.name || "System"}
                      </p>

                      <p className="text-xs text-gray-500">
                        {log.performedBy?.role || "System"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-medium">
                      {log.module}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          log.action === "CREATE"
                            ? "bg-green-100 text-green-700"
                            : log.action === "UPDATE"
                            ? "bg-blue-100 text-blue-700"
                            : log.action === "DELETE"
                            ? "bg-red-100 text-red-700"
                            : "bg-slate-100 text-slate-700"
                        }
                      `}
                    >
                      {log.action}
                    </span>
                  </td>

                  <td className="px-6 py-4 max-w-sm">
                    <p className="truncate">
                      {log.details}
                    </p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
{/* Pagination */}
{totalPages > 1 && (
  <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-t dark:border-slate-800">
    {/* Previous */}
    <button
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
      className="
        px-4 py-2
        rounded-xl
        border
        border-slate-300
        dark:border-slate-700
        dark:text-white
        hover:bg-slate-50
        dark:hover:bg-slate-800
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      Previous
    </button>

    {/* Page Numbers */}
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {(() => {
        const pages = [];

        if (totalPages <= 7) {
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);

          if (currentPage > 3) {
            pages.push("...");
          }

          const start = Math.max(2, currentPage - 1);
          const end = Math.min(totalPages - 1, currentPage + 1);

          for (let i = start; i <= end; i++) {
            pages.push(i);
          }

          if (currentPage < totalPages - 2) {
            pages.push("...");
          }

          pages.push(totalPages);
        }

        return pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-slate-500"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                w-10 h-10
                rounded-xl
                text-sm
                font-semibold
                transition-all
                ${
                  currentPage === page
                    ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }
              `}
            >
              {page}
            </button>
          )
        );
      })()}
    </div>

    {/* Next */}
    <button
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
      className="
        px-4 py-2
        rounded-xl
        border
        border-slate-300
        dark:border-slate-700
        dark:text-white
        hover:bg-slate-50
        dark:hover:bg-slate-800
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      Next
    </button>
  </div>
)}
    </div>
  );
}

export default AuditLogTable;