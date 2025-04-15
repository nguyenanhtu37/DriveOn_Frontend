import { useState, useEffect } from "react";
import { getFavoriteGarages, addFavoriteGarage, removeFavoriteGarage } from "@/app/services/favourite";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const favoriteList = await getFavoriteGarages();
        setFavorites(favoriteList);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const addToFavorites = async (garageId) => {
    try {
      await addFavoriteGarage(garageId);
      const updatedFavorites = await getFavoriteGarages();
      setFavorites(updatedFavorites);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const removeFromFavorites = async (garageId) => {
    try {
      await removeFavoriteGarage(garageId); // Your API call to remove from favorites
      setFavorites((prev) => prev.filter((fav) => fav._id !== garageId)); // Update local state to reflect removal
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return { favorites, addToFavorites, removeFromFavorites, loading, error };
};

export default useFavorites;