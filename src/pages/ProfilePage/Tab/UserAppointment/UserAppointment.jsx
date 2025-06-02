import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

import { useGetAppointmentByUserId } from "@/app/stores/entity/appointment";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Car, Clock, MapPin, Wrench } from "lucide-react";
import { Pagination } from "@/pages/GarageManagement/components/Pagination";
import { Badge } from "@/components/ui/badge";
import { AppointmentCard } from "./CardAppointment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GarageAppointmentCard } from "./GarageAppointmentCard";

export const UserAppointment = () => {
  const [status, setStatus] = useState("Upcoming");

  const [selected, setSelected] = useState();
  // const [keyword, setKeyword] = useState();
  const [page, setPage] = useState(1);
  const payload = {
    status: status,
    page: page,
    limit: 5,
  };

  const appointmentData = useGetAppointmentByUserId(payload);

  const { currentPage, totalPages, totalCount, hasNextPage, hasPrevPage } =
    appointmentData.data.pagination ?? {
      currentPage: 1,
      totalPages: 1,
      totalCount: 0,
      hasNextPage: false,
      hasPrevPage: false,
    };

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

  useEffect(() => {
    setPage(1);
  }, [status]);

  return (
    <>
      <TabsContent value="appointments" className="space-y-6 mt-6">
        <div>
          <div className="md:col-span-2 space-y-6 ">
            <Card className="min-h-[500px]">
              <CardHeader className="flex md:flex-row md:items-end justify-between">
                <div className="flex flex-col gap-y-2">
                  <CardTitle>Your appointment</CardTitle>
                  <CardDescription>Manage all appointments</CardDescription>
                </div>
                <div className="flex justify-end items-center gap-x-4">
                  {/* <Input
                    placeholder="Search by vehicle name or garage name"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-[300px] md:w-[400px]"
                  /> */}
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Upcoming">Upcoming</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="hidden md:table-header-group">
                      <TableRow>
                        <TableHead className="min-w-[120px]">Vehicle</TableHead>
                        <TableHead className="min-w-[150px]">Garage</TableHead>
                        <TableHead className="min-w-[200px]">Service</TableHead>
                        <TableHead className="min-w-[150px]">Time</TableHead>
                        <TableHead className="min-w-[100px]">Total</TableHead>
                        <TableHead className="min-w-[100px]">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    {appointmentData.isLoading ? (
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={6} className="text-center">
                            <div className=" py-4 flex justify-center items-center">
                              <div className="animate-spin rounded-full size-12 border-t-4 border-b-4 border-red-500"></div>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ) : (
                      <>
                        {/* Desktop table view */}
                        <TableBody className="hidden md:table-row-group">
                          {appointmentData.data.appointments?.map(
                            (appointment) => (
                              <TableRow
                                key={appointment._id}
                                onClick={() => {
                                  setSelected(appointment);
                                }}
                              >
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
                                    <p className="font-medium">
                                      {appointment.garage.name}
                                    </p>
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
                                        {calculateTotalDuration(
                                          appointment.service
                                        )}{" "}
                                        minutes
                                      </p>
                                    </div>
                                  </div>
                                </TableCell>

                                <TableCell>
                                  <div className="space-y-1">
                                    <p className="text-sm">
                                      <span className="font-medium">
                                        Get Started:
                                      </span>
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
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>

                        <TableBody className="md:hidden">
                          <TableRow>
                            <TableCell
                              colSpan={6}
                              className="p-0 border-0"
                            ></TableCell>
                          </TableRow>
                        </TableBody>
                      </>
                    )}

                    {!appointmentData.isLoading && (
                      <div className="md:hidden flex flex-col gap-y-4 mt-4">
                        {appointmentData.data.appointments?.map(
                          (appointment) => (
                            <AppointmentCard
                              key={appointment._id}
                              appointment={appointment}
                              onClick={() => {
                                setSelected(appointment);
                              }}
                            />
                          )
                        )}
                      </div>
                    )}
                  </Table>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalCount={totalCount}
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                  onPageChange={setPage}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        {selected && (
          <Dialog open={selected} onOpenChange={() => setSelected(null)}>
            <DialogContent
              hiddenClose={true}
              className="max-w-4xl max-h-[90vh] p-0 border-none overflow-y-auto"
            >
              <GarageAppointmentCard
                appointment={selected}
                setSelected={setSelected}
              />
            </DialogContent>
          </Dialog>
        )}
      </TabsContent>
    </>
  );
};
