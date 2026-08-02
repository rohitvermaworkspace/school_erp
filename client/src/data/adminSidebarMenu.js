import {
  FaChartPie,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaBell,
  FaCog,
  FaSchool,
  FaBook,
  FaChartBar,
  FaUser,
  FaHistory,
  FaFolderOpen,
} from "react-icons/fa";

const sidebarMenu = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: FaChartPie,
  },

  {
    title: "Students",
    path: "/admin/students",
    icon: FaUserGraduate,
  },

  {
    title: "Teachers",
    path: "/admin/teachers",
    icon: FaChalkboardTeacher,
  },

  {
    title: "Classes",
    path: "/admin/classes",
    icon: FaSchool,
  },

  {
    title: "Attendance",
    path: "/admin/attendance",
    icon: FaCalendarCheck,
  },

  {
    title: "Subjects",
    path: "/admin/subjects",
    icon: FaBook,
  },

  {
  title: "Notice Board",
  path: "/admin/notices",
  icon: FaBell,
},

  {
    title: "Fees",
    path: "/admin/fees",
    icon: FaMoneyBillWave,
  },
   {
    title: "Timetable",
    path: "/admin/timetable",
    icon: FaCalendarCheck,
  },
  {
  title: "Reports",
  path: "/admin/reports",
  icon: FaChartBar,
},
{
  title: "Profile",
  path: "/profile",
  icon: FaUser
},
{
  title: "Settings",
  path: "/admin/settings",
  icon: FaCog,
},
// {
//   title: "Notifications",
//   path: "/admin/notifications",
//   icon: FaBell,
// },
{
  title: "Audit Logs",
  path: "/admin/audit-logs",
  icon: FaHistory,
},
{
  title: "Files",
  path: "/admin/files",
  icon: FaFolderOpen,
},
{
  title: "Leave Management",
  path: "/admin/leaves",
  icon: FaCalendarCheck,
},

];

export default sidebarMenu;