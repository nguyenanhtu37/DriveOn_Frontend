import { cn } from "@/lib/utils";
import React from "react";

export const Day = ({ day, isActive = false, ...props }) => {
  return (
    <div
      className={cn(
        " cursor-pointer  px-4 py-2 rounded-xl bg-white outline outline-1 -outline-offset-1 outline-[#e4e4e4] hover:outline-[#c5c5c5] w-fit flex items-center justify-between gap-x-4 hover:shadow-md transition-all ease-in-out duration-100 text-sm",
        isActive && " outline-[#f6a4a4] hover:outline-[#ff8a8a] bg-[#ffdede]"
      )}
      {...props}
    >
      {day}
    </div>
  );
};
