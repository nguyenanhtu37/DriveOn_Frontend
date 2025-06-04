import { useNotificationStore } from "@/app/stores/view/notification";

export function registerSocketListeners(queryClient, socket) {
  const { addNotification, removeNotification } =
    useNotificationStore.getState();
  if (!socket) {
    console.warn("Socket is not initialized");
    return;
  }
  socket.on("newAppointment", (data) => {
    queryClient.invalidateQueries({
      queryKey: ["appointment", "garage", data],
    });
  });

  socket.on("newEmergency", (data) => {
    console.log("New emergency received:", data);
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
}
