import { create } from "zustand";
import axios from "axios";

const API_URL = "/api/books";

const useEBookStore = create((set) => ({
  books: [],
  selectedBook: null,
  loading: false,
  error: null,
  count: 0,

  // 🔹 Fetch All Books
  fetchAllBooks: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${API_URL}/all`, {
        withCredentials: true,
      });

      set({
        books: res.data.books || [],
        count: res.data.count || 0,
        loading: false,
      });

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch books",
        loading: false,
      });

      return false;
    }
  },

  // 🔹 Fetch Single Book
  fetchBookById: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${API_URL}/${id}`, {
        withCredentials: true,
      });

      set({
        selectedBook: res.data.book,
        loading: false,
      });

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch book",
        loading: false,
      });

      return false;
    }
  },

  // 🔹 Create Book
  createBook: async (formData) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post(
        `${API_URL}/create`,
        formData,
        { withCredentials: true }
      );

      set((state) => ({
        books: [res.data.book, ...state.books],
        count: state.count + 1,
        loading: false,
      }));

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create book",
        loading: false,
      });

      return false;
    }
  },

  // 🔹 Update Book
  updateBook: async (id, formData) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        formData,
        { withCredentials: true }
      );

      set((state) => ({
        books: state.books.map((book) =>
          book._id === id ? res.data.book : book
        ),
        selectedBook:
          state.selectedBook?._id === id
            ? res.data.book
            : state.selectedBook,
        loading: false,
      }));

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update book",
        loading: false,
      });

      return false;
    }
  },

  // 🔹 Delete Book
  deleteBook: async (id) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`${API_URL}/${id}`, {
        withCredentials: true,
      });

      set((state) => ({
        books: state.books.filter((b) => b._id !== id),
        count: state.count - 1,
        loading: false,
      }));

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete book",
        loading: false,
      });

      return false;
    }
  },
}));

export default useEBookStore;