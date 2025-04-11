import { axios } from "@/lib/axios";

const API_URL = "/vehicle";

export const getVehicles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getVehicleById = async (vehicleId) => {
  const response = await axios.get(`${API_URL}/${vehicleId}`);
  return response.data;
};

export const addVehicle = async (vehicleData) => {
  const response = await axios.post(`${API_URL}/add`, vehicleData);
  return response.data;
};

export const updateVehicle = async (vehicleId, updateData) => {
  const response = await axios.put(`${API_URL}/${vehicleId}`, updateData);
  return response.data;
};

export const deleteVehicle = async (vehicleId) => {
  const response = await axios.delete(`${API_URL}/${vehicleId}`);
  return response.data;
};
