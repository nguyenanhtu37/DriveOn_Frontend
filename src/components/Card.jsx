import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Heart, Star, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import {
  useAddToFavorites,
  useRemoveFromFavorites,
} from "@/app/stores/entity/favoriteV2";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { openGoogleMap } from "@/lib/openGoogleMap";
import { getLocation } from "@/app/stores/view/user";

export function GarageCard({
  id,
  garageName,
  rating,
  address,
  openTime,
  closeTime,
  imgs,
  isFavorited,
  tag,
  location,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const myLocation = getLocation();

  const addFavorite = useAddToFavorites();
  const removeFavorite = useRemoveFromFavorites();
  const isPro = tag === "pro";

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
    if (isFavorite) {
      removeFavorite.mutate(id, {
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
      addFavorite.mutate(id, {
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
  const navigate = useNavigate();

  const handleDirectionClick = (e) => {
    e.stopPropagation();
    openGoogleMap(location);
  };

  useEffect(() => {
    setIsFavorite(isFavorited);
  }, [isFavorited]);

  return (
    <Card
      className={cn(
        "w-full h-full mx-auto overflow-hidden transition-all duration-300 transform hover:shadow-md rounded-lg",
        isPro ? "border-[1px] border-red-300" : "border-[1px] border-gray-200"
      )}
      onClick={() => navigate(`/garageDetail/${id}`)}
    >
      <CardContent className="p-0">
        <div className="relative rounded-t-lg overflow-hidden">
          {isPro && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-red-500 text-white border-none px-2 py-1 text-xs font-medium">
                PRO
              </Badge>
            </div>
          )}

          <Swiper className="aspect-[1.1] md:aspect-[1.5]">
            {imgs?.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img || "/placeholder.svg"}
                  className="w-full h-full object-cover"
                  alt="Garage image"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 z-10 bg-white/30 backdrop-blur-sm hover:text-red-50 ${
              isFavorite ? "text-red-500" : "text-white"
            }`}
            onClick={handleFavoriteToggle}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            <span className="sr-only">
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </span>
          </Button>
        </div>

        <div className={cn("px-4 py-3", isPro && "border-l-2 border-red-500")}>
          <div className="flex justify-between items-center mb-2">
            <h3
              className={cn(
                "font-medium",
                isPro ? "text-lg text-red-700" : "text-base text-gray-800"
              )}
            >
              {garageName}
            </h3>
            <div className="flex items-center gap-1 text-sm">
              <Star
                className={cn(
                  "h-4 w-4",
                  isPro ? "text-red-500" : "text-yellow-500"
                )}
              />
              <span
                className={isPro ? "font-medium text-red-700" : "text-gray-700"}
              >
                {rating && rating.toFixed(1)}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-2 line-clamp-1">{address}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>
                {openTime} - {closeTime}
              </span>
            </div>

            <div>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs font-normal",
                  isPro
                    ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                    : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                )}
              >
                {isPro ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </span>
                ) : (
                  "Open"
                )}
              </Badge>
            </div>
          </div>
          {myLocation && (
            <Button
              variant="ghost"
              className="p-0 text-xs text-gray-500 hover:text-red-500"
              onClick={handleDirectionClick}
            >
              See instructions
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
