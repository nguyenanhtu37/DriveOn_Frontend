import { cn } from "@/lib/utils";
import clsx from "clsx";
import { ArrowRight, Settings } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const ServiceItem = ({ service, garageId }) => {
  const link = `/garageManagement/${garageId}/services/${service._id}`;
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        cn(
          "py-2 px-3 w-full flex items-center justify-between  rounded-md  hover:shadow-sm cursor-pointer transition-colors ease-in-out duration-100 group",
          isActive &&
            "bg-[#1C1C1C] bg-opacity-5 shadow-sm hover:bg-[#1C1C1C] hover:bg-opacity-5"
        )
      }
    >
      <div className="flex flex-1 items-center gap-x-2">
        <Settings size={16} className="shrink-0 group-hover:animate-spin" />
        <span className="text-md font-semibold line-clamp-1 ">
          {service.name}
        </span>
      </div>
      <ArrowRight size={16} className="hidden group-hover:flex" />
    </NavLink>
  );
};

export default ServiceItem;
