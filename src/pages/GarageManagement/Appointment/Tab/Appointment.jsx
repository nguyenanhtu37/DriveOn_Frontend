import CardAppointment from "@/components/CardAppointment";

const Appointment = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow animate-fade-down">
        <div className=" py-6 px-4 sm:px-6 lg:px-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Appointment Management
            </h1>
          </div>
        </div>
      </header>
      <main className=" py-6 sm:px-6 lg:px-8 animate-fade">
        <div className=" flex gap-2 items-center flex-wrap justify-start">
          <CardAppointment
            date="May 15, 2023"
            time="2:30 PM"
            doctorName="Dr. Jane Smith"
            doctorSpecialty="Cardiologist"
            appointmentType="Video Consultation"
            status="upcoming"
          />
        </div>
      </main>
    </div>
  );
};

export default Appointment;
