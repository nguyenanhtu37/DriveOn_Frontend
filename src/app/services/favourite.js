import { axios } from "@/lib/axios";

export const getFavoriteGarages = async () => {
  const response = await axios.get("/favorite/viewFavorites");
  return response.data;
};

export const addFavoriteGarage = async (garageId) => {
  const response = await axios.post(`/favorite/addFavorites/${garageId}`);
  return response.data;
};

export const removeFavoriteGarage = async (garageId) => {
  const response = await axios.delete(`/favorite/removeFavorite/${garageId}`);
  return response.data;
};