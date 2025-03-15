import { axios } from "@/lib/axios";

export const createAppointment = async (data) => {
  const response = axios.post("/appointment/create", data);
  return response.data;
};
