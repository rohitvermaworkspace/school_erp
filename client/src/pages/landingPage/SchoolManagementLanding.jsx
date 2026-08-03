import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiBookOpen,
  FiUsers,
  FiCalendar,
  FiShield,
  FiBarChart2,
  FiCheckCircle,
  FiMenu,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";

const FEATURES = [
  {
    icon: <FiUsers className="h-6 w-6 text-indigo-600" />,
    title: "Student & Staff Management",
    description:
      "Effortlessly manage digital profiles, attendance, admissions, and performance tracking for everyone.",
  },
  {
    icon: <FiBookOpen className="h-6 w-6 text-indigo-600" />,
    title: "Academics & Examination",
    description:
      "Schedule classes, manage report cards, create custom grading systems, and track curriculum progress.",
  },
  {
    icon: <FiCalendar className="h-6 w-6 text-indigo-600" />,
    title: "Fee & Finance Control",
    description:
      "Automate fee collection, send instant payment reminders, and generate detailed financial reports.",
  },
  {
    icon: <FiBarChart2 className="h-6 w-6 text-indigo-600" />,
    title: "Advanced Analytics",
    description:
      "Gain actionable insights into school performance, student demographics, and operational costs.",
  },
  {
    icon: <FiShield className="h-6 w-6 text-indigo-600" />,
    title: "Secure & Cloud-Based",
    description:
      "Your data is protected with enterprise-grade encryption and accessible 24/7 from any device.",
  },
  {
    icon: <FiCheckCircle className="h-6 w-6 text-indigo-600" />,
    title: "Communication Hub",
    description:
      "Bridge the gap between parents, teachers, and students with notifications, emails, and portals.",
  },
];

const STATS = [
  { value: "500+", label: "Schools Trust Us" },
  { value: "250K+", label: "Active Students" },
  { value: "40%", label: "Admin Time Saved" },
  { value: "99.9%", label: "Uptime Guaranteed" },
];

const TESTIMONIALS = [
  {
    quote:
      "EduPulse transformed how we manage 3,000 students. Attendance reports that took hours now take seconds. The parent portal is a game-changer.",
    name: "Dr. Priya Sharma",
    role: "Principal, Delhi Public School",
    initials: "PS",
  },
  {
    quote:
      "Parent communication improved dramatically. Fees are collected on time, and parents love the transparency. Our admin team saves 20+ hours every week.",
    name: "Rajesh Menon",
    role: "Director, Greenfield Academy",
    initials: "RM",
  },
  {
    quote:
      "The analytics module helped us identify at-risk students early. Our pass rate went up by 18% in the first year itself.",
    name: "Anjali Krishnan",
    role: "Head of Academics, Sunrise School",
    initials: "AK",
  },
];

