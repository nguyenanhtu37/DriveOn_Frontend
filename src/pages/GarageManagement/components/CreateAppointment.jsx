import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";

const vehicles = [
  { id: 1, make: "Toyota", model: "Corolla", year: 2020 },
  { id: 2, make: "Honda", model: "Civic", year: 2019 },
  { id: 3, make: "Ford", model: "Mustang", year: 2021 },
];

const services = [
  { id: 1, name: "Oil Change", duration: 30 },
  { id: 2, name: "Tire Rotation", duration: 45 },
  { id: 3, name: "Brake Inspection", duration: 60 },
];

export const CreateAppointment = ({
  isDialogOpen,
  setIsDialogOpen,
  setAppointments,
  newAppointment,
  setNewAppointment,
  appointments,
}) => {
  const handleSaveAppointment = () => {
    if (
      newAppointment.vehicleId &&
      newAppointment.serviceId &&
      newAppointment.start &&
      newAppointment.end
    ) {
      const vehicle = vehicles.find((v) => v.id === newAppointment.vehicleId);
      const service = services.find((s) => s.id === newAppointment.serviceId);
      if (vehicle && service) {
        const appointment = {
          id: Date.now(),
          title: `${vehicle.make} ${vehicle.model} - ${service.name}`,
          start: newAppointment.start,
          end: newAppointment.end,
          vehicleId: newAppointment.vehicleId,
          serviceId: newAppointment.serviceId,
        };
        console.log(appointment);
        setAppointments([...appointments, appointment]);
        setIsDialogOpen(false);
        setNewAppointment({});
      }
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule New Appointment</DialogTitle>
          <DialogDescription>
            Fill in the details for the new appointment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="vehicle">Vehicle</Label>
            <Select
              value={newAppointment.vehicleId?.toString()}
              onValueChange={(value) =>
                setNewAppointment((prev) => ({
                  ...prev,
                  vehicleId: Number.parseInt(value),
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id?.toString()}>
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="service">Service</Label>
            <Select
              value={newAppointment.serviceId?.toString()}
              onValueChange={(value) =>
                setNewAppointment((prev) => ({
                  ...prev,
                  serviceId: Number.parseInt(value),
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id?.toString()}>
                    {service.name} ({service.duration} min)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="start">Start Time</Label>
            <Input
              id="start"
              type="datetime-local"
              value={
                newAppointment.start
                  ? moment(newAppointment.start).format("YYYY-MM-DDTHH:mm")
                  : ""
              }
              onChange={(e) =>
                setNewAppointment((prev) => ({
                  ...prev,
                  start: new Date(e.target.value),
                }))
              }
            />
          </div>
          <div>
            <Label htmlFor="end">End Time</Label>
            <Input
              id="end"
              type="datetime-local"
              value={
                newAppointment.end
                  ? moment(newAppointment.end).format("YYYY-MM-DDTHH:mm")
                  : ""
              }
              onChange={(e) =>
                setNewAppointment((prev) => ({
                  ...prev,
                  end: new Date(e.target.value),
                }))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveAppointment}>Save Appointment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
