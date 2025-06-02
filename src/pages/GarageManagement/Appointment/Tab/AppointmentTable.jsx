import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Car, Clock, MapPin, User, Wrench } from "lucide-react";
import { Pagination } from "../../components/Pagination";
import { useNavigate, useParams } from "react-router-dom";

export const AppointmentTable = ({ appointmentsData, setPage, setSize }) => {
  const navigate = useNavigate();

  const { garageId } = useParams();

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

  const { currentPage, totalPages, totalCount, hasNextPage, hasPrevPage } =
    appointmentsData.data.pagination;

  const handlePageChange = (page, size) => {
    setPage(page);
    setSize(size);
  };
  const handleSizeChange = (size) => {
    setSize(size);
    setPage(1);
  };

  return (
    <div className="mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            List of Vehicle Maintenance Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Customers</TableHead>
                  <TableHead className="min-w-[120px]">Vehicle</TableHead>
                  <TableHead className="min-w-[150px]">Garage</TableHead>
                  <TableHead className="min-w-[200px]">Service</TableHead>
                  <TableHead className="min-w-[150px]">Time</TableHead>
                  <TableHead className="min-w-[100px]">Total</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointmentsData.data.appointments.map((appointment) => (
                  <TableRow
                    key={appointment._id}
                    onClick={() =>
                      navigate(
                        `/garageManagement/${garageId}/appointments/${appointment._id}`
                      )
                    }
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {appointment.user.name}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {appointment.user.email}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            {appointment.vehicle.carName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {appointment.vehicle.carPlate}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{appointment.garage.name}</p>
                        <div className="flex items-start gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {appointment.garage.address}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-2">
                        {appointment.service.map((service) => (
                          <div
                            key={service._id}
                            className="border-l-2 border-blue-200 pl-2"
                          >
                            <div className="flex items-center gap-1">
                              <Wrench className="h-3 w-3 text-muted-foreground" />
                              <p className="text-sm font-medium">
                                {service.name}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <div className="h-3 w-3" />
                                {formatCurrency(service.price)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {service.duration}p
                              </span>
                            </div>
                          </div>
                        ))}
                        <div className="pt-1 border-t">
                          <p className="text-xs font-medium">
                            Total time:{" "}
                            {calculateTotalDuration(appointment.service)}{" "}
                            minutes
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Get Started:</span>
                          <br />
                          {formatDate(appointment.start)}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">End:</span>
                          <br />
                          {formatDate(appointment.end)}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <p className="font-bold text-lg">
                        {formatCurrency(
                          calculateTotalPrice(appointment.service)
                        )}
                      </p>
                    </TableCell>

                    <TableCell>
                      {getStatusBadge(appointment.status)}
                      {/* {appointment.assignedStaff && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Assigned
                        </p>
                      )} */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onPageChange={handlePageChange}
            onSizeChange={handleSizeChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
