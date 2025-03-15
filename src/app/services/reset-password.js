import { axios } from "../../lib/axios";

export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post("/auth/request-password-reset", { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Không thể gửi email đặt lại mật khẩu.");
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post('/auth/reset-password', {
      token,
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Đặt lại mật khẩu thất bại."
    );
  }
};