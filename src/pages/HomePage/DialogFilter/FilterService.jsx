import { useGetService } from "@/app/stores/entity/service";
import { DialogDescription } from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { useFilterStore } from "@/app/stores/view/filter";
import { ServiceItem } from "../components/ServiceItem";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";

export const FilterService = () => {
  const service = useGetService();
  const { serviceSystem, setServiceSystem } = useFilterStore();
  const [showMore, setShowMore] = useState(1);

  const handleShowMore = () => {
    // Cycle through 3 levels: 1 -> 2 -> 3 -> 1
    setShowMore((prev) => (prev >= 3 ? 1 : prev + 1));
  };

  // Get number of items to show based on level
  const getItemsToShow = () => {
    switch (showMore) {
      case 1:
        return 6; // First level shows 6 items
      case 2:
        return 12; // Second level shows 12 items
      case 3:
        return service.data.length; // Third level shows all items
      default:
        return 6;
    }
  };

  // Get button text based on current level
  const getButtonText = () => {
    switch (showMore) {
      case 1:
        return "Show more";
      case 2:
        return "Show all";
      case 3:
        return "Show less";
      default:
        return "Show more";
    }
  };

  return (
    <div className="px-6 py-4 w-full flex-col gap-y-6">
      <div className=" flex justify-between items-center mb-4">
        <div className=" flex flex-col items-start gap-y-2">
          <Label className="text-lg">Service Type</Label>
          <DialogDescription className="flex items-center justify-between gap-x-2">
            <span className="text-md font-semibold">
              Choose the service you want
            </span>
            <span className="text-sm text-[#848485]">
              {serviceSystem.length} selected
            </span>
          </DialogDescription>
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {service.data.slice(0, getItemsToShow()).map((service, idx) => (
          <BlurFade key={service._id} delay={0.25 + idx * 0.025} inView>
            <ServiceItem
              service={service}
              key={service._id}
              isActive={serviceSystem.includes(service._id)}
              onClick={() => setServiceSystem(service._id)}
            />
          </BlurFade>
        ))}
      </div>

      {service.data.length > 6 && (
        <div
          className="w-full flex justify-center items-center h-6 rounded-xl bg-[#ECECEC] hover:bg-opacity-70 mt-6 hover:shadow-sm transition-all ease-in-out duration-100 cursor-pointer"
          onClick={handleShowMore}
        >
          <ChevronDown
            size={20}
            className={`text-[#848485] ${
              showMore === 3 ? "rotate-180" : ""
            } transition-transform`}
          />
          <span className="ml-1 text-xs text-[#848485]">{getButtonText()}</span>
        </div>
      )}
    </div>
  );
};
