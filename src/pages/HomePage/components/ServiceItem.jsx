import { cn } from "@/lib/utils";

export const ServiceItem = ({ service, isActive = false, ...props }) => {
  return (
    <div
      className={cn(
        " cursor-pointer px-4 py-2 rounded-xl bg-white outline outline-1 -outline-offset-1 outline-[#e4e4e4] hover:outline-[#c5c5c5] flex items-center justify-between gap-x-4 hover:shadow-md transition-all ease-in-out duration-100",
        isActive && " outline-[#f6a4a4] hover:outline-[#ff8a8a] bg-[#ffdede]"
      )}
      {...props}
    >
      <div className=" size-12 overflow-hidden rounded-full">
        <img
          src={service.image}
          alt={service.name}
          className="size-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col gap-y-2">
        <p className=" text-black text-sm font-semibold">{service.name}</p>
        <p className=" text-xs text-[#666666] line-clamp-2">
          {service.description}
        </p>
      </div>
    </div>
  );
};
