import { axios } from "@/lib/axios";

export const viewServiceGarage = async (garageId) => {
  const response = await axios.get(`service-detail/garage/${garageId}`);
  return response.data;
};

export const addServiceGarage = async (service) => {
  const response = await axios.post(`service-detail/add`, service);
  return response.data;
};

export const updateServiceGarage = async (id, service) => {
  const response = await axios.put(`service-detail/${id}`, service);
  return response.data;
};

export const deleteServiceGarage = async (id) => {
  const response = await axios.delete(`service-detail/${id}`);
  return response.data;
};

export const getServiceDetailById = async (id) => {
  const response = await axios.get(`service-detail/${id}`);
  return response.data;
};
