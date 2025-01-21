import React from "react";

import { Bug } from "lucide-react";
import { Box } from "./Box";
import { ItemAvatarText } from "./Notification";

export const SidebarRight = () => {
  return (
    <div className=" w-[280px] h-full bg-white py-[22px] px-5 flex flex-col gap-y-6 border-l-[1px] border-black/60 border-opacity-60 ">
      <Box title="Notifications">
        <ItemAvatarText
          icon={<Bug />}
          content={"You have a bug that need to.."}
          time={"Just now"}
        />
        <ItemAvatarText
          icon={<Bug />}
          content={"You have a bug that need to.."}
          time={"Just now"}
        />
        <ItemAvatarText
          icon={<Bug />}
          content={"You have a bug that need to.."}
          time={"Just now"}
        />
      </Box>

      <Box title="User Activities">
        <ItemAvatarText
          image="https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg"
          content={"You have a bug that need to.."}
          time={"Just now"}
        />
        <ItemAvatarText
          image="https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg"
          content={"You have a bug that need to.."}
          time={"Just now"}
        />
        <ItemAvatarText
          image="https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg"
          content={"You have a bug that need to.."}
          time={"Just now"}
        />
      </Box>
    </div>
  );
};
