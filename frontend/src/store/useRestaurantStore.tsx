import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import { restaurantInputState } from "@/schema/restaurantSchema";

const API_END_POINT = "http://localhost:8000/api/v1/restaurant";
axios.defaults.withCredentials = true;

interface RestaurantState {
  restaurant: any | null;
  restaurantDetail: any | null;
  restaurants: any[];
  loading: boolean;
  filterByCuisines: string[];
  allRestaurants: [];
  createRestaurant: (
    input: restaurantInputState,
    navigate: any
  ) => Promise<void>;
  updateRestaurant: (
    input: restaurantInputState,
    navigate: any
  ) => Promise<void>;
  getSingleRestaurant: (id: string) => Promise<void>;
  getSearchRestaurant: (
    searchText: string,
    searchQuery: string,
    selectedCuisines: any
  ) => Promise<void>;
  appliedCuisinesFilter: (value: string) => void;
  resetAppliedCuisinesFilter: () => void;
  getAllRestaurants: () => Promise<void>;
  getRestaurant: () => Promise<void>;
}

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      restaurant: null,
      restaurantDetail: null,
      restaurants: [],
      loading: false,
      allRestaurants: [],
      filterByCuisines: [],
      createRestaurant: async (input: restaurantInputState, navigate: any) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/create`, input, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data?.success) {
            set({ loading: false, restaurant: response.data?.restaurant });
            navigate("/admin/restaurant");
            toast.success("Restaurant created successfully");
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },
      updateRestaurant: async (input: restaurantInputState, navigate: any) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}/update`, input, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data?.success) {
            set({ loading: false, restaurant: response.data?.restaurant });
            navigate("/admin/restaurant");
            toast.success("Restaurant updated successfully");
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },
      getRestaurant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/admin`);
          if (response.data?.success) {
            set({
              loading: false,
              restaurant: response?.data?.restaurant,
            });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },
      getSingleRestaurant: async (id: string) => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/${id}`);
          if (response.data?.success) {
            set({
              loading: false,
              restaurantDetail: response?.data?.restaurant,
            });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },
      getSearchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisine: any
      ) => {
        if (!searchText) return;

        try {
          set({ loading: true });

          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("cuisines", selectedCuisine);
          const response = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`
          );

          if (response.data?.success) {
            set({
              loading: false,
              restaurants: response.data.restaurants,
            });
          } else {
            set({ loading: false });
            toast.error("No results found");
          }
        } catch (error: any) {
          set({ loading: false, restaurants: [] });
          const errorMessage =
            error?.response?.data?.message || "An unexpected error occurred";
          toast.error(errorMessage);
        } finally {
          set({ loading: false });
        }
      },
      appliedCuisinesFilter: (value: string) => {
        set((state) => {
          const isAlreadyApplied = state.filterByCuisines.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.filterByCuisines.filter((cuisine) => cuisine !== value)
            : [...state.filterByCuisines, value];
          return { filterByCuisines: updatedFilter };
        });
      },
      resetAppliedCuisinesFilter: () => {
        set(() => ({ filterByCuisines: [] }));
      },
      getAllRestaurants: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/all`);

          if (response.data?.success) {
            set({
              loading: false,
              allRestaurants: response.data.restaurants,
            });
          } else {
            set({ loading: false });
            toast.error("No results found");
          }
        } catch (error: any) {
          set({ loading: false });
          const errorMessage =
            error?.response?.data?.message || "An unexpected error occurred";
          toast.error(errorMessage);
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "restaurant-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
