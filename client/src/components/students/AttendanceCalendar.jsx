import { useEffect, useState } from "react";
import api from "../../services/api";

function AttendanceCalendar() {
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await api.get("/attendance/my");
      setAttendance(res.data);
    } catch (err) {
      console.log("Attendance error:", err);
    }
  };

  // Convert API data into map for quick lookup
  const attendanceMap = {};
  attendance.forEach((item) => {
    const date = new Date(item.date).toDateString();
    attendanceMap[date] = item.status;
  });

  // Generate current month dates
  const generateCalendar = () => {
    const days = [];
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(year, month, i);
      days.push(currentDate);
    }

    return days;
  };

  const calendarDays = generateCalendar();

  const getStatusColor = (status) => {
    if (status === "present") return "bg-green-500";
    if (status === "absent") return "bg-red-500";
    return "bg-gray-200 dark:bg-slate-700";
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">

      <h3 className="font-bold mb-4 text-lg">
        Attendance Calendar
      </h3>

      {/* CALENDAR GRID */}
      <div className="grid grid-cols-7 gap-2 text-center">

        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} className="font-bold text-sm text-gray-500">
            {d}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const key = day.toDateString();
          const status = attendanceMap[key];

          return (
            <div
              key={index}
              onClick={() => setSelectedDate(key)}
              className={`p-3 rounded-lg cursor-pointer text-sm transition 
              ${getStatusColor(status)}`}
            >
              {day.getDate()}
            </div>
          );
        })}

      </div>

      {/* DETAILS PANEL */}
      {selectedDate && (
        <div className="mt-4 p-3 border rounded-lg">
          <p className="font-semibold">
            {selectedDate}
          </p>
          <p className="text-sm text-gray-600">
            Status: {attendanceMap[selectedDate] || "No record"}
          </p>
        </div>
      )}

    </div>
  );
}

export default AttendanceCalendar;