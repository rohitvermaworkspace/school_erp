import api from "./api";

export const getNotices = async () => {
  const { data } = await api.get("/notices");
  return data;
};