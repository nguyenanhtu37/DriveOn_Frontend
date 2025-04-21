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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import FileIcon from "@/components/ui/FileIcon";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useRegisterGarage } from "@/app/stores/entity/garage";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import useUpload from "@/app/services/Cloudinary/upload";
import { Progress } from "@/components/ui/progress";
import Select from "react-tailwindcss-select";
import { useGetGeocode } from "@/app/stores/entity/distance-matrix";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useTabStore } from "@/app/stores/view/tab";

const days = [
  { value: "Sunday", label: "☀️ Sunday" },
  { value: "Monday", label: "🌙 Monday" },
  { value: "Tuesday", label: "☁️ Tuesday" },
  { value: "Wednesday", label: "🌧️ Wednesday" },
  { value: "Thursday", label: "⚡ Thursday" },
  { value: "Friday", label: "❄️ Friday" },
  { value: "Saturday", label: "💨 Saturday" },
];

export default function RegistrationForm() {
  const navigate = useNavigate();
  const register = useRegisterGarage();
  const getLocation = useGetGeocode();
  const [submitting, setSubmitting] = useState(false);
  const { files, progressList, handleFileChange, handleUpload } = useUpload();
  const { setTab } = useTabStore();

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
      openDays: [],
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    let uploadedUrls = [];
    if (files.length > 0) {
      uploadedUrls = await handleUpload();
    }

    let location, address;
    try {
      const res = await getLocation.mutateAsync(data.address);
      console.log("Geocode Response:", res);
      const { lat, lng } = res.result[0].geometry.location;
      location = {
        type: "Point",
        coordinates: [lng, lat],
      };
      address = res.result[0].formatted_address;
    } catch (error) {
      toast({
        title: "Error fetching geocode",
        description: "Please check the address and try again.",
        variant: "destructive",
      });
      console.error("Error fetching geocode:", error);
      setSubmitting(false);
      return;
    }

    const newGarage = {
      name: data.name,
      phone: data.phone,
      description: data.description,
      openTime: data.openTime,
      closeTime: data.closeTime,
      workingHours: `${data.openTime} - ${data.closeTime} hours`,
      operating_days: data.openDays.map((day) => day.value),
      email: data.email,
      interiorImages: uploadedUrls,
      location: location,
      address: address,
    };

    register.mutate(newGarage, {
      onSuccess: () => {
        setTimeout(() => {
          form.reset();
          setTab("register-garage");
          navigate("/profile");
        }, 2500);
      },
      onError: () => {
        setSubmitting(false);
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
                      placeholder="09123456789"
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
                    placeholder="Email"
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
                    placeholder="Description"
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

        <FormField
          control={form.control}
          name="openDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Open on days</FormLabel>
              <Select
                value={field.value}
                onChange={field.onChange}
                options={days}
                isMultiple={true}
                primaryColor="black"
              />
              <FormMessage />
            </FormItem>
          )}
        />

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

        <div className="animate-fade-up animate-once animate-duration-800 animate-ease-linear">
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
        </div>
        <div className="animate-fade-up animate-once animate-duration-800 animate-ease-linear">
          <Button
            type="submit"
            disabled={submitting}
            className="w-full transition-all duration-200 hover:bg-red-400 hover:scale-105"
          >
            {submitting ? "Registering..." : "Register Garage"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
