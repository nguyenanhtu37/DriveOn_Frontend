import { axios } from "@/lib/axios";

export const registerGarage = async (garage) => {
  const response = await axios.post("garage/register-garage", garage);
  return response.data;
};

export const getGarages = async () => {
  const response = await axios.get("garage/");
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
