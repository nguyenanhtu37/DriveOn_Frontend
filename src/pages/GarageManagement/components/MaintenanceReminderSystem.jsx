import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Bell, Calendar, Eye, X } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  useGetNextMaintenance,
  useIsCalledAppointment,
} from "@/app/stores/entity/appointment";
import { useState } from "react";
import { AppointmentReminderDialog } from "./AppointmentReminderDialog";
import { CreateAppointment } from "./CreateAppointment";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export default function MaintenanceReminderSystem() {
  const { garageId } = useParams();

  const appointmentData = useGetNextMaintenance(garageId);

  const mutation = useIsCalledAppointment();
  const queryClient = useQueryClient();

  const appointments = appointmentData.data.appointments || [];

  const [appointmentSelected, setAppointmentSelected] = useState();

  const [open, setOpen] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);

  const handleViewDetail = (appointment) => {
    console.log(appointment);
    setOpen(true);
    setAppointmentSelected(appointment);
  };

  // reduce the appointment data to 2 arrays: one for upcoming reminders and one for processed reminders with isCalled //
  const upcomingReminders = appointments.filter(
    (appointment) => appointment.isCalled === false
  );
  const processedReminders = appointments.filter(
    (appointment) => appointment.isCalled === true
  );

  const handleCallAppointment = (appointment) => {
    mutation.mutate(appointment._id, {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "appointment",
          "next-maintenance",
          garageId,
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
    <>
      <Card className="w-full  mx-auto">
        <CardHeader>
          <CardTitle>Maintenance Reminder System</CardTitle>
          <CardDescription>
            Configure and send maintenance reminders to customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4 ">
              <TabsTrigger value="upcoming">Upcoming Reminders</TabsTrigger>
              <TabsTrigger value="processed">
                Reminder has been processed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className=" flex flex-col gap-4 mt-0">
              {upcomingReminders.length === 0 && (
                <div className="flex items-center justify-center w-full h-full p-4 text-muted-foreground">
                  No upcoming reminders
                </div>
              )}
              {upcomingReminders?.map((appointment) => (
                <div
                  key={appointment._id}
                  className="hover:shadow-md transition-all duration-200 ease-in-out"
                >
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {appointment.vehicle?.carName} (
                          {appointment.vehicle?.carPlate})
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.user?.name} • {appointment.user?.phone}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs">
                            {new Date(
                              appointment.nextMaintenance
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            at{" "}
                            {new Date(
                              appointment.nextMaintenance
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {appointment.daysLeft !== undefined && (
                            <span className="text-xs text-orange-500 font-medium">
                              ({appointment.daysLeft}{" "}
                              {appointment.daysLeft === 1 ? "day" : "days"}{" "}
                              left)
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetail(appointment)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Detail
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleCallAppointment(appointment)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Close Reminder
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent
              value="processed"
              className=" flex flex-col gap-4 mt-0"
            >
              {processedReminders.length === 0 && (
                <div className="flex items-center justify-center w-full h-full p-4 text-muted-foreground">
                  No processed reminders
                </div>
              )}
              {processedReminders?.map((appointment) => (
                <div
                  key={appointment._id}
                  className="hover:shadow-md transition-all duration-200 ease-in-out"
                >
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {appointment.vehicle?.carName} (
                          {appointment.vehicle?.carPlate})
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.user?.name} • {appointment.user?.phone}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs">
                            {new Date(
                              appointment.nextMaintenance
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            at{" "}
                            {new Date(
                              appointment.nextMaintenance
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {appointment.daysLeft !== undefined && (
                            <span className="text-xs text-orange-500 font-medium">
                              ({appointment.daysLeft}{" "}
                              {appointment.daysLeft === 1 ? "day" : "days"}{" "}
                              left)
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetail(appointment)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t p-4 bg-muted/50">
          <div className="flex items-center text-sm text-muted-foreground">
            <Bell className="h-4 w-4 mr-2" />
            <span>Reminders sent automatically 7 days in advance</span>
          </div>
        </CardFooter>
      </Card>
      <AppointmentReminderDialog
        appointment={appointmentSelected}
        open={open}
        setOpen={setOpen}
        setOpenCreate={setOpenCreate}
      />
      {openCreate && (
        <CreateAppointment
          open={openCreate}
          setOpen={setOpenCreate}
          appointment={appointmentSelected}
        />
      )}
    </>
  );
}
