import ItemIcon from "@/components/ItemIcon";
import { useGetService } from "@/app/stores/entity/service";
import DialogFilter from "../DialogFilter/DialogFilter";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function Filter() {
  const services = useGetService();
  const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(ref);

  return (
    <div className="flex w-full px-4 md:px-10 h-[86px] items-center mt-2 gap-x-5">
      <div className="relative flex-1 overflow-x-auto scrollbar-hide">
        <div className="absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none"></div>

        <div
          ref={ref}
          {...events}
          className="flex items-center gap-6 overflow-x-auto scrollbar-hide"
        >
          {services.data.map((service) => (
            <ItemIcon
              key={service._id}
              id={service._id}
              image={service.image}
              title={service.name}
            />
          ))}
        </div>
      </div>

      {/* Nút Filter */}
      <div className="hidden md:flex items-center gap-x-2">
        <DialogFilter />
      </div>
    </div>
  );
}
