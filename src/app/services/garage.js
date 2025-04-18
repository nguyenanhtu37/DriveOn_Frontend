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

export const getGarages = async (params) => {
  const response = await axios.get("garage/viewGarage", {
    params,
  });
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

export const viewGarageExits = async () => {
  const response = await axios.get("garage/existing");
  return response.data;
};

export const enableGarage = async (id) => {
  const response = await axios.put(`garage/${id}/enable`);
  return response.data;
};
export const disableGarage = async (id) => {
  const response = await axios.put(`garage/${id}/disable`);
  return response.data;
};

export const getGarageDetail = async (id) => {
  const response = await axios.get(`garage/garages/${id}`);
  return response.data;
};

export const getMyGarage = async () => {
  const response = await axios.get("garage/garages");
  return response.data;
};
