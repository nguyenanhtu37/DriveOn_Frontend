import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRightIcon } from "lucide-react";
import { ServiceItem } from "./ServiceItem";
import { useGetService } from "@/app/stores/entity/service-detail";
import { useParams } from "react-router-dom";

export const DialogService = () => {
  const { garageId } = useParams();
  const service = useGetService(garageId);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" p-2 rounded-full hover:bg-[#1c1c1c]/10 cursor-pointer transition-colors ease-in-out duration-100">
          <ArrowRightIcon size={18} />
        </div>
      </DialogTrigger>
      <DialogContent className=" p-6 border-none w-full min-w-[378px] max-w-[880px] ">
        <div className=" w-full flex flex-col items-start gap-y-4 max-h-[800px] overflow-y-auto">
          <span className=" text-lg font-semibold text-[#22222]">
            List services of garage
          </span>
          <div className=" w-full flex flex-col gap-y-6 ">
            {service.data?.map((item, index) => (
              <ServiceItem
                key={item._id}
                img={item.images[0]}
                variant={index % 2 === 0 ? "left-image" : "right-image"}
                serviceName={item.name}
                description={item.description}
                price={item.price}
                duration={item.duration}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
