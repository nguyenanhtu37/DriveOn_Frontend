import Calendar from "@/components/Calendar";

import TagAppointment from "@/components/TagAppointment";
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
    <div className="h-screen p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Appointment Scheduler</h1>
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
    </div>
  );
};
