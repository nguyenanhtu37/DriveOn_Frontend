import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const DialogMyGarage = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-sm w-full px-3 py-2 text-[#222222] ease-in-out hover:bg-[#f7f6f6] font-roboto cursor-pointer">
          Garage
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle>My garage</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export { DialogMyGarage };
