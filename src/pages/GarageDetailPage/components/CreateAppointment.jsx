import { useCreateAppointment } from "@/app/stores/entity/appointment";
import { useGetService } from "@/app/stores/entity/service-detail";
import { useGetMyVehicles } from "@/app/stores/entity/vehicle";
import { Input } from "@/components/ui/input";
import { InputDate } from "@/components/ui/inputDate";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { appointmentSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { Button } from "react-daisyui";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-tailwindcss-select";

export const CreateAppointment = () => {
  const { garageId } = useParams();
  const service = useGetService(garageId);
  const myVehicles = useGetMyVehicles();
  const serviceOptions = service?.data.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const vehicleOptions = myVehicles?.data.map((item) => ({
    label: item.carName,
    value: item._id,
  }));
  const createAppointment = useCreateAppointment();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      date: "",
      start: "",
      end: "",
      service: [],
      note: "",
      vehicle: {},
    },
  });

  const onSubmit = (data) => {
    const newAppointment = {
      garage: garageId,
      date: data.date,
      start: data.start,
      end: data.end,
      service: data.service.map((item) => item.value),
      note: data.note,
      vehicle: data.vehicle.value,
    };

    createAppointment.mutate(newAppointment, {
      onSuccess: () => {
        reset();
        toast({
          title: "Create appointment successfully",
          duration: 2000,
        });
      },
      onError: () => {
        toast({
          title: "Create appointment failed",
          duration: 2000,
        });
      },
    });
  };
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
          <div className="flex flex-col gap-y-2">
            <label className="text-sm font-semibold text-[#222222]">
              Choose Date
            </label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <>
                  <InputDate
                    date={field.value ? new Date(field.value) : null}
                    setDate={(newDate) =>
                      field.onChange(
                        newDate ? format(newDate, "yyyy-MM-dd") : ""
                      )
                    }
                  />
                  <span className="text-red-500 text-sm">
                    {errors.date?.message}
                  </span>
                </>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-2">
            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-semibold text-[#222222]">
                Start Time
              </label>
              <Controller
                name="start"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type="time"
                      className="h-9"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <span className="text-red-500 text-sm">
                      {errors.start?.message}
                    </span>
                  </>
                )}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-semibold text-[#222222]">
                End Time
              </label>
              <Controller
                name="end"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type="time"
                      className="h-9"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <span className="text-red-500 text-sm">
                      {errors.end?.message}
                    </span>
                  </>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-sm font-semibold text-[#222222]">
              Choose Service
            </label>
            <Controller
              control={control}
              name="service"
              render={({ field }) => (
                <>
                  <Select
                    value={field.value}
                    onChange={field.onChange}
                    options={serviceOptions}
                    isMultiple={true}
                    primaryColor="red"
                  />
                  <span className="text-red-500 text-sm">
                    {errors.service?.message}
                  </span>
                </>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-sm font-semibold text-[#222222]">
              Choose Service
            </label>
            <Controller
              control={control}
              name="vehicle"
              render={({ field }) => (
                <>
                  <Select
                    value={field.value}
                    onChange={field.onChange}
                    options={vehicleOptions}
                    isMultiple={false}
                    primaryColor="red"
                  />
                  <span className="text-red-500 text-sm">
                    {errors.service?.message}
                  </span>
                </>
              )}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-sm font-semibold text-[#222222]">
              Note for appointment
            </label>
            <Controller
              control={control}
              name="note"
              render={({ field }) => (
                <>
                  <Textarea
                    className="px-4 py-2"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <span className="text-red-500 text-sm">
                    {errors.note?.message}
                  </span>
                </>
              )}
            />
          </div>
          <Button
            type="submit"
            animation={true}
            className="bg-[#e61f4f] border-none hover:bg-[#e61f4f]/80 text-white"
          >
            Create Appointment
          </Button>
        </div>
      </div>
    </form>
  );
};
