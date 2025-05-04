import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTabStore = create(
  persist(
    (set) => ({
      tab: null,
      garageView: "list",
      setGarageView: (garageView) => set({ garageView }),
      setTab: (tab) => set({ tab }),
    }),
    { name: "tab-active" }
  )
);

export const getTabStore = () => useTabStore.getState();
