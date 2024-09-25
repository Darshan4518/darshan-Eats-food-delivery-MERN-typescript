import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import { MenuInputState } from "../schema/menuSchema";

const API_END_PINT = "http://localhost:8000/api/v1/menu";
axios.defaults.withCredentials = true;

type UseMenuState = {
  menus: [];
  loading: boolean;
  addMenu: (input: MenuInputState) => Promise<void>;
};

export const useMenuStore: any = create<UseMenuState>()(
  persist(
    (set) => ({
      menus: [],
      loading: false,
      addMenu: async (input: MenuInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_PINT}/create`, input, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            set({ loading: false });
            toast.success("Menu added successfully");
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
    }),
    {
      name: "menu",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
