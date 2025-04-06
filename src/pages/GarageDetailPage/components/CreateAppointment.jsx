import { useCreateAppointment } from "@/app/stores/entity/appointment";
import { useGetService } from "@/app/stores/entity/service-detail";
import { useGetMyVehicles } from "@/app/stores/entity/vehicle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { appointmentSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-tailwindcss-select";

export const CreateAppointment = () => {
  const { garageId } = useParams();
  const service = useGetService(garageId);
  const myVehicles = useGetMyVehicles();
  const createAppointment = useCreateAppointment();

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

  const onSubmit = (data) => {
    const newAppointment = {
      garage: garageId,
      start: data.date,
      service: data.service.map(({ value }) => value),
      note: data.note,
      vehicle: data.vehicle.value,
    };

    createAppointment.mutate(newAppointment, {
      onSuccess: () => {
        reset();
        toast({ title: "Create appointment successfully", duration: 2000 });
      },
      onError: () => {
        toast({ title: "Create appointment failed", duration: 2000 });
      },
    });
  };

  const renderFieldError = (error) => (
    <span className="text-red-500 text-sm">{error?.message}</span>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex justify-end items-start"
    >
      <div className="w-full max-w-[450px] p-6 mt-8 bg-white rounded-xl shadow-xl border border-[#1c1c1c]/10 flex flex-col gap-y-4">
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
                    value={
                      field.value
                        ? format(field.value, "yyyy-MM-dd'T'HH:mm")
                        : ""
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          ? parse(
                              e.target.value,
                              "yyyy-MM-dd'T'HH:mm",
                              new Date()
                            )
                          : null
                      )
                    }
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
                  />
                  {renderFieldError(errors.note)}
                </>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            animation
            className="bg-[#e61f4f] border-none hover:bg-[#e61f4f]/80 text-white"
          >
            Create Appointment
          </Button>
        </div>
      </div>
    </form>
  );
};
