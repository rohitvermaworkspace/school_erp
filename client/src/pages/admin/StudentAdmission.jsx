import AdminLayout from "../../components/layout/AppLayout";
import StudentForm from "../../components/students/StudentForm";

function StudentAdmission() {
  return (
    <AdminLayout>
      <StudentForm
        mode="add"
        isOpen={true}
        onClose={() => window.history.back()}
      />
    </AdminLayout>
  );
}

export default StudentAdmission;