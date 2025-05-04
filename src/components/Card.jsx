"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Heart,
  Star,
  Clock,
  CheckCircle,
  MapPin,
  Award,
  Navigation,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import {
  useAddToFavorites,
  useRemoveFromFavorites,
} from "@/app/stores/entity/favoriteV2";
import { toast } from "@/hooks/use-toast";
// import { openGoogleMap } from "@/lib/openGoogleMap";
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
  // location,
  handleGetDirection,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const myLocation = getLocation();
  const addFavorite = useAddToFavorites();
  const removeFavorite = useRemoveFromFavorites();
  const isPro = tag === "pro";
  const navigate = useNavigate();

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

  const handleDirectionClick = (e) => {
    e.stopPropagation();
    handleGetDirection();
  };

  useEffect(() => {
    setIsFavorite(isFavorited);
  }, [isFavorited]);

  // Pro card design
  if (isPro) {
    return (
      <Card
        className="w-full h-full mx-auto overflow-hidden transition-all duration-300 transform hover:shadow-xl rounded-lg border-0 relative"
        onClick={() => navigate(`/garageDetail/${id}`)}
      >
        {/* Premium ribbon */}
        <div className="absolute -right-3 top-4 z-20 rotate-45 transform translate-x-1/2 -translate-y-1/2">
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-1 px-8 shadow-md">
            <span className="text-xs font-bold tracking-wider">PREMIUM</span>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-600/10 to-transparent opacity-50 z-10 pointer-events-none" />

        <CardContent className="p-0">
          <div className="relative">
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
              className={`absolute top-3 right-3 z-20 bg-white/30 backdrop-blur-sm hover:bg-white/50 ${
                isFavorite ? "text-red-500" : "text-white"
              }`}
              onClick={handleFavoriteToggle}
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
              />
              <span className="sr-only">
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </span>
            </Button>

            {/* Pro badge with premium styling */}
            <div className="absolute top-3 left-3 z-20">
              <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white border-none px-3 py-1.5 text-xs font-bold shadow-md flex items-center gap-1">
                <Award className="h-3.5 w-3.5" />
                PRO
              </Badge>
            </div>

            {/* Rating badge on image */}
            <div className="absolute bottom-3 right-3 z-20">
              <Badge className="bg-white text-red-600 border-none px-2 py-1 text-xs font-bold shadow-md flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                {rating && rating.toFixed(1)}
              </Badge>
            </div>
          </div>

          <div className="px-5 py-4 bg-gradient-to-r from-red-50 to-white border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-700 mb-2">
              {garageName}
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-red-500" />
              <p className="text-sm text-gray-700 line-clamp-1">{address}</p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-700 bg-white px-3 py-1.5 rounded-full shadow-sm">
                <Clock className="h-4 w-4 text-red-500" />
                <span className="font-medium">
                  {openTime} - {closeTime}
                </span>
              </div>

              <Badge
                variant="outline"
                className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 flex items-center gap-1.5"
              >
                <CheckCircle className="h-4 w-4 text-red-500" />
                <span className="font-medium">Pro</span>
              </Badge>
            </div>

            {myLocation && (
              <Button
                variant="outline"
                className="w-full mt-2 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 flex items-center gap-2"
                onClick={handleDirectionClick}
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Normal card design
  return (
    <Card
      className="w-full h-full mx-auto overflow-hidden transition-all duration-300 transform hover:shadow-md rounded-lg border-[1px] border-gray-200"
      onClick={() => navigate(`/garageDetail/${id}`)}
    >
      <CardContent className="p-0">
        <div className="relative rounded-t-lg overflow-hidden">
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

        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-base text-gray-800">
              {garageName}
            </h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-gray-700">
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
                className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 text-xs font-normal"
              >
                Open
              </Badge>
            </div>
          </div>

          {myLocation && (
            <Button
              variant="ghost"
              className="p-0 text-xs text-gray-500 hover:text-gray-700 mt-2"
              onClick={handleDirectionClick}
            >
              Get Directions
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
