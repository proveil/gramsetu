import { create } from "zustand";
import axios from "axios";

const API_URL = "/api/gov-schemes";

const useSchemeStore = create((set) => ({
  schemes: [],
  selectedScheme: null,
  loading: false,
  error: null,
  count: 0,

  // 🔹 Fetch All Schemes
  fetchAllSchemes: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${API_URL}/all`, {
        withCredentials: true,
      });

      set({
        schemes: res.data.schemes || [],
        count: res.data.count || 0,
        selectedScheme: null,
        loading: false,
      });

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch schemes",
        loading: false,
      });

      return false;
    }
  },

  // 🔹 Fetch Single Scheme
  fetchSchemeById: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${API_URL}/${id}`, {
        withCredentials: true,
      });

      set({
        selectedScheme: res.data.scheme,
        loading: false,
      });

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch scheme",
        loading: false,
      });

      return false;
    }
  },

  // 🔹 Create Scheme
  createScheme: async (formData) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post(
        `${API_URL}/create`,
        formData,
        { withCredentials: true }
      );

      set((state) => ({
        schemes: [res.data.scheme, ...state.schemes],
        count: state.count + 1,
        loading: false,
      }));

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create scheme",
        loading: false,
      });

      return false;
    }
  },

  // 🔹 Update Scheme
  updateScheme: async (id, formData) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        formData,
        { withCredentials: true }
      );

      set((state) => ({
        schemes: state.schemes.map((scheme) =>
          scheme._id === id ? res.data.scheme : scheme
        ),
        selectedScheme:
          state.selectedScheme?._id === id
            ? res.data.scheme
            : state.selectedScheme,
        loading: false,
      }));

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update scheme",
        loading: false,
      });

      return false;
    }
  },

  // 🔹 Delete Scheme
  deleteScheme: async (id) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`${API_URL}/${id}`, {
        withCredentials: true,
      });

      set((state) => ({
        schemes: state.schemes.filter((scheme) => scheme._id !== id),
        count: state.count - 1,
        selectedScheme:
          state.selectedScheme?._id === id ? null : state.selectedScheme,
        loading: false,
      }));

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete scheme",
        loading: false,
      });

      return false;
    }
  },
}));

export default useSchemeStore;