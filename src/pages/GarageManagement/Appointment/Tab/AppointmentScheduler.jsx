import Calendar from "@/components/Calendar";

import TagAppointment from "@/components/TagAppointment";
import { Card } from "@/components/ui/card";
import { useMemo } from "react";

export const AppointmentScheduler = ({ appointments }) => {
  const formattedAppointments = useMemo(() => {
    return appointments.map((appointment) => {
      return {
        ...appointment,
        id: appointment._id,
        title: appointment.service[0].name,
        start: new Date(appointment.start),
        end: new Date(appointment.end),
        status: appointment.status,
      };
    });
  }, [appointments]);

  return (
    <Card className="h-screen p-4 bg-white">
      <Calendar
        events={formattedAppointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100% - 80px)" }}
        selectable
        onNavigate={(date) => console.log(date)}
        onView={(view) => console.log(view)}
        components={{ event: TagAppointment }}
      />
    </Card>
  );
};
