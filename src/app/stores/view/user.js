import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      location: null,
      setLocation: (location) => set({ location }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, location: null }),
    }),
    { name: "user-storage", partialize: (state) => ({ user: state.user }) } // Only persist user
  )
);

export const setUser = (user) => useUserStore.getState().setUser(user);

export const setLocation = (location) =>
  useUserStore.getState().setLocation(location);

export const getLocation = () => useUserStore.getState().location;

export const getUser = () => useUserStore.getState().user;

export const userLogout = () => {
  useUserStore.getState().logout();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("location");
};
