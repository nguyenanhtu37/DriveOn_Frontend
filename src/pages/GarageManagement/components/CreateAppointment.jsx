import { useCreateAppointmentByStaff } from "@/app/stores/entity/appointment";
import { useGetService } from "@/app/stores/entity/service-detail";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { appointmentSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-tailwindcss-select";

export const CreateAppointment = ({ appointment, ...props }) => {
  const { garageId } = useParams();
  const service = useGetService(garageId);
  const createAppointment = useCreateAppointmentByStaff();
  const [showReview, setShowReview] = useState(false);

  const serviceOptions = service?.data?.map(({ name, _id }) => ({
    label: name,
    value: _id,
  }));

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      date: "",
      service: appointment.service.map((item) => ({
        label: item.name,
        value: item._id,
      })),
      note: "",
      vehicle: {
        label: appointment.vehicle.carName,
        value: appointment.vehicle._id,
      },
    },
  });

  const handleReview = (data) => {
    if (data.date && data.service.length > 0 && data.vehicle.value) {
      setShowReview(true);
    } else {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill all required fields before proceeding",
        duration: 2000,
      });
    }
  };

  const handleBackToEdit = () => {
    setShowReview(false);
  };

  const onSubmit = (data) => {
    const newAppointment = {
      garage: garageId,
      start: new Date(data.date).toISOString(),
      service: data.service.map(({ value }) => value),
      note: data.note,
      vehicle: data.vehicle.value,
      userId: appointment.user._id,
    };

    createAppointment.mutate(newAppointment, {
      onSuccess: () => {
        toast({ title: "Create appointment successfully", duration: 2000 });
      },
      onError: (error) => {
        console.error("Create appointment error", error);
        toast({
          variant: "destructive",
          title: "Create appointment failed",
          description: error.response?.data.error,
          duration: 2000,
        });
      },
    });
  };

  const renderFieldError = (error) => (
    <span className="text-red-500 text-sm">{error?.message}</span>
  );
  return (
    <Dialog {...props}>
      <DialogContent className="p-0 border-none rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle>Create Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full flex flex-col gap-y-4 ">
                {/* Date Field */}
                <div className="flex flex-col gap-y-2">
                  <label className="text-sm font-semibold text-[#222222]">
                    Choose Date
                  </label>
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input
                          id="date"
                          type="datetime-local"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.value || null)
                          }
                          disabled={showReview}
                        />
                        {renderFieldError(errors.date)}
                      </>
                    )}
                  />
                </div>

                {/* Service Field */}
                <div className="flex flex-col gap-y-2">
                  <label className="text-sm font-semibold text-[#222222]">
                    Choose Service
                  </label>
                  <Controller
                    name="service"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select
                          value={field.value}
                          onChange={field.onChange}
                          options={serviceOptions}
                          isMultiple
                          primaryColor="red"
                          isDisabled={showReview}
                        />
                        {renderFieldError(errors.service)}
                      </>
                    )}
                  />
                </div>

                {/* Vehicle Field */}
                <div className="flex flex-col gap-y-2">
                  <label className="text-sm font-semibold text-[#222222]">
                    Choose Vehicle
                  </label>
                  <Controller
                    name="vehicle"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select
                          value={field.value}
                          onChange={field.onChange}
                          options={[]}
                          isMultiple={false}
                          primaryColor="red"
                          isDisabled={true}
                        />
                        {renderFieldError(errors.vehicle)}
                      </>
                    )}
                  />
                </div>

                {/* Note Field */}
                <div className="flex flex-col gap-y-2">
                  <label className="text-sm font-semibold text-[#222222]">
                    Note for appointment
                  </label>
                  <Controller
                    name="note"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Textarea
                          className="px-4 py-2"
                          value={field.value}
                          onChange={field.onChange}
                          disabled={showReview}
                        />
                        {renderFieldError(errors.note)}
                      </>
                    )}
                  />
                </div>

                {!showReview ? (
                  <Button
                    type="button"
                    animation
                    className="bg-[#e61f4f] border-none hover:bg-[#e61f4f]/80 text-white"
                    onClick={handleSubmit(handleReview)}
                  >
                    Review Appointment
                  </Button>
                ) : (
                  <div className="flex flex-col gap-y-4">
                    {/* Appointment Summary */}
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <h3 className="font-semibold mb-2">
                        Appointment Summary
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                          <span className="font-medium">Date:</span>
                          <span>
                            {new Date(
                              control._formValues.date
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                          <span className="font-medium">Services:</span>
                          <span>
                            {control._formValues.service
                              .map((service) => service.label)
                              .join(", ")}
                          </span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                          <span className="font-medium">Vehicle:</span>
                          <span>{control._formValues.vehicle.label}</span>
                        </div>
                        {control._formValues.note && (
                          <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="font-medium">Note:</span>
                            <span>{control._formValues.note}</span>
                          </div>
                        )}
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                          <span className="font-medium">Duration:</span>
                          <span>
                            {service?.data?.find(
                              (s) =>
                                s._id === control._formValues.service[0].value
                            )?.duration || "N/A"}{" "}
                            minutes
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={handleBackToEdit}
                      >
                        Edit
                      </Button>
                      <Button
                        type="submit"
                        animation
                        className="flex-1 bg-[#e61f4f] border-none hover:bg-[#e61f4f]/80 text-white"
                        disabled={createAppointment.isPending}
                      >
                        Confirm & Create
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
};
