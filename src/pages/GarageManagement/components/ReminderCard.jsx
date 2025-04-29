import { useIsCalledAppointment } from "@/app/stores/entity/appointment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  CalendarClock,
  Car,
  Clock,
  FileText,
  Tag,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { CreateAppointment } from "./CreateAppointment";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

export const ReminderCard = ({ appointment }) => {
  const query = useQueryClient();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const callMutation = useIsCalledAppointment();
  const handleCall = () => {
    callMutation.mutate(appointment._id, {
      onSuccess: () => {
        query.invalidateQueries(["appointment", "next-maintenance"]);
        toast({
          title: "Update success",
          duration: 2000,
        });
      },
    });
  };
  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">{appointment.user.name}</h3>
                <p className="text-muted-foreground">
                  {appointment.vehicle.carName} • {appointment.vehicle.carPlate}
                </p>
                <div className="flex items-center mt-2 text-sm">
                  <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(appointment.nextMaintenance)}</span>
                  <Clock className="ml-3 mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{formatTime(appointment.nextMaintenance)}</span>
                </div>
                {/* s */}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Badge
                variant={appointment.daysLeft <= 3 ? "destructive" : "default"}
                className="mb-2"
              >
                {appointment.daysLeft} days left
              </Badge>
              {!appointment.isCalled ? (
                <div className="flex flex-col gap-y-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    View
                  </Button>
                </div>
              ) : (
                <Badge className="bg-green-600">Called</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <CreateAppointment
        appointment={appointment}
        open={isOpenCreate}
        onOpenChange={setIsOpenCreate}
      />
      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              View the details of this appointment.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Status and Tag */}
            <div className="flex items-center justify-between">
              <Badge
                variant={
                  appointment.status === "Completed" ? "success" : "default"
                }
              >
                {appointment.status}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {appointment.tag}
              </Badge>
            </div>

            <Separator />

            {/* Date and Time */}
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Date & Time:</span>
                <span>
                  {format(new Date(appointment.start), "MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm ml-6">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  {format(new Date(appointment.start), "h:mm a")} -{" "}
                  {format(new Date(appointment.end), "h:mm a")}
                </span>
              </div>
            </div>

            <Separator />

            {/* Customer Information */}
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">Customer:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 ml-6 text-sm">
                <span className="text-muted-foreground">Name:</span>
                <span>{appointment.user.name}</span>

                <span className="text-muted-foreground">Email:</span>
                <span className="truncate">{appointment.user.email}</span>

                <span className="text-muted-foreground">Phone:</span>
                <span>{appointment.user.phone}</span>
              </div>
            </div>

            <Separator />

            {/* Vehicle Information */}
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">Vehicle:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 ml-6 text-sm">
                <span className="text-muted-foreground">Model:</span>
                <span>{appointment.vehicle.carName}</span>

                <span className="text-muted-foreground">Plate:</span>
                <span>{appointment.vehicle.carPlate}</span>
              </div>
            </div>

            <Separator />

            {/* Service Information */}
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">Service:</span>
              </div>
              <div className="ml-6 text-sm">
                {appointment.service.map((service) => (
                  <Badge
                    key={service._id}
                    variant="secondary"
                    className="mr-2 mb-1"
                  >
                    {service.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Notes */}
            {appointment.note && (
              <>
                <Separator />
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">Notes:</span>
                  </div>
                  <div className="ml-6 text-sm">
                    <p>{appointment.note}</p>
                  </div>
                </div>
              </>
            )}

            {/* Next Maintenance */}
            {appointment.nextMaintenance && (
              <>
                <Separator />
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">
                      Next Maintenance:
                    </span>
                  </div>
                  <div className="ml-6 text-sm">
                    <p>
                      {format(
                        new Date(appointment.nextMaintenance),
                        "MMMM d, yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </>
            )}

            <>
              <Separator />
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={appointment._id}
                    defaultChecked={appointment.isCalled}
                    onChanged={handleCall}
                  />
                  <label
                    htmlFor={appointment._id}
                    className="font-medium text-sm"
                  >
                    Mark as called
                  </label>
                </div>
              </div>
            </>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false);
                setIsOpenCreate(true);
              }}
            >
              Create Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
