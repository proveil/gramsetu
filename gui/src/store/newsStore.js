import { create } from "zustand";
import axios from "axios";

const API_URL = "/api/news";

const useNewsStore = create((set, get) => ({
  news: [],
  selectedNews: null,
  loading: false,
  error: null,
  count: null,

  // 🔹 Fetch All News
  fetchAllNews: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${API_URL}/all`, {
        withCredentials: true,
      });

      set({
        news: res.data.news || [],
        loading: false,
        count: res.data.count
      });

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch news",
        loading: false,
      });
      return false;
    }
  },

  // 🔹 Fetch Single News
  fetchNewsById: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${API_URL}/${id}`, {
        withCredentials: true,
      });

      set({
        selectedNews: res.data.news,
        loading: false,
      });

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch news",
        loading: false,
      });
      return false;
    }
  },

  // 🔹 Create News
  createNews: async (formData) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post(
        `${API_URL}/create`,
        formData,
        {
          withCredentials: true,
          // ❌ Don't manually set Content-Type for FormData
        }
      );

      set((state) => ({
        news: [res.data.news, ...state.news],
        loading: false,
      }));

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create news",
        loading: false,
      });
      return false;
    }
  },

  // 🔹 Delete News
  deleteNews: async (id) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`${API_URL}/${id}`, {
        withCredentials: true,
      });

      set((state) => ({
        news: state.news.filter((item) => item._id !== id),
        loading: false,
      }));

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete news",
        loading: false,
      });
      return false;
    }
  },
  // 🔹 Update News
updateNews: async (id, formData) => {
  set({ loading: true, error: null });

  try {
    const res = await axios.put(`${API_URL}/${id}`, formData, {
      withCredentials: true,
    });

    set((state) => ({
      news: state.news.map((item) =>
        item._id === id ? res.data.news : item
      ),
      loading: false,
    }));

    return true;
  } catch (error) {
    set({
      error: error.response?.data?.message || "Failed to update news",
      loading: false,
    });
    return false;
  }
},
}));

export default useNewsStore;