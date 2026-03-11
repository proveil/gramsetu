import { create } from "zustand";
import axios from "axios";

const API_URL = "/api/emergency";

const useEmergencyStore = create((set) => ({

emergencies: [],
selectedEmergency: null,
loading: false,
error: null,
count: 0,

// 🔹 Fetch All Emergency Services
fetchAllEmergency: async () => {

set({ loading: true, error: null });

try {

  const res = await axios.get(`${API_URL}/all`, {
    withCredentials: true,
  });

  set({
    emergencies: res.data.emergencies || [],
    count: res.data.count || 0,
    selectedEmergency: null,
    loading: false,
  });

  return true;

} catch (error) {

  set({
    error:
      error.response?.data?.message ||
      "Failed to fetch emergency services",
    loading: false,
  });

  return false;

}

},

// 🔹 Fetch Single Emergency Service
fetchEmergencyById: async (id) => {

set({ loading: true, error: null });

try {

  const res = await axios.get(`${API_URL}/${id}`, {
    withCredentials: true,
  });

  set({
    selectedEmergency: res.data.emergency,
    loading: false,
  });

  return true;

} catch (error) {

  set({
    error:
      error.response?.data?.message ||
      "Failed to fetch emergency service",
    loading: false,
  });

  return false;

}

},

// 🔹 Create Emergency Service
createEmergency: async (data) => {

set({ loading: true, error: null });

try {

  const res = await axios.post(
    `${API_URL}/create`,
    data,
    { withCredentials: true }
  );

  set((state) => ({
    emergencies: [res.data.emergency, ...state.emergencies],
    count: state.count + 1,
    loading: false,
  }));

  return true;

} catch (error) {

  set({
    error:
      error.response?.data?.message ||
      "Failed to create emergency service",
    loading: false,
  });

  return false;

}

},

// 🔹 Update Emergency Service
updateEmergency: async (id, data) => {

set({ loading: true, error: null });

try {

  const res = await axios.put(
    `${API_URL}/${id}`,
    data,
    { withCredentials: true }
  );

  set((state) => ({
    emergencies: state.emergencies.map((service) =>
      service._id === id ? res.data.emergency : service
    ),
    selectedEmergency:
      state.selectedEmergency?._id === id
        ? res.data.emergency
        : state.selectedEmergency,
    loading: false,
  }));

  return true;

} catch (error) {

  set({
    error:
      error.response?.data?.message ||
      "Failed to update emergency service",
    loading: false,
  });

  return false;

}

},

// 🔹 Delete Emergency Service
deleteEmergency: async (id) => {

set({ loading: true, error: null });

try {

  await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });

  set((state) => ({
    emergencies: state.emergencies.filter((e) => e._id !== id),
    selectedEmergency:
      state.selectedEmergency?._id === id
        ? null
        : state.selectedEmergency,
    count: state.count - 1,
    loading: false,
  }));

  return true;

} catch (error) {

  set({
    error:
      error.response?.data?.message ||
      "Failed to delete emergency service",
    loading: false,
  });

  return false;

}

},

}));

export default useEmergencyStore;