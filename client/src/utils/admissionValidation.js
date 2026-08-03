export const validateStep = (step, formData) => {
  const errors = {};

  switch (step) {
    case 0:
      if (!formData.admission.admissionDate)
        errors.admissionDate = "Admission Date is required";

      if (!formData.admission.academicSession)
        errors.academicSession = "Academic Session is required";

      if (!formData.academic.className)
        errors.className = "Current Class is required";

      if (!formData.academic.section) errors.section = "Section is required";

      if (!formData.academic.rollNumber?.trim())
        errors.rollNumber = "Roll Number is required";

      break;

    case 1: // Student
      if (!formData.user.name?.trim()) errors.name = "Student Name is required";

      if (!formData.user.phone?.trim())
        errors.phone = "Mobile Number is required";

      if (!formData.personal.gender) errors.gender = "Gender is required";

      if (!formData.personal.dob) errors.dob = "Date of Birth is required";

      break;

    case 2:
      if (!formData.family.guardian.name?.trim())
        errors.guardianName = "Guardian Name is required";

      if (!formData.family.guardian.phone?.trim())
        errors.guardianPhone = "Guardian Phone is required";

      if (!formData.family.guardian.relationship?.trim())
        errors.relationship = "Relationship is required";

      break;

    case 3: // Address
      if (!formData.address.current.addressLine?.trim())
        errors.address = "Current Address is required";

      if (!formData.address.current.city?.trim())
        errors.city = "City is required";

      if (!formData.address.current.state?.trim())
        errors.state = "State is required";

      if (!formData.address.current.pincode?.trim())
        errors.pincode = "Pincode is required";

      break;

    case 4: // Bank
      if (!formData.bank.accountHolder?.trim())
        errors.accountHolder = "Account Holder Name is required";

      if (!formData.bank.accountNumber?.trim())
        errors.accountNumber = "Account Number is required";

      break;

    case 5: // Previous School
      // optional

      break;

    case 6: // Facilities
      break;

    case 7: // Documents
      if (!formData.documents.studentPhoto)
        errors.studentPhoto = "Student Photo required";

      if (!formData.documents.birthCertificate)
        errors.birthCertificate = "Birth Certificate required";

      break;

    case 8: // Notes
      break;

    default:
      break;
  }

  return errors;
};