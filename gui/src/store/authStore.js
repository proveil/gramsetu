import { create } from "zustand";
import axios from "axios";

const API_URL = "/api/auth";

axios.defaults.withCredentials = true;

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  message: null,

  isLoading: false,
  isCheckingAuth: true,

  // ======================
  // SIGNUP
  // ======================
  signup: async (displayName, email, address, pincode, password) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(`${API_URL}/signup`, {
        displayName,
        email,
        address,
        pincode,
        password,
      });

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: res.data.message,
      });

    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });

      throw error;
    }
  },

  // ======================
  // LOGIN
  // ======================
  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: res.data.message,
      });

    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });

      throw error;
    }
  },

  // ======================
  // LOGOUT
  // ======================
  logout: async () => {
    set({ isLoading: true, error: null });

    try {
      await axios.post(`${API_URL}/logout`);

      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });

    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging out",
        isLoading: false,
      });

      throw error;
    }
  },

  // ======================
  // VERIFY EMAIL
  // ======================
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(`${API_URL}/verify-email`, { code });

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: res.data.message,
      });

      return res.data;

    } catch (error) {
      set({
        error: error.response?.data?.message || "Error verifying email",
        isLoading: false,
      });

      throw error;
    }
  },

  // ======================
  // FORGOT PASSWORD
  // ======================
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const res = await axios.post(`${API_URL}/forgot-password`, { email });

      set({
        message: res.data.message,
        isLoading: false,
      });

      return res.data;

    } catch (error) {
      set({
        error: error.response?.data?.message || "Error sending reset email",
        isLoading: false,
      });

      throw error;
    }
  },

  // ======================
  // RESET PASSWORD
  // ======================
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const res = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });

      set({
        message: res.data.message,
        isLoading: false,
      });

      return res.data;

    } catch (error) {
      set({
        error: error.response?.data?.message || "Error resetting password",
        isLoading: false,
      });

      throw error;
    }
  },

  // ======================
  // CHECK AUTH
  // ======================
  checkAuth: async () => {
    try {
      const res = await axios.get(`${API_URL}/check-auth`);

      set({
        user: res.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });

    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },
}));

export default useAuthStore;