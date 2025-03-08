import { axios } from "@/lib/axios";

// Get profile of currently logged-in user
export const getProfile = async () => {
  const response = await axios.get("user/view-personal-profile");
  return response.data;
};

// Update profile of currently logged-in user
export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put('user/update-personal-profile', profileData);
    return response.data; // Backend returns { message: "Personal profile updated successfully" }
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update profile');
  }
};