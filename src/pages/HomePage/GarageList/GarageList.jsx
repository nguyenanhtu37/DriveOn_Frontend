import { useGetGarages } from "@/app/stores/entity/garage";
import { Car, Dot } from "lucide-react";
import { motion } from "framer-motion";
import { Loading } from "@/components/Loading";

import { Card } from "@/components/Card/Card";

export default function GarageList() {
  const garages = useGetGarages();

  return (
    <div className=" px-4 md:px-10 mt-4 animate-fade animate-once animate-ease-in-out mb-12">
      {garages.isLoading ? (
        <Loading />
      ) : garages.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
          {garages.data.map((garage) => (
            <Card key={garage._id} garage={garage} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh] bg-gray-50 rounded-lg shadow-sm">
          <div style={{ position: "relative", padding: "20px" }}>
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
