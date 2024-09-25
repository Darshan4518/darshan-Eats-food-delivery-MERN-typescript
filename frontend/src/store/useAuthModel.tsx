import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UseAuthModelState = {
  open: boolean;
  setOpen: (open: boolean) => void;
  tab: string;
  setTab: (tab: string) => void;
};

export const useAuthModel = create<UseAuthModelState>()(
  persist(
    (set) => ({
      open: false,
      tab: "login",
      setOpen: (open: boolean) => set({ open }),
      setTab: (tab: string) => {
        set({ tab });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
