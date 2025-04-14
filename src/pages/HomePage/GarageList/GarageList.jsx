import { useGetMyFavorites } from "@/app/stores/entity/favoriteV2";
import { useGetGarages } from "@/app/stores/entity/garage";
import { GarageCard } from "@/components/Card";

export default function GarageList() {
  const myFavorites = useGetMyFavorites();
  const garages = useGetGarages();

  return (
    <div className=" px-4 md:px-10 mt-4 animate-fade animate-once animate-ease-in-out">
      {garages.data.length > 0 ? (
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
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-semibold text-gray-500">
            No garages found
          </h1>
        </div>
      )}
    </div>
  );
}
