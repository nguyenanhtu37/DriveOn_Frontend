import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import FileIcon from "@/components/ui/FileIcon";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useRegisterGarage } from "@/app/stores/entity/garage";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const register = useRegisterGarage();

  const handleImageChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...newFiles]);
    }
  };
  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      description: "",
      openTime: "",
      closeTime: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const newGarage = {
      name: data.name,
      phone: data.phone,
      description: data.description,
      openTime: data.openTime,
      closeTime: data.closeTime,
      workingHours: `${data.openTime} - ${data.closeTime} hours`,
      operating_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      email: data.email,
      images: [
        "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      address: data.address,
    };
    console.log(newGarage);
    register.mutate(newGarage, {
      onSuccess: () => {
        setTimeout(() => {
          form.reset();
          setImages([]);
          navigate("/");
        }, 2500);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="animate-fade-up animate-once animate-duration-500 animate-ease-linear">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Garage Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John's Auto Repair"
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="animate-fade-up animate-once animate-duration-500 animate-ease-linear">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(123) 456-7890"
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="animate-fade-up animate-once animate-duration-600 animate-ease-linear">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="animate-fade-up animate-once animate-duration-600 animate-ease-linear">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="animate-fade-up animate-once animate-duration-600 animate-ease-linear">
          <div className="flex justify-start items-center gap-2">
            <FormField
              control={form.control}
              name="openTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="closeTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Close</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="animate-fade-up animate-once animate-duration-600 animate-ease-linear">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Main St, City, State, ZIP"
                    {...field}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <div className="animate-fade-up animate-once animate-duration-600 animate-ease-linear">
          <FormField
            control={form.control}
            name="services"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Services Offered</FormLabel>
                  <FormDescription>
                    Select the services your garage offers.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    "Oil Change",
                    "Tire Rotation",
                    "Brake Service",
                    "Engine Repair",
                    "Transmission Service",
                    "Car Wash",
                  ].map((service) => (
                    <FormField
                      key={service}
                      control={form.control}
                      name="services"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={service}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(service)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, service])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== service
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {service}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}
        <div className="animate-fade-up animate-once animate-duration-800 animate-ease-linear">
          <Card>
            <CardContent className="p-6 space-y-4">
              {images.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-full animate-fade-up animate-ease-in-out"
                    >
                      <img
                        className="w-full sm:h-[100px] md:h-[120px] object-cover rounded-md"
                        src={img}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
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
                  onChange={handleImageChange}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="animate-fade-up animate-once animate-duration-800 animate-ease-linear">
          <Button
            type="submit"
            disabled={register.isLoading}
            className="w-full transition-all duration-200 hover:bg-red-400 hover:scale-105"
          >
            {register.isLoading ? "Registering..." : "Register Garage"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
