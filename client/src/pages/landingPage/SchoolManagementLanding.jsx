import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserPlus,
  FaClipboardCheck,
  FaBookOpen,
  FaFileAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBullhorn,
  FaChartBar,
  FaChartPie,
  FaUserShield,
  FaUserTie,
  FaCogs,
  FaCheckCircle,
  FaBell,
} from "react-icons/fa";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

/* ==========================================================================
   DATA — kept separate from presentation
   ========================================================================== */

const NAV_LINKS = [
  { label: "Platform", target: "platform" },
  { label: "Solutions", target: "solutions" },
  { label: "Resources", target: "showcase" },
  { label: "Pricing", target: "get-started" },
];

const HERO_HIGHLIGHTS = ["Role-based portals", "Multi-school support", "Real-time updates"];

const CAPABILITIES = [
  {
    icon: FaUserGraduate,
    title: "Student Management",
    description:
      "Admissions, profiles, documents, guardian records and complete student history — organised in one place.",
    viz: "students",
    accent: "from-indigo-500 to-blue-600",
  },
  {
    icon: FaBookOpen,
    title: "Academic Management",
    description:
      "Classes, subjects and examinations stay connected, so timetables, marks and report cards always line up.",
    viz: "academics",
    accent: "from-violet-500 to-purple-600",
  },
  {
    icon: FaCogs,
    title: "School Operations",
    description:
      "Attendance, fee collection, staff leave and notices handled from one daily operations dashboard.",
    viz: "operations",
    accent: "from-sky-500 to-cyan-600",
  },
];

const MODULES = [
  { icon: FaUserPlus, name: "Admissions", description: "Guided digital enrolment" },
  { icon: FaUserGraduate, name: "Students", description: "Profiles & records" },
  { icon: FaChalkboardTeacher, name: "Teachers", description: "Staff directory" },
  { icon: FaClipboardCheck, name: "Attendance", description: "Daily class tracking" },
  { icon: FaBookOpen, name: "Academics", description: "Classes & subjects" },
  { icon: FaFileAlt, name: "Examinations", description: "Marks & report cards" },
  { icon: FaMoneyBillWave, name: "Fees", description: "Collection & receipts" },
  { icon: FaCalendarAlt, name: "Timetable", description: "Smart scheduling" },
  { icon: FaBullhorn, name: "Communication", description: "Notices & alerts" },
  { icon: FaChartBar, name: "Reports", description: "Exportable insights" },
  { icon: FaChartPie, name: "Analytics", description: "Trends at a glance" },
];

const ROLES = [
  {
    icon: FaUserShield,
    name: "Super Admin",
    tagline: "Platform control centre",
    description:
      "Manage schools, configuration, subjects, classes and global settings.",
    preview: ["Schools", "Classes", "Subjects", "Admins"],
    accent: "from-slate-700 to-slate-900",
    chip: "bg-white/15 text-white border-white/20",
  },
  {
    icon: FaUserTie,
    name: "Admin",
    tagline: "Complete school operations",
    description:
      "Manage students, teachers, admissions, attendance, fees and operations.",
    preview: ["Students", "Teachers", "Fees", "Notices"],
    accent: "from-indigo-600 to-violet-600",
    chip: "bg-indigo-50 text-indigo-700 border-indigo-100",
  },
  {
    icon: FaChalkboardTeacher,
    name: "Teacher",
    tagline: "Focused classroom tools",
    description:
      "Manage classes, attendance, subjects, assignments and student performance.",
    preview: ["Attendance", "Marks", "Timetable", "Report Cards"],
    accent: "from-emerald-500 to-teal-600",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    icon: FaUserGraduate,
    name: "Student",
    tagline: "Personal learning hub",
    description:
      "Access academics, timetable, attendance, results and learning information.",
    preview: ["Timetable", "Results", "Fees", "Notices"],
    accent: "from-amber-500 to-orange-600",
    chip: "bg-amber-50 text-amber-700 border-amber-100",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "EduPulse changed how our campus runs day to day. Attendance, report cards and parent updates that used to take hours now happen in minutes.",
    name: "Dr. Priya Sharma",
    role: "Principal, Delhi Public School",
    initials: "PS",
  },
  {
    quote:
      "Parent communication improved dramatically. Fee collection is transparent, reminders go out automatically, and our office runs far calmer than before.",
    name: "Rajesh Menon",
    role: "Director, Greenfield Academy",
    initials: "RM",
  },
  {
    quote:
      "The analytics helped us spot struggling students early enough to act. Teachers finally see the full picture of every class they teach.",
    name: "Anjali Krishnan",
    role: "Head of Academics, Sunrise School",
    initials: "AK",
  },
];

