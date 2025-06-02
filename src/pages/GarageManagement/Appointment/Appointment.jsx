"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentScheduler } from "./Tab/AppointmentScheduler";
import { useParams } from "react-router-dom";
import { useGetGarageDetail } from "@/app/stores/entity/garage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Filter, LockIcon, X } from "lucide-react";
import Reminder from "./Tab/Reminder";
import { useGetAppointmentByGarageId } from "@/app/stores/entity/appointment";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { InputDate } from "@/components/ui/inputDate";
import { Checkbox } from "@/components/ui/checkbox";
import { Loading } from "@/components/Loading";
import { AppointmentTable } from "./Tab/AppointmentTable";

const Appointment = () => {
  const { garageId } = useParams();
  const garage = useGetGarageDetail(garageId);
  const [tabsValue, setTabsValue] = useState("list");
  const [startDate, setStartDate] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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

  const payload = {
    garageId: garageId,
    startDate: startDate ? startDate.toISOString() : null,
    endDate: endDate ? endDate.toISOString() : null,
    filterStatus: filterStatus.length > 0 ? filterStatus.join(",") : null,
    page: page,
    limit: limit,
  };

  const appointmentsData = useGetAppointmentByGarageId(payload);

  const hasPro = garage.data?.tag === "pro" || false;

  useEffect(() => {
    setPage(1);
  }, [startDate, endDate, filterStatus]);

  useEffect(() => {
    if (tabsValue === "schedule") {
      setLimit(1000);
      setPage(1);
    }
    if (tabsValue === "list") {
      setLimit(10);
    }
  }, [tabsValue]);

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
          className="flex justify-start items-center gap-x-3 w-full"
        >
          <Popover>
            <PopoverTrigger asChild>
              <div
                id="sort-button"
                className="flex items-center gap-x-2 font-semibold text-sm cursor-pointer px-4 py-2 bg-white border  rounded-md hover:bg-gray-50"
              >
                {(startDate || endDate) && (
                  <X
                    size={14}
                    className="text-gray-500"
                    onClick={() => {
                      setStartDate(null);
                      setEndDate(null);
                    }}
                  />
                )}
                Date <Filter size={14} className="text-gray-500" />
                {(startDate || endDate) && (
                  <span className=" text-xs text-gray-500">
                    {startDate ? `From: ${startDate.toLocaleDateString()}` : ""}
                    {endDate ? ` To: ${endDate.toLocaleDateString()}` : ""}
                  </span>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent
              id="sort-options"
              align="start"
              className="w-[400px]"
            >
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
              <div
                id="sort-button"
                className="flex items-center gap-x-2 font-semibold text-sm cursor-pointer px-4 py-2 bg-white border  rounded-md hover:bg-gray-50"
              >
                {filterStatus.length > 0 && (
                  <X
                    size={14}
                    className="text-gray-500"
                    onClick={() => {
                      setFilterStatus([]);
                    }}
                  />
                )}
                Status <Filter size={14} className="text-gray-500" />
                {filterStatus.length > 0 && (
                  <span className="text-xs text-gray-500 text-red-400">
                    {filterStatus.join(", ")}
                  </span>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent id="sort-options" align="start" className="w-40">
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

      {appointmentsData.isLoading ? (
        <Loading />
      ) : appointmentsData.data.appointments.length > 0 ? (
        <>
          <TabsContent value="list">
            <AppointmentTable
              appointmentsData={appointmentsData}
              setPage={setPage}
            />
          </TabsContent>
          <TabsContent value="schedule">
            <AppointmentScheduler
              appointments={appointmentsData.data.appointments}
            />
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
