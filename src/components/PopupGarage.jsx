import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
const PopupGarage = ({ id, imgs, address, garageName, openDays, phone }) => {
  return (
    <div className="rounded-lg w-[301px] rounded-t-[12px] overflow-hidden">
      <div className=" w-full h-[200px] rounded-t-lg mb-1">
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
      </div>
      <Link asChild to={`/garageDetail/${id}`}>
        <div className=" px-2 py-1 flex flex-col gap-y-[2px]">
          <span className=" text-xs text-black">
            <b>Garage Name 🔧 : {garageName} </b>
          </span>
          <span className=" text-xs  text-black">
            <b>Address 📍: </b>
            {address}
          </span>
          <span className=" text-xs  text-black">
            <b>Phone 📞 : </b>
            {phone}
          </span>
          <span className=" text-xs  text-black">
            <b>Open 📅: </b>
            {openDays?.map((day) => `${day}`).join(", ")}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default PopupGarage;
