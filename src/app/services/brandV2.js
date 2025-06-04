import { axios } from "@/lib/axios";
const API_URL = "/brand/get";

export const getBrands = async ({ page = 1, limit = 12 }) => {
  const response = await axios.get(API_URL, {
    params: {
      page,
      limit
    }
  });
  return response.data;
};
