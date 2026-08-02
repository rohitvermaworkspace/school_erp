import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

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

function StudentForm({
  mode = "add",
  isOpen,
  onClose,
  fetchStudents,
  student = null,
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialStudent);

  // ==========================================
  // Convert Backend Student -> Form Structure
  // ==========================================
  const mapStudentToForm = (studentData) => {
    if (!studentData) return initialStudent;

    return {
      user: {
        name: studentData.name || "",
        email: studentData.email || "",
        phone: studentData.phone || "",
        profileImage: studentData.profileImage || "",
      },
      admission: {
        ...initialStudent.admission,
        ...(studentData.admission || {}),
      },
      academic: {
        ...initialStudent.academic,
        ...(studentData.academic || {}),
      },
      personal: {
        ...initialStudent.personal,
        ...(studentData.personal || {}),
      },
      family: {
        ...initialStudent.family,
        ...(studentData.family || {}),
      },
      address: {
        ...initialStudent.address,
        ...(studentData.address || {}),
      },
      bank: {
        ...initialStudent.bank,
        ...(studentData.bank || {}),
      },
      previousSchool: {
        ...initialStudent.previousSchool,
        ...(studentData.previousSchool || {}),
      },
      facilities: {
        ...initialStudent.facilities,
        ...(studentData.facilities || {}),
      },
      documents: {
        ...initialStudent.documents,
        ...(studentData.documents || {}),
      },
      notes: {
        ...initialStudent.notes,
        ...(studentData.notes || {}),
      },
    };
  };

  // ==========================================
  // Prefill in Edit Mode
  // ==========================================
  useEffect(() => {
    if (mode === "edit" && student) {
      setFormData(mapStudentToForm(student));
    }

    if (mode === "add") {
      setFormData(initialStudent);
    }
  }, [student, mode]);

  // ==========================================
  // Generic Nested Update
  // ==========================================
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

  // ==========================================
  // Input Change
  // ==========================================
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    updateNestedField(name, type === "checkbox" ? checked : value);
  };

  // ==========================================
  // File Upload
  // ==========================================
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files.length) return;

    setFormData((prev) => {
      const updated = structuredClone(prev);
      updated.documents[name] = files[0];
      return updated;
    });
  };

  // ==========================================
  // Wizard Navigation
  // ==========================================
  const nextStep = () => {
    if (step < 10) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // ==========================================
  // Close Form
  // ==========================================
  const handleClose = () => {
    setStep(1);
    setErrors({});
    setLoading(false);
    setFormData(initialStudent);
    onClose();
  };

  // ==========================================
  // Validation
  // ==========================================
  const validateStep = () => {
    const validationErrors = {};

    if (step === 1) {
      if (!formData.admission.admissionNo?.trim()) {
        validationErrors.admissionNo = "Admission Number is required";
      }
      if (!formData.admission.admissionDate) {
        validationErrors.admissionDate = "Admission Date is required";
      }
      if (!formData.admission.academicSession) {
        validationErrors.academicSession = "Academic Session is required";
      }
      if (!formData.academic.className) {
        validationErrors.className = "Class is required";
      }
      if (!formData.academic.section) {
        validationErrors.section = "Section is required";
      }
      if (!formData.academic.rollNumber) {
        validationErrors.rollNumber = "Roll Number is required";
      }
    }

    if (step === 2) {
      if (!formData.user.name?.trim()) {
        validationErrors.name = "Student Name is required";
      }
      if (!formData.user.email?.trim()) {
        validationErrors.email = "Email is required";
      }
      if (!formData.personal.gender) {
        validationErrors.gender = "Gender is required";
      }
      if (!formData.personal.dob) {
        validationErrors.dob = "Date of Birth is required";
      }
    }

    if (step === 3) {
      if (!formData.family.father.name?.trim()) {
        validationErrors.fatherName = "Father Name is required";
      }
      if (!formData.family.father.phone?.trim()) {
        validationErrors.fatherPhone = "Father Phone is required";
      }
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // ==========================================
  // Next Action
  // ==========================================
  const handleNext = () => {
    if (!validateStep()) return;
    nextStep();
  };

  // ==========================================
  // Submit Action
  // ==========================================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (mode === "add") {
        await api.post("/students", formData);
        toast.success("Student admitted successfully");
      } else {
        await api.put(`/students/${student._id}`, formData);
        toast.success("Student updated successfully");
      }

      if (fetchStudents) {
        await fetchStudents();
      }

      handleClose();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to save student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex overflow-hidden">
      <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex overflow-hidden">
        
        {/* Sidebar */}
        <AdmissionSidebar currentStep={step} />

        {/* Right Content Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdmissionHeader
            step={step}
            title={mode === "add" ? "New Admission" : "Edit Student"}
          />

          {/* Dynamic Step Container */}
          <div className="flex-1 overflow-y-auto p-8">
            {step === 1 && (
              <AcademicStep
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
            )}

            {step === 2 && (
              <StudentStep
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
            )}

            {step === 3 && (
              <ParentStep
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
            )}

            {step === 4 && (
              <AddressStep
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
            )}

            {step === 5 && (
              <BankStep
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
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
              <NotesStep
                formData={formData}
                handleChange={handleChange}
              />
            )}

            {step === 10 && (
              <ReviewStep
                formData={formData}
              />
            )}
          </div>

          {/* Footer */}
          <div className="border-t dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              
              {/* Cancel */}
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition"
              >
                Cancel
              </button>

              <div className="flex gap-3">
                
                {/* Previous */}
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="px-6 py-3 rounded-xl border dark:border-slate-700 disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Previous
                </button>

                {step < 10 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transition"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg transition disabled:opacity-70"
                  >
                    {loading
                      ? mode === "add"
                        ? "Saving..."
                        : "Updating..."
                      : mode === "add"
                      ? "Complete Admission"
                      : "Update Student"}
                  </button>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default StudentForm;