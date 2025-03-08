import { axios } from "../../lib/axios";

export const login = async (credentials) => {
  try {
    const response = await axios.post("/auth/login", credentials);
    if (!response.data.token) {
      throw new Error("Invalid response from server");
    }
    return response.data;
  } catch (error) {
    // Preserve error message from backend if available
    throw error.response?.data?.message 
      ? new Error(error.response.data.message) 
      : error;
  }
};
export const logout = () => {
  localStorage.removeItem("token");
};
