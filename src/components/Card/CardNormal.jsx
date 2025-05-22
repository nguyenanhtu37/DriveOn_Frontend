import { Heart, Map } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { getDirectionStore } from "@/app/stores/view/direction";
import { useGetDriving } from "@/app/stores/entity/driving";
import { getLocation } from "@/app/stores/view/user";
import { useTabStore } from "@/app/stores/view/tab";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetMyFavorites,
  useAddToFavorites,
  useRemoveFromFavorites,
} from "@/app/stores/entity/favoriteV2";
import { toast } from "@/hooks/use-toast";

export const CardNormal = ({ garage }) => {
  const {
    _id,
    name,
    address,
    interiorImages,
    ratingAverage,
    openTime,
    closeTime,
    tag,
    location: garageLocation,
  } = garage;

  // Navigation and directions functionality
  const navigate = useNavigate();
  const userLocation = getLocation();
  const { setDirection } = getDirectionStore();
  const getDriving = useGetDriving();
  const { setGarageView } = useTabStore();

  // Favorites functionality
  const myFavorites = useGetMyFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  const addFavorite = useAddToFavorites();
  const removeFavorite = useRemoveFromFavorites();

  // Check if garage is in favorites
  useEffect(() => {
    const isFavorited = myFavorites.data?.some(
      (favorite) => favorite._id === _id
    );
    setIsFavorite(!!isFavorited);
  }, [myFavorites.data, _id]);

  const handleGetDirection = (e) => {
    e.stopPropagation();

    if (!userLocation || !garageLocation) return;

    const origin = {
      lat: userLocation[0],
      lon: userLocation[1],
    };
    const destination = {
      lat: garageLocation.coordinates[1],
      lon: garageLocation.coordinates[0],
    };

    getDriving.mutate(
      {
        origin,
        destination,
      },
      {
        onSuccess: (data) => {
          const route = data.routes[0].geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]);
          setDirection(route);
          setGarageView("map");
        },
      }
    );
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();

    setIsFavorite((prev) => !prev);

    if (isFavorite) {
      removeFavorite.mutate(_id, {
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
      addFavorite.mutate(_id, {
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
    navigate(`/garageDetail/${_id}`);
  };

  return (
    <Card
      className={twMerge(
        "border-none shadow-none w-full ",
        "hover:shadow-lg transition-all duration-200 cursor-pointer"
      )}
      onClick={handleNavigate}
    >
      <CardContent className="p-0 min-h-[340px] relative flex flex-col ">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 z-10 text-white hover:text-white bg-transparent hover:bg-transparent"
          onClick={handleFavoriteToggle}
        >
          <Heart
            className={cn(
              "h-6 w-6",
              isFavorite
                ? "fill-rose-500 stroke-rose-500"
                : "fill-transparent stroke-white"
            )}
          />
        </Button>

        {tag === "pro" && (
          <Badge className="absolute top-0 left-0 z-10 bg-red-500">
            Garage Pro
          </Badge>
        )}
        <div className="relative">
          <Link href="#">
            <img
              src={interiorImages[0] || "/placeholder.svg"}
              alt={name}
              className="rounded-xl w-full h-[200px] object-cover aspect-square"
            />
          </Link>
        </div>
        <div className="p-2 flex-1 flex flex-col justify-between ">
          <div className="">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{address}</p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-x-2">
              <Badge variant="outline" className="text-xs">
                {openTime} - {closeTime}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {ratingAverage} <span className="text-yellow-500 ml-2">★</span>
              </Badge>
            </div>
            <Button variant="outline" size="icon" onClick={handleGetDirection}>
              <Map size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
