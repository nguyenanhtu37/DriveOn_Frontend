import { Badge } from "@/components/ui/badge";
import { Car, MapPin, Wrench, Clock } from "lucide-react";

export const AppointmentCard = ({ appointment, onClick }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: { variant: "secondary", color: "bg-yellow-100 text-yellow-800" },
      Completed: { variant: "default", color: "bg-green-100 text-green-800" },
      Cancelled: { variant: "destructive", color: "bg-red-100 text-red-800" },
      Accepted: { variant: "default", color: "bg-blue-100 text-blue-800" },
      Rejected: { variant: "destructive", color: "bg-red-100 text-red-800" },
    };

    const config = statusConfig[status] || statusConfig.Pending;

    return (
      <Badge variant={config.variant} className={config.color}>
        {status}
      </Badge>
    );
  };

  const calculateTotalPrice = (services) => {
    return services.reduce((total, service) => total + service.price, 0);
  };

  const calculateTotalDuration = (services) => {
    return services.reduce((total, service) => total + service.duration, 0);
  };
  return (
    <div
      className="block md:hidden border rounded-xl p-4 space-y-3 shadow-sm"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <Car className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="font-medium">{appointment.vehicle.carName}</p>
          <p className="text-xs text-muted-foreground">
            {appointment.vehicle.carPlate}
          </p>
        </div>
      </div>

      <div>
        <p className="font-medium">{appointment.garage.name}</p>
        <div className="flex items-start gap-1">
          <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
          <p className="text-xs text-muted-foreground">
            {appointment.garage.address}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {appointment.service.map((service) => (
          <div key={service._id} className="border-l-2 border-blue-200 pl-2">
            <div className="flex items-center gap-1">
              <Wrench className="h-3 w-3 text-muted-foreground" />
              <p className="text-sm font-medium">{service.name}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                {formatCurrency(service.price)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {service.duration}p
              </span>
            </div>
          </div>
        ))}
        <p className="text-xs font-medium pt-1 border-t">
          Total time: {calculateTotalDuration(appointment.service)} minutes
        </p>
      </div>

      <div className="text-sm space-y-1">
        <p>
          <span className="font-medium">Get Started:</span>
          <br />
          {formatDate(appointment.start)}
        </p>
        <p>
          <span className="font-medium">End:</span>
          <br />
          {formatDate(appointment.end)}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">
          {formatCurrency(calculateTotalPrice(appointment.service))}
        </p>
        {getStatusBadge(appointment.status)}
      </div>
    </div>
  );
};
