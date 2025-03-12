import { axios } from "../../lib/axios";

export const login = async (credentials) => {
  try {
    const response = await axios.post("/auth/login", credentials);
    if (!response.data.token) {
      throw new Error("Invalid response from server: No token received");
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Đăng nhập thất bại. Vui lòng kiểm tra thông tin.");
  }
};

export const logout = async (token) => {
  if (!token) {
    return; // Không có token để logout
  }
  try {
    await axios.post("/auth/logout", { token });
    localStorage.removeItem("token");
  } catch (error) {
    throw new Error(error.response?.data?.error || "Đăng xuất thất bại.");
  }
};