"use client";

import {
  useApproveGarage,
  useGetRegisterGarageDetail,
  useRejectGarage,
} from "@/app/stores/entity/garage";
import { Loading } from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Check,
  Clock,
  Info,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const ViewRegisterGarageDetail = () => {
  const { id } = useParams();
  const garageFetch = useGetRegisterGarageDetail(id);
  const garage = garageFetch.data;
  const [selectedImage, setSelectedImage] = useState(0);

  const approveGarage = useApproveGarage();
  const rejectGarage = useRejectGarage();

  const handleApprove = () => {
    approveGarage.mutate(id);
  };

  const handleReject = () => {
    rejectGarage.mutate(id, {});
  };

  if (garageFetch.isLoading) return <Loading />;

  const getStatusBadge = (status) => {
    if (status === "rejected")
      return (
        <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
          {status}
        </Badge>
      );
    if (status === "disabled")
      return (
        <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">
          {status}
        </Badge>
      );
    return (
      <Badge className="bg-green-100 text-green-600 hover:bg-green-100">
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-1 text-red-400">
          {garage.name}
        </h1>
        <p className="text-sm text-gray-500">
          Garage registration details. Review information before approval.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Header with status */}
        <div className="bg-white rounded-lg border p-5">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-50 rounded-md">
                <MapPin className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-sm text-gray-500 mt-1">{garage.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {garage.status.map((status, index) => (
                <div key={index}>{getStatusBadge(status)}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-red-50 rounded-md">
                <Phone className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-sm text-gray-500 mt-1">{garage.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-50 rounded-md">
                <Mail className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-sm text-gray-500 mt-1">{garage.email}</p>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white rounded-lg border p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-red-50 rounded-md">
                <Clock className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-medium">Working Hours</h3>
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                  <p>Open: {garage.openTime}</p>
                  <p>Close: {garage.closeTime}</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-50 rounded-md">
                <Calendar className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-medium">Operating Days</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {garage.operating_days.map((day, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-white text-xs"
                    >
                      {day.substring(0, 3)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {garage.description && (
          <div className="bg-white rounded-lg border p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-50 rounded-md">
                <Info className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {garage.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Images */}
        {garage.interiorImages && garage.interiorImages.length > 0 && (
          <div className="bg-white rounded-lg border p-5">
            <h3 className="font-medium mb-4 flex items-center">
              <div className="p-1 bg-red-50 rounded-md mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-400"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              Interior Images
            </h3>
            <div className="mb-4">
              <img
                src={garage.interiorImages[selectedImage] || "/placeholder.svg"}
                alt="garage interior"
                className="w-full h-[300px] object-cover rounded-md"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {garage.interiorImages.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer ${
                    selectedImage === index ? "ring-2 ring-red-400" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Owner Information */}
        {garage.user && garage.user.length > 0 && (
          <div className="bg-white rounded-lg border p-5">
            <h3 className="font-medium mb-4 flex items-center">
              <div className="p-1 bg-red-50 rounded-md mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-400"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              Owner Information
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-400 font-medium">
                  {garage.user[0].name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium">{garage.user[0].name}</p>
                <p className="text-sm text-gray-500">{garage.user[0].email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-2">
          <Button
            onClick={handleReject}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-2" /> Reject
          </Button>
          <Button
            onClick={handleApprove}
            className="bg-red-400 hover:bg-red-500 text-white"
          >
            <Check className="h-4 w-4 mr-2" /> Approve
          </Button>
        </div>
      </div>
    </div>
  );
};
