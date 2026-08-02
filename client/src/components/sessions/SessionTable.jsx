import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

function SessionTable({
  sessions,
  onEdit,
  onDelete,
  onActivate,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 dark:bg-slate-800">
          <tr>
            <th className="p-4 text-left">Session</th>
            <th className="p-4 text-left">Start</th>
            <th className="p-4 text-left">End</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sessions.map((session) => (
            <tr
              key={session._id}
              className="border-b dark:border-slate-800"
            >
              <td className="p-4 font-semibold dark:text-white">
                {session.sessionName}
              </td>

              <td className="p-4">
                {new Date(
                  session.startDate
                ).toLocaleDateString()}
              </td>

              <td className="p-4">
                {new Date(
                  session.endDate
                ).toLocaleDateString()}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    session.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {session.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex gap-2">

                  {!session.isActive && (
                    <button
                      onClick={() =>
                        onActivate(session)
                      }
                      className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"
                    >
                      <FaCheck />
                    </button>
                  )}

                  <button
                    onClick={() => onEdit(session)}
                    className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onDelete(session)}
                    className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center"
                  >
                    <FaTrash />
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SessionTable;