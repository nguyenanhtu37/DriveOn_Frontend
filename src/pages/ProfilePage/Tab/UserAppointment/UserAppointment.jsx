import { isBefore, parseISO } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useGetAppointmentByUserId } from "@/app/stores/entity/appointment";
import { GarageAppointmentCard } from "./GarageAppointmentCard";

export const UserAppointment = () => {
  const appointmentData = useGetAppointmentByUserId();

  const isPastAppointment = (appointmentDate) => {
    const today = new Date();
    return isBefore(parseISO(appointmentDate), today);
  };

  const upcomingAppointments = appointmentData.data
    .filter(
      (app) => !isPastAppointment(app.start) && app.status !== "Cancelled"
    )
    .sort((a, b) => new Date(a.start) - new Date(b.start));

  const cancelAppointments = appointmentData.data
    .filter((app) => app.status === "Cancelled")
    .sort((a, b) => new Date(b.start) - new Date(a.start));
  const pastAppointments = appointmentData.data
    .filter((app) => isPastAppointment(app.end) && app.status !== "Cancelled")
    .sort((a, b) => new Date(b.end) - new Date(a.end));

  return (
    <TabsContent value="appointments" className="space-y-6 mt-6">
      <div>
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your appointment</CardTitle>
              <CardDescription>Manage all appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="mb-4">
                  <TabsTrigger value="upcoming">
                    Upcoming ({upcomingAppointments.length})
                  </TabsTrigger>
                  <TabsTrigger value="past">
                    Past ({pastAppointments.length})
                  </TabsTrigger>
                  <TabsTrigger value="cancel">
                    Cancel ({cancelAppointments.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className=" space-y-4">
                  {upcomingAppointments.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      Bạn không có lịch hẹn nào sắp tới
                    </div>
                  ) : (
                    upcomingAppointments.map((appointment) => (
                      <GarageAppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                      />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="past" className="space-y-4">
                  {pastAppointments.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      You have no past appointments
                    </div>
                  ) : (
                    pastAppointments.map((appointment) => (
                      <GarageAppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                      />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="cancel" className="space-y-4">
                  {pastAppointments.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      You have no cancelled appointments.
                    </div>
                  ) : (
                    cancelAppointments.map((appointment) => (
                      <GarageAppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                      />
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
};
