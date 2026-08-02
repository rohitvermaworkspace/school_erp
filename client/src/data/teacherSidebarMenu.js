import {
  FaChartPie,
  FaUserGraduate,
  FaCalendarCheck,
  FaHistory,
  FaBell,
  FaClock,
  FaUser,
  FaBookOpen,
  FaChartBar,
  FaFilePdf,
  FaCalendarAlt,
} from "react-icons/fa";

export default [
  {
      title: "Dashboard",
      path: "/teacher/dashboard",
      icon: FaChartPie,
    },
    {
      title: "Students",
      path: "/teacher/students",
      icon: FaUserGraduate,
    },
    {
      title: "Attendance",
      path: "/teacher/attendance",
      icon: FaCalendarCheck,
    },
    {
      title: "Attendance History",
      path: "/teacher/attendance-history",
      icon: FaHistory,
    },
    {
      title: "Timetable",
      path: "/teacher/timetable",
      icon: FaClock,
    },
    {
      title: "Notices",
      path: "/teacher/notices",
      icon: FaBell,
    },
    {
      title: "Profile",
      path: "/teacher/profile",
      icon: FaUser,
    },
    {
      title: "Marks",
      path: "/teacher/marks",
      icon: FaBookOpen,
    },
    {
      title: "Results",
      path: "/teacher/results",
      icon: FaChartBar,
    },
    {
      title: "Report Cards",
      path: "/teacher/report-cards",
      icon: FaFilePdf,
    },
    {
      title: "Leave Requests",
      path: "/teacher/leaves",
      icon: FaCalendarAlt
    },
    {
      title: "Leave History",
      path: "/teacher/leave-history",
      icon: FaHistory
    },
];