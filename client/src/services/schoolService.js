import api from "./api";

const schoolService = {
  getSchools: () => api.get("/auth/schools"),
  getSchoolById: (id) => api.get(`/auth/schools/${id}`),
  createSchool: (data) => api.post("/auth/create-school", data),
  updateSchool: (id, data) => api.put(`/auth/schools/${id}`, data),
  deleteSchool: (id) => api.delete(`/auth/schools/${id}`),
};

export default schoolService;
