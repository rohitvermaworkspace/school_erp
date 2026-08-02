import StudentForm from "./StudentForm";


function AddStudentModal({ isOpen, onClose, fetchStudents }) {
  return (
    <StudentForm
      mode="add"
      isOpen={isOpen}
      onClose={onClose}
      fetchStudents={fetchStudents}
    />
  );
}

export default AddStudentModal;