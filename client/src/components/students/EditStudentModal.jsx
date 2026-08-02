import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import AdminLayout from "../../components/layout/AppLayout";

import AdmissionSidebar from "../../pages/admission/admission/AdmissionSidebar";
import AdmissionHeader from "../../pages/admission/admission/AdmissionHeader";

import AcademicStep from "../../pages/admission/admission/AcademicStep";
import StudentStep from "../../pages/admission/admission/StudentStep";
import ParentStep from "../../pages/admission/admission/ParentStep";
import AddressStep from "../../pages/admission/admission/AddressStep";
import BankStep from "../../pages/admission/admission/BankStep";
import PreviousSchoolStep from "../../pages/admission/admission/PreviousSchoolStep";
import FacilitiesStep from "../../pages/admission/admission/FacilitiesStep";
import DocumentsStep from "../../pages/admission/admission/DocumentsStep";
import NotesStep from "../../pages/admission/admission/NotesStep";
import ReviewStep from "../../pages/admission/admission/ReviewStep";

import initialStudent from "../../constants/initialStudent";

function EditStudentModal({ isOpen, onClose, student, fetchStudents }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialStudent);

  const [errors, setErrors] = useState({});

  // ===============================
  // Prefill Student
  // ===============================

  useEffect(() => {
    if (!student) return;

    setFormData({
      ...initialStudent,

      user: {
        ...initialStudent.user,

        name: student.name || "",
        email: student.email || "",
        phone: student.phone || "",
        profileImage: student.profileImage || "",
      },

      admission: {
        ...initialStudent.admission,
        ...student.admission,
      },

      academic: {
        ...initialStudent.academic,
        ...student.academic,
      },

      personal: {
        ...initialStudent.personal,
        ...student.personal,
      },

      family: {
        ...initialStudent.family,
        ...student.family,
      },

      address: {
        ...initialStudent.address,
        ...student.address,
      },

      bank: {
        ...initialStudent.bank,
        ...student.bank,
      },

      previousSchool: {
        ...initialStudent.previousSchool,
        ...student.previousSchool,
      },

      facilities: {
        ...initialStudent.facilities,
        ...student.facilities,
      },

      documents: {
        ...initialStudent.documents,
        ...student.documents,
      },

      notes: {
        ...initialStudent.notes,
        ...student.notes,
      },
    });

    setStep(1);
  }, [student]);

  // ===============================
  // Generic Nested Update
  // ===============================

  const updateNestedField = (path, value) => {
    setFormData((prev) => {
      const updated = structuredClone(prev);

      const keys = path.split(".");

      let current = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;

      return updated;
    });
  };

  // ===============================
  // Input Change
  // ===============================

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    updateNestedField(name, type === "checkbox" ? checked : value);
  };

  // ===============================
  // File Upload
  // ===============================

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (!files.length) return;

    setFormData((prev) => ({
      ...prev,

      documents: {
        ...prev.documents,

        [name]: files[0],
      },
    }));
  };

  // ===============================
  // Navigation
  // ===============================

  const nextStep = () => {
    if (step < 10) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // ===============================
  // Close
  // ===============================

  const handleClose = () => {
    setStep(1);
    setErrors({});
    setFormData(initialStudent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AdminLayout>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
        <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex overflow-hidden">
          <AdmissionSidebar currentStep={step} />

          <div className="flex-1 flex flex-col overflow-hidden">
            <AdmissionHeader step={step} title="Edit Student"></AdmissionHeader>

            <div className="flex-1 overflow-y-auto p-8">
              {step === 1 && (
                <AcademicStep
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              )}

              {step === 2 && (
                <StudentStep formData={formData} handleChange={handleChange} />
              )}

              {step === 3 && (
                <ParentStep formData={formData} handleChange={handleChange} />
              )}

              {step === 4 && (
                <AddressStep formData={formData} handleChange={handleChange} />
              )}

              {step === 5 && (
                <BankStep formData={formData} handleChange={handleChange} />
              )}

              {step === 6 && (
                <PreviousSchoolStep
                  formData={formData}
                  handleChange={handleChange}
                />
              )}

              {step === 7 && (
                <FacilitiesStep
                  formData={formData}
                  handleChange={handleChange}
                />
              )}

              {step === 8 && (
                <DocumentsStep
                  formData={formData}
                  handleFileChange={handleFileChange}
                />
              )}

              {step === 9 && (
                <NotesStep formData={formData} handleChange={handleChange} />
              )}

              {step === 10 && <ReviewStep formData={formData} />}
            </div>
            {/* Footer */}

            <div className="border-t dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex justify-between">
              {/* Cancel */}

              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition"
              >
                Cancel
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="px-6 py-3 rounded-xl border dark:border-slate-700 disabled:opacity-50"
                >
                  Previous
                </button>

                {step < 10 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleUpdate}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Student"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );

  // ===============================
  // UPDATE STUDENT
  // ===============================

  async function handleUpdate() {
    try {
      setLoading(true);

      const payload = structuredClone(formData);

      // remove immutable fields
      delete payload._id;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.userId;
      delete payload.createdBy;
      delete payload.__v;

      await api.put(`/students/${student._id}`, payload);

      toast.success("Student updated successfully");

      if (fetchStudents) {
        await fetchStudents();
      }

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update student");
    } finally {
      setLoading(false);
    }
  }
}

export default EditStudentModal;