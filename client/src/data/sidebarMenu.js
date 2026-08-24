import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaCalendarAlt,
  FaBullhorn,
  FaUser,
  FaChartBar,
  FaMoneyBillWave,
  FaFileAlt,
  FaCog,
  FaUsers,
  FaHistory,
  FaFolderOpen,
  FaCalendarCheck,
  FaBookOpen,
  FaFilePdf,
  FaAward,
  FaSoundcloud,
  FaClipboardList,
  FaSchool,
  FaUserShield,
} from "react-icons/fa";

const sidebarMenu = [
  // ================= SUPER ADMIN =================
  {
    role: "super_admin",
    items: [
      { title: "Dashboard", path: "/super-admin/dashboard", icon: FaHome },
      {
        title: "Schools",
        icon: FaSchool,
        children: [
          { title: "All Schools", path: "/super-admin/schools" },
          { title: "Add School", path: "/super-admin/schools/create" },
        ],
      },
      {
        title: "Academic Configuration",
        icon: FaBookOpen,
        children: [
          { title: "Classes", path: "/super-admin/classes" },
          { title: "Subjects", path: "/super-admin/subjects" },
          { title: "Class Subjects", path: "/super-admin/class-subjects" },
        ],
      },
      { title: "School Admins", path: "/super-admin/school-admins", icon: FaUserShield },
      { title: "Users", path: "/super-admin/users", icon: FaUsers },
      { title: "Reports", path: "/super-admin/reports", icon: FaChartBar },
      { title: "Settings", path: "/super-admin/settings", icon: FaCog },
      { title: "Profile", path: "/profile", icon: FaUser },
    ],
  },

  // ================= ADMIN =================
  {
    role: "admin",
    items: [
      { title: "Academic Session", path: "/admin/academic-sessions", icon: FaCalendarAlt },
      { title: "Dashboard", path: "/admin/dashboard", icon: FaHome },
      { title: "Students", path: "/admin/students", icon: FaUserGraduate },
      { title: "Teachers", path: "/admin/teachers", icon: FaChalkboardTeacher },
      { title: "Classes", path: "/admin/classes", icon: FaUsers },
      { title: "Attendance", path: "/admin/attendance", icon: FaClipboardCheck },
      { title: "Subjects", path: "/admin/subjects", icon: FaFileAlt },
      { title: "Notices", path: "/admin/notices", icon: FaBullhorn },
      { title: "Fees", path: "/admin/fees", icon: FaMoneyBillWave },
      { title: "Timetable", path: "/admin/timetable", icon: FaCalendarAlt },
      { title: "Reports", path: "/admin/reports", icon: FaChartBar },
      { title: "Profile", path: "/profile", icon: FaUser },
      { title: "Results", path: "/admin/results", icon: FaAward },
      { title: "Settings", path: "/admin/settings", icon: FaCog },
      { title: "Notifications", path: "/admin/notifications", icon: FaCog },
      { title: "Audit Logs", path: "/admin/audit-logs", icon: FaHistory },
      { title: "Files", path: "/admin/files", icon: FaFolderOpen },
      { title: "Leave Management", path: "/admin/leaves", icon: FaCalendarCheck },
      
    ],
  },

  // ================= TEACHER =================
  {
    role: "teacher",
    items: [
      { title: "Dashboard", path: "/teacher/dashboard", icon: FaHome },
      { title: "Students", path: "/teacher/students", icon: FaUserGraduate },
      { title: "Attendance", path: "/teacher/attendance", icon: FaClipboardCheck },
      { title: "Timetable", path: "/teacher/timetable", icon: FaCalendarAlt },
      { title: "Notices", path: "/teacher/notices", icon: FaBullhorn },
      { title: "Profile", path: "/teacher/profile", icon: FaUser },
      { title: "Marks", path: "/teacher/marks", icon: FaChartBar },
      { title: "Results", path: "/teacher/results", icon: FaFileAlt },
      { title: "Report Cards", path: "/teacher/report-cards", icon: FaFilePdf },
      { title: "Leave Management", path: "/teacher/leaves", icon: FaCalendarAlt },
      
    ],
  },

  // ================= STUDENT =================
  {
    role: "student",
    items: [
      { title: "Student Dashboard", path: "/student/dashboard", icon: FaHome },
      { title: "Student Profile", path: "/student/profile", icon: FaUserGraduate },
      { title: "Student Attendance", path: "/student/attendance", icon: FaClipboardCheck },
      { title: "Student Fees", path: "/student/fees", icon: FaHistory },
      { title: "Student Notices", path: "/student/notices", icon: FaSoundcloud },
      { title: "Student Timetable", path: "/student/timetable", icon: FaCalendarAlt },
      { title: "Student Subjects", path: "/student/subjects", icon: FaBookOpen},
      { title: "Student Results", path: "/student/results", icon: FaAward },
      { title: "Leave Management", path: "/student/leave", icon: FaClipboardList, },
    ],
  },
];

export default sidebarMenu;