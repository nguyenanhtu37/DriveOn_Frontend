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
  Phone,
  Map,
  Navigation as NavigationIcon,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import { BorderBeam } from "../magicui/border-beam";
import { getDirectionStore } from "@/app/stores/view/direction";
import { useGetDriving } from "@/app/stores/entity/driving";
import { getLocation } from "@/app/stores/view/user";
import { useTabStore } from "@/app/stores/view/tab";

export const CarPro = ({
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
    <div className="w-full h-full p-4 rounded-xl flex flex-col gap-y-3 justify-between   shadow-sm group relative hover:shadow-lg transition-all ease-in-out duration-200 cursor-pointer">
      <div className="flex flex-col gap-y-3">
        <div className="absolute top-0 left-0  z-30">
          <Badge className="bg-red-500 text-white flex items-center gap-1 px-3 py-1 rounded-sm shadow">
            Garage Pro
          </Badge>
        </div>
        <div className="w-full aspect-[1.2] rounded-xl overflow-hidden relative">
          <div className="absolute top-2 right-2 z-20">
            <Heart
              size={18}
              className={twMerge(
                isFavorited
                  ? "fill-red-500 text-red-500"
                  : "fill-transparent text-white"
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteToggle(e);
              }}
            />
          </div>
          <div
            ref={prevRef}
            className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-2 -translate-y-1/2 z-20 rounded-full p-2 bg-white flex items-center justify-center cursor-pointer transition-all ease-in-out duration-200"
          >
            <ChevronLeft size={14} />
          </div>
          <div
            ref={nextRef}
            className="opacity-0 group-hover:opacity-100 absolute top-1/2 right-2 -translate-y-1/2 z-20 rounded-full p-2 bg-white flex items-center justify-center cursor-pointer transition-all ease-in-out duration-200"
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
          className="mt-2 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 flex items-center gap-2 w-full "
          onClick={handleGetDirection}
        >
          <NavigationIcon className="h-4 w-4" />
          Get Directions
        </Button>
      )}

      <BorderBeam duration={8} size={150} />

      {/* Bullet Custom CSS */}
      <style>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #fde68a; /* yellow-200 */
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #f59e42; /* yellow-400 */
        }
      `}</style>
    </div>
  );
};
