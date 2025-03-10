import { axios } from "../../lib/axios";

export const login = async (credentials) => {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
