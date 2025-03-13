import axios from "axios";
import { create } from "zustand";

const BASE_URL: string = "http://192.168.254.4:5000/";

type User = {
  id: string;
  fullName: string;
  email: string;
  profilePic?: string;
};

type authStore = {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingUp: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: object) => Promise<void>;
  login: (data: object) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: string) => Promise<void>;
  onlineUsers: string[];
  success: boolean;
};
export const useAuthStore = create<authStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingUp: true,
  onlineUsers: [],
  success: false,

  checkAuth: async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/auth/checkauth`);
      set({ authUser: response.data });
      if (response.data) {
      }
    } catch (error: any) {
      console.log("Error in checkAuth", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingUp: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      console.log(data);

      const response = await axios.post(`${BASE_URL}api/auth/signup`, data);
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error in signup", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(`${BASE_URL}api/auth/login`, data);
      set({ authUser: response.data });
      set({ success: true });
    } catch (error) {
      console.log("Error in login", error);
      set({ success: false });
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.log("Error in logout", error);
    }
  },

  updateProfile: async (data: string) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axios.put("/auth/update-profile", {
        profilePic: data,
      });
      set({ authUser: res.data });
    } catch (error) {
      console.log("error in update profile:", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
