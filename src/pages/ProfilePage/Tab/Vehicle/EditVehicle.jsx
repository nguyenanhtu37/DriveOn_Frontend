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
import { vehicleSchema } from "@/schema";
import useUpload from "@/app/services/Cloudinary/upload";
import { useEffect } from "react";
import Select from "react-tailwindcss-select";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const EditVehicleDialog = ({ vehicle, open, onClose }) => {
  const { handleFileChange, handleUpload, files } = useUpload();
  const updateVehicle = useUpdateVehicle();
  const brands = useGetBrands();
  const queryClient = useQueryClient();

  // Debug vehicle prop
  useEffect(() => {
    console.log("EditVehicleDialog - Vehicle prop:", vehicle);
    console.log("EditVehicleDialog - Vehicle._id:", vehicle._id);
    console.log("EditVehicleDialog - Vehicle._id type:", typeof vehicle._id);
  }, [vehicle]);

  // Validate vehicle._id
  let vehicleId = vehicle._id;
  if (typeof vehicle._id === "object" && vehicle._id !== null) {
    console.warn("EditVehicleDialog - vehicle._id is an object:", vehicle._id);
    vehicleId = vehicle._id.value || String(vehicle._id);
  }
  if (!vehicleId || typeof vehicleId !== "string" || !/^[0-9a-fA-F]{24}$/.test(vehicleId)) {
    console.error("EditVehicleDialog - Invalid vehicle._id:", vehicle._id);
    toast({
      title: "Error",
      description: "Invalid vehicle ID. Please select a valid vehicle.",
      variant: "destructive",
      duration: 3000,
    });
    return null; // Prevent rendering
  }

  // Transform brands into format for react-tailwindcss-select
  const brandList = brands.data?.map((brand) => ({
    value: brand._id,
    label: brand.brandName,
  })) || [];

  const form = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      carBrand: vehicle.carBrand
        ? { value: vehicle.carBrand, label: brandList.find((b) => b.value === vehicle.carBrand)?.label || "" }
        : null,
      carName: vehicle.carName || "",
      carPlate: vehicle.carPlate || "",
      carYear: vehicle.carYear || "",
      carColor: vehicle.carColor || "",
    },
  });

  const isSubmitting = form.formState.isSubmitting || updateVehicle.isLoading;

  useEffect(() => {
    if (brandList.length > 0 && vehicle.carBrand) {
      const selectedBrand = brandList.find((brand) => brand.value === vehicle.carBrand);
      if (selectedBrand) {
        form.setValue("carBrand", selectedBrand);
      }
    }
  }, [vehicle, brandList, form]);

  const onSubmit = async (data) => {
    let uploadedUrls = Array.isArray(vehicle.carImages) ? vehicle.carImages : [];
    if (files.length > 0) {
      uploadedUrls = await handleUpload();
    }

    const updateData = {
      carBrand: data.carBrand?.value || vehicle.carBrand,
      carName: data.carName,
      carPlate: data.carPlate,
      carYear: data.carYear, // String, as per backend schema
      carColor: data.carColor,
      carImages: uploadedUrls,
    };

    console.log("EditVehicleDialog - Submitting update:", { vehicleId, updateData });

    updateVehicle.mutate(
      { vehicleId, updateData },
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
        {brands.isLoading ? (
          <div>Loading brands...</div>
        ) : brands.isError ? (
          <div>Error loading brands: {brands.error?.message || "Unknown error"}</div>
        ) : (
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
                        placeholder="Select a brand"
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

              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />

              <Button
                type="submit"
                className="bg-red-500 hover:bg-red-600 mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};