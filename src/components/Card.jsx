import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Heart, Star } from "lucide-react";
import CarouselButton from "./CarouselButton";
function Card(props) {
  const {
    garageName,
    rating,
    address,
    openTime,
    closeTime,
    imgs,
    isFavourited,
  } = props;
  return (
    <div className=" flex flex-col items-center justify-center cursor-pointer gap-y-3 group">
      {/* images */}
      <div className=" relative w-full aspect-[1.06] rounded-xl overflow-hidden">
        <Swiper className="mySwiper w-full h-full group-hover:scale-105 transition-transform ease-in-out origin-center">
          {imgs?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt=""
                className=" w-full h-full object-cover   "
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className=" absolute top-2 right-2 z-10 ">
          <Heart size={24} color={isFavourited ? "red" : "white"} />
        </div>
        <div className=" absolute top-[50%] left-2 -translate-y-[50%] z-10 hidden group-hover:flex animate-fade animate-once">
          <CarouselButton type="prev" />
        </div>
        <div className=" absolute top-[50%] right-2 -translate-y-[50%] z-10 hidden group-hover:flex animate-fade animate-once">
          <CarouselButton type="next" />
        </div>
      </div>
      {/* info */}
      <div className=" w-full flex flex-col gap-2">
        <div className=" flex flex-col items-start gap-y-[2px]">
          <div className=" w-full flex justify-between gap-1 items-center">
            <span className=" text-sm font-medium text-[#222222]">
              {garageName}
            </span>
            <div className=" flex items-center w-fit justify-center gap-1">
              <Star size={12} />
              <span className=" text-sm font-medium text-[#222222]">
                {rating}
              </span>
            </div>
          </div>
          <span className=" text-sm  text-[#717171]">{address}</span>
          <div className="flex items-center justify-start gap-1">
            <span className=" text-sm  text-[#717171]">{openTime}</span>
            <span className=" text-sm  text-[#717171]">{closeTime}</span>
          </div>
        </div>
        <span className=" text-sm text-[#22222] font-medium underline cursor-pointer group-hover:animate-bounce animate-infinite animate-ease-in-out">
          Status: Open
        </span>
      </div>
    </div>
  );
}
Card.propTypes = {
  garageName: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  openTime: PropTypes.string.isRequired,
  closeTime: PropTypes.string.isRequired,
  isFavourited: PropTypes.bool.isRequired,
  imgs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Card;
