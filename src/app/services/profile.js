import { axios } from "@/lib/axios";

// Get profile with token authentication
export const getProfile = async () => {
  try {
    // Retrieve the token from localStorage (or wherever you store it)
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token is missing");
    }

    const response = await axios.get("user/view-personal-profile", {
      headers: {
        "Authorization": `Bearer ${token}`, // Add token to Authorization header
      },
    });

    console.log("Profile:", response);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch profile");
  }
};

// Update profile with formData and token authentication
export const updateProfile = async (formData) => {
  try {
    // Retrieve the token from localStorage (or wherever you store it)
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token is missing");
    }

    const response = await axios.put("/user/update-personal-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`, // Add token to Authorization header
      },
    });

    return response.data; // Return the success response from the backend
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to update profile"); // Handle error from backend
  }
};

// Change password with token authentication
export const changePassword = async (oldPassword, newPassword) => {
  try {
    // Retrieve the token from localStorage (or wherever you store it)
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token is missing");
    }

    const response = await axios.post("user/change-password", {
      oldPassword,
      newPassword,
    }, {
      headers: {
        "Authorization": `Bearer ${token}`, // Add token to Authorization header
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to change password");
  }
};
