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
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export const EditVehicleDialog = ({ vehicle, open, onClose }) => {
  const { handleUpload, files, setFiles, handleFileChange } = useUpload();
  const updateVehicle = useUpdateVehicle();
  const brands = useGetBrands(1, 1000);
  const queryClient = useQueryClient();
  const [currentImages, setCurrentImages] = useState([]);

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

  useEffect(() => {
    if (brandList.length > 0 && vehicle) {
      const currentBrand = brandList.find(
        (b) => b.value === vehicle?.carBrand || b.value === vehicle?.carBrand?._id
      );
      form.setValue("carBrand", currentBrand || null);
    }
  }, [brandList, vehicle, form]);

  useEffect(() => {
    if (vehicle?.carImages) {
      setCurrentImages(vehicle.carImages);
    }
  }, [vehicle]);

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

    let uploadedUrls = [];

    // Nếu có ảnh mới, upload và chỉ dùng ảnh mới
    if (files.length > 0) {
      const newImages = await handleUpload();
      uploadedUrls = [...newImages];
    } else {
      // Nếu không có ảnh mới, dùng ảnh cũ còn lại
      uploadedUrls = [...currentImages];
    }

    // Kiểm tra lại lần nữa
    if (uploadedUrls.length === 0) {
      toast({
        title: "At least 1 car photo required",
        description: "Please select at least 1 vehicle photo.",
        variant: "destructive",
        duration: 2000,
      });
      return;
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

  const removeImage = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setCurrentImages(currentImages.filter((_, i) => i !== index));
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

            {/* Existing Images */}
            {currentImages.length > 0 && (
              <div className="space-y-2">
                <FormLabel>Current Image</FormLabel>
                <div className="grid grid-cols-2 gap-2">
                  {currentImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Vehicle ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images Upload */}
            <div className="space-y-2">
              <FormLabel>New Image</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {files.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="mt-2"
              />
            </div>

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