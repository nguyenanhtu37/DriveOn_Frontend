import { axios } from "@/lib/axios";

const getMyFavorites = async () => {
  const response = await axios.get("/favorite/viewFavorites");
  return response.data;
};

const addToFavorites = async (garageId) => {
  const response = await axios.post(`/favorite/addFavorites/${garageId}`);
  return response.data;
};

const removeFromFavorites = async (garageId) => {
  const response = await axios.delete(`/favorite/removeFavorite/${garageId}`);
  return response.data;
};

export { getMyFavorites, addToFavorites, removeFromFavorites };
