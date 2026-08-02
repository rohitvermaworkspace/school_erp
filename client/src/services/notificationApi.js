import api from "./api";

export const getNotifications =
  async () => {
    const { data } =
      await api.get("/notifications");

    return data;
  };

export const markRead =
  async (id) => {
    const { data } =
      await api.put(
        `/notifications/${id}/read`
      );

    return data;
  };