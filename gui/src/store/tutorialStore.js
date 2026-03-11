import { create } from "zustand";
import axios from "axios";

const API_URL = "/api/tutorials";

const useTutorialStore = create((set) => ({

  tutorials: [],
  selectedTutorial: null,
  loading: false,
  error: null,


  fetchAllTutorials: async () => {
    try {

      set({ loading: true, error: null });

      const res = await axios.get(`${API_URL}/all`);

      set({
        tutorials: res.data.tutorials,
        loading: false
      });

    } catch (error) {

      set({
        error: error.response?.data?.message || "Failed to fetch tutorials",
        loading: false
      });

    }
  },


  fetchTutorialById: async (id) => {
    try {

      set({ loading: true, error: null });

      const res = await axios.get(`${API_URL}/${id}`);

      set({
        selectedTutorial: res.data.tutorial,
        loading: false
      });

    } catch (error) {

      set({
        error: error.response?.data?.message || "Failed to fetch tutorial",
        loading: false
      });

    }
  },


  createTutorial: async (formData) => {
    try {

      set({ loading: true, error: null });

      const res = await axios.post(
        `${API_URL}/create`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      set((state) => ({
        tutorials: [res.data.tutorial, ...state.tutorials],
        loading: false
      }));

      return true;

    } catch (error) {

      set({
        error: error.response?.data?.message || "Failed to create tutorial",
        loading: false
      });

      return false;
    }
  },


  updateTutorial: async (id, formData) => {
    try {

      set({ loading: true, error: null });

      const res = await axios.put(
        `${API_URL}/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      set((state) => ({
        tutorials: state.tutorials.map((t) =>
          t._id === id ? res.data.tutorial : t
        ),
        loading: false
      }));

      return true;

    } catch (error) {

      set({
        error: error.response?.data?.message || "Failed to update tutorial",
        loading: false
      });

      return false;
    }
  },


  deleteTutorial: async (id) => {
    try {

      set({ loading: true, error: null });

      await axios.delete(`${API_URL}/${id}`);

      set((state) => ({
        tutorials: state.tutorials.filter((t) => t._id !== id),
        loading: false
      }));

      return true;

    } catch (error) {

      set({
        error: error.response?.data?.message || "Failed to delete tutorial",
        loading: false
      });

      return false;
    }
  }

}));

export default useTutorialStore;