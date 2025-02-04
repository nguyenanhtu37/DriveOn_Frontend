import React from "react";

import { Button } from "@/components/ui/button";
import { useApproveGarage, useRejectGarage } from "@/app/stores/entity/garage";
import { cn } from "@/lib/utils";

export const Cell = ({ children }) => {
  return (
    <div className=" px-[12px] py-[11px] flex items-center text-xs">
      {children}
    </div>
  );
};
export const Row = ({ id, image, username, garage, address, date, status }) => {
  const { mutate: approveGarage } = useApproveGarage();
  const { mutate: rejectGarage } = useRejectGarage();
  const handleApprove = () => {
    approveGarage(id);
  };
  const handleReject = () => {
    rejectGarage(id);
  };
  let statusClassName;
  if (status === "pending") {
    statusClassName = "text-yellow-200";
  } else if (status === "approved") {
    statusClassName = "text-green-300";
  } else {
    statusClassName = "text-red-300";
  }

  return (
    <div className="grid grid-cols-12 grid-rows-1 gap-0 border-b-[1px] border-black/5 cursor-pointer ">
      <div className=""></div>
      <div className="col-span-2 ">
        <Cell>
          <div className=" flex items-center flex-wrap justify-start gap-1">
            <img
              src={image}
              alt="user"
              className=" w-6 h-6 object-cover rounded-full"
            />
            <span className=" text-xs text-black">{username}</span>
          </div>
        </Cell>
      </div>
      <div className="col-span-2 col-start-4">
        <Cell>{garage}</Cell>
      </div>
      <div className="col-span-3 col-start-6">
        <Cell>{address}</Cell>
      </div>
      <div className="col-span-2 col-start-9">
        <Cell>{date}</Cell>
      </div>
      <div className="col-start-11">
        <Cell>
          <span className={cn("font-medium text-sm", statusClassName)}>
            {status}
          </span>
        </Cell>
      </div>
      <div className="col-start-12">
        <Cell>
          <div className=" flex justify-start items-center gap-x-1 ">
            <Button
              className=" w-full p-2 bg-green-300 hover:bg-green-300 hover:bg-opacity-50"
              onClick={handleApprove}
            >
              Accept
            </Button>
            <Button
              className=" w-full p-2 bg-red-300 hover:bg-red-300 hover:bg-opacity-50"
              onClick={handleReject}
            >
              Reject
            </Button>
          </div>
        </Cell>
      </div>
    </div>
  );
};
