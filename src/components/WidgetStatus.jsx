import React from "react";

const WidgetStatus = ({ title, content, helper }) => {
  return (
    <div className=" max-w-[212px] w-full h-[112px] p-6 flex flex-col gap-y-2 bg-blue-100 rounded-[16px]">
      <span className=" font-semibold text-sm font-sans text-[1c1c1c]">
        {title}
      </span>
      <div className=" flex items-center justify-between">
        <span className=" font-bold text-2xl font-sans text-[#2d2d2d]">
          {content}
        </span>
        <span className=" text-[#7c7c7c] font-sans text-sm">{helper}</span>
      </div>
    </div>
  );
};

export default WidgetStatus;
