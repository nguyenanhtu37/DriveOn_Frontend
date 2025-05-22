import { create } from "zustand";

export const useSearchStore = create((set) => ({
  keyword: "",
  location: "",
  service: [],
  province: "",
  isFetched: false,
  time: new Date(),
  setKeyword: (keyword) => set({ keyword }),
  setLocation: (location) => set({ location }),
  setService: (service) => set({ service }),
  setTime: (time) => set({ time }),
  setProvince: (province) => set({ province }),
  setIsFetched: (isFetched) => set({ isFetched }),
  reset: () =>
    set({
      keyword: "",
      location: "",
      service: [],
      province: "",
      isFetched: false,
      time: new Date(),
    }),
}));
