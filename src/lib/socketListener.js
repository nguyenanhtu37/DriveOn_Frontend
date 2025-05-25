export function registerSocketListeners(queryClient, socket) {
  console.log(socket);
  if (!socket) {
    console.warn("Socket is not initialized");
    return;
  }
  socket.on("newAppointment", (data) => {
    queryClient.invalidateQueries({
      queryKey: ["appointment", "garage", data],
    });
  });
}
