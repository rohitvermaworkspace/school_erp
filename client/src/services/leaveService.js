import api from "./api";

export const applyLeave =
  async (payload) => {
    const { data } =
      await api.post(
        "/leaves",
        payload
      );

    return data;
  };

export const getMyLeaves =
  async () => {
    const { data } =
      await api.get(
        "/leaves/my"
      );

    return data;
  };