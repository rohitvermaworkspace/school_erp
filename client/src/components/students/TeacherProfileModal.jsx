function TeacherProfileModal({
  teacher,
  onClose,
}) {
  if (!teacher) return null;

  const initials =
    teacher.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">

        <div className="flex justify-between mb-5">

          <h2 className="text-2xl font-bold">
            Teacher Profile
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-xl"
          >
            ✕
          </button>

        </div>

        <div className="flex flex-col items-center">

          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
            {initials}
          </div>

          <h3 className="mt-4 text-xl font-bold">
            {teacher.name}
          </h3>

          <p className="text-gray-500">
            {teacher.email}
          </p>

        </div>

        <div className="mt-6 space-y-3">

          <div>
            <span className="text-gray-500">
              Phone:
            </span>{" "}
            N/A
          </div>

          <div>
            <span className="text-gray-500">
              Qualification:
            </span>{" "}
            M.Sc
          </div>

          <div>
            <span className="text-gray-500">
              Experience:
            </span>{" "}
            5 Years
          </div>

        </div>

      </div>

    </div>
  );
}

export default TeacherProfileModal;