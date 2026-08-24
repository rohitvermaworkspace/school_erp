import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaChartBar,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaLayerGroup,
  FaDownload,
  FaArrowUp,
  FaArrowDown,
  FaUsers,
} from "react-icons/fa";

import platformService from "../../services/platformService";

function SuperAdminReports() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    platformService
      .getSchools()
      .then((res) => setSchools(res.data || []))
      .catch(() => toast.error("Failed to load report data"))
      .finally(() => setLoading(false));
  }, []);

  const totals = useMemo(
    () =>
      schools.reduce(
        (acc, s) => ({
          students: acc.students + (s.studentCount || 0),
          teachers: acc.teachers + (s.teacherCount || 0),
          classes: acc.classes + (s.classCount || 0),
          users: acc.users + (s.userCount || 0),
        }),
        { students: 0, teachers: 0, classes: 0, users: 0 }
      ),
    [schools]
  );

  const sorted = useMemo(() => {
    const copy = [...schools];
    copy.sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = (bVal || "").toLowerCase();
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      aVal = aVal || 0;
      bVal = bVal || 0;
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    });
    return copy;
  }, [schools, sortKey, sortDir]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  };

  const exportCsv = () => {
    const headers = [
      "School",
      "Code",
      "Status",
      "Users",
      "Teachers",
      "Students",
      "Classes",
      "Subjects",
    ];
    const rows = sorted.map((s) => [
      `"${(s.name || "").replace(/"/g, '""')}"`,
      s.code,
      s.status,
      s.userCount || 0,
      s.teacherCount || 0,
      s.studentCount || 0,
      s.classCount || 0,
      s.subjectCount || 0,
    ]);
    const csv = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
      ["TOTAL", "", "", totals.users, totals.teachers, totals.students, totals.classes, ""].join(","),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `platform-school-report-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Report downloaded as CSV");
  };

  const columns = [
    { key: "name", label: "School" },
    { key: "userCount", label: "Users" },
    { key: "teacherCount", label: "Teachers" },
    { key: "studentCount", label: "Students" },
    { key: "classCount", label: "Classes" },
    { key: "status", label: "Status" },
  ];

  return (
    
      <div className="space-y-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-sm font-medium mb-3">
                Platform Administration
              </div>
              <h1 className="text-3xl xl:text-4xl font-black">Platform Reports</h1>
              <p className="text-blue-100 mt-2">
                School-wise comparison of users, teachers, students and academic setup.
              </p>
            </div>
            <button
              onClick={exportCsv}
              disabled={schools.length === 0}
              className="px-6 py-3 rounded-2xl bg-white text-blue-700 font-semibold shadow-xl hover:scale-105 transition flex items-center gap-2 disabled:opacity-50"
            >
              <FaDownload /> Export CSV
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {[
            { label: "Total Students", value: totals.students, icon: FaGraduationCap, grad: "from-emerald-500 to-teal-600" },
            { label: "Total Teachers", value: totals.teachers, icon: FaChalkboardTeacher, grad: "from-violet-500 to-purple-600" },
            { label: "Total Classes", value: totals.classes, icon: FaLayerGroup, grad: "from-amber-500 to-orange-600" },
            { label: "Total Users", value: totals.users, icon: FaUsers, grad: "from-blue-500 to-indigo-600" },
          ].map(({ label, value, icon: Icon, grad }) => (
            <div key={label} className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${grad} p-6 text-white shadow-lg`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-5 translate-x-5" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{label}</p>
                  <h2 className="text-3xl font-black mt-1">{value}</h2>
                </div>
                <Icon className="text-3xl text-white/80" />
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-card overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <FaChartBar />
            </div>
            <div>
              <h2 className="text-lg font-bold">School-wise Summary</h2>
              <p className="text-xs text-white/80">Click a column header to sort</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 cursor-pointer select-none hover:text-blue-600 transition"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {col.label}
                        {sortKey === col.key &&
                          (sortDir === "asc" ? (
                            <FaArrowUp className="text-[9px]" />
                          ) : (
                            <FaArrowDown className="text-[9px]" />
                          ))}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-500">
                      Loading report...
                    </td>
                  </tr>
                ) : sorted.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-500">
                      No school data available.
                    </td>
                  </tr>
                ) : (
                  sorted.map((school) => (
                    <tr
                      key={school._id}
                      className="border-b border-gray-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-bold">
                            {school.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800 dark:text-white">
                              {school.name}
                            </p>
                            <span className="text-[11px] font-mono text-slate-400">
                              {school.code}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">
                        {school.userCount || 0}
                      </td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {school.teacherCount || 0}
                      </td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {school.studentCount || 0}
                      </td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {school.classCount || 0}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            school.status === "Active"
                              ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300"
                              : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {school.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
                {!loading && sorted.length > 0 && (
                  <tr className="bg-slate-50 dark:bg-slate-800/60 font-bold">
                    <td className="px-6 py-4 text-slate-800 dark:text-white">
                      TOTAL ({sorted.length} schools)
                    </td>
                    <td className="px-6 py-4 text-slate-800 dark:text-white">{totals.users}</td>
                    <td className="px-6 py-4 text-slate-800 dark:text-white">{totals.teachers}</td>
                    <td className="px-6 py-4 text-slate-800 dark:text-white">{totals.students}</td>
                    <td className="px-6 py-4 text-slate-800 dark:text-white">{totals.classes}</td>
                    <td />
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
  );
}

export default SuperAdminReports;
