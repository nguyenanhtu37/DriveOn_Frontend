import { useNavigate } from "react-router-dom";
import { FaStar, FaPhone, FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "lucide-react";


const GarageCard = ({
  id,
  garageName,
  rating,
  address,
  imgs,
  openTime,
  closeTime,
  tag,
  onGetDirections,
  location,
  phone,
  distance,
  hasEmergency,
  description,
}) => {
  const navigate = useNavigate();

  const formatDistance = (distance) =>
    typeof distance === "number" ? `${distance.toFixed(2)} km` : "--";
  const formatRating = (rating) =>
    typeof rating === "number" ? rating.toFixed(1) : "--";

  // Pro card design
  if (tag === "pro") {
    return (
      <Card
        className="w-full h-full mx-auto overflow-hidden transition-all duration-300 transform hover:shadow-xl rounded-lg border-0 relative"
      // Removed onClick from Card
      >
        {/* Premium ribbon */}
        <div className="absolute -right-3 top-4 z-20 rotate-45 transform translate-x-1/2 -translate-y-1/2">
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-1 px-8 shadow-md">
            <span className="text-xs font-bold tracking-wider">PREMIUM</span>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-600/10 to-transparent opacity-50 z-10 pointer-events-none" />

        <CardContent className="p-0">
          <div className="relative">
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

            {/* Pro badge with premium styling */}
            <div className="absolute top-3 left-3 z-20">
              <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white border-none px-3 py-1.5 text-xs font-bold shadow-md flex items-center gap-1">
                PRO
              </Badge>
            </div>

            {/* Rating badge on image */}
            <div className="absolute bottom-3 right-3 z-20">
              <Badge className="bg-white text-red-600 border-none px-2 py-1 text-xs font-bold shadow-md flex items-center gap-1">
                <FaStar className="h-3.5 w-3.5 text-yellow-400" />
                {formatRating(rating)}
              </Badge>
            </div>
          </div>

          <div className="px-5 py-4 bg-gradient-to-r from-red-50 to-white border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-700 mb-2">
              {garageName}
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <FaMapMarkerAlt className="h-4 w-4 text-red-500" />
              <p className="text-sm text-gray-700 line-clamp-1">{address}</p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-700 bg-white px-3 py-1.5 rounded-full shadow-sm">
                <FaRegClock className="h-4 w-4 text-red-500" />
                <span className="font-medium">
                  {openTime} - {closeTime}
                </span>
              </div>
              <Badge
                variant="outline"
                className={
                  hasEmergency
                    ? "border-green-200 bg-green-50 text-green-600 hover:bg-green-100 px-3 py-1.5 flex items-center gap-1.5"
                    : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 flex items-center gap-1.5"
                }
              >
                {hasEmergency ? "Emergency" : "No Emergency"}
              </Badge>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <FaPhone className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-700">{phone || "No phone"}</span>
              <span className="ml-auto text-xs text-gray-500">{formatDistance(distance)}</span>
            </div>

            <p className="text-gray-600 mt-2 text-xs">
              {(description || "No description available").slice(0, 80)}...
            </p>
            <div className="flex gap-2 mt-4 items-center">
              {phone ? (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-center font-semibold shadow
      block w-full mb-2 md:hidden" // Ẩn trên màn hình >= md (desktop)
                  aria-label={`Call ${garageName || "garage"} at ${phone}`}
                  style={{ wordBreak: "break-all" }}
                >
                  <FaPhone className="mr-2" />
                  <span>Call</span>
                </a>
              ) : (
                <button
                  className="inline-block bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed text-center font-semibold
      block w-full mb-2 md:hidden"
                  disabled
                >
                  No Phone
                </button>
              )}
              {location && onGetDirections && (
                <Button
                  variant="ghost"
                  className="p-0 text-xs text-gray-500 hover:text-gray-700"
                  onClick={e => {
                    e.stopPropagation();
                    onGetDirections(location);
                  }}
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </Button>
              )}
              <div className="ml-auto">
                <Button
                  variant="secondary"
                  className="flex items-center gap-2"
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/garageDetail/${id}`);
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    );
  }

  // Normal card design
  return (
    <Card
      className="w-full h-full mx-auto overflow-hidden transition-all duration-300 transform hover:shadow-md rounded-lg border-[1px] border-gray-200"
    // Removed onClick from Card
    >
      <CardContent className="p-0">
        <div className="relative rounded-t-lg overflow-hidden">
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
        </div>

        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-base text-gray-800">
              {garageName}
            </h3>
            <div className="flex items-center gap-1 text-sm">
              <FaStar className="h-4 w-4 text-yellow-500" />
              <span className="text-gray-700">
                {formatRating(rating)}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-2 line-clamp-1">{address}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FaRegClock className="h-3 w-3" />
              <span>
                {openTime} - {closeTime}
              </span>
            </div>

            <div>
              <Badge
                variant="outline"
                className={
                  hasEmergency
                    ? "border-green-200 bg-green-50 text-green-600 hover:bg-green-100 px-3 py-1.5 flex items-center gap-1.5"
                    : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 flex items-center gap-1.5"
                }
              >
                {hasEmergency ? "Emergency" : "No Emergency"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <FaPhone className="h-4 w-4 text-green-500" />
            <span className="text-xs text-gray-700">{phone || "No phone"}</span>
            <span className="ml-auto text-xs text-gray-500">{formatDistance(distance)}</span>
          </div>

          <p className="text-gray-600 mt-2 text-xs">
            {(description || "No description available").slice(0, 80)}...
          </p>

          <div className="flex gap-2 mt-4 items-center">
            {phone ? (
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-center font-semibold shadow"
                aria-label={`Call ${garageName || "garage"} at ${phone}`}
                style={{ wordBreak: "break-all" }}
              >
                <FaPhone className="mr-2" />
                <span>Call</span>
              </a>
            ) : (
              <button
                className="inline-block bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed text-center font-semibold"
                disabled
              >
                No Phone
              </button>
            )}
            {location && onGetDirections && (
              <Button
                variant="ghost"
                className="p-0 text-xs text-gray-500 hover:text-gray-700"
                onClick={e => {
                  e.stopPropagation();
                  onGetDirections(location);
                }}
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </Button>
            )}
            <div className="ml-auto">
              <Button
                variant="secondary"
                className="flex items-center gap-2"
                onClick={e => {
                  e.stopPropagation();
                  navigate(`/garageDetail/${id}`);
                }}
              >
                View Details
              </Button>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default GarageCard;