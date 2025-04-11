import { axios } from "@/lib/axios";

// Fetch favorite garages, optionally passing a userId if required by the backend
export const getFavoriteGarages = async (userId = null) => {
  try {
    const config = userId ? { params: { userId } } : {}; // Add query param if userId is provided
    const response = await axios.get("/favorite/viewFavorites", config);
    return response.data;
  } catch (error) {
    console.error("Error in getFavoriteGarages:", error.response?.data || error.message);
    throw error; // Re-throw to handle in the calling function
  }
};

// Add a garage to favorites
export const addFavoriteGarage = async (garageId) => {
  try {
    const response = await axios.post(`/favorite/addFavorites/${garageId}`);
    return response.data;
  } catch (error) {
    console.error("Error in addFavoriteGarage:", error.response?.data || error.message);
    throw error;
  }
};

// Remove a garage from favorites
export const removeFavoriteGarage = async (garageId) => {
  try {
    const response = await axios.delete(`/favorite/removeFavorite/${garageId}`);
    return response.data;
  } catch (error) {
    console.error("Error in removeFavoriteGarage:", error.response?.data || error.message);
    throw error;
  }
};