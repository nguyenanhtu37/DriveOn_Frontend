"use client";

import React from "react";
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
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

export function GarageCard({
  id,
  garageName,
  rating,
  address,
  openTime,
  closeTime,
  imgs,
  isFavourited,
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Card
      className="w-full h-full  mx-auto overflow-hidden transition-all duration-300 transform hover:shadow-lg border-none shadow-none rounded-xl "
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
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 z-10 transition-colors duration-300 ${
              isFavourited
                ? "text-red-500 hover:text-red-600"
                : "text-white hover:text-red-300"
            }`}
          >
            <Heart
              className={`h-6 w-6 ${isFavourited ? "fill-current" : ""}`}
            />
            <span className="sr-only">
              {isFavourited ? "Remove from favorites" : "Add to favorites"}
            </span>
          </Button>
        </div>
        <div className="pt-4 px-2 pb-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-primary">{garageName}</h3>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {/* <span>{rating.toFixed(1)}</span> */}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{address}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Clock className="h-4 w-4" />
            <span>
              {openTime} - {closeTime}
            </span>
          </div>
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
