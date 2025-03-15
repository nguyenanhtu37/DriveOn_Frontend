import { axios } from "@/lib/axios";

const API_URL = "/vehicle";

export const getMyVehicles = async () => {
  const response = await axios.get("/vehicle");
  return response.data;
}

// Function to add a new vehicle
export const addVehicle = async (vehicleData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, vehicleData);
    if (!response.data) {
      throw new Error("Invalid response from server");
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add vehicle");
  }
};

// Function to get all vehicles of a user
export const getVehicles = async () => {
  try {
    const response = await axios.get(API_URL);
    if (!response.data) {
      throw new Error("Invalid response from server");
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch vehicles");
  }
};

// Function to get a specific vehicle by its ID
export const getVehicleById = async (vehicleId) => {
  try {
    const response = await axios.get(`${API_URL}/${vehicleId}`);
    if (!response.data) {
      throw new Error("Invalid response from server");
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch vehicle");
  }
};

// Function to update vehicle details
export const updateVehicle = async (vehicleId, updateData) => {
  try {
    const response = await axios.put(`${API_URL}/${vehicleId}`, updateData);
    if (!response.data) {
      throw new Error("Invalid response from server");
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update vehicle");
  }
};

// Function to delete a vehicle
export const deleteVehicle = async (vehicleId) => {
  try {
    const response = await axios.delete(`${API_URL}/${vehicleId}`);
    if (!response.data) {
      throw new Error("Invalid response from server");
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete vehicle");
  }
};
