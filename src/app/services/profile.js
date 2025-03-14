// src/app/services/profile.js
import { axios } from "@/lib/axios";

export const getProfile = async () => {
  const response = await axios.get("user/view-personal-profile");
  console.log("Profile:",response);
  return response.data;
};

export const updateProfile = async (formData) => {
  try {
    const response = await axios.put("user/update-personal-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to update profile");
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await axios.post("user/change-password", {
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to change password");
  }
};