import { axios } from "/src/lib/axios.js";
export const signup = async (credentials) => {
  try {
    console.log("Sending signup request with data:", { ...credentials, password: "[REDACTED]" });
    const response = await axios.post("/auth/signup", credentials);
    console.log("Signup response:", response.data);

    if (!response.data?.message) {
      throw new Error("Invalid server response. Please try again later.");
    }

    return response.data; // { message: "Verification email sent" }
  } catch (error) {
    console.error("Signup request failed:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    const messageFromBackend = error.response?.data?.error || error.message;

    // 🔥 Kiểm tra nội dung chuỗi thay vì status
    if (messageFromBackend.includes("Email already exists")) {
      throw new Error("Email already exists");
    }

    // Xử lý lỗi nhập liệu nếu có
    const fieldErrors = error.response?.data?.errors;
    if (fieldErrors) {
      const firstError = Object.values(fieldErrors)[0];
      throw new Error(firstError);
    }

    throw new Error(messageFromBackend || "Signup failed. Please try again.");
  }
};