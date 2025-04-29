import React from "react";

export const Box = ({ title, children }) => {
  return (
    <div className=" w-full flex flex-col gap-y-3 items-start">
      <span className=" text-sm font-medium text-black text-start p-1">
        {title}
      </span>
      <div className=" w-full flex flex-col gap-y-2">{children}</div>
    </div>
  );
};
