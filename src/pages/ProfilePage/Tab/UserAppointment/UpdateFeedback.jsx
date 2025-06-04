import { useGetAppointmentById } from "@/app/stores/entity/appointment";
import {
  useGetFeedbackByAppointmentId,
  useUpdateFeedback,
} from "@/app/stores/entity/feedbackV2";
import {
  useDialogData,
  useDialogOpen,
  useSetDialogId,
} from "@/app/stores/view/dialog";
import Rating from "@/components/Rating/Rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/utils";
import { format } from "date-fns";
import { Calendar, Car, Clock, MapPin, User, Wrench } from "lucide-react";
import { useEffect, useState } from "react";

const UpdateFeedback = () => {
  const isOpen = useDialogOpen("UpdateFeedbackAppointment");
  const appointmentId = useDialogData("UpdateFeedbackAppointment");

  const feedback = useGetFeedbackByAppointmentId(appointmentId);

  const updateFeedback = useUpdateFeedback();

  const [activeTab, setActiveTab] = useState("general");
  const setDialogId = useSetDialogId();

  const handleClose = () => {
    if (isOpen) {
      setDialogId({ id: null, data: null });
    }
  };

  const appointment = useGetAppointmentById(appointmentId);
  const appointmentData = appointment.data;

  const [generalRating, setGeneralRating] = useState(0);
  const [generalFeedback, setGeneralFeedback] = useState("");

  const [serviceFeedbacks, setServiceFeedbacks] = useState([]);

  const updateServiceFeedback = (serviceId, field, value) => {
    setServiceFeedbacks((prev) =>
      prev.map((sf) =>
        sf.service === serviceId ? { ...sf, [field]: value } : sf
      )
    );
  };

  const disableSubmitButton = () => {
    if (activeTab === "general") {
      return generalRating === 0;
    } else if (activeTab === "services") {
      return serviceFeedbacks.some((sf) => sf.rating === 0);
    }
    return true;
  };

  const handleSubmit = () => {
    let data = {};
    if (activeTab === "general") {
      data = {
        garage: appointmentData.garage._id,
        appointment: appointmentData._id,
        rating: generalRating,
        content: generalFeedback,
        type: "general",
      };
    } else if (activeTab === "services") {
      data = {
        type: "specific",
        garage: appointmentData.garage._id,
        appointment: appointmentData._id,
        specific: serviceFeedbacks,
      };
    }

    const payload = {
      appointmentId: appointmentData._id,
      data: data,
    };

    updateFeedback.mutate(payload, {
      onSuccess: () => {
        toast({
          title: "Feedback submitted",
          description: "Update feedback successful!",
          duration: 2000,
        });
        handleClose();
      },
      onError: (error) => {
        console.error("Error submitting feedback:", error);
        toast({
          title: "Error",
          description: "Failed to submit feedback. Please try again.",
          duration: 2000,
          variant: "destructive",
        });
      },
    });
  };

  useEffect(() => {
    if (feedback.isSuccess && appointment.isSuccess) {
      const initialFeedbacks = appointmentData.service.map((service) => ({
        service: service._id,
        rating: 0,
        content: "",
      }));
      if (feedback.data.length == 1 && feedback.data[0].type === "general") {
        setActiveTab("general");
        setGeneralRating(feedback.data[0].rating || 0);
        setGeneralFeedback(feedback.data[0].content || "");
        setServiceFeedbacks(initialFeedbacks);
      } else {
        setActiveTab("services");
        setGeneralRating(0);
        setGeneralFeedback("");
        setServiceFeedbacks(
          feedback.data.map((sf) => ({
            service: sf.serviceDetail,
            rating: sf.rating || 0,
            content: sf.content || "",
          }))
        );
      }
    }
  }, [
    appointment.isSuccess,
    appointmentData.service,
    feedback.data,
    feedback.isSuccess,
  ]);
  if (appointment.isLoading || appointmentId == null || feedback.isLoading)
    return null;
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none">
        <DialogHeader className="px-6 pt-6 pb-2 sticky top-0 left-0 right-0 bg-white z-10 border-b">
          <DialogTitle className="text-xl">Service Feedback</DialogTitle>
          <DialogDescription>
            Share your experience about the service you used
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 px-6">
          {/* Appointment Summary */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Appointment Details</h3>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {appointmentData.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>
                  {format(new Date(appointmentData.start), "dd/MM/yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>
                  {format(new Date(appointmentData.start), "dd/MM/yyyy hh:mm")}{" "}
                  - {format(new Date(appointmentData.end), "dd/MM/yyyy hh:mm")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-muted-foreground" />
                <span>
                  {appointmentData.vehicle.carName} (
                  {appointmentData.vehicle.carPlate})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{appointmentData.garage.name}</span>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Services Used
            </h4>
            {appointmentData.service.map((service) => (
              <div key={service._id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium">{service.name}</h5>
                  <span className="font-semibold text-primary">
                    {formatCurrency(service.price)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {service.description}
                </p>
                <div className="text-xs text-muted-foreground">
                  Duration: {service.duration} minutes
                </div>
              </div>
            ))}
          </div>

          {/* Staff Info */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={appointmentData.assignedStaff.avatar || "/placeholder.svg"}
              />
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Staff In Charge</p>
              <p className="text-sm text-muted-foreground">
                {appointmentData.assignedStaff.name}
              </p>
            </div>
          </div>

          <Separator />

          {/* Rating Section */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">Overall Feedback</TabsTrigger>
              <TabsTrigger value="services">
                Service-specific Feedback
              </TabsTrigger>
            </TabsList>

            {/* General Feedback Tab */}
            <TabsContent value="general" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">
                    Overall Rating *
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    How satisfied are you with the overall services?
                  </p>
                  <Rating
                    value={generalRating}
                    onChange={(value) => setGeneralRating(value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="general-feedback"
                    className="text-base font-medium"
                  >
                    Detailed feedback (optional)
                  </Label>
                  <Textarea
                    id="general-feedback"
                    placeholder="Share your overall experience regarding service quality, staff attitude, waiting time..."
                    rows={4}
                    className="resize-none"
                    value={generalFeedback}
                    onChange={(e) => setGeneralFeedback(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Service-specific Feedback Tab */}
            <TabsContent value="services" className="space-y-6 mt-6">
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Please rate each service to help us improve the quality of our
                  offerings
                </p>

                {appointmentData.service.map((service) => {
                  const serviceFeedback = serviceFeedbacks.find(
                    (sf) => sf.service === service._id
                  );
                  return (
                    <Card key={service._id} className="border">
                      <CardHeader className="pb-3">
                        <div className="flex gap-4">
                          {service.images && service.images.length > 0 && (
                            <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={service.images[0] || "/placeholder.svg"}
                                alt={service.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <CardTitle className="text-base">
                              {service.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {service.description}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm font-medium text-primary">
                                {formatCurrency(service.price)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {service.duration} minutes
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">
                            Rate this service *
                          </Label>
                          <div className="mt-2">
                            <Rating
                              value={serviceFeedback?.rating}
                              onChange={(rating) =>
                                updateServiceFeedback(
                                  service._id,
                                  "rating",
                                  rating
                                )
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">
                            Feedback on this service (optional)
                          </Label>
                          <Textarea
                            placeholder={`Share your thoughts about the "${service.name}" service...`}
                            rows={3}
                            className="resize-none mt-2"
                            value={serviceFeedback?.content || ""}
                            onChange={(e) =>
                              updateServiceFeedback(
                                service._id,
                                "content",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="gap-2 sticky bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={disableSubmitButton()} onClick={handleSubmit}>
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFeedback;
