import { axios } from "@/lib/axios";

export const getMyVehicles = async () => {
  const response = await axios.get("/vehicle");
  return response.data;
};
