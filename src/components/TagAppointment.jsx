import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CardAppointment from "./CardAppointment";
import { cn } from "@/lib/utils";

const TagAppointment = ({ event }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800";
      case "Accepted":
        return "bg-blue-100 border-l-4 border-blue-500 text-blue-800";
      case "Completed":
        return "bg-green-100 border-l-4 border-green-500 text-green-800";
      case "Cancelled":
        return "bg-red-100 border-l-4 border-red-500 text-red-800";
      default:
        return "bg-gray-100 border-l-4 border-gray-500 text-gray-800";
    }
  };

  const statusClass = getStatusStyles(event.status);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={cn("p-1 rounded w-full h-full", statusClass)}>
          <div className="font-semibold">{event.title}</div>
          <div className="text-xs">{event.user?.name}</div>
        </div>
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
