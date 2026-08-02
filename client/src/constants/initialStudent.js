const initialStudent = {
  user: {
    name: "",
    email: "",
    phone: "",
    profileImage: "",
  },

  admission: {
    admissionNo: "",
    admissionDate: "",
    academicSession: "2026-2027",
    admissionType: "New",
    joiningClass: "",
    joiningSection: "",
    medium: "English",
    status: "Active",
  },

  academic: {
    className: "",
    section: "",
    rollNumber: "",
    house: "",
    board: "",
    stream: "",
  },

  personal: {
    dob: "",
    gender: "",
    bloodGroup: "",
    religion: "",
    category: "",
    caste: "",
    nationality: "Indian",
    birthPlace: "",
    motherTongue: "",
    aadhaarNumber: "",
    penNumber: "",
    apaarId: "",
  },

  family: {
    primaryContactType: "Father",

    father: {
    name: "",
    phone: "",
    email: "",
    qualification: "",
    occupation: "",
  },

  mother: {
    name: "",
    phone: "",
    email: "",
    qualification: "",
    occupation: "",
  },

  guardian: {
    name: "",
    phone: "",
    relationship: "",
    qualification: "",
    occupation: "",
  },
  },

  address: {
    current: {
      addressLine: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
    },

    isPermanentSameAsCurrent: true,

    permanent: {
      addressLine: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
    },
  },

  bank: {
    accountHolder: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
  },

  previousSchool: {
    schoolName: "",
    board: "",
    medium: "",
    lastClass: "",
    lastSession: "",
    tcNumber: "",
    percentageMarks: "",
    reasonForLeaving: "",
  },

  facilities: {
    transport: {
      isRequired: false,
      routeId: "",
      stopId: "",
    },

    hostel: {
      isRequired: false,
      blockId: "",
      roomId: "",
    },

    rteQuota: {
      isEligible: false,
      documentStatus: "NA",
    },
  },

  documents: {
    studentPhoto: null,
    guardianPhoto: null,
    birthCertificate: null,
    aadhaarCard: null,
    transferCertificate: null,
    marksheet: null,
  },

  notes: {
    futureGoal: "",
    remarks: "",
  },
};

export default initialStudent;