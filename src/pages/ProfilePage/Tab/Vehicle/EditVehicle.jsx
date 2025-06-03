import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateVehicle } from "@/app/stores/entity/vehicleV2";
import { useGetBrands } from "@/app/stores/entity/brandV2";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateVehicleSchema } from "@/schema/vehicleSchema";
import useUpload from "@/app/services/Cloudinary/upload";
import Select from "react-tailwindcss-select";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const EditVehicleDialog = ({ vehicle, open, onClose }) => {
  const { handleUpload, files } = useUpload();
  const updateVehicle = useUpdateVehicle();
  const brands = useGetBrands();
  const queryClient = useQueryClient();

  // Prepare brand list and current brand regardless of loading state
  const brandList = brands.data?.map((brand) => ({
    value: brand._id,
    label: brand.brandName,
  })) || [];

  const currentBrand = brandList.find((b) =>
    b.value === vehicle?.carBrand || b.value === vehicle?.carBrand?._id
  );

  const form = useForm({
    resolver: zodResolver(updateVehicleSchema),
    defaultValues: {
      carBrand: currentBrand || null,
      carName: vehicle?.carName || "",
      carPlate: vehicle?.carPlate || "",
      carYear: vehicle?.carYear || "",
      carColor: vehicle?.carColor || "",
    },
  });

  const isSubmitting = form.formState.isSubmitting || updateVehicle.isLoading;

  // Only return after all hooks are declared
  if (brands.isLoading) return <div>Loading brands...</div>;
  if (brands.isError) return <div>Error loading brands</div>;
  if (!open) return null;

  const onSubmit = async (data) => {
    if (!vehicle?._id) {
      toast({
        title: "Error",
        description: "Invalid vehicle ID",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    let uploadedUrls = Array.isArray(vehicle.carImages) ? vehicle.carImages : [];
    if (files.length > 0) {
      uploadedUrls = await handleUpload();
    }

    const updateData = {
      carBrand: data.carBrand?.value || vehicle.carBrand,
      carName: data.carName,
      carPlate: data.carPlate,
      carYear: data.carYear,
      carColor: data.carColor,
      carImages: uploadedUrls,
    };

    updateVehicle.mutate(
      { vehicleId: vehicle._id, updateData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["myVehicleV2"]);
          toast({
            title: "Vehicle updated successfully",
            duration: 2000,
          });
          onClose();
        },
        onError: (error) => {
          console.error("EditVehicleDialog - Update vehicle error:", error);
          toast({
            title: "Error updating vehicle",
            description: error.message || "Something went wrong",
            variant: "destructive",
            duration: 2000,
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md max-h-[90vh] overflow-y-auto p-4 rounded-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-3 text-sm">
            <h2 className="text-base font-semibold">Edit Vehicle</h2>

            <FormField
              control={form.control}
              name="carBrand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Brand</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onChange={field.onChange}
                      options={brandList}
                      isMultiple={false}
                      primaryColor="red"
                      placeholder={currentBrand?.label || "Select a brand"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="carName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Car Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="carPlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Plate</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Car Plate" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="carYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Year</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter Car Year" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="carColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Color</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Car Color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};