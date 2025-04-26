import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search } from "lucide-react";
import { useState } from "react";
import { ReminderCard } from "../../components/ReminderCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetNextMaintenance } from "@/app/stores/entity/appointment";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reminder = () => {
  const { garageId } = useParams();

  const appointmentData = useGetNextMaintenance(garageId);

  const appointments = appointmentData.data.appointments || [];
  const calledAppointments = appointments.filter(
    (app) => app.isCalled === true
  );

  const uncalledAppointments = appointments.filter(
    (app) => app.isCalled === false
  );

  return (
    <div className=" mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reminders</h1>
          <p className="text-muted-foreground">
            Manage upcoming maintenance reminders
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Reminder
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer, vehicle or plate number..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6">
          <TabsTrigger value="called" className="mr-2">
            Call Reminders
          </TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Reminders</TabsTrigger>
        </TabsList>
        <TabsContent value="called">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Called Reminders</CardTitle>
              <CardDescription>April 25, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calledAppointments.map((appointment) => (
                  <ReminderCard
                    key={appointment._id}
                    appointment={appointment}
                    // onSendReminder={handleSendReminder}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uncalledAppointments.map((appointment) => (
                  <ReminderCard
                    key={appointment._id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reminder;
