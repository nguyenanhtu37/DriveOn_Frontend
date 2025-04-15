import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFilterStore = create(
  persist(
    (set) => ({
      serviceSystem: [],
      location: {
        province: null,
        district: null,
      },
      rating: null,
      distance: null,
      operating_days: [],
      openTime: null,
      closeTime: null,
      tagPro: false,
      clearFilter: () => {
        set({
          serviceSystem: [],
          location: {
            province: null,
            district: null,
          },
          rating: null,
          distance: null,
          operating_days: [],
          openTime: null,
          closeTime: null,
          tagPro: false,
        });
      },
      setOpenTime: (openTime) => set({ openTime }),
      setCloseTime: (closeTime) => set({ closeTime }),
      setOperatingDays: (operating_days) =>
        set((state) => ({
          operating_days: state.operating_days.includes(operating_days)
            ? state.operating_days.filter((s) => s !== operating_days)
            : [...state.operating_days, operating_days],
        })),
      setTagPro: (tagPro) => set({ tagPro }),
      setDistance: (distance) => set({ distance }),
      setRating: (rating) => set({ rating }),
      setLocation: (location) =>
        set((state) => ({
          location: {
            ...state.location,
            ...location,
          },
        })),
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
