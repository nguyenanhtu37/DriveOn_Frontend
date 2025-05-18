import {
  Activity,
  DoorClosed,
  DoorOpen,
  Locate,
  Phone,
  Plus,
  Star,
  Workflow,
} from "lucide-react";
import Service from "./components/Service";
import { useGetGarageDetail } from "@/app/stores/entity/garage";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { DialogService } from "./components/DialogService";
import { CreateAppointment } from "./components/CreateAppointment";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FeedbackV2 from "./components/FeedbackV2";
import { LocationMap } from "./components/LocationMap";
import { getLocation } from "@/app/stores/view/user";
import { getDirectionStore } from "@/app/stores/view/direction";
import { useGetDriving } from "@/app/stores/entity/driving";
import { useTabStore } from "@/app/stores/view/tab";
import ServiceDetail from "./components/ServiceDetail";

const GarageDetailPage = () => {
  const { garageId } = useParams();
  const garageDetail = useGetGarageDetail(garageId);
  const navigate = useNavigate();
  const { setGarageView } = useTabStore();
  const location = getLocation();
  const { setDirection } = getDirectionStore();
  const getDriving = useGetDriving();
  const handleGetDirection = (garageDestination) => {
    const origin = {
      lat: location[0],
      lon: location[1],
    };
    const destination = {
      lat: garageDestination[1],
      lon: garageDestination[0],
    };
    getDriving.mutate(
      {
        origin,
        destination,
      },
      {
        onSuccess: (data) => {
          const route = data.routes[0].geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]);

          console.log(route, "route");
          setDirection(route);
          setGarageView("map");
          navigate("/");
        },
      }
    );
  };

  if (garageDetail.isLoading) return <Loading />;

  const averageRating = garageDetail.data.ratingAverage || 0;

  return (
    <div className="relative bg-gray-50">
      <div className="w-full py-10 px-4 md:px-20">
        <div className="w-full max-w-[1280px] flex flex-col mx-auto">
          {/* Hero Section */}
          <div className="max-h-[560px] grid md:grid-cols-2 gap-3 rounded-3xl overflow-hidden shadow-lg">
            <div className="w-full">
              <img
                className="w-full aspect-[4/3] object-cover hover:opacity-90 transition-all ease-in-out duration-300 transform "
                src={garageDetail.data.interiorImages[0] || "/placeholder.svg"}
                alt="Garage Interior"
              />
            </div>
            <div className="hidden md:grid w-full grid-cols-2 gap-3">
              {garageDetail.data.interiorImages.slice(1, 5).map((img) => (
                <div key={img} className="w-full h-full overflow-hidden">
                  <img
                    className="w-full aspect-[4/3] object-cover hover:opacity-90 transition-all ease-in-out duration-300 transform "
                    src={img || "/placeholder.svg"}
                    alt="Garage Interior"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="relative w-full flex flex-col justify-between lg:flex-row items-start mt-6">
            <div className="w-full lg:w-[50%] flex-col items-start bg-white rounded-xl p-6">
              {/* Garage Info */}
              <div className="py-6 flex flex-col w-full gap-2">
                <div className="flex items-center">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {garageDetail.data.name}
                  </h2>
                  {/* Display average rating next to the garage name */}
                  <div className="ml-4 flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                    <Star size={18} className="text-yellow-500 mr-1" />
                    <span className="font-semibold text-yellow-700">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {garageDetail.data.description}
                </span>
              </div>

              {/* Owner Info */}
              <div className="w-full flex items-center gap-x-4 py-6 bg-gray-50 rounded-xl p-4">
                <img
                  src={garageDetail.data.user[0].avatar || "/placeholder.svg"}
                  alt="Owner Avatar"
                  className="rounded-full size-14 object-cover border-2 border-white shadow-sm"
                />
                <div className="flex flex-col gap-y-1">
                  <div className="text-lg text-gray-800 font-bold">
                    {garageDetail.data.user[0].name}
                  </div>
                  <div className="text-md text-gray-600">
                    {garageDetail.data.user[0].email}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="w-full py-6 flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="size-12 flex items-center justify-center bg-red-50 rounded-full">
                    <Locate className="text-red-500" size={22} />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div className="text-md text-gray-800 font-semibold">
                      Address
                    </div>
                    <div className="text-md text-gray-600">
                      {garageDetail.data.address}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-x-4 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="size-12 flex items-center justify-center bg-blue-50 rounded-full">
                    <Phone className="text-blue-500" size={22} />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div className="text-md font-semibold text-gray-800">
                      Phone number
                    </div>
                    <div className="text-md text-gray-600">
                      {garageDetail.data.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-x-4 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="size-12 flex items-center justify-center bg-green-50 rounded-full">
                    <Activity className="text-green-500" size={22} />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div className="text-md font-semibold text-gray-800">
                      Open Hours
                    </div>
                    <div className="text-md text-gray-600 flex items-center gap-x-3">
                      <span className="flex items-center gap-x-1 bg-white px-2 py-1 rounded-md shadow-sm">
                        <DoorOpen className="text-green-500" size={16} />
                        {garageDetail.data.openTime}
                      </span>
                      <span className="text-gray-400">to</span>
                      <span className="flex items-center gap-x-1 bg-white px-2 py-1 rounded-md shadow-sm">
                        <DoorClosed className="text-red-500" size={16} />
                        {garageDetail.data.closeTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-x-4 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="size-12 flex items-center justify-center bg-purple-50 rounded-full">
                    <Workflow className="text-purple-500" size={22} />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div className="text-md font-semibold text-gray-800">
                      Work on days
                    </div>
                    <div className="text-md text-gray-600 flex flex-wrap gap-2 mt-1">
                      {garageDetail.data.operating_days.map((day, index) => (
                        <span
                          key={index}
                          className="bg-white px-3 py-1 rounded-md shadow-sm text-sm"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-gray-200 my-2"></div>

              {/* Description */}
              <div className="w-full pt-6 pb-8 flex flex-col gap-y-3">
                <div className="text-xl font-bold text-gray-800">
                  Description
                </div>
                <div className="text-md text-gray-600 leading-relaxed bg-gray-50 ">
                  {garageDetail.data.description}
                </div>
              </div>

              <div className="w-full h-px bg-gray-200 my-2"></div>

              {/* Description */}
              <div className="w-full pt-6 pb-8 flex flex-col gap-y-3">
                <div className="text-xl font-bold text-gray-800 flex justify-between items-end">
                  <span>Location</span>
                  {location && (
                    <span
                      className=" text-xs font-semibold cursor-pointer  hover:underline text-red-400 transition-all ease-in-out duration-200"
                      onClick={() =>
                        handleGetDirection(
                          garageDetail.data.location.coordinates
                        )
                      }
                    >
                      Get Directions
                    </span>
                  )}
                </div>
                <div className=" h-[300px] rounded-xl overflow-hidden shadow-sm">
                  <LocationMap garage={garageDetail.data} />
                </div>
              </div>

              <div className="w-full h-px bg-gray-200 my-2"></div>
            </div>

            {/* Appointment Sticky Section */}
            <div className="hidden lg:block w-[40%] h-screen relative">
              <div className="sticky top-[186px] flex justify-center lg:justify-end w-full">
                <CreateAppointment />
              </div>
            </div>
          </div>
          <div className=" w-full h-px shadow-sm"></div>
          {/* Services */}
          <div className="w-full py-8 flex flex-col gap-y-4 z-0">
            <div className="text-xl font-bold text-gray-800 flex w-full justify-between items-center">
              Services
              <DialogService />
              <ServiceDetail />
            </div>
            <Service />
          </div>

          <div className="w-full h-px bg-gray-200 my-2"></div>
          <FeedbackV2 />
        </div>
      </div>
      <div className="sticky w-fit left-4 bottom-20 lg:hidden z-40">
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-fit py-4 px-4 bg-red-500 text-white rounded-full shadow-xl hover:bg-red-600 transition-colors duration-200 ease-in-out flex items-center justify-center">
              <Plus size={24} />
            </button>
          </DialogTrigger>
          <DialogContent className="p-0 border-none rounded-xl">
            <CreateAppointment />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GarageDetailPage;
