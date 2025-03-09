import { axios } from "../../lib/axios";

export const signup = async (credentials) => {
  const response = await axios.post("/auth/signup", credentials);
  return response.data;
};