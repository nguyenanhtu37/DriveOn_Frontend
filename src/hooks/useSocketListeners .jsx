import { useEffect } from "react";
import { useNotificationStore } from "@/app/stores/view/notification";

export const useSocketListeners = (socket, queryClient) => {
  const { addNotification, removeNotification } = useNotificationStore();

  useEffect(() => {
    if (!socket) {
      console.warn("Socket not ready");
      return;
    }

    socket.on("newAppointment", (data) => {
      queryClient.invalidateQueries({
        queryKey: ["appointment", "garage", data],
      });
    });

    socket.on("newEmergency", (data) => {
      console.log("Received emergency", data);
      addNotification(data);
    });

    socket.on("cancelRescue", (data) => {
      removeNotification(data._id);
    });

    socket.on("acceptedRescue", (data) => {
      removeNotification(data._id);
    });

    return () => {
      socket.off("newAppointment");
      socket.off("newEmergency");
      socket.off("cancelRescue");
      socket.off("acceptedRescue");
    };
  }, [socket]);
};
