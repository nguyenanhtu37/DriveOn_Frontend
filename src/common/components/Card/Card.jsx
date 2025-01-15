import { Star } from "lucide-react";
import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Card({ garageName, address, rating, phone, status }) {
  return (
    <div className=" w-full flex flex-col gap-2 cursor-pointer group">
      <div className=" w-full relative ">
        <Swiper className="mySwiper" s>
          <SwiperSlide>
            <img
              src="https://images.pexels.com/photos/673803/pexels-photo-673803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className=" w-full aspect-[1.1] object-cover rounded-xl "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.pexels.com/photos/673803/pexels-photo-673803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className=" w-full aspect-[1.1] object-cover rounded-xl "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.pexels.com/photos/673803/pexels-photo-673803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className=" w-full aspect-[1.1] object-cover rounded-xl "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.pexels.com/photos/673803/pexels-photo-673803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className=" w-full aspect-[1.1] object-cover rounded-xl "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.pexels.com/photos/673803/pexels-photo-673803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className=" w-full aspect-[1.1] object-cover rounded-xl "
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className=" w-full flex flex-col gap-[2px]">
        <div className="flex justify-between items-center gap-2">
          <div className=" text-sm text-black font-medium">
            Garage: {garageName}
          </div>
          <div className=" text-sm text-black c flex items-center gap-1">
            <Star size={14} color="black" /> {rating}
          </div>
        </div>
        <div className=" text-sm text-zinc-500">Address: {address}</div>
      </div>
    </div>
  );
}

Card.propTypes = {
  garageName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};
