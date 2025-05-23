"use client";

import { useCreateAppointment } from "@/app/stores/entity/appointment";
import { useGetService } from "@/app/stores/entity/service-detail";
import { useGetMyVehicles } from "@/app/stores/entity/vehicle";
import { useTabStore } from "@/app/stores/view/tab";
import { useUserStore } from "@/app/stores/view/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AbsoluteScreenPath } from "@/constants/screen";
import { toast } from "@/hooks/use-toast";
import { appointmentSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-tailwindcss-select";
import { useState } from "react";

export const CreateAppointment = () => {
  const { garageId } = useParams();
  const service = useGetService(garageId);
  const myVehicles = useGetMyVehicles();
  const createAppointment = useCreateAppointment();
  const user = useUserStore((state) => state.user);

  const navigate = useNavigate();
  const { setTab } = useTabStore();
  const [showReview, setShowReview] = useState(false);

  const serviceOptions = service?.data?.map(({ name, _id }) => ({
    label: name,
    value: _id,
  }));

  const vehicleOptions = myVehicles?.data?.map(({ carName, _id }) => ({
    label: carName,
    value: _id,
  }));

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      date: "",
      service: [],
      note: "",
      vehicle: {},
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
    };

    createAppointment.mutate(newAppointment, {
      onSuccess: () => {
        reset();
        toast({ title: "Create appointment successfully", duration: 2000 });
        navigate(AbsoluteScreenPath.ProfilePage);
        setTab("appointments");
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex lg:justify-end lg:items-start"
    >
      <div className="w-full lg:max-w-[450px] p-6 lg:mt-8 bg-white rounded-xl shadow-xl border border-[#1c1c1c]/10 flex flex-col gap-y-4">
        <span className="text-lg font-semibold text-[#222222]">
          Make an appointment with the garage
        </span>
        <div className="w-full flex flex-col gap-y-4 rounded-xl">
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
                    onChange={(e) => field.onChange(e.target.value || null)}
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
                    options={vehicleOptions}
                    isMultiple={false}
                    primaryColor="red"
                    isDisabled={showReview}
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

          {/* Review or Submit Button */}
          {!showReview ? (
            <Button
              type="button"
              animation
              className="bg-[#e61f4f] border-none hover:bg-[#e61f4f]/80 text-white"
              onClick={
                user
                  ? handleSubmit(handleReview)
                  : () => navigate(AbsoluteScreenPath.Login)
              }
            >
              Review Appointment
            </Button>
          ) : (
            <div className="flex flex-col gap-y-4">
              {/* Appointment Summary */}
              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-semibold mb-2">Appointment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="font-medium">Date:</span>
                    <span>
                      {new Date(control._formValues.date).toLocaleString()}
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
                      {control._formValues.service.reduce(
                        (total, serviceItem) => {
                          const foundService = service?.data?.find(
                            (s) => s._id === serviceItem.value
                          );
                          return total + (foundService?.duration || 0);
                        },
                        0
                      ) || "N/A"}{" "}
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
      </div>
    </form>
  );
};
