import { axios } from "@/lib/axios";

const API_URL = "/vehicle";

export const getVehicles = async () => {
  const response = await axios.get(API_URL);
  const vehicles = response.data;
  console.log("vehicleService - getVehicles response:", vehicles); // Debug
  return vehicles.map((vehicle) => ({
    ...vehicle,
    _id: vehicle._id?.toString() || vehicle._id,
    carBrand: vehicle.carBrand?.toString() || vehicle.carBrand,
  }));
};

export const getVehicleById = async (vehicleId) => {
  const response = await axios.get(`${API_URL}/${vehicleId}`);
  const vehicle = response.data;
  console.log("vehicleService - getVehicleById response:", vehicle); // Debug
  return {
    ...vehicle,
    _id: vehicle._id?.toString() || vehicle._id,
    carBrand: vehicle.carBrand?.toString() || vehicle.carBrand,
  };
};

export const addVehicle = async (vehicleData) => {
  const response = await axios.post(`${API_URL}/add`, vehicleData);
  return response.data;
};

export const updateVehicle = async ({ vehicleId, updateData }) => {
  console.log("vehicleService - updateVehicle:", { vehicleId, updateData }); // Debug
  const response = await axios.put(`${API_URL}/${vehicleId}`, updateData);
  return response.data;
};

export const deleteVehicle = async (vehicleId) => {
  const response = await axios.delete(`${API_URL}/${vehicleId}`);
  return response.data;
};