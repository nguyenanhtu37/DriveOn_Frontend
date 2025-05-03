import { useGetMyFavorites } from "@/app/stores/entity/favoriteV2";
import { useGetGarages } from "@/app/stores/entity/garage";
import { GarageCard } from "@/components/Card";
import { Car, Dot } from "lucide-react";
import { motion } from "framer-motion";
import { Loading } from "@/components/Loading";

export default function GarageList() {
  const myFavorites = useGetMyFavorites();
  const garages = useGetGarages();

  return (
    <div className=" px-4 md:px-10 mt-4 animate-fade animate-once animate-ease-in-out mb-12">
      {garages.isLoading ? (
        <Loading />
      ) : garages.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5">
          {garages.data.map((garage) => (
            <GarageCard
              key={garage._id}
              id={garage._id}
              garageName={garage.name}
              rating={garage.ratingAverage}
              address={garage.address}
              imgs={garage.interiorImages}
              openTime={garage.openTime}
              closeTime={garage.closeTime}
              isFavorited={myFavorites.data.some(
                (favorite) => favorite._id === garage._id
              )}
              tag={garage.tag}
              location={garage.location.coordinates}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh] bg-gray-50 rounded-lg shadow-sm">
          <div style={{ position: "relative", padding: "20px" }}>
            {/* Các Dot */}
            <div
              style={{
                display: "flex",
                position: "relative",
                zIndex: 1,
              }}
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <Dot key={index} size={20} className="text-gray-300" />
              ))}
            </div>

            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                width: "80%",
                top: -5,
                left: 0,
                zIndex: 2,
              }}
            >
              <Car size={32} />
            </motion.div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-500">
            No garages found
          </h1>
          <p className="text-gray-400 mt-2">
            Check back later for new listings
          </p>
        </div>
      )}
    </div>
  );
}
