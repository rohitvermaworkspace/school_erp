import { useEffect, useState } from "react";
import DashboardStats from "../../components/teacher/DashboardStats";
import TeacherQuickActions from "../../components/teacher/TeacherQuickActions";
import TeacherTodaySchedule from "../../components/teacher/TeacherTodaySchedule";
import TeacherRecentNotices from "../../components/teacher/TeacherRecentNotices";
import { getTeacherDashboard } from "../../services/teacherService";
import AttendanceTrendChart from "../../components/teacher/charts/AttendanceTrendChart";
import ClassDistributionChart from "../../components/teacher/charts/ClassDistributionChart";
import OverviewBarChart from "../../components/teacher/charts/OverviewBarChart";
import ClassDrilldownModal from "../../components/teacher/charts/ClassDrilldownModal";
import { useAuth } from "../../context/AuthContext";

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [charts, setCharts] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getTeacherDashboard();
      setStats(data.stats || {});
      setCharts(data.charts || {});
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClassSelect = (classData) => {
    setSelectedClass(classData?.name || null);
  };

  return (
      <div className="space-y-6">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-4">
                📚 Teacher Portal
              </div>
              <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight">
                Welcome, {user?.name || "Teacher"}
              </h1>
              <p className="text-purple-100 text-lg mt-3 max-w-2xl">
                Manage attendance, timetable, marks and notices efficiently from
                your dashboard.
              </p>

              <div className="flex flex-wrap gap-6 mt-6 text-white">
                <div>
                  <p className="text-purple-200 text-sm">Students</p>
                  <h3 className="text-2xl font-bold">
                    {stats.totalStudents || 0}
                  </h3>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">Classes</p>
                  <h3 className="text-2xl font-bold">
                    {stats.totalClasses || 0}
                  </h3>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">Attendance</p>
                  <h3 className="text-2xl font-bold">
                    {stats.attendanceRate?.toFixed(1) || 0}%
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        {loading ? (
          <div className="text-center py-10">Loading Dashboard...</div>
        ) : (
          <DashboardStats stats={stats} />
        )}

        {/* QUICK ACTIONS */}
        <TeacherQuickActions />

        {/* CHARTS SECTION */}
        <div className="grid lg:grid-cols-2 gap-6">
          <AttendanceTrendChart data={charts.attendanceTrend || []} />
          <ClassDistributionChart
            data={charts.classDistribution || []}
            onSelect={handleClassSelect}
          />
        </div>

        {/* OVERVIEW CHART */}
        <OverviewBarChart data={charts.overview || []} />

        {/* WIDGETS */}
        <div className="grid lg:grid-cols-2 gap-6">
          <TeacherTodaySchedule />
          <TeacherRecentNotices />
        </div>

        {/* DRILLDOWN MODAL */}
        <ClassDrilldownModal
          data={selectedClass}
          onClose={() => setSelectedClass(null)}
        />
      </div>
  );
};

export default TeacherDashboard;
