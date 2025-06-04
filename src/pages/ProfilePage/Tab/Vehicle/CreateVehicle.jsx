import useUpload from "@/app/services/Cloudinary/upload";
import { useGetBrands } from "@/app/stores/entity/brandV2";
import { useAddVehicle } from "@/app/stores/entity/vehicleV2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { vehicleSchema } from "@/schema/vehicleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Car, Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-tailwindcss-select";

export const CreateVehicle = () => {
  const form = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      carName: "",
      carPlate: "",
      carColor: "",
      carBrand: "",
    },
  });
  const queryClient = useQueryClient();
  const { files, progressList, handleFileChange, handleUpload, removeFile } = useUpload();
  const [isOpen, setIsOpen] = useState(false);
  const createVehicle = useAddVehicle();

  const brands = useGetBrands(1, 1000);
  const brandList = brands.data?.map((brand) => ({
    value: brand._id,
    label: brand.brandName,
  })) || [];

  const onSubmit = async (data) => {
    try {
      let uploadedUrls = [];
      if (files.length > 0) {
        uploadedUrls = await handleUpload();
      }

      const newVehicle = {
        carName: data.carName,
        carPlate: data.carPlate,
        carYear: data.carYear,
        carColor: data.carColor,
        carBrand: data.carBrand.value,
        carImages: uploadedUrls,
      };
      
      await createVehicle.mutateAsync(newVehicle);
      queryClient.invalidateQueries(["myVehicleV2"]);
      setIsOpen(false);
      form.reset();
      toast({
        title: "Vehicle created successfully",
        description: "Your vehicle has been added to your profile",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error creating vehicle",
        description: error.message || "Please try again later",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
          // Reset files if needed
          if (files.length > 0) {
            files.forEach(file => removeFile(file));
          }
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" className="bg-red-500 hover:bg-red-600">
          <Car className="h-4 w-4 mr-2" /> Add Vehicle
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md max-h-[90vh] overflow-y-auto p-6 rounded-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 text-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add New Vehicle</h2>
              {createVehicle.isLoading && (
                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
              )}
            </div>

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
                      isDisabled={brands.isLoading}
                      placeholder={brands.isLoading ? "Loading brands..." : "Select a brand"}
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
                    <Input 
                      placeholder="Enter Car Name" 
                      {...field} 
                      disabled={createVehicle.isLoading}
                    />
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
                    <Input 
                      placeholder="Enter Car Plate (Examples: 30A-12345)" 
                      {...field} 
                      disabled={createVehicle.isLoading}
                    />
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
                    <Input 
                      type="number" 
                      placeholder="Enter Car Year" 
                      {...field} 
                      disabled={createVehicle.isLoading}
                    />
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
                    <Input 
                      placeholder="Enter Car Color" 
                      {...field} 
                      disabled={createVehicle.isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Car Images</h3>
                  
                  
                  
                </div>

                {files.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {files.map((file) => (
                      <div key={file.name} className="relative group">
                        <img
                          className="w-full h-[100px] object-cover rounded-md"
                          src={URL.createObjectURL(file)}
                          alt="preview"
                        />
                        <Progress 
                          value={progressList[file.name]} 
                          className="mt-1"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center p-6 hover:border-red-200 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Drag and drop images here</p>
                    <p className="text-xs text-gray-400 mt-1">or click to browse</p>
                  </div>
                )}
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={createVehicle.isLoading}
                />
                <label
                  htmlFor="file"
                  className="block text-center text-sm text-red-500 hover:text-red-600 cursor-pointer"
                >
                  {files.length > 0 ? 'Change image' : 'Select image'}
                </label>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              size="sm" 
              className="bg-red-500 hover:bg-red-600 mt-2"
              disabled={createVehicle.isLoading}
            >
              {createVehicle.isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Vehicle'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};