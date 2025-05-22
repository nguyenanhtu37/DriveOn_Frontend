import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRightIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetService } from "@/app/stores/entity/service-detail";
import { useParams } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import { useDialogOpen, useSetDialogId } from "@/app/stores/view/dialog";

export const DialogService = () => {
  const { garageId } = useParams();
  const service = useGetService(garageId);
  const isOpen = useDialogOpen("GarageService");
  const setDialogId = useSetDialogId();

  const handleOpen = () => {
    setDialogId({ id: "GarageService", data: null });
  };

  const handleClose = () => {
    if (isOpen) {
      setDialogId({ id: null, data: null });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <div
          className=" p-2 rounded-full hover:bg-[#1c1c1c]/10 cursor-pointer transition-colors ease-in-out duration-100"
          onClick={handleOpen}
        >
          <ArrowRightIcon size={18} />
        </div>
      </DialogTrigger>
      <DialogContent className=" p-6  max-w-[1280px] " hiddenClose={true}>
        <div className=" w-full flex flex-col items-start gap-y-4 max-h-[800px] overflow-y-auto">
          <div className=" w-full justify-between items-center flex">
            <div className=" flex justify-between items-center gap-x-2">
              <span className=" text-lg font-semibold text-[#22222]">
                List services of garage
              </span>
              <span className=" text-sm font-semibold text-[#1c1c1c]">
                {service.data?.length} services
              </span>
            </div>
          </div>
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
            {service.data?.map((item) => (
              <ServiceCard key={item._id} service={item} />
            ))}
          </div>
        </div>

        <DialogFooter>
          <div className=" gap-x-2 flex items-center">
            <button className=" text-sm font-semibold text-[#1c1c1c] hover:text-[#1c1c1c]/70 transition-colors ease-in-out duration-100 rounded-full border border-[#1c1c1c]/10 p-2">
              <ChevronLeft />
            </button>
            <button className=" text-sm font-semibold text-[#1c1c1c] hover:text-[#1c1c1c]/70 transition-colors ease-in-out duration-100 rounded-full border border-[#1c1c1c]/10 p-2 ">
              <ChevronRight />
            </button>
          </div>
          <div className=" w-full flex justify-end">
            <button
              className=" text-sm font-semibold text-[#1c1c1c] hover:text-[#1c1c1c]/70 transition-colors ease-in-out duration-100"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