export default function SchoolManagementLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-indigo-900/5 border-b border-slate-200/60"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
                <FaGraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                EduPulse
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#modules"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Modules
              </a>
              <a
                href="#testimonials"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Testimonials
              </a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 animate-fadeIn">
            <a
              href="#features"
              className="block text-slate-600 hover:text-indigo-600 py-2.5 text-sm font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#modules"
              className="block text-slate-600 hover:text-indigo-600 py-2.5 text-sm font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Modules
            </a>
            <a
              href="#testimonials"
              className="block text-slate-600 hover:text-indigo-600 py-2.5 text-sm font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <div className="pt-2 space-y-2">
              <Link
                to="/login"
                className="block text-center text-slate-600 py-2.5 text-sm font-medium border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block text-center text-white py-2.5 text-sm font-medium bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/40 to-violet-200/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-100/50 to-violet-100/50 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-indigo-700 tracking-wide">
                  Trusted by 500+ Schools Across India
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Simplify Administration.{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Empower Learning.
                </span>
              </h1>

              <p className="text-lg text-slate-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
                The all-in-one ERP system designed to digitize your institution's
                operations — from admissions and grading to fee collections and
                parent updates.
              </p>

              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold px-7 py-3.5 rounded-xl hover:shadow-xl hover:shadow-indigo-500/30 transition-all hover:-translate-y-0.5 flex items-center justify-center space-x-2 group"
                >
                  <span>Get Started Today</span>
                  <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#features"
                  className="bg-white border-2 border-slate-200 text-slate-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-slate-50 hover:border-indigo-200 transition-all text-center"
                >
                  Explore Features
                </a>
              </div>

              {/* Social Proof */}
              <div className="pt-4">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
                  Trusted by leading institutions
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
                  {["DPS Group", "Kendriya Vidyalaya", "Ryan International", "Amity Schools"].map(
                    (name) => (
                      <span
                        key={name}
                        className="text-sm font-medium text-slate-400"
                      >
                        {name}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Right - Dashboard Mockup */}
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-300 to-violet-300 rounded-3xl blur-3xl opacity-30 -z-10 scale-95" />
              <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xl shadow-indigo-900/10 w-full max-w-lg">
                {/* Window Controls */}
                <div className="flex items-center space-x-1.5 mb-3 px-1">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                {/* Mockup Dashboard Content */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-xs">Total Students</p>
                      <p className="text-white text-2xl font-bold">2,847</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                      <FiUsers className="h-5 w-5 text-indigo-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <p className="text-slate-400 text-[10px]">Present</p>
                      <p className="text-emerald-400 text-lg font-bold">2,541</p>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <p className="text-slate-400 text-[10px]">Absent</p>
                      <p className="text-rose-400 text-lg font-bold">187</p>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <p className="text-slate-400 text-[10px]">Late</p>
                      <p className="text-amber-400 text-lg font-bold">119</p>
                    </div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-slate-400 text-xs">Fee Collection</p>
                      <p className="text-indigo-400 text-xs font-medium">78%</p>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full" style={{ width: "78%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything your institution needs to thrive
            </h2>
            <p className="text-lg text-slate-500">
              Eliminate manual paperwork and streamline collaboration across
              your entire campus ecosystem.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, idx) => (
              <div
                key={idx}
                className="group p-7 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-indigo-900/5 hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-indigo-50 group-hover:bg-indigo-100 rounded-xl flex items-center justify-center mb-5 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Modules
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Modular by design. Unified in practice.
            </h2>
            <p className="text-lg text-slate-500">
              Pick exactly what your school needs. Every module works together
              seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Admissions", icon: "📋", desc: "Digital enrollment" },
              { name: "Examinations", icon: "📝", desc: "Grades & report cards" },
              { name: "Attendance", icon: "📅", desc: "Real-time tracking" },
              { name: "Fees", icon: "💳", desc: "Online payments" },
              { name: "Timetable", icon: "🕐", desc: "Smart scheduling" },
              { name: "Notices", icon: "📢", desc: "Instant alerts" },
              { name: "Analytics", icon: "📊", desc: "Data-driven insights" },
              { name: "Reports", icon: "📄", desc: "Export & download" },
            ].map((m) => (
              <div
                key={m.name}
                className="bg-white border border-slate-200 rounded-xl p-5 text-center hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">
                  {m.icon}
                </span>
                <h4 className="font-bold text-slate-900 text-sm">{m.name}</h4>
                <p className="text-slate-400 text-xs mt-1">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.3),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.2),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-indigo-200 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Loved by educators everywhere
            </h2>
            <p className="text-lg text-slate-500">
              See how schools are transforming their administration with EduPulse.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-100 p-7 rounded-2xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-4 h-4 text-amber-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 italic mb-6 leading-relaxed text-sm">
                  "{t.quote}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 rounded-3xl p-8 sm:p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent)]" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to modernize your institution?
              </h2>
              <p className="text-indigo-100 text-lg leading-relaxed">
                Join thousands of schools already saving time and improving
                outcomes with EduPulse.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/signup"
                  className="bg-white text-indigo-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Start Free Trial
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all"
                >
                  Login to Dashboard
                </Link>
              </div>
              <p className="text-indigo-200 text-xs pt-2">
                No credit card required · Setup in under 24 hours · Cancel
                anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <FaGraduationCap className="h-6 w-6 text-indigo-400" />
                <span className="font-bold text-white text-lg">EduPulse</span>
              </Link>
              <p className="text-sm leading-relaxed">
                Empowering schools with technology that works.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#modules" className="hover:text-white transition-colors">Modules</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} EduPulse. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-xs">Built for modern schools</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
