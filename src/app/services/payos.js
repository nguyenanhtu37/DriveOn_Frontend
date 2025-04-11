import { axios } from "@/lib/axios";

export const createPayment = async (data) => {
  const response = await axios.post("payos/create-payment-link", data);
  return response.data;
};