const SHOWCASE = [
  {
    id: "student-management",
    eyebrow: "Student Management",
    title: "Everything you need to manage student information.",
    description:
      "Search, filter and open any student's complete profile — academics, guardians, facilities and documents — from one clean table built for office staff.",
    points: [
      "Ten-step guided admission wizard",
      "Instant search by name or roll number",
      "Printable profiles & document tracking",
    ],
    viz: "students",
  },
  {
    id: "attendance-management",
    eyebrow: "Attendance Management",
    title: "Track attendance with clarity.",
    description:
      "Teachers mark a full classroom in seconds with bulk actions, while administrators monitor school-wide trends class by class, day by day.",
    points: [
      "Present / Absent / Late in one tap",
      "Mark-all shortcuts for large classes",
      "Trends & class-wise analytics",
    ],
    viz: "attendance",
  },
  {
    id: "academic-examination",
    eyebrow: "Academic & Examination",
    title: "Manage classes, subjects, exams and results.",
    description:
      "From subject allocation to marks entry and publishing results — the academic cycle flows into grades, percentages and downloadable report cards automatically.",
    points: [
      "Automatic grades & pass/fail",
      "Publish results to student portals",
      "One-click PDF report cards",
    ],
    viz: "academics",
  },
];

const FOOTER_COLUMNS = [
  { heading: "Product", links: ["Features", "Modules", "Dashboard", "Analytics"] },
  { heading: "Solutions", links: ["For Principals", "For Administrators", "For Teachers", "For Students"] },
  { heading: "Resources", links: ["Documentation", "Help Center", "Product Updates", "Guides"] },
  { heading: "Company", links: ["About Us", "Careers", "Contact", "Partners"] },
  { heading: "Support", links: ["Help Center", "System Status", "Security", "Accessibility"] },
];

/* ==========================================================================
   SHARED UI PIECES
   ========================================================================== */

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center space-x-2.5 group" aria-label="EduPulse home">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-105">
        <FaGraduationCap className="h-5 w-5 text-white" />
      </div>
      <span
        className={`text-xl font-extrabold tracking-tight ${
          light ? "text-white" : "bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
        }`}
      >
        EduPulse
      </span>
    </Link>
  );
}

