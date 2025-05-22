import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDialogStore = create(
  persist(
    (set) => ({
      dialog: {
        id: null,
        data: null,
      },
      setDialog: ({ id, data }) => set({ dialog: { id, data } }),
      setDialogData: (data) =>
        set((state) => ({ dialog: { ...state.dialog, data } })),
    }),
    {
      name: "dialog-active",
    }
  )
);

export const useDialogOpen = (id) =>
  useDialogStore((state) => state.dialog.id === id);

export const useDialogData = (id) =>
  useDialogStore((state) =>
    state.dialog.id === id ? state.dialog.data : null
  );

export const useSetDialogId = () => useDialogStore((state) => state.setDialog);

export const useCloseDialog = () => {
  const setDialog = useDialogStore((state) => state.setDialog);
  return () => setDialog({ id: null, data: null });
};
