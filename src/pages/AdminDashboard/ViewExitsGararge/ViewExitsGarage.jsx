import React from "react";
import { CardGarage } from "../components/CardGarage";
import { useGetGarageExits } from "@/app/stores/entity/garage";
import { Loading } from "@/components/Loading";

export const ViewExitsGarage = () => {
  const garageExits = useGetGarageExits();
  if (garageExits.isLoading) return <Loading />;
  return (
    <div className=" px-7 pt-7 w-full flex flex-col gap-y-5 items-start">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-2 gap-4">
        {garageExits.data.map((garage) => (
          <CardGarage key={garage.id} garage={garage} />
        ))}
      </div>
    </div>
  );
};
