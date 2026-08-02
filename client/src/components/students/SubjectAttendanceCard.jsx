function SubjectAttendanceCard({
  attendance,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">

      <h3 className="text-lg font-bold mb-4">
        Attendance
      </h3>

      <div className="flex justify-between mb-2">

        <span>
          Attendance Percentage
        </span>

        <span className="font-bold">
          {attendance?.attendancePercentage || 0}%
        </span>

      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">

        <div
          className="bg-green-500 h-3 rounded-full"
          style={{
            width: `${attendance?.attendancePercentage || 0}%`,
          }}
        />

      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">

        <div className="bg-green-50 rounded-xl p-4">

          <p className="text-gray-500">
            Present
          </p>

          <h4 className="text-2xl font-bold text-green-600">
            {attendance?.present || 0}
          </h4>

        </div>

        <div className="bg-red-50 rounded-xl p-4">

          <p className="text-gray-500">
            Absent
          </p>

          <h4 className="text-2xl font-bold text-red-600">
            {attendance?.absent || 0}
          </h4>

        </div>

      </div>

    </div>
  );
}

export default SubjectAttendanceCard;