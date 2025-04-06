import Calendar from "@/components/Calendar";
import { useCallback, useEffect, useState } from "react";
import { CreateAppointment } from "../../components/CreateAppointment";

import TagAppointment from "@/components/TagAppointment";
import { useGetAppointmentByGarageId } from "@/app/stores/entity/appointment";
import { useParams } from "react-router-dom";

export const AppointmentScheduler = () => {
  const { garageId } = useParams();
  const appointmentData = useGetAppointmentByGarageId(garageId);

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const formattedAppointments = appointmentData.data.map((appointment) => {
      return {
        ...appointment,
        id: appointment._id,
        title: appointment.service[0].name,
        start: new Date(appointment.start),
        end: new Date(appointment.end),
      };
    });
    setAppointments(formattedAppointments);
  }, [appointmentData.data]);

  return (
    <div className="h-screen p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Appointment Scheduler</h1>
      <Calendar
        events={appointments}
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
