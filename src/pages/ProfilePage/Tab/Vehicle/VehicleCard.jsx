"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  EllipsisVertical,
  Edit,
  Trash2,
  Calendar,
  Hash,
  Palette,
} from "lucide-react";
import { useGetHistoryMaintenance } from "@/app/stores/entity/vehicleV2";

const VehicleCard = ({ vehicle, onEdit, onDelete, onView, ...props }) => {
  const { carBrand, carName, carYear, carPlate, carImages, carColor } =
    vehicle || {};

  const historyMaintenance = useGetHistoryMaintenance(vehicle?._id);

  console.log("VehicleCard - historyMaintenance:", historyMaintenance.data);

  return (
    <div
      className="group relative rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 overflow-hidden cursor-pointer transform hover:-translate-y-1"
      {...props}
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={
            carImages && carImages.length > 0
              ? carImages[0]
              : "/placeholder.svg?height=200&width=300"
          }
          alt={carName || "Vehicle"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Action Menu */}
        <div className="absolute top-3 right-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full shadow-sm"
              >
                <EllipsisVertical size={16} className="text-gray-600" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1" align="end">
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sm"
                  onClick={() => onEdit?.(vehicle)}
                >
                  <Edit size={14} className="mr-2" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => onDelete?.(vehicle)}
                >
                  <Trash2 size={14} className="mr-2" />
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Brand Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm text-gray-700 font-medium"
          >
            {carBrand?.brandName || "Unknown Brand"}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-1">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 truncate">
              {carName || "Vehicle Name"}
            </h3>
            <div className="flex items-center text-gray-500">
              <Calendar size={14} className="mr-1" />
              <span className="text-sm font-medium">{carYear || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-1">
          {/* License Plate */}
          <div className="flex items-center justify-between p-1 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-600">
              <Hash size={16} className="mr-2" />
              <span className="text-sm font-medium">License Plate</span>
            </div>
            <span className="font-mono font-bold text-gray-900 bg-white px-2 py-1 rounded border">
              {carPlate || "N/A"}
            </span>
          </div>

          {/* Color */}
          {carColor && (
            <div className="flex items-center justify-between p-1 bg-gray-50 rounded-lg">
              <div className="flex items-center text-gray-600">
                <Palette size={16} className="mr-2" />
                <span className="text-sm font-medium">Color</span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: carColor.toLowerCase() }}
                />
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {carColor}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200"
            onClick={() => onView?.(vehicle)}
          >
            View maintenance history
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
