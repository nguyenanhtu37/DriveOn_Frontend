import {
  useGetMyFavorites,
  useAddToFavorites,
  useRemoveFromFavorites,
} from "@/app/stores/entity/favoriteV2";
import { CardNormal } from "./CardNormal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export const Card = ({ garage }) => {
  const myFavorites = useGetMyFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  const addFavorite = useAddToFavorites();
  const removeFavorite = useRemoveFromFavorites();
  const navigate = useNavigate();

  const isFavorited = myFavorites.data.some(
    (favorite) => favorite._id === garage._id
  );

  useEffect(() => {
    setIsFavorite(isFavorited);
  }, [isFavorited]);

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);

    if (isFavorite) {
      removeFavorite.mutate(garage._id, {
        onSuccess: () => {
          toast({
            title: "Removed from favorites",
            description: "This garage has been removed from your favorites.",
            variant: "default",
            duration: 1000,
          });
        },
        onError: (error) => {
          console.error("Error removing from favorites:", error);
        },
      });
    } else {
      addFavorite.mutate(garage._id, {
        onSuccess: () => {
          toast({
            title: "Add to favorites",
            description: "This garage has been added to your favorites.",
            variant: "default",
            duration: 1000,
          });
        },
        onError: (error) => {
          console.error("Error adding to favorites:", error);
        },
      });
    }
  };

  const handleNavigate = () => {
    navigate(`/garageDetail/${garage._id}`);
  };

  const commonProps = {
    garage: garage,
    isFavorited: isFavorite,
    handleFavoriteToggle: handleFavoriteToggle,
    handleNavigate: handleNavigate,
  };

  return <CardNormal {...commonProps} />;
};
