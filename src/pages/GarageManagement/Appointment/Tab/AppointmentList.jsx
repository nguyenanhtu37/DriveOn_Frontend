import { useGetAppointmentByGarageId } from "@/app/stores/entity/appointment";
import CardAppointment from "@/components/CardAppointment";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputDate } from "@/components/ui/inputDate";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";

import { Link, useParams } from "react-router-dom";

export const AppointmentList = () => {
  const { garageId } = useParams();
  const appointmentData = useGetAppointmentByGarageId(garageId);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filterStatus, setFilterStatus] = useState([]);
  const handleStatusFilter = (status) => {
    setFilterStatus((prev) => {
      if (prev.includes(status)) {
        return prev.filter((item) => item !== status);
      }
      return [...prev, status];
    });
  };

  const filteredAppointments = useMemo(() => {
    return (
      appointmentData.data?.filter((appointment) => {
        const appointMentStartDate = new Date(appointment.start);
        const appointMentEndDate = new Date(appointment.end);

        const adjustedEndDate = endDate
          ? new Date(new Date(endDate).setHours(23, 59, 59, 999))
          : null;

        const isWithinDateRange =
          (!startDate ||
            appointMentStartDate.getTime() >= new Date(startDate).getTime()) &&
          (!adjustedEndDate ||
            appointMentEndDate.getTime() <= adjustedEndDate.getTime());

        const isStatusIncluded =
          filterStatus.length === 0 ||
          filterStatus.includes(appointment.status);

        return isWithinDateRange && isStatusIncluded;
      }) || []
    );
  }, [appointmentData.data, endDate, filterStatus, startDate]);

  return (
    <div id="appointment-list" className="flex flex-col gap-y-4 w-full">
      <div
        id="appointment-header"
        className="flex justify-between items-center gap-x-3 w-full"
      >
        <div className="flex justify-start items-center gap-x-2 px-2 py-1 rounded-lg bg-white w-full ">
          <div className=" flex justify-start items-center gap-x-2">
            <h4 className="text-lg font-semibold">Appointment List</h4>
            <span className="text-sm text-gray-500">
              {filteredAppointments.length} appointments
            </span>
          </div>
          {startDate && (
            <>
              <div className=" h-4 w-px border border-black"></div>
              <div className="flex justify-start items-center gap-x-2">
                <span className="text-sm text-gray-500">
                  <b>StartDate:</b> {startDate.toLocaleDateString()}
                </span>
              </div>
            </>
          )}
          {endDate && (
            <>
              <div className=" h-4 w-px border border-black"></div>
              <div className="flex justify-start items-center gap-x-2">
                <span className="text-sm text-gray-500">
                  <b>EndDate:</b> {endDate.toLocaleDateString()}
                </span>
              </div>
            </>
          )}
          <div className=" h-4 w-px border border-black"></div>
          <div className="flex justify-start items-center gap-x-2 max-w-[320px]">
            <span className="text-sm text-gray-500 line-clamp-1 ">
              <b>Status:</b>{" "}
              {filterStatus.length > 0 ? filterStatus.join(", ") : "All"}
            </span>
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button id="sort-button" variant="outline">
              Date <Filter size={14} className="text-gray-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent id="sort-options" align="end" className="w-[400px]">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="flex flex-col items-start gap-y-2">
                <Label htmlFor="filter-start">Start Date</Label>
                <InputDate
                  setDate={setStartDate}
                  date={startDate}
                  align="end"
                />
              </div>

              <div className="flex flex-col items-start gap-y-2">
                <Label htmlFor="filter-start">End Date</Label>
                <InputDate setDate={setEndDate} date={endDate} align="end" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button id="sort-button" variant="outline">
              Status <Filter size={14} className="text-gray-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent id="sort-options" align="end" className="w-40">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <Checkbox
                  id="filter-pending"
                  checked={filterStatus.includes("Pending")}
                  onCheckedChange={() => handleStatusFilter("Pending")}
                />
                <Label htmlFor="filter-pending">Pending</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <Checkbox
                  id="filter-accepted"
                  checked={filterStatus.includes("Accepted")}
                  onCheckedChange={() => handleStatusFilter("Accepted")}
                />
                <Label htmlFor="filter-accepted">Accepted</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <Checkbox
                  id="filter-rejected"
                  checked={filterStatus.includes("Rejected")}
                  onCheckedChange={() => handleStatusFilter("Rejected")}
                />
                <Label htmlFor="filter-rejected">Rejected</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <Checkbox
                  id="filter-completed"
                  checked={filterStatus.includes("Completed")}
                  onCheckedChange={() => handleStatusFilter("Completed")}
                />
                <Label htmlFor="filter-completed">Completed</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <Checkbox
                  id="filter-cancelled"
                  checked={filterStatus.includes("Cancelled")}
                  onCheckedChange={() => handleStatusFilter("Cancelled")}
                />
                <Label htmlFor="filter-cancelled">Cancelled</Label>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div
        id="appointment-cards"
        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 items-start flex-wrap justify-start"
      >
        {filteredAppointments?.map((appointment) => (
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
