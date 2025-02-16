import { AlignCenter, ArrowDownUp, Plus, Search } from "lucide-react";
import React from "react";
import { Cell, Row } from "../components/Row";
import { useGetGarages } from "@/app/stores/entity/garage";
import { formatDate } from "@/lib/formatDate";

export const ViewRegisterGarage = () => {
  const listRegisterGarage = useGetGarages();

  return (
    <div className=" px-7 pt-7 w-full flex flex-col gap-y-5 items-start">
      <div className=" px-2 py-1 flex justify-center items-center text-sm font-medium">
        Register Garage
      </div>
      <div className=" w-full flex flex-col gap-y-3">
        <div className=" w-full p-2 flex items-center justify-between bg-blue-50 bg-opacity-55 rounded-lg ">
          <div className=" flex gap-x-2 items-center justify-start">
            <div className=" w-7 h-7 flex items-center cursor-pointer hover:opacity-75">
              <Plus size={20} />
            </div>
            <div className=" w-7 h-7 flex items-center cursor-pointer hover:opacity-75">
              <AlignCenter size={20} />
            </div>
            <div className=" w-7 h-7 flex items-center cursor-pointer hover:opacity-75">
              <ArrowDownUp size={20} />
            </div>
          </div>

          <div className=" flex items-center gap-1 px-2 py-1 max-w-[160px] w-full rounded-xl bg-white ring-1 ring-black ">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search garage"
              className=" text-xs w-full h-full bg-transparent outline-none"
              // onChange={handleSearchGarage}
            />
          </div>
        </div>
        <div className=" w-full flex flex-col">
          {/* header table */}
          <div className="grid grid-cols-12 grid-rows-1 gap-0 border-b-[1px] border-black">
            <div className="">
              <Cell>ID</Cell>
            </div>
            <div className="col-span-2 ">
              <Cell>User</Cell>
            </div>
            <div className="col-span-2 col-start-4">
              <Cell>Garage</Cell>
            </div>
            <div className="col-span-3 col-start-6">
              <Cell>Address</Cell>
            </div>
            <div className="col-span-2 col-start-9">
              <Cell>Date</Cell>
            </div>
            <div className="col-start-11">
              <Cell>Status</Cell>
            </div>
            <div className="col-start-12"></div>
          </div>
          {/* row table */}
          {listRegisterGarage.data.map((item) => (
            <Row
              key={item._id}
              id={item._id}
              image={item.user[0].avatar}
              username={item.user[0].name}
              garage={item.name}
              address={item.address}
              date={formatDate(item.createdAt)}
              status={item.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
