import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CardAppointment from "./CardAppointment";

const TagAppointment = ({ event }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{event.title}</div>
      </DialogTrigger>
      <DialogContent className="p-0">
        <CardAppointment
          key={event._id}
          id={event._id}
          clientName={event.user.name}
          notes={event.note}
          status={event.status}
          clientImage={event.user.avatar}
          location={event.user.address}
          start={event.start}
          end={event.end}
          serviceName={event.service.map((s) => s.name).join(", ")}
          vehicle={event.vehicle.carName}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TagAppointment;
