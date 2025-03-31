import { userLogout } from "@/app/stores/view/user";
import axios from "axios";

// Tạo instance Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      userLogout();
      window.location.href = "/login";
      console.error("Error response:", error.response.data);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance as axios };
