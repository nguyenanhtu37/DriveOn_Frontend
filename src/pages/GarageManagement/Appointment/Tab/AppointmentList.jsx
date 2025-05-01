import CardAppointment from "@/components/CardAppointment";

export const AppointmentList = ({ appointments }) => {
  return (
    <div id="appointment-list" className="flex flex-col w-full p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Appointment List</h1>
      <div
        id="appointment-cards"
        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 items-start flex-wrap justify-start"
      >
        {appointments?.map((appointment) => (
          <CardAppointment
            key={appointment._id}
            id={appointment._id}
            clientName={appointment.user.name}
            notes={appointment.note}
            status={appointment.status}
            clientImage={appointment.user.avatar}
            location={appointment.user.address}
            start={appointment.start}
            end={appointment.end}
            serviceName={appointment.service.map((s) => s.name).join(", ")}
            vehicle={appointment.vehicle.carName}
            avatar={appointment.user.avatar}
          />
        ))}
      </div>
    </div>
  );
};
