import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, Bug } from "lucide-react";
import { ItemAvatarText } from "./ItemAvatarText";
import { Separator } from "./ui/separator";
const PopoverNotification = ({ notifications }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className=" hidden lg:flex w-7 h-7 justify-center items-center">
          <Bell size={20} />
        </div>
      </PopoverTrigger>
      <PopoverContent sideOffset={14}>
        {Array.from({ length: 5 }).map((_, i) => (
          <>
            <ItemAvatarText
              key={i}
              icon={<Bug />}
              content={"You have a bug that need to.."}
              time={"Just now"}
            />
            <Separator />
          </>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverNotification;
