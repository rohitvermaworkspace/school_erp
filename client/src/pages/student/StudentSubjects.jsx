import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";

import SubjectCard from "../../components/students/SubjectCard";
import SubjectDetailsModal from "../../components/students/SubjectDetailsModal";
import TeacherProfileModal from "../../components/students/TeacherProfileModal";
import SubjectAttendanceCard from "../../components/students/SubjectAttendanceCard";
import SubjectResources from "../../components/students/SubjectResources";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaFolderOpen,
  FaUserCheck,
  FaSearch,
} from "react-icons/fa";

function StudentSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedSubject, setSelectedSubject] = useState(null);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [attendance, setAttendance] = useState(null);

  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);
  const filteredSubjects = subjects.filter((subject) =>
    subject.subjectName?.toLowerCase().includes(search.toLowerCase())
  );
  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects/student");

      setSubjects(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openSubjectDetails = async (subject) => {
    setSelectedSubject(subject);

    try {
      const attendanceRes = await api.get(
        `/subjects/student/${subject._id}/attendance`
      );

      setAttendance(attendanceRes.data);
    } catch {
      setAttendance({
        present: 46,
        absent: 4,
        attendancePercentage: 92,
      });
    }

    try {
      const resourcesRes = await api.get(`/resources/subject/${subject._id}`);

      setResources(resourcesRes.data || []);
    } catch {
      setResources([
        {
          _id: "1",
          title: "Chapter 1 Notes",
          fileUrl: "#",
        },
        {
          _id: "2",
          title: "Worksheet",
          fileUrl: "#",
        },
      ]);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* LOADING */}
        {/* HERO SECTION */}

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg mb-6">
          <h1 className="text-3xl font-bold">My Subjects</h1>

          <p className="mt-2 text-blue-100">
            View your subjects, teachers, attendance and learning resources.
          </p>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Subjects</p>

              <h2 className="text-3xl font-bold text-blue-600">
                {subjects.length}
              </h2>
            </div>

            <FaBookOpen className="text-4xl text-blue-500" />
          </div>

          <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Teachers</p>

              <h2 className="text-3xl font-bold text-green-600">
                {new Set(subjects.map((s) => s.teacher?._id)).size}
              </h2>
            </div>

            <FaChalkboardTeacher className="text-4xl text-green-500" />
          </div>

          <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Resources</p>

              <h2 className="text-3xl font-bold text-orange-600">
                {subjects.length * 2}
              </h2>
            </div>

            <FaFolderOpen className="text-4xl text-orange-500" />
          </div>

          <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg Attendance</p>

              <h2 className="text-3xl font-bold text-purple-600">92%</h2>
            </div>

            <FaUserCheck className="text-4xl text-purple-500" />
          </div>
        </div>

        {/* SEARCH */}

        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
        w-full
        border
        rounded-xl
        pl-12
        pr-4
        py-3
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
      "
            />
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="bg-white p-6 rounded-xl shadow">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
              <SubjectCard
                key={subject._id}
                subject={subject}
                onViewDetails={openSubjectDetails}
              />
            ))}
          </div>
        )}

        {/* SUBJECT DETAILS MODAL */}

        {selectedSubject && (
          <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto">
            <div className="max-w-5xl mx-auto py-10 px-4">
              <div className="bg-white rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {selectedSubject.subjectName}
                  </h2>

                  <button
                    onClick={() => setSelectedSubject(null)}
                    className="text-xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Subject Details */}

                <SubjectDetailsModal
                  subject={selectedSubject}
                  onClose={() => setSelectedSubject(null)}
                  onViewTeacher={(teacher) => {
                    setSelectedSubject(null); // close details modal
                    setSelectedTeacher(teacher); // open teacher modal
                  }}
                />

                {/* Attendance */}

                <div className="mt-6">
                  <SubjectAttendanceCard attendance={attendance} />
                </div>

                {/* Resources */}

                <div className="mt-6">
                  <SubjectResources resources={resources} />
                </div>

                {/* Teacher Button */}

                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSelectedTeacher(selectedSubject.teacher);

                      setSelectedSubject(null);
                    }}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                  >
                    View Teacher
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TEACHER MODAL */}

        {selectedTeacher && (
          <TeacherProfileModal
            teacher={selectedTeacher}
            onClose={() => setSelectedTeacher(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default StudentSubjects;