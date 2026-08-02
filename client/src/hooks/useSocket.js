import { useEffect, useState } from "react";
import socket from "../services/socket";

const useSocket = () => {
  const [liveNotification, setLiveNotification] = useState(null);

  useEffect(() => {
    const handleNotification = (data) => {
      console.log("Live notification:", data);

      setLiveNotification(data);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, []);

  return {
    socket,
    liveNotification,
  };
};

export default useSocket;
