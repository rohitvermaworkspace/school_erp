import api from "./api";

export const getStudentsByClass = async (
  className
) => {
  const { data } = await api.get(
    `/students/class/${className}`
  );

  return data;
};

export const downloadReportCard =
  async (studentId) => {
    const response =
      await api.get(
        `/report-cards/${studentId}`,
        {
          responseType: "blob",
        }
      );

    return response.data;
  };