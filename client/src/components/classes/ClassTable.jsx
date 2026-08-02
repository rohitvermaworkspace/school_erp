import { FaEdit, FaTrash } from 'react-icons/fa';

function ClassTable({ classes = [], loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-500 dark:text-gray-400">Loading classes...</p>
      </div>
    );
  }

  if (!loading && classes.length === 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-500 dark:text-gray-400">No classes found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-slate-800">
      <table className="w-full min-w-[900px]">
        {/* HEADER */}
        <thead className="bg-gray-50 dark:bg-slate-800">
          <tr>
            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Class Name</th>

            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Section</th>

            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Class Teacher</th>

            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Total Students</th>

            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Created By</th>

            <th className="p-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {classes.map((cls) => (
            <tr
              key={cls._id}
              className="
                border-t
                border-gray-100
                dark:border-slate-800
                hover:bg-gray-50
                dark:hover:bg-slate-800/50
                transition
              "
            >
              <td className="p-4 font-medium dark:text-white">{cls.className}</td>
              <td className="p-4 dark:text-gray-300">{cls.section}</td>
              <td className="p-4 dark:text-gray-300">{cls.classTeacher?.name}</td>
              <td className="p-4 dark:text-gray-300">{cls.totalStudents || 0}</td>
              <td className="p-4 dark:text-gray-300">{cls.createdBy?.name || 'Admin'}</td>
              <td className="p-4">
                <div className="flex justify-center gap-3">
                  {/* EDIT */}
                  <button
                    onClick={() => onEdit(cls)}
                    className="
                      w-9
                      h-9
                      rounded-lg
                      bg-blue-100
                      dark:bg-blue-500/20
                      text-blue-600
                      flex
                      items-center
                      justify-center
                      hover:scale-105
                      transition
                    "
                  >
                    <FaEdit />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => onDelete(cls._id)}
                    className="
                      w-9
                      h-9
                      rounded-lg
                      bg-red-100
                      dark:bg-red-500/20
                      text-red-600
                      flex
                      items-center
                      justify-center
                      hover:scale-105
                      transition
                    "
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

export default ClassTable;
