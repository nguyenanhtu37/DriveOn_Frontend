import {
  useApproveGarage,
  useGetRegisterGarageDetail,
  useRejectGarage,
} from "@/app/stores/entity/garage";
import { Loading } from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ActivitySquare,
  Check,
  DoorClosed,
  DoorOpen,
  Image,
  Info,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";

import { useParams } from "react-router-dom";

export const ViewRegisterGarageDetail = () => {
  const { id } = useParams();

  const garageFetch = useGetRegisterGarageDetail(id);
  const garage = garageFetch.data;

  const approveGarage = useApproveGarage();
  const rejectGarage = useRejectGarage();
  const handleApprove = () => {
    approveGarage.mutate(id);
  };
  const handleReject = () => {
    rejectGarage.mutate(id, {});
  };
  if (garageFetch.isLoading) return <Loading />;
  return (
    <div className=" px-7 pt-7 w-full flex flex-col gap-y-5 items-start">
      <Card className="w-full  mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="bg-gradient-to-r bg-[#cdcdcd]  text-white shadow-md">
          <CardTitle className="text-2xl font-bold flex items-center justify-between">
            <div className=" flex items-center justify-start">
              <Info className="mr-2" />
              {garage.name}
            </div>
            <div className="flex justify-end">
              <Badge>{garage.status}</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 p-6">
          <div className="pt-4">
            <h3 className="font-semibold text-lg mb-4 flex items-center justify-center p-2 rounded-md border shadow-sm">
              <User className="w-5 h-5 mr-2 text-red-500" />
              Garage owner
            </h3>
            <div className=" flex flex-col gap-6 ">
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/640781/pexels-photo-640781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="user"
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div className="ml-3 flex items-center">
                  <h3 className="font-semibold text-lg mb-1">
                    Trần Viết Ngọc Tâm
                  </h3>
                  <p className="text-gray-600">{garage.user.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mt-1 mr-3 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Personal Address
                  </h3>
                  <p className="text-gray-600">{garage.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 mt-1 mr-3 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Phone Garage</h3>
                  <p className="text-gray-600">{garage.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 mt-1 mr-3 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Phone Garage</h3>
                  <p className="text-gray-600">{garage.phone}</p>
                </div>
              </div>
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-4 flex items-center justify-center p-2 rounded-md border shadow-sm">
            <Info className="w-5 h-5 mr-2 text-red-500" />
            Garage Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mt-1 mr-3 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Address</h3>
                <p className="text-gray-600">{garage.address}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <Phone className="w-5 h-5 mt-1 mr-3 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Phone Garage</h3>
                  <p className="text-gray-600">{garage.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 mt-1 mr-3 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-gray-600">{garage.email}</p>
                </div>
              </div>
            </div>
          </div>
          {garage.description && (
            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Info className="w-5 h-5 mr-2 text-red-500" />
                Description
              </h3>
              <p className="text-gray-600">{garage.description}</p>
            </div>
          )}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <ActivitySquare className="w-5 h-5 mr-2 text-red-500" />
              Working
            </h3>
            <div className=" flex justify-start items-center gap-4">
              <div className=" flex items-center">
                <DoorOpen className="w-5 h-5 mr-2  " />
                {garage.openTime}
              </div>
              <div className=" flex items-center">
                <DoorClosed className="w-5 h-5 mr-2  " />
                {garage.closeTime}
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Image className="w-5 h-5 mr-2 text-red-500" />
              Garage Image
            </h3>
            <div className=" flex justify-start items-center flex-wrap gap-4">
              {garage.interiorImages.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt="garage"
                  className=" size-36 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end items-center gap-4">
          <Button
            onClick={handleReject}
            variant="ghost"
            className="font-semibold text-red-500 hover:text-red-600"
          >
            <X className=" h-4 w-4" /> Reject
          </Button>
          <Button
            onClick={handleApprove}
            variant="ghost"
            className=" text-green-500 hover:text-green-600 font-semibold"
          >
            <Check className=" h-4 w-4" /> Approve
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
