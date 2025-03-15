import { useGetGarages } from "@/app/stores/entity/garage";
import { GarageCard } from "@/components/Card";

export default function GarageList() {
  const garages = useGetGarages();
  console.log(garages.data);
  return (
    <div className=" px-4 md:px-10 mt-4 animate-fade animate-once animate-ease-in-out">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5">
        {garages.data.map((garage) => (
          <GarageCard
            key={garage._id}
            id={garage._id}
            garageName={garage.name}
            rating={garage.rating}
            address={garage.address}
            imgs={garage.interiorImages}
            openTime={garage.openTime}
            closeTime={garage.closeTime}
          />
        ))}
      </div>
    </div>
  );
}
