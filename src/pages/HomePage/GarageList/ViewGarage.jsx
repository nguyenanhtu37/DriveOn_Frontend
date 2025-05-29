import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { CardNormal } from "@/components/Card/CardNormal";

const ViewGarage = ({ title, garages }) => {
  const isMobile = useIsMobile();
  const perView = isMobile ? 1 : "auto";

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-gray-300"
            ref={prevRef}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-gray-300"
            ref={nextRef}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Swiper
        slidesPerView={perView}
        spaceBetween={15}
        className="mySwiper w-full"
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        modules={[Navigation]}
      >
        {garages?.map((garage) => (
          <SwiperSlide
            key={garage._id}
            className="my-2"
            style={{
              width: isMobile ? "100%" : "280px",
            }}
          >
            <CardNormal key={garage._id} garage={garage} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ViewGarage;
