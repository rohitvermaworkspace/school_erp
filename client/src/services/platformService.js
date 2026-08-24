import api from "./api";

// Platform-level endpoints — every call here is Super Admin only
// (the backend enforces role + tenant rules independently).
const platformService = {
  // ---------- Stats ----------
  getPlatformStats: () => api.get("/auth/platform-stats"),

  // ---------- Schools ----------
  getSchools: () => api.get("/auth/schools"),
  getSchoolById: (id) => api.get(`/auth/schools/${id}`),
  createSchool: (data) => api.post("/auth/create-school", data),
  updateSchool: (id, data) => api.put(`/auth/schools/${id}`, data),
  updateSchoolStatus: (id, status) =>
    api.patch(`/auth/schools/${id}/status`, { status }),
  deleteSchool: (id) => api.delete(`/auth/schools/${id}`),

  // ---------- School Admins ----------
  getSchoolAdmins: (params) => api.get("/auth/school-admins", { params }),
  createSchoolAdmin: (data) => api.post("/auth/school-admins", data),
  updateSchoolAdmin: (id, data) => api.put(`/auth/school-admins/${id}`, data),
  updateSchoolAdminStatus: (id, status) =>
    api.patch(`/auth/school-admins/${id}/status`, { status }),

  // ---------- Platform Users ----------
  getPlatformUsers: (params) => api.get("/auth/platform-users", { params }),
  updateUserStatus: (id, status) =>
    api.patch(`/auth/users/${id}/status`, { status }),
};

export default platformService;
