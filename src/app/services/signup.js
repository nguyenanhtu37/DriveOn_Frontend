import { axios } from "/src/lib/axios.js";

export const signup = async (credentials) => {
  try {
    console.log("Sending signup request with data:", credentials);
    const response = await axios.post("/auth/signup", credentials);
    console.log("Signup response:", response.data);
    if (!response.data?.message) {
      throw new Error("Invalid response from server: Expected a message");
    }
    return response.data; // { message: "Verification email sent" }
  } catch (error) {
    console.error("Signup request failed:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    if (error.response?.status === 500) {
      throw new Error("Email đã tồn tại. Vui lòng sử dụng email khác.");
    }
    throw new Error(error.response?.data?.error || "Đăng ký thất bại. Vui lòng thử lại.");
  }
};