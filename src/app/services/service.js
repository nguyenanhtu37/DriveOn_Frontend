import { axios } from "@/lib/axios";

export const getService = async () => {
  const response = await axios.get("service");
  return response.data;
};

export const addService = async (service) => {
  const response = await axios.post("service/add", service);
  return response.data;
};

export const updateService = async (id, service) => {
  const response = await axios.put(`service/${id}s`, service);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await axios.delete(`service/delete/${id}`);
  return response.data;
};
