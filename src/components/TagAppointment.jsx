import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CardAppointment from "./CardAppointment";
const TagAppointment = ({ event }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="">{event.title}</div>
      </DialogTrigger>
      <DialogContent>
        <CardAppointment
          date="May 15, 2023"
          time="2:30 PM"
          doctorName="Dr. Jane Smith"
          doctorSpecialty="Cardiologist"
          appointmentType="Video Consultation"
          status="upcoming"
        />
      </DialogContent>
    </Dialog>
  );
};

export default TagAppointment;
