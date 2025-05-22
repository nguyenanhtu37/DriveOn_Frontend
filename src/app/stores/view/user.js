import { io } from "socket.io-client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = "http://localhost:5000";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      location: null,
      setLocation: (location) => set({ location }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, location: null }),
      socket: null,

      disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
      },
    }),
    { name: "user-storage", partialize: (state) => ({ user: state.user }) } // Only persist user
  )
);

export const setUser = (user) => {
  useUserStore.getState().setUser(user);
};

export const connectSocket = () => {
  const { user, socket } = useUserStore.getState();

  // Debug logging
  console.log("Attempting to connect socket:", {
    userExists: !!user,
    userId: user?._id,
    socketExists: !!socket,
    socketConnected: socket?.connected,
  });

  if (!user || socket?.connected) return;

  try {
    const newSocket = io(BASE_URL, {
      query: { userId: user._id },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Set up basic event listeners
    newSocket.on("connect", () => {
      console.log("Socket connected successfully");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    useUserStore.setState({ socket: newSocket });
  } catch (error) {
    console.error("Error initiating socket connection:", error);
  }
};

export const disconnectSocket = () => {
  const { socket } = useUserStore.getState();
  if (socket?.connected) {
    socket.disconnect();
    useUserStore.setState({ socket: null });
  }
};
export const setLocation = (location) =>
  useUserStore.getState().setLocation(location);

export const getLocation = () => useUserStore.getState().location;

export const getUser = () => useUserStore.getState().user;

export const userLogout = () => {
  useUserStore.getState().logout();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("location");
  disconnectSocket();
};
