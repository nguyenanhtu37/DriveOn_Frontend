import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTabStore = create(
  persist(
    (set) => ({
      tab: null,
      setTab: (tab) => set({ tab }),
    }),
    { name: "tab-active" }
  )
);
