import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRightIcon } from "lucide-react";
import React from "react";

export const DialogService = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" p-2 rounded-full hover:bg-[#1c1c1c]/10 cursor-pointer transition-colors ease-in-out duration-100">
          <ArrowRightIcon size={18} />
        </div>
      </DialogTrigger>
      <DialogContent className=" w-full min-w-[378px] max-w-[712px] h-[400px]">
        <div className=" w-full flex flex-col items-start   gap-y-4">
          <span className=" text-lg font-semibold text-[#22222]">
            List services of garage
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
