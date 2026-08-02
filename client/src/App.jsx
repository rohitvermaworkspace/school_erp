import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// AUTH
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// PROTECTED ROUTE
import ProtectedRoute from "./routes/ProtectedRoutes";

// LAYOUT
import AppLayout from "./components/layout/AppLayout";

// ADMIN
import AcademicSessions from "./pages/admin/AcademicSessions";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import StudentAdmission from "./pages/admin/StudentAdmission";
import Teachers from "./pages/admin/Teachers";
import Classes from "./pages/admin/Classes";
import Attendance from "./pages/attendance/Attendance";
import Subjects from "./pages/admin/Subjects";
import Notices from "./pages/admin/Notices";
import Fees from "./pages/admin/Fees";
import Timetable from "./pages/admin/Timetable";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import Notifications from "./pages/admin/Notifications";
import AuditLogs from "./pages/admin/AuditLogs";
import Files from "./pages/admin/Files";
import AdminLeaveManagement from "./pages/admin/AdminLeaveManagement";
import Results from "./pages/admin/Results";
import Profile from "./pages/admin/Profile";

// STUDENT
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentFees from "./pages/student/StudentFees";
import StudentNotices from "./pages/student/StudentNotices";
import StudentTimetable from "./pages/student/StudentTimetable";
import StudentSubjects from "./pages/student/StudentSubjects";
import StudentResults from "./pages/student/results/StudentResults";
import StudentReportCard from "./pages/student/results/StudentReportCard";
import StudentLeave from "./pages/student/StudentLeave";

// TEACHER
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherStudents from "./pages/teacher/TeacherStudents";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import TeacherAttendanceHistory from "./pages/teacher/TeacherAttendanceHistory";
import TeacherTimetable from "./pages/teacher/TeacherTimetable";
import TeacherNotices from "./pages/teacher/TeacherNotices";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherMarks from "./pages/teacher/TeacherMarks";
import TeacherResults from "./pages/teacher/TeacherResults";
import TeacherReportCard from "./pages/teacher/TeacherReportCard";
import TeacherLeaveRequest from "./pages/teacher/TeacherLeaveRequest";
import TeacherStudentAttendance from "./pages/teacher/TeacherStudentAttendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AppLayout><AdminDashboard /></AppLayout></ProtectedRoute>} />
        <Route path="/admin/academic-sessions" element={<ProtectedRoute allowedRoles={["admin"]}><AcademicSessions /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute allowedRoles={["admin"]}><Students /></ProtectedRoute>} />
        <Route path="/admin/student-admission" element={<ProtectedRoute allowedRoles={["admin"]}><StudentAdmission /></ProtectedRoute>} />
        <Route path="/admin/teachers" element={<ProtectedRoute allowedRoles={["admin"]}><Teachers /></ProtectedRoute>} />
        <Route path="/admin/classes" element={<ProtectedRoute allowedRoles={["admin"]}><Classes /></ProtectedRoute>} />
        <Route path="/admin/attendance" element={<ProtectedRoute allowedRoles={["admin"]}><Attendance /></ProtectedRoute>} />
        <Route path="/admin/subjects" element={<ProtectedRoute allowedRoles={["admin"]}><Subjects /></ProtectedRoute>} />
        <Route path="/admin/notices" element={<ProtectedRoute allowedRoles={["admin"]}><Notices /></ProtectedRoute>} />
        <Route path="/admin/fees" element={<ProtectedRoute allowedRoles={["admin"]}><Fees /></ProtectedRoute>} />
        <Route path="/admin/timetable" element={<ProtectedRoute allowedRoles={["admin"]}><Timetable /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={["admin"]}><Reports /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={["admin"]}><Settings /></ProtectedRoute>} />
        <Route path="/admin/notifications" element={<ProtectedRoute allowedRoles={["admin"]}><Notifications /></ProtectedRoute>} />
        <Route path="/admin/audit-logs" element={<ProtectedRoute allowedRoles={["admin"]}><AuditLogs /></ProtectedRoute>} />
        <Route path="/admin/files" element={<ProtectedRoute allowedRoles={["admin"]}><Files /></ProtectedRoute>} />
        <Route path="/admin/leaves" element={<ProtectedRoute allowedRoles={["admin"]}><AdminLeaveManagement /></ProtectedRoute>} />
        <Route path="/admin/results" element={<ProtectedRoute allowedRoles={["admin"]}><Results /></ProtectedRoute>} />

        {/* STUDENT */}
        <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute allowedRoles={["student"]}><StudentProfile /></ProtectedRoute>} />
        <Route path="/student/attendance" element={<ProtectedRoute allowedRoles={["student"]}><StudentAttendance /></ProtectedRoute>} />
        <Route path="/student/fees" element={<ProtectedRoute allowedRoles={["student"]}><StudentFees /></ProtectedRoute>} />
        <Route path="/student/notices" element={<ProtectedRoute allowedRoles={["student"]}><StudentNotices /></ProtectedRoute>} />
        <Route path="/student/timetable" element={<ProtectedRoute allowedRoles={["student"]}><StudentTimetable /></ProtectedRoute>} />
        <Route path="/student/subjects" element={<ProtectedRoute allowedRoles={["student"]}><StudentSubjects /></ProtectedRoute>} />
        <Route path="/student/results" element={<ProtectedRoute allowedRoles={["student"]}><StudentResults /></ProtectedRoute>} />
        <Route path="/student/report-card/:id" element={<ProtectedRoute allowedRoles={["student"]}><StudentReportCard /></ProtectedRoute>} />
        <Route path="/student/leave" element={<ProtectedRoute allowedRoles={["student"]}><StudentLeave /></ProtectedRoute>} />

        {/* TEACHER */}
        <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRoles={["teacher"]}><AppLayout><TeacherDashboard /></AppLayout></ProtectedRoute>} />
        <Route path="/teacher/students" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherStudents /></ProtectedRoute>} />
        <Route path="/teacher/attendance" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherAttendance /></ProtectedRoute>} />
        <Route path="/teacher/attendance-history" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherAttendanceHistory /></ProtectedRoute>} />
        <Route path="/teacher/timetable" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherTimetable /></ProtectedRoute>} />
        <Route path="/teacher/notices" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherNotices /></ProtectedRoute>} />
        <Route path="/teacher/profile" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherProfile /></ProtectedRoute>} />
        <Route path="/teacher/marks" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherMarks /></ProtectedRoute>} />
        <Route path="/teacher/results" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherResults /></ProtectedRoute>} />
        <Route path="/teacher/report-cards" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherReportCard /></ProtectedRoute>} />
        <Route path="/teacher/leaves" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherLeaveRequest /></ProtectedRoute>} />
        <Route path="/teacher/students/:id/attendance" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherStudentAttendance /></ProtectedRoute>} />

        {/* COMMON */}
        <Route path="/profile" element={<ProtectedRoute allowedRoles={["admin", "teacher", "student"]}><Profile /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;