import { axios } from "@/lib/axios";

export const fetchRescueGarages = async (latitude, longitude) => {
  try {
    if (!latitude || !longitude) {
      throw new Error("Location coordinates are required");
    }

    if (isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) {
      throw new Error("Invalid location coordinates");
    }

    const response = await axios.get('/garage/emergency', {
      params: { latitude, longitude },
    });

    if (!response.data) {
      throw new Error("No data received from server");
    }

    if (!response.data.garages) {
      throw new Error("Invalid response format from server");
    }

    return response.data.garages;
  } catch (error) {
    console.error("Error fetching rescue garages:", error);
    if (error.response) {
      // Server responded with error
      const errorMessage = error.response.data?.message || 'Failed to fetch emergency garages';
      console.error('Emergency API Error:', errorMessage);
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request made but no response
      console.error('Emergency API Error: No response from server');
      throw new Error('No response from server. Please check your internet connection.');
    } else {
      // Other errors
      console.error('Emergency API Error:', error.message);
      throw new Error(error.message || 'An unexpected error occurred while fetching emergency garages');
    }
  }
};