import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

type CartStore = {
  cart: CartItem[];
  addCartItem: (item: CartItem) => void;
  removeCartItem: (id: string) => void;
  clearCartItems: () => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addCartItem: (item: CartItem) => {
        set((state) => {
          const isExistItem = state.cart.some(
            (cartItem: CartItem) => cartItem._id === item._id
          );
          if (isExistItem) {
            toast.error("Item already added in cart");
            return state;
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        });
      },

      removeCartItem: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        }));
      },
      clearCartItems: () => {
        set(() => ({ cart: [] }));
      },
      incrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },
      decrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
