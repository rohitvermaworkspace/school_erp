export const formatAttendance = (records = []) => {
  return records.map((item) => ({
    date: new Date(item.date).toISOString().split("T")[0],
    status: item.status,
  }));
};