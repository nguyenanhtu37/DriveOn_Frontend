"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Wrench,
  DollarSign,
  CheckCircle,
  MessageSquare,
  Star,
} from "lucide-react";
import { useGetHistoryMaintenance } from "@/app/stores/entity/vehicleV2";
import { useSetDialogId } from "@/app/stores/view/dialog";

// Mock data - replace with actual API call

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const VehicleMaintenanceHistory = ({ vehicle, open, onClose }) => {
  const { data: maintenanceHistory } = useGetHistoryMaintenance(vehicle?._id);
  const totalSpent = maintenanceHistory.reduce((total, record) => {
    return (
      total +
      record.service.reduce(
        (serviceTotal, service) => serviceTotal + service.price,
        0
      )
    );
  }, 0);
  const setDialogId = useSetDialogId();

  const handleOpenUpdate = (appointment) => {
    setDialogId({ id: "UpdateFeedbackAppointment", data: appointment._id });
  };

  const handleOpen = (appointment) => {
    setDialogId({ id: "FeedbackAppointment", data: appointment._id });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Wrench className="h-5 w-5" />
            <span>Maintenance History - {vehicle?.carName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {maintenanceHistory.length}
                </div>
                <div className="text-sm text-gray-600">
                  Total number of maintenance
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalSpent)}
                </div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {maintenanceHistory.filter((r) => r.isFeedbacked).length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </CardContent>
            </Card>
          </div>

          {/* Maintenance Records */}
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              {maintenanceHistory.map((record) => (
                <Card key={record._id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(record.status)}>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {record.status}
                        </Badge>
                        <Badge variant="outline">{record.tag}</Badge>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(record.start)}
                        </div>
                      </div>
                    </div>

                    {/* Garage Info */}
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="font-medium">{record.garage.name}</div>
                        <div className="text-sm text-gray-600">
                          {record.garage.address}
                        </div>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-2 mb-3">
                      <div className="font-medium text-sm">Services:</div>
                      {record.service.map((service) => (
                        <div
                          key={service._id}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded"
                        >
                          <div className="flex items-center space-x-2">
                            <Wrench className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{service.name}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {service.duration}min
                            </div>
                            <div className="flex items-center font-medium">
                              <DollarSign className="w-3 h-3 mr-1" />
                              {formatCurrency(service.price)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Staff & Time */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage
                            src={
                              record.assignedStaff?.avatar || "/placeholder.svg"
                            }
                          />
                          <AvatarFallback>
                            <User className="w-3 h-3" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">
                          {record.assignedStaff?.name || "Unassigned"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>
                          {formatTime(record.start)} - {formatTime(record.end)}
                        </span>
                        {record.isFeedbacked ? (
                          <div
                            className="flex items-center text-yellow-600 cursor-pointer"
                            onClick={() => handleOpenUpdate(record)}
                          >
                            Edit Feedback
                          </div>
                        ) : (
                          <div
                            className="flex items-center cursor-pointer "
                            onClick={() => handleOpen(record)}
                          >
                            <Star className="w-3 h-3 mr-1" />
                            Feedback
                          </div>
                        )}
                      </div>
                    </div>

                    {record.note && (
                      <>
                        <Separator className="my-2" />
                        <div className="flex items-start space-x-2">
                          <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5" />
                          <div className="text-sm text-gray-600">
                            {record.note}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
