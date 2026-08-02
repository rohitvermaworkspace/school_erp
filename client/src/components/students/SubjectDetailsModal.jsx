function SubjectDetailsModal({
  subject,
  onClose,
}) {
  if (!subject) return null;

  return (
    <div>
      <div className="space-y-4">

        <div>
          <p className="text-gray-500">
            Subject Code
          </p>

          <p className="font-semibold">
            {subject.subjectCode}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Class
          </p>

          <p className="font-semibold">
            {subject.className}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Teacher
          </p>

          <p className="font-semibold">
            {subject.teacher?.name}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Email
          </p>

          <p className="font-semibold">
            {subject.teacher?.email}
          </p>
        </div>

      </div>

    </div>
  );
}

export default SubjectDetailsModal;