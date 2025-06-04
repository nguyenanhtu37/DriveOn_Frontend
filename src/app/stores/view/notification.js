import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (item) =>
    set((state) => {
      const exists = state.notifications.some((n) => n._id === item._id);
      if (exists) return state;
      return { notifications: [...state.notifications, item] };
    }),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n._id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));
