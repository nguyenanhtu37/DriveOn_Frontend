import { axios } from "../../libs/axios";

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred during the request." };
  }
};
