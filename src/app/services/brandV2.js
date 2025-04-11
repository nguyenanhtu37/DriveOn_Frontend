import { axios } from "@/lib/axios";
const API_URL = "/brand";

export const getBrands = async () => {
  const response = await axios.get(`${API_URL}/get`);
  return response.data;
};
