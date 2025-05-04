import { useIsCalledAppointment } from "@/app/stores/entity/appointment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

import {
  CalendarCheck,
  CalendarClock,
  Car,
  Clock,
  Plus,
  Wrench,
  X,
} from "lucide-react";

export const AppointmentReminderDialog = ({
  appointment,
  open,
  setOpen,
  setOpenCreate,
}) => {
  const mutation = useIsCalledAppointment();
  const queryClient = useQueryClient();
  if (!appointment) return null;

  const endDate = new Date(appointment.end).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format the next maintenance date
  const nextMaintenanceDate = new Date(
    appointment.nextMaintenance
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format the time
  const nextMaintenanceTime = new Date(
    appointment.nextMaintenance
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Determine urgency based on days left
  const getUrgencyColor = (daysLeft) => {
    if (daysLeft <= 1) return "bg-red-100 text-red-800 border-red-200";
    if (daysLeft <= 3) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  const urgencyClass = getUrgencyColor(appointment.daysLeft);

  const handleCallAppointment = () => {
    mutation.mutate(appointment._id, {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "appointment",
          "next-maintenance",
          appointment.garage,
        ]);
        toast({
          title: "Success",
          description: "Appointment closed successfully",
          duration: 2000,
        });
        setOpen(false);
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: error.response?.data.error,
          duration: 2000,
        });
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] p-3">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-bold">
                {appointment.vehicle.carName}
              </CardTitle>
              <CardDescription className="mt-1">
                {appointment.vehicle.carPlate}
              </CardDescription>
            </div>
            <Badge variant="outline" className={`${urgencyClass} font-medium`}>
              {appointment.daysLeft}{" "}
              {appointment.daysLeft === 1 ? "day" : "days"} left
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {appointment.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {appointment.user.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {appointment.user.phone}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CalendarCheck className="h-4 w-4  text-blue-300" />
                <span>{endDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarClock className="h-4 w-4  text-green-600" />
                <span>{nextMaintenanceDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-green-600" />
                <span>{nextMaintenanceTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Car className="h-4 w-4 text-red-400" />
                <span>
                  {appointment.vehicle.carName} ({appointment.vehicle.carPlate})
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Services:</p>
              <div className="flex flex-wrap gap-2">
                {appointment.service.map((service) => (
                  <div
                    key={service._id}
                    className="flex items-center gap-1.5 text-xs bg-secondary px-2 py-1 rounded-md"
                  >
                    <Wrench className="h-3 w-3" />
                    <span>{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center gap-4 pb-2">
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="hover:text-red-400">
              Cancel
            </Button>
          </DialogTrigger>
          <div className=" flex justify-center items-center gap-4">
            {!appointment.isCalled && (
              <Button size="sm" onClick={handleCallAppointment}>
                <X className="h-4 w-4 mr-1" />
                Close Reminder
              </Button>
            )}
            <Button
              size="sm"
              className="bg-red-400 hover:bg-red-500 text-white"
              onClick={() => {
                setOpenCreate(true);
                setOpen(false);
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Appointment
            </Button>
          </div>
        </CardFooter>
      </DialogContent>
    </Dialog>
  );
};
