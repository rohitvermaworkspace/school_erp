import api from "./api";

export const getTeacherDashboard = async () => {
  const res = await api.get("/analytics/teacher-dashboard");
  console.log("SERVICE RESPONSE:", res.data); 
  return res.data;
};