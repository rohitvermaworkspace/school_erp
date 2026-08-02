const AdminStudentModal = ({ className, students = [], onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
        
        <div className="flex items-center justify-between p-5 border-b dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Class {className} Students
          </h2>

          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-red-500 text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-slate-800">
                <th className="text-left p-3 text-slate-500">Name</th>
                <th className="text-left p-3 text-slate-500">Attendance %</th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((s) => (
                  <tr
                    key={s.studentId}
                    className="border-b dark:border-slate-800"
                  >
                    <td className="p-3 text-slate-800 dark:text-white">
                      {s.name}
                    </td>

                    <td className="p-3 text-slate-800 dark:text-white">
                      {s.percentage?.toFixed(2)}%
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center p-6 text-slate-500"
                  >
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentModal;