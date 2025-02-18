import React from "react";
import { CardGarage } from "../components/CardGarage";

export const ViewExitsGarage = () => {
  return (
    <div className=" px-7 pt-7 w-full flex flex-col gap-y-5 items-start">
      <div className=" w-full grid md:grid-cols-2 lg:grid-cols-4  gap-x-2 gap-y-2 ">
        <div className="flex justify-center items-center">
          <CardGarage />
        </div>
        <div className="flex justify-center items-center">
          <CardGarage />
        </div>
        <div className="flex justify-center items-center">
          <CardGarage />
        </div>
        <div className="flex justify-center items-center">
          <CardGarage />
        </div>
        <div className="flex justify-center items-center">
          <CardGarage />
        </div>
        <div className="flex justify-center items-center">
          <CardGarage />
        </div>
        <div className="flex justify-center items-center">
          <CardGarage />
        </div>
        <div className="flex justify-center items-center">
          <CardGarage />
        </div>
      </div>
    </div>
  );
};
