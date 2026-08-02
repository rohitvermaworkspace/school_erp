import { useEffect, useState } from "react";

import { FaBell } from "react-icons/fa";

import api from "../../services/api";

import socket from "../../services/socket";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);

  const [open, setOpen] = useState(false);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const { data } = await api.get("/notifications");

      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Listen realtime
    socket.on("new_notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);

  return (
    <div className="relative">
      {/* BELL */}
      <button
        onClick={() => setOpen(!open)}
        className="
        relative
        text-2xl
        text-gray-600 text-2xl
            p-2
            rounded-xl
            bg-gray-100
            dark:bg-gray-800
            dark:text-white
            transition"
      >
        <FaBell />

        {/* COUNT */}
        {notifications.length > 0 && (
          <span
            className="
              absolute
              -top-2
              -right-2

              bg-red-500
              text-white

              text-xs

              w-5
              h-5

              rounded-full

              flex
              items-center
              justify-center"
          >
            {notifications.length}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute
            right-0
            mt-4
            w-[350px]
            bg-white
            dark:bg-slate-900
            rounded-2xl
            shadow-2xl
            border
            border-gray-100
            hover:bg-gray-50
            dark:hover:bg-slate-800
            z-50"
        >
          {/* HEADER */}
          <div
            className="
              p-4
              border-b"
          >
            <h2
              className="
                font-semibold
                text-lg"
            >
              Notifications
            </h2>
          </div>

          {/* LIST */}
          <div
            className="
              max-h-[400px]
              overflow-y-auto"
          >
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <div
                  key={item._id}
                  className="
                      p-4
                      border-b

                      hover:bg-gray-50
                      transition"
                >
                  <p
                    className="
                        font-medium"
                  >
                    {item.message}
                  </p>

                  <p
                    className="
                        text-sm
                        text-gray-500 dark:text-gray-300
                        mt-1"
                  >
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <div
                className="
                  p-6
                  text-center
                  text-gray-500 dark:text-gray-300"
              >
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
