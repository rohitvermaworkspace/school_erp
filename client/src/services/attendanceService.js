import api from "./api";

// ===============================
// STUDENT ATTENDANCE
// ===============================
export const getMyAttendance = async () => {
  const { data } = await api.get("/attendance/my");
  return data;
};

// ===============================
// TEACHER ATTENDANCE
// ===============================
export const markClassAttendance = async (payload) => {
  const { data } = await api.post(
    "/attendance/teacher/mark",
    payload
  );
  return data;
};

export const getAttendanceByClass = async (className) => {
  const { data } = await api.get(
    `/attendance/class/${className}`
  );
  return data;
};

// ===============================
// CLASS HELPERS
// ===============================
export const getStudentsByClassId = async (
  classId
) => {
  const { data } = await api.get(
    `/attendance/class-id/${classId}`
  );

  return data;
};
