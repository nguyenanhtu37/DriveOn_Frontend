import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  Heart,
  Star,
  Phone,
  Map,
  Navigation as NavigationIcon,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { BorderBeam } from "../magicui/border-beam";
import { useGetDriving } from "@/app/stores/entity/driving";
import { getLocation } from "@/app/stores/view/user";
import { useTabStore } from "@/app/stores/view/tab";
import {
  useGetMyFavorites,
  useAddToFavorites,
  useRemoveFromFavorites,
} from "@/app/stores/entity/favoriteV2";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export const CardPro = ({ garage, setDirection }) => {
  const {
    _id,
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
  const getDriving = useGetDriving();
  const { setGarageView } = useTabStore();
  const navigate = useNavigate();

  // Favorite functionality
  const myFavorites = useGetMyFavorites();
  const addFavorite = useAddToFavorites();
  const removeFavorite = useRemoveFromFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  const isFavorited = myFavorites.data?.some(
    (favorite) => favorite._id === _id
  );

  useEffect(() => {
    setIsFavorite(isFavorited);
  }, [isFavorited]);

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
    <Card
      className={twMerge(
        "border-none shadow-none w-full relative",
        "hover:shadow-lg transition-all duration-200 cursor-pointer"
      )}
      onClick={handleNavigate}
    >
      <CardContent className="p-0 min-h-[340px] relative flex flex-col">
        {garage.tag === "pro" && (
          <Badge className="absolute top-0 left-0 z-30 bg-red-500">
            Garage Pro
          </Badge>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 z-30 text-white hover:text-white bg-transparent hover:bg-transparent"
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

        <div className="relative h-[200px] rounded-xl overflow-hidden">
          <div
            ref={prevRef}
            className="opacity-0 hover:opacity-100 absolute top-1/2 left-2 -translate-y-1/2 z-20 rounded-full p-2 bg-white flex items-center justify-center cursor-pointer transition-all ease-in-out duration-200"
          >
            <ChevronLeft size={14} />
          </div>
          <div
            ref={nextRef}
            className="opacity-0 hover:opacity-100 absolute top-1/2 right-2 -translate-y-1/2 z-20 rounded-full p-2 bg-white flex items-center justify-center cursor-pointer transition-all ease-in-out duration-200"
          >
            <ChevronRight size={14} />
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
          <Badge className="absolute bottom-2 right-2 bg-white z-20 hover:bg-white flex gap-1 items-center justify-center shadow">
            <Star size={18} className="fill-yellow-300" />
            <span className="text-xs text-yellow-500 font-bold">
              {ratingAverage.toFixed(1)}
            </span>
          </Badge>
        </div>

        <div className="p-2 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 flex items-start gap-1">
              <Map size={16} />
              <span>{address}</span>
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <Phone size={16} className="text-white fill-red-500" />
              <span>{phone}</span>
            </p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-x-2">
              <Badge variant="outline" className="text-xs">
                <Circle size={8} className="fill-green-400 text-white mr-1" />
                {openTime} -
                <Circle size={8} className="fill-red-500 text-white mx-1" />
                {closeTime}
              </Badge>
            </div>

            {userLocation && garageLocation && (
              <Button
                variant="outline"
                size="sm"
                className="text-red-700 hover:bg-red-50 hover:text-red-800 flex items-center gap-1"
                onClick={handleGetDirection}
              >
                <NavigationIcon className="h-4 w-4" />
                Directions
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      {garage.tag === "pro" && (
        <BorderBeam
          duration={8}
          size={200}
          colorFrom="#ff0000"
          colorTo="#ff0000"
        />
      )}

      {/* Bullet Custom CSS */}
      <style>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #fde68a;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #f59e42;
        }
      `}</style>
    </Card>
  );
};
