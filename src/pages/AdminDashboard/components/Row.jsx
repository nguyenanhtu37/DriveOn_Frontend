import { Ellipsis } from "lucide-react";
import React from "react";

export const Cell = ({ children }) => {
  return (
    <div className=" px-[12px] py-[11px] flex items-center text-xs">
      {children}
    </div>
  );
};
export const Row = ({ id, image, username, garage, address, date, status }) => {
  return (
    <div className="grid grid-cols-12 grid-rows-1 gap-0 border-b-[1px] border-black/5 cursor-pointer ">
      <div className="">
        <Cell>{id}</Cell>
      </div>
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
        <Cell>{status}</Cell>
      </div>
      <div className="col-start-12">
        <Cell>
          <Ellipsis size={16} />
        </Cell>
      </div>
    </div>
  );
};
