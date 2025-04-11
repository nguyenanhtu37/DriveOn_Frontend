import useUpload from "@/app/services/Cloudinary/upload";
import { useGetBrands } from "@/app/stores/entity/brandV2";
import { useAddVehicle } from "@/app/stores/entity/vehicleV2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FileIcon from "@/components/ui/FileIcon";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { vehicleSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Car, X } from "lucide-react";
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
  const { files, progressList, handleFileChange, handleUpload } = useUpload();
  const [isOpen, setIsOpen] = useState(false);
  const createVehicle = useAddVehicle();

  const brands = useGetBrands();
  const brandList = brands.data.map((brand) => ({
    value: brand._id,
    label: brand.brandName,
  }));

  const onSubmit = async (data) => {
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
    createVehicle.mutate(newVehicle, {
      onSuccess: () => {
        queryClient.invalidateQueries(["myVehicleV2"]);
        setIsOpen(false);
        form.reset();
        toast({
          title: "Vehicle created successfully",
          duration: 2000,
        });
      },
      onError: (error) => {
        console.error("Error creating vehicle:", error);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button size="sm" className="bg-red-500 hover:bg-red-600">
          <Car className="h-4 w-4 mr-2" />
          Add Vehicle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <h2 className="text-lg font-semibold">Add New Vehicle</h2>
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
                        className="placeholder:text-slate-400"
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
                        placeholder="Enter Car Plate"
                        {...field}
                        className="placeholder:text-slate-400"
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
                        placeholder="Enter Car Year"
                        type="number"
                        {...field}
                        className="placeholder:text-slate-400"
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
                        className="placeholder:text-slate-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Card>
                <CardContent className="p-6 space-y-4">
                  {files.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {files.map((file) => (
                        <div
                          key={file.name}
                          className="relative w-full animate-fade-up animate-ease-in-out"
                        >
                          <div className="w-full flex flex-col gap-y-2">
                            <img
                              className="w-full sm:h-[100px] md:h-[120px] object-cover rounded-md"
                              src={URL.createObjectURL(file)}
                              alt=""
                            />
                            <Progress value={progressList[file.name]} />
                          </div>
                          <button
                            type="button"
                            className="absolute top-0 right-0 p-0.5 bg-white rounded-full shadow-sm"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
                      <FileIcon className="w-12 h-12" />
                      <span className="text-sm font-medium text-gray-500">
                        Drag and drop a file or click to browse
                      </span>
                      <span className="text-xs text-gray-500">
                        PDF, image, video, or audio
                      </span>
                    </div>
                  )}
                  <div className="space-y-2 text-sm">
                    <Label htmlFor="file" className="text-sm font-medium">
                      File
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      multiple
                      placeholder="File"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </CardContent>
              </Card>
              <Button
                type="submit"
                size="sm"
                className="bg-red-500 hover:bg-red-600"
                disabled={createVehicle.isPending}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
