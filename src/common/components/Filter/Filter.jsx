import { SlidersHorizontal } from "lucide-react";
import React from "react";
import ButtonIcon from "../ButtonIcon";

export default function Filter() {
  return (
    <div className=" hidden md:flex w-full px-4 md:px-10 h-[78px]  items-center mt-2">
      <div className="w-[80%] flex items-center gap-5">
        <div className="flex-1 flex items-center gap-4 overflow-x-auto scrollbar-hide">
          <ButtonIcon name="rua xe" />
          <ButtonIcon name="thay nhott" />
          <ButtonIcon name="rua xe" />
          <ButtonIcon name="thay nhott" />
          <ButtonIcon name="rua xe" />
          <ButtonIcon name="thay nhott" />
          <ButtonIcon name="rua xe" />
          <ButtonIcon name="thay nhott" />
          <ButtonIcon name="rua xe" />
          <ButtonIcon name="thay nhott" />
          <ButtonIcon name="rua xe" />
          <ButtonIcon name="thay nhott" />
          <ButtonIcon name="rua xe" />
          <ButtonIcon name="thay nhott" />
          <ButtonIcon name="rua xe" />
          <ButtonIcon name="thay nhott" />
          <ButtonIcon name="rua xe" />
          <ButtonIcon name="thay nhott" />
          <ButtonIcon name="rua xe" />
          <ButtonIcon name="thay nhott" />
          <ButtonIcon name="rua xe" />
          <ButtonIcon name="thay nhott" />
          <ButtonIcon name="rua xe" />
          <ButtonIcon name="thay nhott" />
        </div>
        <div className="flex items-center gap-2 py-[2px] px-4 h-12 border border-[#DDDDDD] rounded-lg hover:border-black hover:bg-zinc-100 cursor-pointer transition-all ease-in-out group">
          <SlidersHorizontal size={14} />
          <span className="text-sm text-[#22222] font-bold group-hover:text-black">
            Filter
          </span>
        </div>
      </div>
      <div className="w-[20%] flex items-center justify-end">
        <div className=" w-full ml-4 flex justify-center items-center gap-2 py-[2px] px-4 h-12 border border-[#DDDDDD] rounded-lg hover:border-black hover:bg-zinc-100 cursor-pointer transition-all ease-in-out group">
          <span className="text-sm text-[#22222] font-bold group-hover:text-black">
            View NearBy
          </span>
          <SlidersHorizontal size={14} />
        </div>
      </div>
    </div>
  );
}
