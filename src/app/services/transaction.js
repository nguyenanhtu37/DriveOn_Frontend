import { axios } from "@/lib/axios";

export const getTransactionForGarage = async (garageId) => {
  const response = await axios.get("transaction/garage/" + garageId);
  return response.data;
};
