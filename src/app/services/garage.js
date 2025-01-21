import { axios } from "@/lib/axios";

export const registerGarage = async (garage) => {
  const response = await axios.post("manager/register-garage", garage);
  return response.data;
};

export const getGarages = async () => {
  const response = await axios.get("manager/garages");
  return response;
};
