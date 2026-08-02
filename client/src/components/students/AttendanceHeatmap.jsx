import { useMemo } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function AttendanceHeatmap({ data = [] }) {

  // ================= SAFE DATA TRANSFORM =================
  const values = useMemo(() => {
    return data
      .map((item) => {
        if (!item?.date) return null;

        const parsedDate = new Date(item.date);

        // ❌ FIX INVALID DATE CRASH
        if (isNaN(parsedDate.getTime())) {
          return null;
        }

        return {
          date: parsedDate.toISOString().split("T")[0],
          count: item.status === "present" ? 1 : 0,
        };
      })
      .filter(Boolean); // remove null values
  }, [data]);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">
      <h3 className="font-bold mb-4">Attendance Heatmap</h3>

      <CalendarHeatmap
        startDate={new Date(new Date().setMonth(new Date().getMonth() - 5))}
        endDate={new Date()}
        values={values}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return value.count === 1
            ? "color-green"
            : "color-red";
        }}
        tooltipDataAttrs={(value) => {
          if (!value) return { "data-tip": "No data" };

          return {
            "data-tip": `${value.date} - ${
              value.count ? "Present" : "Absent"
            }`,
          };
        }}
        showWeekdayLabels={true}
      />
    </div>
  );
}

export default AttendanceHeatmap;