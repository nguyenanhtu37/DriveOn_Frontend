import { TopBar } from "./components/TopBar";
import ServiceList from "./components/ServiceList";

import { Outlet } from "react-router-dom";

const Service = () => {
  return (
    <div className=" flex flex-col justify-center items-center h-full w-full">
      <div className=" px-4 py-3 h-full w-full rounded-md  flex flex-col gap-y-2">
        <TopBar />
        <div className=" flex items-start w-full h-full ">
          <ServiceList />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Service;
