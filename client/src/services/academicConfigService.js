import api from "./api";

// Academic Configuration — school-specific classes, subjects and
// class → subject assignments managed by the Super Admin.
const academicConfigService = {
  // Classes
  getClasses: (params) => api.get("/academic-config/classes", { params }),
  createClass: (data) => api.post("/academic-config/classes", data),
  updateClass: (id, data) => api.put(`/academic-config/classes/${id}`, data),
  updateClassStatus: (id, status) =>
    api.patch(`/academic-config/classes/${id}/status`, { status }),
  deleteClass: (id) => api.delete(`/academic-config/classes/${id}`),

  // Subjects
  getSubjects: (params) => api.get("/academic-config/subjects", { params }),
  createSubject: (data) => api.post("/academic-config/subjects", data),
  updateSubject: (id, data) => api.put(`/academic-config/subjects/${id}`, data),
  updateSubjectStatus: (id, status) =>
    api.patch(`/academic-config/subjects/${id}/status`, { status }),
  deleteSubject: (id) => api.delete(`/academic-config/subjects/${id}`),

  // Class → Subject assignments
  getClassAssignment: (params) =>
    api.get("/academic-config/assignments", { params }),
  assignSubjects: (data) => api.post("/academic-config/assignments", data),
};

export default academicConfigService;
