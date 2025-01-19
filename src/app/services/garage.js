import { axios } from "@/lib/axios";

export const registerGarage = async (garage) => {
  const response = await axios.post("manager/register-garage", garage);
  return response.data;
};

export const getGarage = async () => {
  const response = await axios.get("manager/garage");
  return response;
};
