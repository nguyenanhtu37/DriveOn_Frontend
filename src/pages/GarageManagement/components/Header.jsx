import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Header = ({ notification, handleOpenNotification }) => {
  return (
    <div className=" sticky top-0 z-30 bg-white flex-1 px-7 py-5 h-fit border-b-[1px] border-black/60 flex items-center justify-between bg-red-100 bg-opacity-50">
      <div className=" flex w-full justify-between items-center gap-x-2">
        <SidebarTrigger />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className=" relative p-2 rounded-full bg-white shadow-sm hover:bg-box-hover hover:shadow-md cursor-pointer transition-all duration-300 "
                onClick={handleOpenNotification}
              >
                <Bell size={16} />
                {notification?.length > 0 && (
                  <div className=" size-3 rounded-full top-0 bg-red-300 absolute right-1"></div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Emergency notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
