import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaCalendarCheck,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import AttendanceChart from "../../components/dashboard/AttendanceChart";
import FeeChart from "../../components/dashboard/FeeChart";

function Dashboard() {
  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>

        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
          School analytics overview
        </p>
      </div>

      {/* STATS */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
          sm:gap-6
          mb-6
          sm:mb-8
        "
      >
        <StatCard
          title="Students"
          value="1,250"
          icon={<FaUserGraduate />}
          color="text-blue-500"
        />

        <StatCard
          title="Teachers"
          value="85"
          icon={<FaChalkboardTeacher />}
          color="text-green-500"
        />

        <StatCard
          title="Revenue"
          value="₹12L"
          icon={<FaMoneyBillWave />}
          color="text-yellow-500"
        />

        <StatCard
          title="Attendance"
          value="94%"
          icon={<FaCalendarCheck />}
          color="text-purple-500"
        />
      </div>

      {/* CHARTS */}
      <div
        className="
          grid
          grid-cols-1
          2xl:grid-cols-2
          gap-6
        "
      >
        <div className="w-full overflow-hidden">
          <AttendanceChart />
        </div>

        <div className="w-full overflow-hidden">
          <FeeChart />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;