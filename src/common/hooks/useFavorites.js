import { useState, useEffect } from "react";
import {
  getFavoriteGarages,
  addFavoriteGarage,
  removeFavoriteGarage,
} from "@/app/services/favourite";

const useFavorites = (userId = null) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return; // ✅ Đừng gọi API nếu chưa có userId (chưa login)

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const favoriteList = await getFavoriteGarages(userId);
        setFavorites(favoriteList || []);
        setError(null);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || "Failed to fetch favorites";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [userId]);

  const addToFavorites = async (garageId) => {
    if (!userId) return; // ✅ Đừng làm gì nếu chưa login

    try {
      await addFavoriteGarage(garageId);
      const updatedFavorites = await getFavoriteGarages(userId);
      setFavorites(updatedFavorites || []);
      setError(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to add favorite";
      setError(errorMessage);
      throw error;
    }
  };

  const removeFromFavorites = async (garageId) => {
    if (!userId) return; // ✅ Đừng làm gì nếu chưa login

    try {
      await removeFavoriteGarage(garageId);
      setFavorites((prev) => prev.filter((fav) => fav._id !== garageId));
      setError(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to remove favorite";
      setError(errorMessage);
      throw error;
    }
  };

  return { favorites, addToFavorites, removeFromFavorites, loading, error };
};

export default useFavorites;
