"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentScheduler } from "./Tab/AppointmentScheduler";
import { AppointmentList } from "./Tab/AppointmentList";
import { useParams } from "react-router-dom";
import { useGetGarageDetail } from "@/app/stores/entity/garage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Filter, LockIcon } from "lucide-react";
import Reminder from "./Tab/Reminder";
import { useGetAppointmentByGarageId } from "@/app/stores/entity/appointment";
import { useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputDate } from "@/components/ui/inputDate";
import { Checkbox } from "@/components/ui/checkbox";
import { Loading } from "@/components/Loading";

const Appointment = () => {
  const { garageId } = useParams();
  const garage = useGetGarageDetail(garageId);
  const [tabsValue, setTabsValue] = useState("list");
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
  const hasPro = garage.data?.tag === "pro" || false;

  return (
    <Tabs
      value={tabsValue}
      onValueChange={setTabsValue}
      className="min-h-screen bg-gray-100 py-6 sm:px-6 lg:px-8 flex flex-col gap-y-4"
    >
      <TabsList className="w-fit px-1 py-4 bg-white">
        <TabsTrigger value="list">List</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-flex items-center">
                <TabsTrigger
                  value="reminder"
                  disabled={!hasPro}
                  className="relative group flex items-center gap-x-1"
                >
                  Reminder
                  {!hasPro && (
                    <span className="text-gray-400">
                      <LockIcon size={14} />
                    </span>
                  )}
                </TabsTrigger>
              </div>
            </TooltipTrigger>
            {!hasPro && (
              <TooltipContent side="bottom">
                <p>Available only for PRO garages</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </TabsList>

      {tabsValue !== "reminder" && (
        <div
          id="appointment-header"
          className="flex justify-between items-center gap-x-3 w-full"
        >
          <div className="flex justify-start items-center gap-x-2 px-2 py-1 rounded-lg bg-white w-full ">
            <div className=" flex justify-start items-center gap-x-2">
              <h4 className="text-lg font-semibold">Appointment:</h4>
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
      )}

      {appointmentData.isLoading ? (
        <Loading />
      ) : filteredAppointments.length > 0 ? (
        <>
          <TabsContent value="list">
            <AppointmentList appointments={filteredAppointments} />
          </TabsContent>
          <TabsContent value="schedule">
            <AppointmentScheduler appointments={filteredAppointments} />
          </TabsContent>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full mt-6">
          <h2 className="text-xl font-semibold">No Appointments Found</h2>
          <p className="text-gray-500">Try again.</p>
        </div>
      )}
      <TabsContent value="reminder">
        {hasPro ? (
          <Reminder />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="bg-gray-100 p-4 rounded-full">
                <LockIcon size={32} className="text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold">PRO Feature</h2>
              <p className="text-gray-500 max-w-md">
                Reminder functionality is only available for garages with PRO
                status.
              </p>
            </div>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default Appointment;
