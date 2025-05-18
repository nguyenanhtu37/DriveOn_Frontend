import { useGetService } from "@/app/stores/entity/service-detail";
import { useParams } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSetDialogId } from "@/app/stores/view/dialog";
const Service = () => {
  const { garageId } = useParams();
  const isMobile = useIsMobile();
  const perView = isMobile ? 1.5 : 4;
  const serviceGarage = useGetService(garageId);
  const setDialogId = useSetDialogId();

  const handleClick = (service) => {
    setDialogId({ id: "ServiceDetail", data: service });
  };
  if (serviceGarage.isLoading) return;
  return (
    <Swiper
      slidesPerView={perView}
      spaceBetween={15}
      className="mySwiper w-full"
      modules={[Autoplay]}
      autoplay={{
        delay: 1500,
      }}
    >
      {serviceGarage.data.map((service) => (
        <SwiperSlide key={service._id} onClick={() => handleClick(service)}>
          <div className=" flex flex-col rounded-xl overflow-hidden gap-y-2">
            <img
              src={service.images[0]}
              alt=""
              className=" w-full h-[200px] object-cover rounded-b-xl"
            />
            <div className="cursor-pointer group">
              <div className=" text-sm font-semibold text-[#222222] group-hover:opacity-70 transition-opacity ease-in-out duration-100">
                {service.name}
              </div>
              <div className=" text-sm text-[#6a6a6a] line-clamp-2">
                {service.description}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Service;
