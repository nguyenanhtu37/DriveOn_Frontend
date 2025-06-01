import { axios } from "@/lib/axios";

export const fetchRescueGarages = async (latitude, longitude) => {
  const response = await axios.get("/garage/emergency", {
    params: { latitude, longitude },
  });
  return response.data;
};

export const createRescueRequest = async ({
  sessionId,
  description,
  images,
  location,
  address,
  phone,
}) => {
  const response = await axios.post("/emergency/create", {
    sessionId,
    description,
    images,
    location,
    address,
    phone,
  });
  return response.data;
};

export const requestRescueGarage = async ({ emergencyId }) => {
  const response = await axios.get("/emergency/request-help", {
    emergencyId,
  });
  return response.data;
};

export const cancelRescueRequest = async ({ emergencyId }) => {
  const response = await axios.delete(`/emergency/${emergencyId}`);
  return response.data;
};

export const acceptedRescueRequest = async ({ emergencyId, garageId }) => {
  const response = await axios.post("/emergency/accept", {
    emergencyId,
    garageId,
  });
  return response.data;
};
