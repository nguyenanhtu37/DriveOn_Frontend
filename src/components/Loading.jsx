import React from "react";

export const Loading = () => {
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full size-12 border-t-4 border-b-4 border-red-500"></div>
    </div>
  );
};