function SectionHeader({ id, eyebrow, title, subtitle, dark = false }) {
  return (
    <div id={id} className="max-w-2xl mx-auto text-center">
      <p
        className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 ${
          dark ? "text-indigo-300" : "text-indigo-600"
        }`}
      >
        <span className={`h-1 w-6 rounded-full ${dark ? "bg-indigo-400" : "bg-indigo-500"}`} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${dark ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ==========================================================================
   DASHBOARD PREVIEW (hero visual — illustrative sample data)
   ========================================================================== */

const PREVIEW_KPIS = [
  { label: "Students", value: "1,286", delta: "+12 this week", tint: "text-indigo-600 bg-indigo-50" },
  { label: "Teachers", value: "87", delta: "All departments", tint: "text-violet-600 bg-violet-50" },
  { label: "Attendance", value: "94%", delta: "Today", tint: "text-emerald-600 bg-emerald-50" },
  { label: "Fees Collected", value: "₹18.4L", delta: "68% of term", tint: "text-amber-600 bg-amber-50" },
];

const PREVIEW_WEEK = [
  { day: "M", pct: 92 },
  { day: "T", pct: 95 },
  { day: "W", pct: 90 },
  { day: "T", pct: 96 },
  { day: "F", pct: 94 },
  { day: "S", pct: 88 },
];

const PREVIEW_SUBJECTS = [
  { name: "Mathematics", pct: 82 },
  { name: "Science", pct: 78 },
  { name: "English", pct: 85 },
  { name: "Computer Sc.", pct: 91 },
];

const PREVIEW_ACTIVITY = [
  { icon: FaUserPlus, text: "New admission — Aarav M. (Class 6)", time: "8m ago", tone: "bg-indigo-100 text-indigo-600" },
  { icon: FaMoneyBillWave, text: "Fee payment received", time: "26m ago", tone: "bg-emerald-100 text-emerald-600" },
  { icon: FaFileAlt, text: "Mid-term results published", time: "1h ago", tone: "bg-violet-100 text-violet-600" },
  { icon: FaBell, text: "Notice sent to parents", time: "2h ago", tone: "bg-amber-100 text-amber-600" },
];

function AttendanceDonut() {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative h-[5.5rem] w-[5.5rem]" role="img" aria-label="Attendance today: 94 percent present">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={radius} fill="none" strokeWidth="9" className="stroke-slate-100" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
          className="stroke-emerald-500"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.06}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-extrabold text-slate-900 leading-none">94%</span>
        <span className="text-[9px] text-slate-400 uppercase tracking-wide">Present</span>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div
      className="relative rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white shadow-2xl shadow-indigo-900/10 overflow-hidden"
      role="img"
      aria-label="Preview of the EduPulse school dashboard showing students, teachers, attendance, fees, academic performance and recent activity"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 bg-slate-50/80">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
        <div className="ml-3 hidden sm:block flex-1 max-w-[220px] rounded-md bg-white border border-slate-200 px-3 py-1 text-[10px] text-slate-400 truncate">
          edupulse.school/dashboard
        </div>
      </div>

      {/* App bar */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
            <FaGraduationCap className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-none">School Overview</p>
            <p className="hidden sm:block text-[10px] text-slate-400 mt-0.5">Academic Session 2026-27</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-slate-100 text-[10px] font-medium text-slate-500">
            Mon, 12 Jan
          </span>
          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-[10px] font-bold flex items-center justify-center">
            AD
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 bg-slate-50/60">
        {/* LEFT: KPIs + charts */}
        <div className="md:col-span-2 space-y-3 sm:space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {PREVIEW_KPIS.map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-slate-200/80 bg-white p-2.5 sm:p-4 shadow-sm">
                <p className="text-[9px] sm:text-[11px] font-medium text-slate-500 uppercase tracking-wide">{kpi.label}</p>
                <p className="mt-1 text-base sm:text-xl font-extrabold text-slate-900 leading-none">{kpi.value}</p>
                <p className="mt-1 text-[9px] sm:text-[11px] text-slate-400">{kpi.delta}</p>
              </div>
            ))}
          </div>

          {/* Weekly attendance bars */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-700">Attendance This Week</p>
              <span className="text-[10px] text-slate-400">Class 8-A</span>
            </div>
            <div className="flex items-end gap-2 sm:gap-3 h-24" role="img" aria-label="Bar chart of daily attendance this week">
              {PREVIEW_WEEK.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[9px] font-semibold text-slate-500">{d.pct}%</span>
                  <div className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-violet-400" style={{ height: `${d.pct}%` }} />
                  <span className="text-[9px] text-slate-400">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject performance */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-sm">
            <p className="text-xs font-semibold text-slate-700 mb-3">Academic Performance by Subject</p>
            <ul className="space-y-2">
              {PREVIEW_SUBJECTS.map((s) => (
                <li key={s.name} className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-[11px] text-slate-500 truncate">{s.name}</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                  <span className="w-9 text-right text-[11px] font-bold text-slate-700">{s.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT: donut + activity */}
        <div className="space-y-3 sm:space-y-4">
          <div className="rounded-xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-sm">
            <p className="text-xs font-semibold text-slate-700 mb-2">Today's Attendance</p>
            <AttendanceDonut />
            <div className="mt-3 grid grid-cols-3 gap-1 text-center">
              {[
                ["94%", "Present", "text-emerald-600"],
                ["4%", "Absent", "text-red-500"],
                ["2%", "Late", "text-amber-500"],
              ].map(([v, l, c]) => (
                <div key={l}>
                  <p className={`text-xs font-bold ${c}`}>{v}</p>
                  <p className="text-[9px] text-slate-400">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-sm">
            <p className="text-xs font-semibold text-slate-700 mb-2.5">Recent Activity</p>
            <ul className="space-y-2.5">
              {PREVIEW_ACTIVITY.map((a, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${a.tone}`} aria-hidden="true">
                    <a.icon className="h-3 w-3" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-slate-700 leading-snug truncate">{a.text}</p>
                    <p className="text-[9px] text-slate-400">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SHOWCASE VISUALIZATIONS (product UI mockups)
   ========================================================================== */

const VIZ_STUDENTS_ROWS = [
  { name: "Aarav Mehta", roll: "12A-014", cls: "Class 12-A", status: "Active" },
  { name: "Diya Sharma", roll: "10C-032", cls: "Class 10-C", status: "Active" },
  { name: "Kabir Singh", roll: "9B-007", cls: "Class 9-B", status: "Active" },
];

function StudentsViz() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100">
        <p className="text-sm font-bold text-slate-800">Students</p>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-[11px] text-slate-400 w-36">
            Search by student name...
          </span>
          <span className="inline-flex px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[11px] font-semibold whitespace-nowrap">
            + Add Student
          </span>
        </div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50/80">
            {["Student", "Admission No", "Class", "Status"].map((h) => (
              <th key={h} scope="col" className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {VIZ_STUDENTS_ROWS.map((r) => (
            <tr key={r.roll} className="border-t border-slate-100">
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-[10px] font-bold flex items-center justify-center" aria-hidden="true">
                    {r.name.charAt(0)}
                  </span>
                  <span className="text-xs font-medium text-slate-800">{r.name}</span>
                </div>
              </td>
              <td className="px-4 py-2.5 text-[11px] text-slate-500 font-mono">{r.roll}</td>
              <td className="px-4 py-2.5">
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold">{r.cls}</span>
              </td>
              <td className="px-4 py-2.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                  <FaCheckCircle className="h-3 w-3" aria-hidden="true" /> {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const VIZ_ATTENDANCE = [
  { name: "Aarav M.", status: "P" },
  { name: "Diya S.", status: "P" },
  { name: "Kabir S.", status: "L" },
  { name: "Meera N.", status: "P" },
  { name: "Rohan P.", status: "A" },
  { name: "Sara K.", status: "P" },
];

const STATUS_STYLES = {
  P: "bg-emerald-500 text-white",
  A: "bg-red-500 text-white",
  L: "bg-amber-400 text-white",
};

function AttendanceViz() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-slate-100">
        <p className="text-sm font-bold text-slate-800">Class 8-A · Today</p>
        <div className="flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-semibold">Mark All Present</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-semibold">Save</span>
        </div>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 sm:p-4">
        {VIZ_ATTENDANCE.map((s) => (
          <li
            key={s.name}
            className={`flex items-center justify-between rounded-xl border px-3 py-2 ${
              s.status === "P" ? "border-emerald-200 bg-emerald-50/60" : s.status === "A" ? "border-red-200 bg-red-50/60" : "border-amber-200 bg-amber-50/60"
            }`}
          >
            <span className="text-[11px] font-medium text-slate-700 truncate pr-1">{s.name}</span>
            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-extrabold ${STATUS_STYLES[s.status]}`} aria-label={s.status === "P" ? "Present" : s.status === "A" ? "Absent" : "Late"}>
              {s.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const VIZ_EXAMS = [
  { subject: "Mathematics", marks: "82 / 100", grade: "A", tone: "bg-emerald-50 text-emerald-700" },
  { subject: "Science", marks: "78 / 100", grade: "B+", tone: "bg-blue-50 text-blue-700" },
  { subject: "English", marks: "85 / 100", grade: "A", tone: "bg-emerald-50 text-emerald-700" },
  { subject: "Computer Sc.", marks: "91 / 100", grade: "A+", tone: "bg-violet-50 text-violet-700" },
];

function AcademicsViz() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <p className="text-sm font-bold text-slate-800">Mid-Term Result · Diya Sharma</p>
        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">PASS · 84%</span>
      </div>
      <ul className="divide-y divide-slate-100">
        {VIZ_EXAMS.map((e) => (
          <li key={e.subject} className="flex items-center justify-between px-4 py-2.5">
            <span className="text-xs font-medium text-slate-700">{e.subject}</span>
            <span className="flex items-center gap-2.5">
              <span className="text-[11px] text-slate-500 font-mono">{e.marks}</span>
              <span className={`w-8 h-6 rounded-md flex items-center justify-center text-[11px] font-extrabold ${e.tone}`}>{e.grade}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold">Grade scale A+ to F · auto-calculated</span>
        <span className="inline-flex px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-semibold">
          Download PDF
        </span>
      </div>
    </div>
  );
}

function OperationsViz() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <p className="text-sm font-bold text-slate-800">Today at School</p>
        <span className="text-[10px] font-medium text-slate-400">Live</span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-slate-100">
        {[
          ["94%", "Attendance"],
          ["₹42K", "Fees today"],
          ["3", "Leave requests"],
        ].map(([v, l]) => (
          <div key={l} className="py-3 text-center">
            <p className="text-base font-extrabold text-slate-900 leading-none">{v}</p>
            <p className="mt-1 text-[10px] text-slate-400">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CapabilityViz({ kind }) {
  if (kind === "students") return <StudentsViz />;
  if (kind === "attendance") return <AttendanceViz />;
  if (kind === "academics") return <AcademicsViz />;
  return <OperationsViz />;
}

/* ==========================================================================
   NAVBAR
   ========================================================================== */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (target) => {
    setMenuOpen(false);
    scrollToSection(target);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-indigo-900/5 border-b border-slate-200/70"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Main navigation">
        <Logo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => go(link.target)}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors focus-visible:outline-none focus-visible:text-indigo-600"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-700 hover:text-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-50/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
          >
            Get Started <FiArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden w-10 h-10 -mr-2 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl px-4 pt-2 pb-5 space-y-1 shadow-xl">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => go(link.target)}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <Link
              to="/login"
              className="text-center border-2 border-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-sm hover:border-indigo-300 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold py-2.5 rounded-xl text-sm shadow-lg shadow-indigo-500/25"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* ==========================================================================
   HERO
   ========================================================================== */

function Hero() {
  return (
    <section className="relative pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Soft background gradients */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/90 via-white to-white" />
        <div className="absolute -top-24 right-0 w-[36rem] h-[36rem] rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute top-40 -left-24 w-[28rem] h-[28rem] rounded-full bg-violet-200/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
          <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 shadow-sm text-xs font-semibold text-indigo-700 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            School Management Platform
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            Run Your Entire School From{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              One Intelligent Platform
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Manage students, teachers, academics, attendance, examinations, fees, communication and reports from one connected school management platform.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold px-7 py-3.5 rounded-xl shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all min-h-12"
            >
              Get Started <FiArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => scrollToSection("platform")}
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-800 font-semibold px-7 py-3.5 rounded-xl border-2 border-slate-200 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50/50 transition-all min-h-12"
            >
              Explore Platform
            </button>
          </div>

          <ul className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2">
            {HERO_HIGHLIGHTS.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
                <FaCheckCircle className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Dashboard preview */}
        <div className="relative mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200/40 via-violet-200/40 to-sky-200/40 blur-2xl rounded-[2rem]" aria-hidden="true" />
          <div className="relative">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   PAGE SECTIONS
   ========================================================================== */

function PlatformIntro() {
  return (
    <section id="platform" className="py-16 sm:py-24 scroll-mt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Platform"
          title="Everything Your School Needs. Connected in One Place."
          subtitle="EduPulse connects administration, teachers and students on a single system — so admissions flow into classes, attendance flows into reports, and every announcement reaches the right people instantly."
        />

        {/* Connection strip */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            ["Administration", "Admissions, staff, fees and settings"],
            ["Teachers", "Classes, attendance and marks"],
            ["Students", "Timetable, results and notices"],
          ].map(([title, desc], i) => (
            <div key={title} className="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-center">
              {i < 2 && (
                <span
                  className="hidden md:block absolute top-1/2 -right-[1.65rem] -translate-y-1/2 text-indigo-300"
                  aria-hidden="true"
                >
                  <FiArrowRight className="h-5 w-5 rotate-90 md:rotate-0" />
                </span>
              )}
              <p className="text-sm font-bold text-slate-900">{title}</p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" className="py-16 sm:py-24 scroll-mt-20 bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Core Capabilities"
          title="Built Around How Schools Actually Work"
          subtitle="Three connected pillars cover the complete daily life of your institution."
        />

        <div className="mt-12 lg:mt-16 space-y-6">
          {CAPABILITIES.map((cap) => (
            <article
              key={cap.title}
              className="group rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className={`inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br ${cap.accent} items-center justify-center shadow-lg`} aria-hidden="true">
                    <cap.icon className="h-5 w-5 text-white" />
                  </span>
                  <h3 className="mt-5 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{cap.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">{cap.description}</p>
                </div>
                <div className="scale-[0.97] group-hover:scale-100 transition-transform">
                  <CapabilityViz kind={cap.viz} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section id="modules" className="py-16 sm:py-24 scroll-mt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Modules"
          title="One System. Every Module Your School Needs."
          subtitle="Each module works standalone and together — pick what you need today, switch on more anytime."
        />

        <ul className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" role="list">
          {MODULES.map((mod) => (
            <li key={mod.name}>
              <div className="h-full rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 sm:p-5 hover:border-indigo-200 hover:bg-white hover:shadow-lg hover:shadow-indigo-900/5 transition-all">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20" aria-hidden="true">
                  <mod.icon className="h-4 w-4 text-white" />
                </span>
                <h3 className="mt-3 text-sm sm:text-base font-bold text-slate-900">{mod.name}</h3>
                <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500 leading-snug">{mod.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RoleExperience() {
  return (
    <section id="solutions" className="py-16 sm:py-24 scroll-mt-20 relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-32 left-1/3 w-[30rem] h-[30rem] rounded-full bg-indigo-600/25 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-[24rem] h-[24rem] rounded-full bg-violet-600/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          dark
          eyebrow="Role-Based Experience"
          title="One Platform. Every School Role."
          subtitle="Every person sees exactly the tools they need — nothing more, nothing less."
        />

        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5" role="list">
          {ROLES.map((role) => (
            <li key={role.name} className="group rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 sm:p-6 hover:bg-white/[0.08] hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between">
                <span className={`inline-flex w-11 h-11 rounded-2xl bg-gradient-to-br ${role.accent} items-center justify-center shadow-lg`} aria-hidden="true">
                  <role.icon className="h-5 w-5 text-white" />
                </span>
                <FiArrowRight className="h-4 w-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">{role.name}</h3>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-300 mt-0.5">{role.tagline}</p>
              <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">{role.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5" aria-label={`${role.name} portal menu`}>
                {role.preview.map((chip) => (
                  <span key={chip} className={`px-2.5 py-1 rounded-lg border text-[10px] font-semibold ${role.chip}`}>
                    {chip}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ShowcaseBlock({ item, reversed }) {
  return (
    <article
      id={item.id}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center scroll-mt-24"
    >
      <div className={reversed ? "lg:order-2" : ""}>
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">{item.eyebrow}</p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">{item.title}</h3>
        <p className="mt-4 text-slate-600 leading-relaxed">{item.description}</p>
        <ul className="mt-5 space-y-2.5" role="list">
          {item.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
              <FaCheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className={reversed ? "lg:order-1" : ""}>
        <CapabilityViz kind={item.viz} />
      </div>
    </article>
  );
}

function ProductShowcase() {
  return (
    <section id="showcase" className="py-16 sm:py-24 scroll-mt-20 bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Product Showcase"
          title="See EduPulse in Action"
          subtitle="Real screens from the daily workflows of your office, classrooms and examinations."
        />
        <div className="mt-14 space-y-16 sm:space-y-24">
          {SHOWCASE.map((item, index) => (
            <ShowcaseBlock key={item.id} item={item} reversed={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 scroll-mt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="Loved by Educators Everywhere"
          subtitle="Hear from the school leaders who run their campuses on EduPulse."
        />

        <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5" role="list">
          {TESTIMONIALS.map((t) => (
            <li key={t.name}>
              <figure className="h-full flex flex-col rounded-3xl border border-slate-200/80 bg-slate-50/70 p-6 sm:p-7 hover:shadow-xl hover:shadow-indigo-900/5 transition-shadow">
                <svg className="h-7 w-7 text-indigo-300 mb-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
                <blockquote className="flex-1 text-slate-700 leading-relaxed text-sm sm:text-base">"{t.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-slate-200/80">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-xs font-bold flex items-center justify-center" aria-hidden="true">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="get-started" className="py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-6 py-14 sm:px-12 sm:py-16 text-center shadow-2xl shadow-indigo-900/30">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ready to modernize your school?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-indigo-100 leading-relaxed">
              Bring administration, academics and communication together on one powerful platform.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold px-7 py-3.5 rounded-xl shadow-lg hover:bg-indigo-50 hover:-translate-y-0.5 transition-all min-h-12"
              >
                Get Started <FiArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/40 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/20 hover:-translate-y-0.5 transition-all min-h-12"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              The complete school management platform for modern institutions.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-sm font-bold text-white mb-4">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 pt-7 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© {new Date().getFullYear()} EduPulse. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs hover:text-white transition-colors">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function SchoolManagementLanding() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <PlatformIntro />
        <Capabilities />
        <Modules />
        <RoleExperience />
        <ProductShowcase />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
