import {
  useCompleteAppointment,
  useConfirmAppointment,
  useDenyAppointment,
  useGetAppointmentById,
} from "@/app/stores/entity/appointment";
import { Loading } from "@/components/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/libs/utils";
import { format } from "date-fns";

import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Car,
  CarFront,
  Check,
  CheckCheck,
  CheckCircle2,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  RectangleHorizontal,
  Settings,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { VehicleImage } from "../components/VehicleImage";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentUpdate } from "@/schema";
import { Input } from "@/components/ui/input";

const AppointmentId = () => {
  const { control, reset, handleSubmit } = useForm({
    resolver: zodResolver(appointmentUpdate),
    defaultValues: {
      updatedEndTime: "",
      nextMaintenance: "",
    },
  });
  const { garageId, appointmentId } = useParams();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/garageManagement/${garageId}/appointments`);
  };
  const {
    data: appointmentData,
    isLoading,
    isError,
    refetch,
  } = useGetAppointmentById(appointmentId);

  const user = useMemo(() => {
    const userData = appointmentData?.user || {};
    return {
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      avatar: userData.avatar || "",
      address: userData.locale || "",
    };
  }, [appointmentData]);

  const appointment = useMemo(() => {
    return {
      id: appointmentData?.id || appointmentId,
      title: "Appointment information",
      status: appointmentData?.status || "proposal_sent", // proposal_sent, approved, rejected
      start: appointmentData?.start
        ? format(new Date(appointmentData.start), "EEEE, MMMM d, yyyy h:mm a")
        : "",
      end: appointmentData?.end
        ? format(new Date(appointmentData.end), "EEEE, MMMM d, yyyy h:mm a")
        : "",
      location:
        appointmentData?.location ||
        "4517 Washington Avenue, Manchester, KY 39495",
      tag: appointmentData?.tag || "",
      salesperson: appointmentData?.salesperson || "Ahmad Fawaid",
      salesAvatar:
        appointmentData?.salesAvatar || "/placeholder.svg?height=40&width=40",
      notes: appointmentData?.note || "",
      createdAt: appointmentData?.createdAt
        ? format(new Date(appointmentData.createdAt), "MMMM d, yyyy h:mm a")
        : "",
      services: appointmentData?.service ? appointmentData.service.length : 0,
    };
  }, [appointmentData, appointmentId]);
  const [status, setStatus] = useState();
  const confirmAppointmentMutation = useConfirmAppointment();
  const denyAppointmentMutation = useDenyAppointment();
  const completeAppointmentMutation = useCompleteAppointment();
  const handleConfirm = () => {
    confirmAppointmentMutation.mutate(appointmentId, {
      onSuccess: () => {
        setStatus("Accepted");
        toast({
          title: "Success",
          description: "Appointment confirmed successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.response.data.error,
          variant: "destructive",
        });
      },
    });
  };
  const handleReject = () => {
    denyAppointmentMutation.mutate(appointmentId, {
      onSuccess: () => {
        setStatus("Rejected");
        toast({
          title: "Success",
          description: "Appointment rejected successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.response.data.error,
          variant: "destructive",
        });
      },
    });
  };

  useEffect(() => {
    setStatus(appointmentData.status);
    reset({
      updatedEndTime: appointmentData.end,
    });
  }, [appointmentData, reset]);

  const handleComplete = handleSubmit(async (data) => {
    completeAppointmentMutation.mutate(
      {
        appointmentId,
        data: {
          ...data,
          updatedEndTime: new Date(data.updatedEndTime).toISOString(),
          nextMaintenance: new Date(data.nextMaintenance).toISOString(),
        },
      },
      {
        onSuccess: () => {
          refetch();
          toast({
            title: "Success",
            description: "Appointment completed successfully",
          });
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.response.data.error,
            variant: "destructive",
          });
        },
      }
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <Check className="h-3.5 w-3.5" />;
      case "Cancelled":
        return <AlertCircle className="h-3.5 w-3.5" />;
      case "cancelled":
        return <X className="h-3.5 w-3.5" />;
      case "Completed":
        return <Check className="h-3.5 w-3.5" />;
    }
  };
  if (isLoading) return <Loading />;
  if (isError) return <Navigate to="/notFound" />;
  return (
    <div className=" flex flex-col justify-start mx-auto px-8 py-6 max-w-7xl">
      <div className="flex w-full justify-start items-center">
        <Button variant="secondary" className="mb-6" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Appointments
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - User Information */}
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <h2 className="text-xl font-bold text-center">
                Contact Information
              </h2>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-center">
                  {user.name}
                </h3>
                {user.company && (
                  <p className="text-gray-500 text-Type">{user.company}</p>
                )}
                <Badge className="mt-2 bg-pink-100 text-pink-800 hover:bg-pink-100">
                  Car Owner
                </Badge>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div>{user.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div>{user.phone}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <h2 className="text-xl font-bold">Vehicle</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Car className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Car brand</div>
                    <div className="text-sm text-gray-500">
                      {appointmentData.vehicle.carBrand.brandName}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CarFront className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Car name</div>
                    <div className="text-sm text-gray-500">
                      {" "}
                      {appointmentData.vehicle.carName}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <RectangleHorizontal className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">Car Plate</div>
                    <div className="text-sm text-gray-500">
                      {appointmentData.vehicle.carPlate}
                    </div>
                  </div>
                </div>
              </div>

              <VehicleImage
                image={
                  "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Appointment Information */}
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <Badge
                variant="outline"
                className={cn("px-3 py-1", getStatusColor(status))}
              >
                {getStatusIcon(status)}
                <span className="ml-1 capitalize">{status}</span>
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Start</div>
                      <div className="font-medium">{appointment.start}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">End</div>
                      <div className="font-medium">{appointment.end}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Number of services booked
                      </div>
                      <div className="font-medium">{appointment.services}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Tag</div>
                      <div className="font-medium">{appointment.tag}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Created</div>
                      <div className="font-medium">{appointment.createdAt}</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-gray-600">{appointment.notes}</p>
              </div>

              {status !== "Completed" && (
                <div className="flex gap-3 mt-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <CheckCheck className="h-4 w-4 mr-2" />
                        Completed
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[600px] overflow-y-auto px-3">
                      <DialogTitle>Do you want to update the time?</DialogTitle>
                      <form>
                        <div className="w-full flex flex-col gap-y-5 mt-2">
                          <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-semibold text-[#222222]">
                              Update End Time
                            </label>
                            <Controller
                              name="updatedEndTime"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  id=""
                                  type="datetime-local"
                                  value={
                                    field.value
                                      ? format(
                                          new Date(field.value),
                                          "yyyy-MM-dd'T'HH:mm"
                                        )
                                      : ""
                                  }
                                  onChange={(e) =>
                                    field.onChange(e.target.value || null)
                                  }
                                  min={new Date(appointment.end)
                                    .toISOString()
                                    .slice(0, 16)}
                                />
                              )}
                            />
                          </div>
                          <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-semibold text-[#222222]">
                              Next Maintenance
                            </label>
                            <Controller
                              name="nextMaintenance"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  id=""
                                  type="datetime-local"
                                  value={field.value ?? ""}
                                  onChange={(e) =>
                                    field.onChange(e.target.value || null)
                                  }
                                  min={new Date(appointment.end)
                                    .toISOString()
                                    .slice(0, 16)}
                                />
                              )}
                            />
                          </div>
                          <div className="flex items-center justify-end"></div>
                          <Button
                            type="submit"
                            className="bg-red-400 hover:bg-red-500"
                            onClick={handleComplete}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Completed
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleConfirm}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Accepted
                  </Button>
                  <Button variant="outline" onClick={handleReject}>
                    <X className="h-4 w-4 mr-2" />
                    Rejected
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <h2 className="text-xl font-bold">Booked services</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointmentData.service.map((service) => (
                  <div
                    key={service._id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center gap-y-2 flex-shrink-0">
                        <Settings className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div
                          className="text-sm text-gray-500 line-clamp-2
                        "
                        >
                          {service.description}
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {service.duration} min
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentId;
