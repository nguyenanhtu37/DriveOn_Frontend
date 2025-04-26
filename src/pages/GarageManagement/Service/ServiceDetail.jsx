import { useGetServiceDetailById } from "@/app/stores/entity/service-detail";
import { Loading } from "@/components/Loading";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditService } from "./EditService";
import { DeleteService } from "./DeleteService";
import { formatToVND } from "@/lib/formatToVND";
import { Card } from "@/components/ui/card";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const serviceDetail = useGetServiceDetailById(serviceId);
  console.log(serviceDetail);
  useEffect(() => {
    setIsEdit(false);
  }, [serviceId]);
  if (serviceDetail.isLoading) return <Loading />;
  if (isEdit)
    return <EditService serviceDetail={serviceDetail} setIsEdit={setIsEdit} />;

  return (
    <Card className="relative px-1 ml-2 pb-3 flex-1 w-full  bg-white gap-y-2 h-full  ">
      {/* Top */}
      <div className="px-3 py-2 mb-2 flex justify-between items-center">
        <h4 className="text-lg font-semibold">{serviceDetail.data.name}</h4>
        <div className=" p-2 rounded-full bg-white hover:bg-gray flex items-center cursor-pointer hover:shadow-sm transition-colors ease-in-out duration-100">
          <Edit
            size={20}
            className="text-black"
            onClick={() => setIsEdit(true)}
          />
        </div>
      </div>
      {/* Content */}
      <div className=" px-3 w-full flex flex-col gap-y-4">
        <div className=" flex w-full justify-start items-start gap-x-2">
          <span className=" w-[120px] text-md font-semibold text-nowrap">
            Service System:
          </span>
          <span className=" text-md">{serviceDetail.data.service.name}</span>
        </div>

        <div className="w-full flex justify-start gap-4 items-center flex-wrap ">
          {serviceDetail.data.images.map((image) => (
            <img
              key={image}
              src={image}
              alt="service"
              className="size-[180px] flex bg-red-50 rounded-lg"
            />
          ))}
        </div>

        <div className=" flex w-full justify-start items-start gap-x-2">
          <span className=" w-[120px] text-md font-semibold">Description:</span>
          <span className=" text-md flex-1">
            {serviceDetail.data.description}
          </span>
        </div>

        <div className=" flex w-full justify-start items-start gap-x-2">
          <span className=" w-[120px] text-md font-semibold">Price: </span>
          <span className=" text-md">
            {formatToVND(serviceDetail.data.price)}
          </span>
        </div>
        <div className=" flex w-full justify-start items-start gap-x-2">
          <span className=" w-[120px] text-md font-semibold">Duration: </span>
          <span className=" text-md">
            {serviceDetail.data.duration} minutes
          </span>
        </div>
        <div className=" flex w-full justify-start items-start gap-x-2">
          <span className=" w-[120px] text-md font-semibold">Waranty: </span>
          <span className=" text-md">{serviceDetail.data.warranty}</span>
        </div>
      </div>
      <hr className="my-5" />
      <DeleteService serviceId={serviceId} />
    </Card>
  );
};

export default ServiceDetail;
