import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import { useCartStore } from "./useCartStore";
import { useRestaurantStore } from "./useRestaurantStore";

const API_END_POINT = "http://localhost:8000/api/v1/order";
axios.defaults.withCredentials = true;

type orderState = {
  loading: boolean;
  continuePayment: (checkoutSessionRequest: any) => Promise<void>;
};

export const useOrderStore = create<orderState>()(
  persist(
    (set) => ({
      loading: false,
      continuePayment: async (checkoutSessionRequest: any) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/checkout/create-checkout-session`,
            checkoutSessionRequest
          );
          if (response.data?.success) {
            toast.success(response.data.message);
            set({ loading: false });
            useCartStore.getState().clearCartItems();
            useRestaurantStore.setState((state) => ({
              ...state,
              restaurant: response.data.restaurant,
            }));
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.message || "Payment failed");
        }
      },
    }),
    {
      name: "order",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
