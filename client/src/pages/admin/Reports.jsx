import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AppLayout";
import StatsCards from "../../components/reports/StatsCards";
import AttendanceChart from "../../components/reports/AttendanceChart";
import FeeCollectionChart from "../../components/reports/FeeCollectionChart";
import ClassSummaryTable from "../../components/reports/ClassSummaryTable";

import api from "../../services/api";
import toast from "react-hot-toast";
import { FaChartBar } from "react-icons/fa";

function Reports() {
  const [loading, setLoading] = useState(true);

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [fees, setFees] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const [
        studentsRes,
        teachersRes,
        classesRes,
        attendanceRes,
        feesRes,
        subjectsRes,
      ] = await Promise.all([
        api.get("/students"),
        api.get("/teachers"),
        api.get("/classes"),
        api.get("/attendance"),
        api.get("/fees"),
        api.get("/subjects"),
      ]);

      setStudents(studentsRes.data);
      setTeachers(teachersRes.data);
      setClasses(classesRes.data);
      setAttendance(attendanceRes.data);
      console.log("*****", feesRes);
      setFees(feesRes.data.data);
      setSubjects(subjectsRes.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const attendanceData = [
    {
      name: "Present",
      value: attendance.filter((item) => item.status === "present").length,
    },
    {
      name: "Absent",
      value: attendance.filter((item) => item.status === "absent").length,
    },
    {
      name: "Late",
      value: attendance.filter((item) => item.status === "late").length,
    },
  ];

  const feeData = [
    {
      name: "Paid",
      amount: fees
        .filter((fee) => fee.status === "Paid")
        .reduce((total, fee) => total + Number(fee.amount), 0),
    },
    {
      name: "Pending",
      amount: fees
        .filter((fee) => fee.status === "Pending")
        .reduce((total, fee) => total + Number(fee.amount), 0),
    },
  ];

  const classSummary = students.reduce((acc, student) => {
    const existing = acc.find((item) => item.className === student.className);

    if (existing) {
      existing.students += 1;
    } else {
      acc.push({
        className: student.className,
        students: 1,
      });
    }

    return acc;
  }, []);

  const totalCollection = fees.reduce(
    (total, fee) => total + Number(fee.amount || 0),
    0
  );

  const paidCollection = fees
    .filter((fee) => fee.status === "Paid")
    .reduce((total, fee) => total + Number(fee.amount || 0), 0);

  const pendingCollection = fees
    .filter((fee) => fee.status === "Pending")
    .reduce((total, fee) => total + Number(fee.amount || 0), 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">
                Reports & Analytics
              </h1>

              <p className="mt-2 text-white/80">
                Complete academic, attendance and financial insights
              </p>
            </div>

            <div className="flex gap-3">
              <button className="bg-white/20 backdrop-blur px-5 py-3 rounded-xl">
                Export PDF
              </button>

              <button className="bg-white text-indigo-700 font-semibold px-5 py-3 rounded-xl">
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <StatsCards
          loading={loading}
          students={students.length}
          teachers={teachers.length}
          classes={classes.length}
          subjects={subjects.length}
          totalCollection={totalCollection}
          paidCollection={paidCollection}
        />

       <div className="grid xl:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border shadow-card">
            <AttendanceChart data={attendanceData} />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border shadow-card">
            <FeeCollectionChart data={feeData} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <FaChartBar className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Class Summary</h2>
                  <p className="text-sm text-white/80">{classSummary.length} Classes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto p-6">
          <ClassSummaryTable data={classSummary} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-card">
            <h3 className="text-lg font-semibold dark:text-white">
              Attendance Records
            </h3>

            <p className="text-4xl font-bold mt-3 dark:text-white">
              {attendance.length}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-card">
            <h3 className="text-lg font-semibold dark:text-white">Paid Fees</h3>

            <p className="text-4xl font-bold mt-3 text-green-600">
              ₹{paidCollection}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-card">
            <h3 className="text-lg font-semibold dark:text-white">
              Pending Fees
            </h3>

            <p className="text-4xl font-bold mt-3 text-red-600">
              ₹{pendingCollection}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Reports;