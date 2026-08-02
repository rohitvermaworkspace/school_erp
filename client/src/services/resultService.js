import api from "./api";

export const getClassResults = async (
  className
) => {
  const { data } =
    await api.get(
      `/results/class/${className}`
    );

  return data;
};

export const getTopPerformers =
  async (className) => {
    const { data } =
      await api.get(
        `/results/top-performers/${className}`
      );

    return data;
  };

export const getSubjectSummary =
  async (className) => {
    const { data } =
      await api.get(
        `/results/subject-summary/${className}`
      );

    return data;
  };