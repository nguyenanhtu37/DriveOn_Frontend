import { useState, useEffect } from "react";
import { getFavoriteGarages, addFavoriteGarage, removeFavoriteGarage } from "@/app/services/favourite";

const useFavorites = (userId = null) => { // Optional userId param
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const favoriteList = await getFavoriteGarages(userId); // Pass userId if provided
        setFavorites(favoriteList || []); // Default to empty array if null
        setError(null);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to fetch favorites";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [userId]); // Re-fetch if userId changes

  const addToFavorites = async (garageId) => {
    try {
      await addFavoriteGarage(garageId);
      const updatedFavorites = await getFavoriteGarages(userId); // Refresh list
      setFavorites(updatedFavorites || []);
      setError(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to add favorite";
      setError(errorMessage);
      throw error;
    }
  };

  const removeFromFavorites = async (garageId) => {
    try {
      await removeFavoriteGarage(garageId);
      setFavorites((prev) => prev.filter((fav) => fav._id !== garageId)); // Optimistic update
      setError(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to remove favorite";
      setError(errorMessage);
      throw error;
    }
  };

  return { favorites, addToFavorites, removeFromFavorites, loading, error };
};

export default useFavorites;