"use client";
import { format, parseISO } from "date-fns";
import {
  Car,
  Calendar,
  Clock,
  MapPin,
  User,
  FileText,
  Tag,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCancelAppointment } from "@/app/stores/entity/appointment";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const GarageAppointmentCard = ({ appointment }) => {
  const cancelAppointment = useCancelAppointment();
  const queryClient = useQueryClient();
  const handleCancel = () => {
    cancelAppointment.mutate(appointment._id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["appointment", "user"]);
        toast({
          title: "Appointment cancelled",
          description: "Your appointment has been cancelled.",
          duration: 2000,
        });
      },
      onError: (error) => {
        console.error("Error cancelling appointment:", error);
      },
    });
  };
  // Format dates
  const startDate = parseISO(appointment.start);
  const endDate = parseISO(appointment.end);
  const formattedDate = format(startDate, "EEEE, MMMM d, yyyy");
  const startTime = format(startDate, "h:mm a");
  const endTime = format(endDate, "h:mm a");

  // Calculate total price
  const totalPrice = appointment.service.reduce(
    (sum, service) => sum + service.price,
    0
  );

  // Format price to VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "confirmed":
        return "default";
      case "completed":
        return "success";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="w-full  overflow-hidden">
      <CardHeader className="bg-primary/5 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">
              {appointment.garage.name}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{appointment.garage.address}</span>
            </div>
          </div>
          <Badge variant={getStatusVariant(appointment.status)}>
            {appointment.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Date and Time */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            <span className="font-medium">
              {startTime} - {endTime}
            </span>
          </div>
        </div>

        <Separator />

        {/* Vehicle Information */}
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Car className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Vehicle</h3>
            <p className="text-sm text-muted-foreground">
              {appointment.vehicle.carName}
            </p>
            <p className="text-sm font-medium">
              {appointment.vehicle.carPlate}
            </p>
          </div>
        </div>

        {/* Customer Information */}
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Customer</h3>
            <p className="text-sm text-muted-foreground">
              {appointment.user.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {appointment.user.email}
            </p>
          </div>
        </div>

        <Separator />

        {/* Services */}
        <div>
          <h3 className="font-medium mb-2">Services</h3>
          <div className="space-y-3">
            {appointment.service.map((service) => (
              <div
                key={service._id}
                className="flex justify-between items-center bg-accent/50 p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {service.images && service.images.length > 0 ? (
                    <Avatar className="h-10 w-10 rounded-md">
                      <AvatarImage src={service.images[0]} alt={service.name} />
                      <AvatarFallback className="rounded-md">
                        {service.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-10 w-10 bg-primary/20 rounded-md flex items-center justify-center">
                      <span className="text-primary font-medium">
                        {service.name.substring(0, 2)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {service.duration} minutes
                    </p>
                  </div>
                </div>
                <p className="font-medium">{formatPrice(service.price)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-3 font-medium">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>

        {/* Note */}
        {appointment.note && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <FileText className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-700">Note</h3>
                <p className="text-sm text-yellow-700">{appointment.note}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tag */}
        <div className="flex items-center">
          <Tag className="h-4 w-4 mr-1 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {appointment.tag}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between bg-muted/30 pt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Reschedule</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Change appointment date and time</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {appointment.status === "Pending" && (
          <div className="space-x-2">
            <Dialog>
              <DialogTrigger>
                <Button variant="destructive">Cancel</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Cancel Appointment</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel this appointment?
                </DialogDescription>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => handleCancel()}>
                    Yes, Cancel
                  </Button>
                  <DialogTrigger>
                    <Button variant="ghost">No, Keep</Button>
                  </DialogTrigger>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {appointment.status === "Confirmed" && <Button>Check In</Button>}

        {appointment.status === "Completed" && (
          <Button variant="outline">Book Again</Button>
        )}
      </CardFooter>
    </Card>
  );
};
