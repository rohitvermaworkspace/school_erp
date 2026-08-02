import { useEffect, useState } from "react";
import api from "../../services/api";

function TeacherRecentNotices() {
  const [notices, setNotices] =
    useState([]);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const res =
        await api.get("/notices");
      console.log("NOTICES:", notices);
      setNotices(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-6 shadow-card">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        Recent Notices
      </h2>

      <div className="space-y-3">
        {notices
          .slice(0, 5)
          .map((notice) => (
            <div
              key={notice._id}
              className="
              border-b
              dark:border-slate-800
              pb-2
            "
            >
              <p className="dark:text-white font-medium">
                {notice.title}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TeacherRecentNotices;