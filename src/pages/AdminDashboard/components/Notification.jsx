import React from "react";

export const ItemAvatarText = ({ image, icon, content, time }) => {
  return (
    <div className=" w-full p-2 flex items-start gap-x-2 cursor-pointer hover:opacity-90 ">
      {icon && (
        <div className=" w-6 h-6 rounded-md bg-red-200 flex items-center justify-center ">
          <icon.type size={16} color="#1C1C1C" />
        </div>
      )}
      {image && (
        <img src={image} className=" w-6 h-6 object-cover rounded-full" />
      )}
      <div className=" flex flex-col  items-start leading-5">
        <span className=" text-sm text-black leading-4">{content}</span>
        <span className=" text-sm text-[#1C1C1C] opacity-40">{time}</span>
      </div>
    </div>
  );
};
