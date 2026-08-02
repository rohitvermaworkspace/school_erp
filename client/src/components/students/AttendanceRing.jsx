function AttendanceRing({ percent = 0 }) {
  const radius = 120;
  const stroke = 15;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (percent / 100) * circumference;

  const getColor = () => {
    if (percent >= 75) return "#22c55e";
    if (percent >= 50) return "#facc15";
    return "#ef4444";
  };

  return (
    <div className="flex flex-col items-center justify-center">

      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke={getColor()}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>

      <div className="mt-2 text-center">
        <p className="text-2xl font-bold">{percent}%</p>
        <p className="text-sm text-gray-500">Attendance</p>
      </div>

    </div>
  );
}

export default AttendanceRing;