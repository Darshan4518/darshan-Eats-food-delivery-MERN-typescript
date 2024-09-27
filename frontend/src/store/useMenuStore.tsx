import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import { MenuInputState } from "../schema/menuSchema";

const API_END_POINT =
  "https://darshan-eats-food-delivery-mern.onrender.com/api/v1/menu";
axios.defaults.withCredentials = true;

type UseMenuState = {
  menu: any;
  loading: boolean;
  addMenu: (input: MenuInputState) => Promise<void>;
  updateMenu: (input: MenuInputState, id: string) => Promise<void>;
};

export const useMenuStore = create<UseMenuState>()(
  persist(
    (set) => ({
      menu: null,
      loading: false,
      addMenu: async (input: MenuInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/create`, input, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            set({
              loading: false,
            });
            toast.success("Menu added successfully");
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response?.data?.message || "Failed to add menu");
        }
      },
      updateMenu: async (input: MenuInputState, id: string) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_END_POINT}/update/${id}`,
            input,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success) {
            set({
              loading: false,
              menu: response.data.menu,
            });
            toast.success("Menu updated successfully");
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response?.data?.message || "Failed to add menu");
        }
      },
    }),
    {
      name: "menu",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
