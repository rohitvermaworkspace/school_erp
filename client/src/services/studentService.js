import api from "./api";

export const getStudentDashboard = () => {
  return api.get("/student/dashboard");
};