import { Activity, Locate, Phone } from "lucide-react";
import Service from "./components/Service";
import { useGetGarageDetail } from "@/app/stores/entity/garage";
import { useParams } from "react-router-dom";
import { Loading } from "@/components/Loading";

import { DialogService } from "./components/DialogService";
import { CreateAppointment } from "./components/CreateAppointment";

const GarageDetailPage = () => {
  const { garageId } = useParams();

  const garageDetail = useGetGarageDetail(garageId);
  if (garageDetail.isLoading) return <Loading />;
  return (
    <div className="w-full py-10 px-4 md:px-20">
      <div className=" w-full max-w-[1280px] flex flex-col mx-auto">
        {/* hero */}
        <div className=" max-h-[560px] grid md:grid-cols-2 gap-2 rounded-3xl overflow-hidden shadow-md">
          <div className=" w-full ">
            <img
              className="w-full aspect-[4/3] object-cover hover:opacity-80 transition-colors ease-in-out duration-150"
              src={garageDetail.data.interiorImages[0]}
            />
          </div>
          <div className="hidden md:grid w-full grid-cols-2 gap-2 ">
            {garageDetail.data.interiorImages.slice(1, 5).map((img) => (
              <div key={img} className="w-full h-full">
                <img
                  className="w-full aspect-[4/3] object-cover hover:opacity-80 transition-colors ease-in-out duration-150"
                  src={img}
                  alt="Garage Interior"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full flex flex-col justify-between lg:flex-row items-start">
          <div className=" w-full lg:w-[50%]  flex-col items-start">
            <div className=" py-8 flex flex-col w-full gap-1">
              <h2 className=" text-2xl font-semibold text-[#222222] ">
                {garageDetail.data.name}
              </h2>
              <span className=" text-sm text-[#222222] line-clamp-1">
                {garageDetail.data.description}
              </span>
            </div>

            <div className=" w-full flex items-center gap-x-4 py-6">
              <img
                src={garageDetail.data.user[0].avatar}
                alt=""
                className=" rounded-full size-10 object-cover"
              />
              <div className="flex flex-col gap-y-px">
                <div className=" text-md text-[#222222] font-semibold">
                  {garageDetail.data.user[0].name}
                </div>
                <div className=" text-md text-[#6a6a6a]">
                  {garageDetail.data.user[0].email}
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[#6a6a6a]/20 rounded-full"></div>

            <div className=" w-full py-8 flex flex-col gap-y-3">
              <div className=" flex items-center gap-x-4">
                <div className="size-10 flex items-start justify-center">
                  <Locate className=" text-black " size={20} />
                </div>
                <div className="flex flex-col gap-y-px">
                  <div className=" text-md text-[#222222] font-semibold">
                    Address
                  </div>
                  <div className=" text-md text-[#6a6a6a]">
                    {garageDetail.data.address}
                  </div>
                </div>
              </div>

              <div className=" flex items-center gap-x-4">
                <div className="size-10 flex items-start justify-center">
                  <Phone className=" text-black " size={20} />
                </div>
                <div className="flex flex-col gap-y-px">
                  <div className=" text-md font-semibold text-[#222222]">
                    Phone number
                  </div>
                  <div className=" text-md text-[#6a6a6a]">
                    {garageDetail.data.phone}
                  </div>
                </div>
              </div>

              <div className=" flex items-center gap-x-4">
                <div className="size-10 flex items-start justify-center">
                  <Activity className=" text-black" size={20} />
                </div>
                <div className="flex flex-col gap-y-px">
                  <div className=" text-md font-semibold text-[#222222]">
                    Warranty
                  </div>
                  <div className=" text-md text-[#6a6a6a]">
                    {garageDetail.data.warranty}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[#6a6a6a]/20 rounded-full"></div>

            <div className=" w-full pt-8 pb-10 flex flex-col gap-y-3">
              <div className=" text-lg font-semibold text-[#222222]">
                Description
              </div>
              <div className=" text-md text-[#6a6a6a]">
                {garageDetail.data.description}
              </div>
            </div>

            <div className="w-full h-px bg-[#6a6a6a]/20 rounded-full"></div>

            <div className=" w-full py-12 flex flex-col gap-y-3">
              <div className=" text-lg font-semibold text-[#222222] flex w-full justify-between items-center">
                Services
                <DialogService />
              </div>
              <Service />
            </div>
          </div>
          <div className=" hidden lg:block w-[40%] h-screen relative ">
            <div className="sticky top-[186px] flex justify-center lg:justify-end w-full">
              <CreateAppointment />
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-[#6a6a6a]/20 rounded-full"></div>
      </div>
    </div>
  );
};

export default GarageDetailPage;
