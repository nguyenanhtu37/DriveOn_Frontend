import ServiceItem from "./ServiceItem";
import { useParams } from "react-router-dom";
import { useGetService } from "@/app/stores/entity/service-detail";

const ServiceList = () => {
  const { garageId } = useParams();

  const services = useGetService(garageId);

  return (
    <div className=" relative pt-3 pb-5 px-1 flex flex-col  w-[250px] shrink-0 h-full border shadow-md border-[#1c1c1c] border-opacity-5 bg-white gap-y-2 ">
      <h4 className=" text-md font-semibold pb-2 px-3 border-b border-black ">
        List Service
      </h4>
      <div className=" flex flex-col items-start gap-y-2 w-full">
        {services.data.map((service) => (
          <ServiceItem
            key={service._id}
            service={service}
            garageId={garageId}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
