import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateVehicle } from "@/app/stores/entity/vehicleV2";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema } from "@/schema";
import useUpload from "@/app/services/Cloudinary/upload";
import { useEffect } from "react";

export const EditVehicleDialog = ({ vehicle, open, onClose }) => {
  const { handleFileChange, handleUpload, files } = useUpload();
  const updateVehicle = useUpdateVehicle();

  const form = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: vehicle,
  });

  const onSubmit = async (data) => {
    let uploadedUrls = vehicle.carImages;
    if (files.length > 0) {
      uploadedUrls = await handleUpload();
    }

    updateVehicle.mutate(
      { vehicleId: vehicle._id, updateData: { ...data, carImages: uploadedUrls } },
      { onSuccess: () => onClose() }
    );
  };

  useEffect(() => {
    form.reset(vehicle);
  }, [vehicle]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField name="carName" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Car Name</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="carPlate" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Car Plate</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="carYear" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Car Year</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="carColor" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Car Color</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Input type="file" multiple accept="image/*" onChange={handleFileChange} />
            <Button type="submit" className="bg-red-500 hover:bg-red-600">Update</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
