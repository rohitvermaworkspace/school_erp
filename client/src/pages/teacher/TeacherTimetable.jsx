import { useEffect, useState } from "react";
import TeacherLayout from "../../components/layout/TeacherLayout";
import api from "../../services/api";

function TeacherTimetable() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const { data } = await api.get("/timetables/teacher");

      setSchedule(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <TeacherLayout>
      <div className="space-y-6">

        {/* HERO */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-3xl font-bold">
            My Timetable
          </h1>

          <p className="mt-2 text-blue-100">
            View your weekly teaching schedule and upcoming classes
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">
              Total Classes
            </p>

            <h2 className="text-3xl font-bold text-blue-600">
              {schedule.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">
              Subjects
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {[...new Set(schedule.map((s) => s.subject))]
                .length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">
              Classes Assigned
            </p>

            <h2 className="text-3xl font-bold text-purple-600">
              {[...new Set(schedule.map((s) => s.className))]
                .length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">
              Working Days
            </p>

            <h2 className="text-3xl font-bold text-orange-600">
              {
                [...new Set(schedule.map((s) => s.day))]
                  .length
              }
            </h2>
          </div>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            Loading timetable...
          </div>
        )}

        {/* NO DATA */}
        {!loading && schedule.length === 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

            <div className="w-20 h-20 bg-blue-50 rounded-full mx-auto flex items-center justify-center mb-4">
              📅
            </div>

            <h3 className="text-xl font-semibold text-gray-700">
              No Timetable Assigned
            </h3>

            <p className="text-gray-500 mt-2">
              Your schedule will appear here once assigned by administration.
            </p>

          </div>
        )}

        {!loading && schedule.length > 0 && (
          <>

            {/* WEEK OVERVIEW */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

              <div className="px-6 py-5 border-b">
                <h2 className="text-xl font-semibold">
                  Weekly Overview
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6">

                {days.map((day) => {
                  const count = schedule.filter(
                    (s) => s.day === day
                  ).length;

                  return (
                    <div
                      key={day}
                      className="p-5 border-r last:border-r-0 text-center"
                    >
                      <p className="text-sm text-gray-500">
                        {day}
                      </p>

                      <h3 className="text-2xl font-bold text-blue-600 mt-2">
                        {count}
                      </h3>

                      <p className="text-xs text-gray-400">
                        Classes
                      </p>
                    </div>
                  );
                })}

              </div>

            </div>

            {/* TIMETABLE */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {days.map((day) => {

                const daySchedule = schedule.filter(
                  (item) => item.day === day
                );

                return (
                  <div
                    key={day}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden"
                  >

                    {/* DAY HEADER */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">

                      <div className="flex justify-between items-center">

                        <h2 className="font-bold text-lg">
                          {day}
                        </h2>

                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
                          {daySchedule.length} Classes
                        </span>

                      </div>

                    </div>

                    <div className="p-5">

                      {daySchedule.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          No Classes Scheduled
                        </div>
                      ) : (
                        <div className="space-y-4">

                          {daySchedule.map((period, index) => (
                            <div
                              key={index}
                              className="
                                border
                                rounded-2xl
                                p-4
                                hover:border-blue-300
                                hover:shadow-md
                                transition
                              "
                            >

                              <div className="flex justify-between items-start">

                                <div>

                                  <h3 className="font-semibold text-gray-800">
                                    {period.subject}
                                  </h3>

                                  <p className="text-sm text-gray-500 mt-1">
                                    Class {period.className}
                                  </p>

                                </div>

                                <span className="
                                  bg-blue-100
                                  text-blue-700
                                  px-3
                                  py-1
                                  rounded-full
                                  text-xs
                                  font-medium
                                ">
                                  {period.className}
                                </span>

                              </div>

                              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                                ⏰ {period.startTime} - {period.endTime}
                              </div>

                            </div>
                          ))}

                        </div>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>
          </>
        )}

      </div>
    </TeacherLayout>
  );
}

export default TeacherTimetable;