import { useEffect, useState } from "react";
import { getAttendanceByClass } from "../../services/attendanceService";
import { FaHistory } from "react-icons/fa";

function TeacherAttendanceHistory({ className }) {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, [className]);

  const fetchAttendance = async () => {
    try {
      const data = await getAttendanceByClass(className);
      setAttendance(data || []);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
      {/* TABLE HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
        <div className="flex items-center gap-3 text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <FaHistory className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Attendance History - {className}</h2>
            <p className="text-sm text-white/80">{attendance.length} records found</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-x-auto p-6">
        {attendance.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No attendance found</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Student</th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Status</th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4 font-medium">{item.student?.name}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "present"
                        ? "bg-green-100 text-green-700"
                        : item.status === "absent"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TeacherAttendanceHistory;
