import { useGetAppointmentByGarageId } from "@/app/stores/entity/appointment";
import CardAppointment from "@/components/CardAppointment";
import { useParams } from "react-router-dom";

export const AppointmentList = () => {
  const { garageId } = useParams();
  const appointmentData = useGetAppointmentByGarageId(garageId);

  return (
    <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4  items-start flex-wrap justify-start">
      {appointmentData.data.map((appointment) => (
        <CardAppointment
          key={appointment._id}
          id={appointment._id}
          clientName={appointment.user.name}
          date={appointment.date}
          notes={appointment.note}
          status={appointment.status}
          clientImage={appointment.user.avatar}
          location={appointment.user.address}
          start={appointment.start}
          end={appointment.end}
          serviceName={appointment.service.map((s) => s.name).join(", ")}
          vehicle={appointment.vehicle.carName}
        />
      ))}
    </div>
  );
};
