import { axios } from "@/lib/axios";

export const registerGarage = async (garage) => {
  const response = await axios.post("garage/register-garage", garage);
  return response.data;
};

export const viewRegisterGarage = async () => {
  const response = await axios.get("garage/garage-registrations");
  return response.data;
};

export const viewRegisterGarageDetail = async (id) => {
  const response = await axios.get(`garage/garage-registrations/${id}`);
  return response.data;
};

export const getGarages = async () => {
  const response = await axios.get("garage/garages");
  return response;
};

export const approveGarage = async (id) => {
  const response = await axios.post(
    `garage/garage-registrations/${id}/approve`
  );
  return response.data;
};
export const rejectGarage = async (id) => {
  const response = await axios.post(`garage/garage-registrations/${id}/reject`);
  return response.data;
};
