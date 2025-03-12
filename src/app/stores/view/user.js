import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "user-storage" } // Lưu vào localStorage
  )
);

export const setUser = (user) => useUserStore.getState().setUser(user);

export const userLogout = () => useUserStore.getState().logout();
