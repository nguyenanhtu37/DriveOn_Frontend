import { axios } from "@/lib/axios";

export const registerGarage = async (garage) => {
  const response = await axios.post("manager/register-garage", garage);
  return response.data;
};

export const getGarages = async () => {
  const response = await axios.get("manager/garages");
  return response;
};

export const approveGarage = async (id) => {
  const response = await axios.post(`admin/garage-registrations/${id}/approve`);
  return response.data;
};
export const rejectGarage = async (id) => {
  const response = await axios.post(`admin/garage-registrations/${id}/reject`);
  return response.data;
};
