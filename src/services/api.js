
import axios from "axios";

// change baseURL to your backend server address 

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});



export default api;