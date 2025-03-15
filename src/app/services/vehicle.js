import { axios } from "@/lib/axios";

const API_URL = "/vehicle";

export const getMyVehicles = async () => {
  const response = await axios.get("/vehicle");
  return response.data;
}


export const addVehicle = async (vehicleData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, vehicleData);
    if (!response.data) {
      throw new Error("Invalid response from server");
    }
    return response.data;
  } catch (error) {
    console.error('Add vehicle error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to add vehicle");
  }
};

export const getVehicles = async () => {
  try {
    const response = await axios.get(API_URL);
    if (!response.data) {
      throw new Error("Invalid response from server");
    }
    console.log('Fetched vehicles from API:', response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error('Get vehicles error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch vehicles");
  }
};

export const getVehicleById = async (vehicleId) => {
  try {
    if (!vehicleId) throw new Error("Vehicle ID is required");
    const response = await axios.get(`${API_URL}/${vehicleId}`);
    if (!response.data) {
      throw new Error("Invalid response from server");
    }
    return response.data;
  } catch (error) {
    console.error('Get vehicle by ID error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch vehicle");
  }
};

export const updateVehicle = async (vehicleId, updateData) => {
  try {
    if (!vehicleId) throw new Error("Vehicle ID is required");
    const response = await axios.put(`${API_URL}/${vehicleId}`, updateData);
    if (!response.data) {
      throw new Error("Invalid response from server");
    }
    return response.data;
  } catch (error) {
    console.error('Update vehicle error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update vehicle");
  }
};

export const deleteVehicle = async (vehicleId) => {
  try {
    if (!vehicleId) throw new Error("Vehicle ID is required");
    const response = await axios.delete(`${API_URL}/${vehicleId}`);
    if (!response.data) {
      throw new Error("Invalid response from server");
    }
    console.log("Vehicle deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error('Delete vehicle error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete vehicle");
  }
};