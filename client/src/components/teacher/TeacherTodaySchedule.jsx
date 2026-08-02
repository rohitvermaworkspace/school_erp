import { useEffect, useState } from "react";
import api from "../../services/api";

function TeacherTodaySchedule() {
  const [schedule, setSchedule] =
    useState([]);

  useEffect(() => {
    loadSchedule();
  }, []);

  const loadSchedule = async () => {
    try {
      const { data } =
        await api.get(
          "/timetables/teacher"
        );

      setSchedule(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        Today's Schedule
      </h2>

      <div className="space-y-3">
        {schedule
          .slice(0, 5)
          .map((item, index) => (
            <div
              key={index}
              className="
              flex
              justify-between
              border-b
              dark:border-slate-800
              pb-2
            "
            >
              <span className="dark:text-white">
                {item.day}
              </span>
              <span className="text-gray-500">
                {item.startTime}
              </span>
              <span className="text-gray-500">
                {item.endTime}
              </span>
              <span className="text-gray-500">
                {item.className}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TeacherTodaySchedule;