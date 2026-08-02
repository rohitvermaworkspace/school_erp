import api from "./api";

// student fees list
export const getMyFees = async () => {
  const { data } = await api.get("/fees/my");
  return data;
};

// fee chart summary
export const getFeeSummary = async () => {
  const { data } = await api.get("/fees/summary");
  return data;
};