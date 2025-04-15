"use client";

import  { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Heart, Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider, // Import TooltipProvider
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import useFavorites from "@/common/hooks/useFavorites";

export function GarageCard({
  id,
  garageName,
  rating,
  address,
  openTime,
  closeTime,
  imgs,
  isFavourited, // Initial state passed as a prop
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [favoriteStatus, setFavoriteStatus] = useState(isFavourited); // Local state for favorite button
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites } = useFavorites();

  const handleFavoriteToggle = async (e) => {
    e.stopPropagation(); // Prevent card click from triggering navigation
    try {
      if (favoriteStatus) {
        await removeFromFavorites(id); // Remove from favorites
      } else {
        await addToFavorites(id); // Add to favorites
      }
      setFavoriteStatus(!favoriteStatus); // Toggle local favorite state
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <Card
      className="w-full h-full mx-auto overflow-hidden transition-all duration-300 transform hover:shadow-lg border-none shadow-none rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/garageDetail/${id}`)}
    >
      <CardContent className="p-0">
        <div className="relative rounded-b-xl overflow-hidden">
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
            className={`absolute top-2 right-2 z-10 transition-colors duration-300 ${
              favoriteStatus
                ? "text-red-500 hover:text-red-600"
                : "text-white hover:text-red-300"
            }`}
            onClick={handleFavoriteToggle}
          >
            <Heart
              className={`h-6 w-6 ${favoriteStatus ? "fill-current" : ""}`}
            />
            <span className="sr-only">
              {favoriteStatus ? "Remove from favorites" : "Add to favorites"}
            </span>
          </Button>
        </div>
        <div className="pt-4 px-2 pb-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-primary">{garageName}</h3>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {/* Optionally show rating */}
              <span>{rating ? rating.toFixed(1) : "N/A"}</span>
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{address}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Clock className="h-4 w-4" />
            <span>
              {openTime} - {closeTime}
            </span>
          </div>

          {/* Wrap Tooltip with TooltipProvider */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className={`transition-colors duration-300 ${
                    isHovered ? "bg-green-100 text-green-800" : ""
                  }`}
                >
                  Status: Open
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>This garage is currently open for business</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
