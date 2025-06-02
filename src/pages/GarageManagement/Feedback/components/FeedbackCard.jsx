import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Car, Wrench } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export function FeedbackCard({ feedback }) {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: vi });
  };

  const formatAppointmentDate = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
  };

  const getServiceInfo = () => {
    if (feedback.type === "specific") {
      const service = feedback.appointment.service.find(
        (s) => s._id === feedback.serviceDetail
      );
      return {
        type: "specific",
        serviceName: service?.name || "Dịch vụ không xác định",
        allServices: feedback.appointment.service,
      };
    } else {
      // For general feedback, show all services
      return {
        type: "general",
        serviceName: "Đánh giá tổng quát",
        allServices: feedback.appointment.service,
      };
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={feedback.user.avatar || "/placeholder.svg"}
                alt={feedback.user.name}
              />
              <AvatarFallback>{feedback.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{feedback.user.name}</h3>
              <p className="text-xs text-muted-foreground">
                {formatDate(feedback.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className={`flex items-center text-yellow-500`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= feedback.rating ? "fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium ml-1">{feedback.rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm">{feedback.content}</p>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Wrench className="h-3 w-3" />
            <span>
              {getServiceInfo().type === "specific" ? "Service: " : "Rating: "}
              {getServiceInfo().serviceName}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Car className="h-3 w-3" />
            <span>
              {feedback.appointment.vehicle.carName} -{" "}
              {feedback.appointment.vehicle.carPlate}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>
              Appointment schedule:{" "}
              {formatAppointmentDate(feedback.appointment.start)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            {getServiceInfo().type === "specific"
              ? "All services in appointment:"
              : "Services:"}
          </div>
          <div className="flex flex-wrap gap-1">
            {getServiceInfo().allServices.map((service) => (
              <Badge
                key={service._id}
                variant={
                  getServiceInfo().type === "specific" &&
                  feedback.serviceDetail &&
                  service._id === feedback.serviceDetail._id
                    ? "default"
                    : "secondary"
                }
                className="text-xs"
              >
                {service.name}
                {getServiceInfo().type === "specific" &&
                  feedback.serviceDetail &&
                  service._id === feedback.serviceDetail._id && (
                    <span className="ml-1">⭐</span>
                  )}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
