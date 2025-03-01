import Calendar from "@/components/Calendar";
import { useCallback, useState } from "react";
import { CreateAppointment } from "../../components/CreateAppointment";

import TagAppointment from "@/components/TagAppointment";

export const AppointmentScheduler = () => {
  const [appointments, setAppointments] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newAppointment, setNewAppointment] = useState({});
  const handleSelectSlot = useCallback(({ start, end }) => {
    setNewAppointment({ start, end });
    setIsDialogOpen(true);
  }, []);
  return (
    <div className="h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Appointment Scheduler</h1>
      <Calendar
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100% - 80px)" }}
        selectable
        onNavigate={(date) => console.log(date)}
        onView={(view) => console.log(view)}
        onSelectSlot={handleSelectSlot}
        components={{ event: TagAppointment }}
      />
      <CreateAppointment
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        setAppointments={setAppointments}
        newAppointment={newAppointment}
        setNewAppointment={setNewAppointment}
        appointments={appointments}
      />
    </div>
  );
};
