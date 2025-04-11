import { TopBar } from "./components/TopBar";
import ServiceList from "./components/ServiceList";

import { Outlet, useParams } from "react-router-dom";
import { useGetService } from "@/app/stores/entity/service-detail";

const Service = () => {
  const { garageId } = useParams();
  const services = useGetService(garageId);

  return (
    <div className=" flex flex-col justify-center items-center h-full w-full">
      <div className=" px-4 py-3 h-full w-full rounded-md  flex flex-col gap-y-2">
        <TopBar />
        {services.data.length > 0 ? (
          <div className=" flex items-start w-full h-full ">
            <ServiceList />
            <Outlet />
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-semibold text-gray-500">
              No services found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Service;
