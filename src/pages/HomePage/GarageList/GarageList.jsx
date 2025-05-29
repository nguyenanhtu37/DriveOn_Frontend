import { useViewGarageList } from "@/app/stores/entity/garage";

import "swiper/css";

import ViewGarage from "./ViewGarage";
import CardSkeleton from "@/components/CardSkeleton";

export default function GarageList() {
  const viewGarageList = useViewGarageList();
  const listGaragePro = viewGarageList.data?.garagePros;
  const listGarageFavorite = viewGarageList.data?.topFavorites;
  const listTopRated = viewGarageList.data?.topRated;
  const listTopBooked = viewGarageList.data?.mostBooked;
  if (viewGarageList.isLoading)
    return (
      <div className=" md:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-[15px] gap-y-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  return (
    <div className="w-full flex flex-col gap-y-4 px-4 md:px-6 py-8">
      <ViewGarage title={"Professional Garage List"} garages={listGaragePro} />
      <ViewGarage title={"Top-rated Garages"} garages={listTopRated} />
      <ViewGarage title={"Top-favorite Garages"} garages={listGarageFavorite} />
      <ViewGarage title={"Top-booked Garages"} garages={listTopBooked} />
    </div>
  );
}
