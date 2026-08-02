import { useEffect, useState } from "react";
import api from "../../services/api";
import TeacherLayout from "../../components/layout/TeacherLayout";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

function TeacherStudents() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await api.get("/students");
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };
  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase();

    return (
      student.name?.toLowerCase().includes(search) ||
      student.rollNumber?.toLowerCase().includes(search) ||
      student.className?.toLowerCase().includes(search) ||
      student.email?.toLowerCase().includes(search)
    );
  });
  return (
    <TeacherLayout>
      <div className="p-6 space-y-6">
        {/* HERO */}

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Students Management</h1>

          <p className="mt-2 text-blue-100">
            View and manage all students assigned to your classes.
          </p>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Total Students</p>

            <h2 className="text-3xl font-bold text-blue-600">
              {filteredStudents.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Classes</p>

            <h2 className="text-3xl font-bold text-green-600">
              {new Set(students.map((s) => s.className)).size}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Active Students</p>

            <h2 className="text-3xl font-bold text-purple-600">
              {students.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Email Linked</p>

            <h2 className="text-3xl font-bold text-orange-600">
              {students.filter((s) => s.email).length}
            </h2>
          </div>
        </div>

        {/* SEARCH */}

        <div className="bg-white rounded-2xl shadow p-4">
          <input
            type="text"
            placeholder="Search by name, roll no, class or email..."
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

        {/* TABLE */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaUsers className="text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Students List</h2>
                <p className="text-sm text-white/80">View and manage your students</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-left">Student</th>
                  <th className="px-5 py-4 text-left">Roll No</th>
                  <th className="px-5 py-4 text-left">Class</th>
                  <th className="px-5 py-4 text-left">Email</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>

             <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-500"
                    >
                      No students found
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr
                      key={student._id}
                      className="
                        border-t
                        hover:bg-gray-50
                        transition
                      "
                    >
                      {/* Student Info */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
                            {student.name?.charAt(0)}
                          </div>

                          <div>
                            <p className="font-medium text-gray-900">
                              {student.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              Student
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Roll Number */}
                      <td className="px-5 py-4 font-medium">
                        {student.rollNumber}
                      </td>

                      {/* Class */}
                      <td className="px-5 py-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {student.className}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="px-5 py-4 text-gray-600">
                        {student.email || "-"}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="
                              px-3 py-2
                              rounded-lg
                              bg-blue-100
                              text-blue-700
                              hover:bg-blue-200
                              transition
                            "
                          >
                            Profile
                          </button>

                          <button
                            onClick={() =>
                              navigate(
                                `/teacher/students/${student._id}/attendance`
                              )
                            }
                            className="
                              px-3 py-2
                              rounded-lg
                              bg-green-100
                              text-green-700
                              hover:bg-green-200
                              transition
                            "
                          >
                            Attendance
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
      </div>
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Student Profile</h2>

              <button onClick={() => setSelectedStudent(null)}>✕</button>
            </div>

            <div className="space-y-3">
              <p>
                <strong>Name:</strong> {selectedStudent.name}
              </p>

              <p>
                <strong>Roll:</strong> {selectedStudent.rollNumber}
              </p>

              <p>
                <strong>Class:</strong> {selectedStudent.className}
              </p>

              <p>
                <strong>Email:</strong> {selectedStudent.email}
              </p>

              <p>
                <strong>Phone:</strong> {selectedStudent.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </TeacherLayout>
  );
}

export default TeacherStudents;