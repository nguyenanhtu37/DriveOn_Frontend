import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFilterStore = create(
  persist(
    (set) => ({
      serviceSystem: [],
      rating: "",
      distance: "",
      tagPro: false,
      setTagPro: (tagPro) => set({ tagPro }),
      setDistance: (distance) => set({ distance }),
      setRating: (rating) => set({ rating }),
      setServiceSystem: (serviceSystem) =>
        set((state) => ({
          serviceSystem: state.serviceSystem.includes(serviceSystem)
            ? state.serviceSystem.filter((s) => s !== serviceSystem)
            : [...state.serviceSystem, serviceSystem],
        })),
    }),
    { name: "filter-storage" }
  )
);
