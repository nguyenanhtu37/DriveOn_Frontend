import { SlidersHorizontal } from "lucide-react";
import ItemIcon from "@/components/ItemIcon";

export default function Filter() {
  return (
    <div className=" flex w-full px-4 md:px-10 h-[78px]  items-center mt-2">
      <div className=" w-full md:w-[80%] flex items-center gap-6">
        <div className="flex-1 flex items-center gap-8 overflow-x-auto scrollbar-hide">
          {Array.from({ length: 30 }).map((_, index) => (
            <ItemIcon
              key={index}
              imgage="/public/serviceIcons/car-wash.png"
              title="lorum ipsum"
            />
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2 p-4 border border-[#DDDDDD] rounded-full hover:border-[#22222] hover:bg-zinc-100 cursor-pointer transition-all ease-in-out group">
          <SlidersHorizontal size={14} color="#222222" />
          <span className="text-sm text-[#22222] font-bold group-hover:text-black">
            Filter
          </span>
        </div>
      </div>
      <div className="hidden md:flex w-1/5  items-center justify-end">
        <div className=" w-full ml-4 flex items-center gap-2 p-4 border border-[#DDDDDD] rounded-full hover:border-[#22222] hover:bg-zinc-100 cursor-pointer transition-all ease-in-out group">
          <span className="text-sm text-nowrap text-[#22222] font-bold group-hover:text-black">
            View NearBy
          </span>
          <SlidersHorizontal size={14} />
        </div>
      </div>
    </div>
  );
}
