import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentScheduler } from "./Tab/AppointmentScheduler";
import { useGetAppointmentByGarageId } from "@/app/stores/entity/appointment";
import { useParams } from "react-router-dom";
import { AppointmentList } from "./Tab/AppointmentList";

const Appointment = () => {
  return (
    <Tabs
      defaultValue="list"
      className="min-h-screen bg-gray-100 py-6 sm:px-6 lg:px-8 flex flex-col gap-y-4 "
    >
      <TabsList className=" w-fit px-1 py-4 bg-white">
        <TabsTrigger value="list">List</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>
      <TabsContent value="list">
        <AppointmentList />
      </TabsContent>
      <TabsContent value="schedule">
        <AppointmentScheduler />
      </TabsContent>
    </Tabs>
  );
};

export default Appointment;
