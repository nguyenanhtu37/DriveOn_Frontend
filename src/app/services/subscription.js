import { axios } from "@/lib/axios";

export const getSubscription = async () => {
  const response = await axios.get("subscription");
  return response.data;
};
