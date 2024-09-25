import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import {
  LoginInputState,
  SignupInputState,
  UserInputState,
} from "@/schema/authScheama";
import { useAuthModel } from "./useAuthModel";

const API_ENDPOINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

type UseUserState = {
  user: null;
  loading: boolean;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  forgetPassword: (email: string) => Promise<void>;
  resetPassword: (resetToken: string, newPassword: string) => Promise<void>;
  updateUser: (input: UserInputState) => Promise<void>;
};

export const useUserStore: any = create<UseUserState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      isAuthenticated: false,
      isCheckingAuth: true,
      signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.data.success) {
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
            useAuthModel.getState().setTab("verifyemail");
            toast.success(response.data.message);
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },
      login: async (input: LoginInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.data.success) {
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
            useAuthModel.getState().setOpen(false);
            toast.success(response.data.message);
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },
      verifyEmail: async (verificationCode: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/verify-email`,
            { verificationCode },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
            useAuthModel.getState().setTab("login");
            toast.success(response.data.message);
          }
        } catch (error: any) {
          set({ loading: false });
          console.error(error);
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },
      checkAuth: async () => {
        try {
          const response = await axios.get(`${API_ENDPOINT}/check-auth`);
          if (response.data.success) {
            set({
              isCheckingAuth: false,
              user: response.data.user,
              isAuthenticated: true,
              loading: false,
            });
          }
        } catch (error: any) {
          set({ loading: false });
          console.error(error);
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },
      logout: async () => {
        try {
          const response = await axios.get(`${API_ENDPOINT}/logout`);
          if (response.data.success) {
            toast.success(response.data.message);
            set({ isAuthenticated: false, user: null });
          }
        } catch (error: any) {
          set({ loading: false });
          console.error(error);
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },
      forgetPassword: async (email: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/forget-password`,
            { email },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            set({ loading: false });
            useAuthModel.getState().setTab("login");
            toast.success(response.data.message);
          }
        } catch (error: any) {
          set({ loading: false });
          console.error(error);
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },
      resetPassword: async (resetToken: string, newPassword: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/reset-password/${resetToken}`,
            { newPassword },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          set({ loading: false });
          console.error(error);
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },
      updateUser: async (input: UserInputState) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_ENDPOINT}/profile/update`,
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
              user: response.data.user,
              isAuthenticated: true,
            });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
