import {
  Bell,
  History,
  LayoutDashboard,
  Search,
  Star,
  Sun,
} from "lucide-react";
import React from "react";
import { BreadcumbWrapper } from "./BreadcumbWrapper";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => {
  return (
    <div className=" sticky top-0 z-30 bg-white flex-1 px-7 py-5 h-fit border-b-[1px] border-black/60 flex items-center justify-between">
      <div className=" flex justify-start items-center gap-x-2">
        <SidebarTrigger />
        <div className=" w-7 h-7 flex justify-center items-center cursor-pointer">
          <Star size={20} color="black" />
        </div>
        <BreadcumbWrapper />
      </div>

      <div className="flex justify-end items-center gap-x-2">
        <div className=" w-fit lg:w-40 py-1 px-2 bg-blue-50 flex justify-center items-center gap-x-1 rounded-full">
          <Search size={16} color="black" className=" cursor-pointer" />
          <input
            type="text"
            placeholder="Search"
            className=" hidden lg:block w-full bg-transparent text-black text-xs outline-none"
          />
        </div>
        <div className=" flex items-center gap-x-2">
          <div className="hidden lg:flex w-7 h-7  justify-center items-center">
            <Sun size={20} />
          </div>
          <div className=" hidden lg:flex w-7 h-7  justify-center items-center">
            <History size={20} />
          </div>
          <div className=" hidden lg:flex w-7 h-7 justify-center items-center">
            <Bell size={20} />
          </div>
          <div className=" flex lg:hidden w-7 h-7  justify-center items-center">
            <LayoutDashboard size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
