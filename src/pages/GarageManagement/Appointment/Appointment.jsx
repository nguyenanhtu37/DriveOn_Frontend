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
import { LockIcon } from "lucide-react";

const Appointment = () => {
  const { garageId } = useParams();
  const garage = useGetGarageDetail(garageId);

  // Check if garage has pro tag
  const hasPro = garage.data?.tag === "pro" || false;

  return (
    <Tabs
      defaultValue="list"
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

      <TabsContent value="list">
        <AppointmentList />
      </TabsContent>
      <TabsContent value="schedule">
        <AppointmentScheduler />
      </TabsContent>
      <TabsContent value="reminder">
        {hasPro ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Reminders</h2>
            <p>Reminder functionality for PRO garages</p>
            {/* Reminder content would go here */}
          </div>
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
