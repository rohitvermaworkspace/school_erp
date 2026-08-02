import { FaBookOpen, FaChalkboardTeacher, FaFolderOpen } from "react-icons/fa";

function SubjectCard({ subject, onViewDetails }) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-sm
      hover:shadow-xl
      transition-all
      duration-300
      border
      border-gray-100
      overflow-hidden
    "
    >
      {/* TOP */}

      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {subject.subjectName}
            </h3>

            <p className="text-sm text-gray-500 mt-1">{subject.subjectCode}</p>
          </div>

          <div
            className="
            w-14 h-14
            rounded-2xl
            bg-blue-100
            flex
            items-center
            justify-center
          "
          >
            <FaBookOpen size={24} className="text-blue-600" />
          </div>
        </div>

        {/* CLASS */}

        <div className="mt-4">
          <span
            className="
            px-3 py-1
            rounded-full
            text-xs
            font-medium
            bg-blue-50
            text-blue-700
          "
          >
            {subject.className}
          </span>
        </div>

        {/* TEACHER */}

        <div className="mt-5 flex items-start gap-3">
          <div
            className="
            w-10 h-10
            rounded-full
            bg-green-100
            flex
            items-center
            justify-center
          "
          >
            <FaChalkboardTeacher className="text-green-600" />
          </div>

          <div>
            <p className="font-medium text-gray-800">{subject.teacher?.name}</p>

            <p className="text-sm text-gray-500">{subject.teacher?.email}</p>
          </div>
        </div>

        {/* ATTENDANCE */}

        <div className="mt-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Attendance</span>

            <span className="font-semibold text-green-600">--</span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="
              h-2
              bg-green-500
              rounded-full
            "
              style={{
                width: "92%",
              }}
            />
          </div>
        </div>

        {/* RESOURCES */}

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <FaFolderOpen />

            <span className="text-sm">Resources</span>
          </div>

          <span className="font-semibold">{subject.resourcesCount || 0}</span>
        </div>
      </div>

      {/* FOOTER */}

      <div className="bg-gray-50 p-4">
        <button
          onClick={() => onViewDetails(subject)}
          className="
            w-full
            bg-blue-600
            text-white
            py-2.5
            rounded-xl
            hover:bg-blue-700
            transition
            font-medium
          "
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default SubjectCard;