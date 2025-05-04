import { create } from "zustand";

export const useDirectionStore = create((set, get) => ({
  direction: null,

  setDirection: (direction) => set({ direction }),

  clearDirection: () => set({ direction: null }),

  hasActiveDirection: () => get().direction !== null,
}));

export const getDirection = useDirectionStore.getState().direction;
export const getSetDirection = useDirectionStore.getState().setDirection;
export const getClearDirection = useDirectionStore.getState().clearDirection;
export const getHasActiveDirection =
  useDirectionStore.getState().hasActiveDirection;
export const getDirectionStore = () => useDirectionStore.getState();
