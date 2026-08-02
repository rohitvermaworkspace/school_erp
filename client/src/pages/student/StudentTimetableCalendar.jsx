function StudentTimetableCalendar({
  timetableMap,
  weekDays,
}) {

  const getSubjectColor = (subject) => {

    const colors = [
      "bg-blue-100 border-blue-300 text-blue-700",
      "bg-green-100 border-green-300 text-green-700",
      "bg-purple-100 border-purple-300 text-purple-700",
      "bg-orange-100 border-orange-300 text-orange-700",
      "bg-cyan-100 border-cyan-300 text-cyan-700",
      "bg-pink-100 border-pink-300 text-pink-700",
      "bg-red-100 border-red-300 text-red-700",
      "bg-yellow-100 border-yellow-300 text-yellow-700",
    ];

    let hash = 0;

    for (let i = 0; i < subject.length; i++) {
      hash += subject.charCodeAt(i);
    }

    return colors[
      hash % colors.length
    ];
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sortedTimeSlots =
    Object.keys(timetableMap).sort();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
        <h2 className="text-xl font-bold">
          Weekly Timetable
        </h2>

        <p className="text-blue-100 text-sm">
          Class Schedule Overview
        </p>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1200px] border-collapse">

          {/* Days */}
          <thead>
            <tr className="bg-gray-100">

              <th className="border p-4 text-left font-semibold sticky left-0 bg-gray-100 z-10">
                Time
              </th>

              {weekDays.map((day) => (
                <th
                  key={day}
                  className="border p-4 text-center font-semibold"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>

            {sortedTimeSlots.map((time) => (
              <tr
                key={time}
                className="hover:bg-gray-50"
              >

                {/* Time */}
                <td className="border p-4 bg-gray-50 font-semibold text-gray-700 sticky left-0 z-10">
                  {time}
                </td>

                {/* Period Cells */}
                {weekDays.map((day) => {

                  const period =
                    timetableMap[time]?.[day];

                  return (
                    <td
                      key={day}
                      className="border p-3 align-top h-36"
                    >

                      {period ? (

                        period.isBreak ? (

                          <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 h-full flex items-center justify-center text-yellow-700 font-semibold">
                            🍽 Lunch Break
                          </div>

                        ) : (

                          <div
                            className={`rounded-xl border p-3 h-full shadow-sm hover:shadow-lg transition-all duration-200 ${
                              getSubjectColor(
                                period.subject?.subjectName || ""
                              )
                            }`}
                          >

                            {/* Subject */}
                            <div className="font-bold text-base">
                              📘{" "}
                              {period.subject?.subjectName ||
                                "Subject"}
                            </div>

                            {/* Teacher */}
                            <div className="flex items-center gap-2 mt-3">

                              <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-xs font-bold">
                                {getInitials(
                                  period.teacher?.name
                                )}
                              </div>

                              <div className="text-sm">
                                {period.teacher?.name ||
                                  "Teacher"}
                              </div>

                            </div>

                            {/* Time */}
                            <div className="text-xs mt-3 opacity-70">
                              ⏰ {period.startTime}
                              {" - "}
                              {period.endTime}
                            </div>

                            {/* Room */}
                            {period.roomNumber && (
                              <div className="text-xs mt-2 opacity-70">
                                🏫 Room: {period.roomNumber}
                              </div>
                            )}

                          </div>

                        )

                      ) : (

                        <div className="h-full flex items-center justify-center text-gray-300 text-sm">
                          Free
                        </div>

                      )}

                    </td>
                  );
                })}

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default StudentTimetableCalendar;