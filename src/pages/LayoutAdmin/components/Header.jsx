import { SidebarTrigger } from "@/components/ui/sidebar";
import { Star } from "lucide-react";

export const Header = () => {
  return (
    <div className=" sticky top-0 z-30 bg-white flex-1 px-7 py-5 h-fit border-b-[1px] border-black/60 flex items-center justify-between bg-red-100 bg-opacity-50">
      <div className=" flex justify-start items-center gap-x-2">
        <SidebarTrigger />
        <div className=" w-7 h-7 flex justify-center items-center cursor-pointer">
          <Star size={20} color="black" />
        </div>
        {/* <BreadcrumbWrapper /> */}
      </div>
    </div>
  );
};
