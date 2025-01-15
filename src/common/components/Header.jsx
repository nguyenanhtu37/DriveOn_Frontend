import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Globe, SlidersHorizontal } from "lucide-react";
import React from "react";
import Filter from "./Filter/Filter";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className=" animate-fade-down animate-once animate-ease-in-out sticky top-0 z-50 bg-white shadow-md">
      <div className=" h-[80px] px-4 md:px-10 flex justify-between items-center  border-b-[0.5px] border-[#DDDDDD]">
        <div className="w-1/2 md:w/1/3 h-12 flex items-center justify-start">
          <div className=" relative w-[246px] ">
            <img
              src={"/src/assets/logo.svg"}
              className=" relative z-10 w-[180px]  object-cover "
              alt=""
            />
            <svg
              viewBox="0 0 509 141"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" absolute w-[246px]  h-[80px] top-[50%] translate-y-[-50%]  left-0 z-0  text-red-500"
            >
              <path
                d="M74 0H487L508.5 70.5L473.5 141H74V0Z"
                fill="currentColor"
              ></path>
              <path
                d="M54 141H472.5L488.5 70.5L443.5 0H54V141Z"
                fill="white"
              ></path>
              <path
                d="M0 0H443L464.5 70.5L443 141H0V0Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        <div className=" hidden w-1/3 h-12 md:flex justify-center items-center px-[24px]">
          <Button
            variant="ghost"
            className=" p-3 text-md h-full hover:bg-slate-50 rounded-full"
          >
            Garage
          </Button>
          <Button
            variant="ghost"
            className=" p-3 text-md h-full hover:bg-slate-50 rounded-full"
          >
            Support
          </Button>
        </div>
        <div className="w-1/2 md:w/1/3">
          <div className=" hidden md:flex w-full h-12   justify-end items-center">
            <Link to="/garageRegistration">
              <Button
                variant="ghost"
                className=" p-3 text-md h-full hover:bg-slate-50 rounded-full"
              >
                Registration Garage
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="  p-3 text-md h-full hover:bg-slate-50 rounded-full"
            >
              <Globe size={16} />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className=" p-4 h-full text-md hover:bg-slate-50 hover:shadow-md rounded-full flex gap-2 items-center"
                >
                  <SlidersHorizontal size={16} />
                  <img
                    src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    className=" w-8 h-8 rounded-full object-cover"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end" sideOffset={12}>
                <div className="grid gap-4 bg-white py-3 rounded-md shadow-lg ">
                  <div className=" w-full px-3 py-2 hover:bg-slate-50 transition-color ease-in-out font-roboto cursor-pointer ">
                    Garage
                  </div>
                  <div className=" w-full px-3 py-2 hover:bg-slate-50 transition-color ease-in-out font-roboto cursor-pointer ">
                    Garage
                  </div>
                  <div className=" w-full px-3 py-2 hover:bg-slate-50 transition-color ease-in-out font-roboto cursor-pointer ">
                    Garage
                  </div>
                  <div className=" w-full px-3 py-2 hover:bg-slate-50 transition-color ease-in-out font-roboto cursor-pointer ">
                    Garage
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <Filter />
    </div>
  );
}
