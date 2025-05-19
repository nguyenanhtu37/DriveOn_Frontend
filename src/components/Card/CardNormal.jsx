"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  Heart,
  Star,
  NavigationIcon,
  Map,
  Phone,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import { getDirectionStore } from "@/app/stores/view/direction";
import { useGetDriving } from "@/app/stores/entity/driving";
import { getLocation } from "@/app/stores/view/user";
import { useTabStore } from "@/app/stores/view/tab";

export const CardNormal = ({
  garage,
  isFavorited,
  handleFavoriteToggle,
  handleNavigate,
}) => {
  const {
    name,
    address,
    interiorImages,
    ratingAverage,
    openTime,
    closeTime,
    phone,
    location: garageLocation,
  } = garage;
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const userLocation = getLocation();
  const { setDirection } = getDirectionStore();
  const getDriving = useGetDriving();
  const { setGarageView } = useTabStore();

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

  return (
    <div className="relative w-full p-3 rounded-lg flex flex-col gap-y-3 justify-between bg-white group border border-gray-200 shadow-sm hover:shadow-md transition-all ease-in-out duration-200 cursor-pointer">
      <div className=" flex flex-col gap-y-3">
        <div className="w-full aspect-[1.2] rounded-lg overflow-hidden relative">
          <div className="absolute top-2 right-2 z-20">
            <button
              className="bg-white/70 p-1 rounded-full"
              onClick={handleFavoriteToggle}
            >
              <Heart
                size={18}
                className={twMerge(
                  isFavorited
                    ? "fill-red-500 text-red-500"
                    : "fill-transparent text-white"
                )}
              />
            </button>
          </div>
          <div
            ref={prevRef}
            className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-2 -translate-y-1/2 z-20 rounded-full p-1.5 bg-white/80 flex items-center justify-center cursor-pointer transition-all ease-in-out duration-200 bg-white"
          >
            <ChevronLeft size={12} />
          </div>

          <div
            ref={nextRef}
            className="opacity-0 group-hover:opacity-100 absolute top-1/2 right-2 -translate-y-1/2 z-20 rounded-full p-1.5 bg-white/80 flex items-center justify-center cursor-pointer transition-all ease-in-out duration-200 bg-white"
          >
            <ChevronRight size={12} />
          </div>

          <Swiper
            className="w-full h-full"
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} custom-bullet mx-[2px]"></span>`;
              },
            }}
            modules={[Navigation, Pagination]}
          >
            {interiorImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img || "/placeholder.svg"}
                  className="w-full h-full object-cover"
                  alt="Garage image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Badge className="absolute bottom-2 right-2 bg-white/80 z-20 hover:bg-white flex gap-1 items-center justify-center px-1.5 py-0.5">
            <Star size={14} className="fill-yellow-300 text-yellow-300" />
            <span className="text-xs text-gray-700">
              {ratingAverage.toFixed(1)}
            </span>
          </Badge>
        </div>

        <div className="flex flex-col gap-y-2" onClick={handleNavigate}>
          <div className="text-black text-lg font-bold flex items-center gap-2">
            {name}
          </div>
          <div className="text-body text-sm font-normal flex items-start gap-1">
            <Map size={16} />
            <span>{address}</span>
          </div>
          <div className="text-body text-sm font-normal flex items-center gap-1">
            <Phone
              size={16}
              className="text-white font-semibold fill-red-500"
            />
            <span>{phone}</span>
          </div>
          <div className="flex justify-start items-center gap-2">
            <div className="flex items-center gap-1">
              <Circle size={10} className="fill-green-400 text-white" />
              <div className="text-body text-sm font-semibold">{openTime}</div>
            </div>
            <div className="w-1 h-[2px] bg-black"></div>
            <div className="flex items-center gap-1">
              <Circle size={10} className="fill-red-500 text-white" />
              <div className="text-body text-sm font-semibold">{closeTime}</div>
            </div>
          </div>
        </div>
      </div>

      {userLocation && garageLocation && (
        <Button
          variant="outline"
          size="sm"
          className="mt-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-50 flex items-center gap-1 border-gray-200"
          onClick={handleGetDirection}
        >
          <NavigationIcon size={12} />
          Get Directions
        </Button>
      )}

      {/* Bullet Custom CSS */}
      <style>{`
        .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #cbd5e1; /* gray-300 */
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #94a3b8; /* gray-400 */
        }
      `}</style>
    </div>
  );
};
