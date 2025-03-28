import { Car, ClipboardList, FileText, Info } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CardAppointment from "@/components/CardAppointment";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const AppointmentDetail = () => {
  // const { id } = useParams();
  const appointmentDetails = {
    date: "May 15, 2023",
    time: "2:30 PM",
    doctorName: "Dr. Jane Smith",
    doctorSpecialty: "Cardiologist",
    appointmentType: "Video Consultation",
    status: "upcoming",
    notes:
      "Follow-up appointment to discuss recent test results and adjust medication if necessary.",
    preparationInstructions: [
      "Fast for 8 hours before the appointment",
      "Bring a list of current medications",
      "Wear comfortable clothing",
    ],
    documents: [
      { name: "Previous Test Results", type: "PDF" },
      { name: "Medical History", type: "PDF" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className=" py-6 sm:px-6 lg:px-8 animate-fade">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              {/* <CardAppointment {...appointmentDetails} hiddenButton={true} /> */}
            </div>
            <div className="lg:w-2/3 space-y-6">
              <Accordion
                type="multiple"
                className=" flex flex-col gap-2"
                collapsible
              >
                <Card>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <CardHeader className=" w-full">
                        <CardTitle className="flex items-center">
                          <Info className="w-5 h-5 mr-2" />
                          Appointment Notes
                        </CardTitle>
                      </CardHeader>
                    </AccordionTrigger>
                    <AccordionContent>
                      <CardContent>
                        <p>{appointmentDetails.notes}</p>
                      </CardContent>
                    </AccordionContent>
                  </AccordionItem>
                </Card>

                <Card>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Car className="w-5 h-5 mr-2" />
                          Vehicle information using the service
                        </CardTitle>
                      </CardHeader>
                    </AccordionTrigger>
                    <AccordionContent>
                      <CardContent>
                        <div className=" flex items-start gap-6">
                          <img
                            src="https://images.pexels.com/photos/30562891/pexels-photo-30562891/free-photo-of-outdoor-vehicle-storage-system-with-toolbox.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt=""
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                          <div className=" flex flex-col items-start">
                            <span className=" font-semibold text-lg">
                              2019 Toyota Corolla
                            </span>
                            <span className=" text-sm text-gray-500">
                              Plate Number: ABC 123
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
                <Card>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <ClipboardList className="w-5 h-5 mr-2" />
                          Services Requested
                        </CardTitle>
                      </CardHeader>
                    </AccordionTrigger>
                    <AccordionContent>
                      <CardContent>
                        <ul className="space-y-2">
                          {appointmentDetails.documents.map((doc, index) => (
                            <li key={index} className="flex items-center">
                              <FileText className="w-4 h-4 mr-2" />
                              <span>{doc.name}</span>
                              <span className="ml-2 text-sm text-gray-500">
                                ({doc.type})
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              </Accordion>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppointmentDetail;
