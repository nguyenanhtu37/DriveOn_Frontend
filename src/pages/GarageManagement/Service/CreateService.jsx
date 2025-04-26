import useUpload from "@/app/services/Cloudinary/upload";
import { useGetService } from "@/app/stores/entity/service";
import { useAddServiceGarage } from "@/app/stores/entity/service-detail";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { serviceDetailSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectGroup } from "@radix-ui/react-select";
import { useQueryClient } from "@tanstack/react-query";
import { FileIcon, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const CreateService = () => {
  const { garageId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { files, progressList, handleFileChange, handleUpload, handleRemove } =
    useUpload();
  const serviceSystem = useGetService();
  const addService = useAddServiceGarage();

  const form = useForm({
    resolver: zodResolver(serviceDetailSchema),
    defaultValues: {
      price: 0,
      duration: 0,
    },
  });

  const onSubmit = async (data) => {
    const uploadedUrls = await handleUpload();
    const newService = {
      garage: garageId,
      service: data.serviceSystem,
      name: data.name,
      description: data.description,
      price: Number(data.price),
      duration: Number(data.duration),
      images: uploadedUrls,
    };
    addService.mutate(newService, {
      onSuccess: (data) => {
        navigate(
          `/garageManagement/${garageId}/services/${data.serviceDetail._id}`
        );
        queryClient.invalidateQueries(["serviceGarage"]);
        toast({
          title: "Create service successfully",
          duration: 2000,
        });
      },
      onError: () => {
        toast({
          title: "Create service failed",
          duration: 2000,
        });
      },
    });
  };
  return (
    <Card className="relative p-4 ml-2 pb-3 flex-1 w-full  bg-white gap-y-2 h-full  ">
      <h3 className=" text-xl font-semibold font-archivo text-[#1c1c1c] mt-1">
        Create Service
      </h3>
      <Form {...form}>
        <form
          className=" w-full h-full flex flex-col justify-between"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className=" flex justify-between items-start gap-4 mt-5">
            <div className=" w-full max-w-[65%] flex flex-col items-start gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md">Service Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Service Name"
                        {...field}
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceSystem"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md">Service System</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Service System" />
                        </SelectTrigger>
                        <SelectContent className="h-[250px] overflow-y-auto">
                          <SelectGroup>
                            <SelectLabel>Service System</SelectLabel>
                            {serviceSystem.data.map((service) => (
                              <SelectItem key={service._id} value={service._id}>
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        {...field}
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 h-full max-h-36"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md">
                      Price (unit 1,000 VND)
                    </FormLabel>
                    <FormControl>
                      <Input
                        min={0}
                        placeholder="Price"
                        {...field}
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 h-12"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md">
                      Duration (minutes)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Duration"
                        {...field}
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 h-12"
                        type="number"
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full mt-3 bg-red-400 hover:bg-red-500">
                <Plus className="mr-2 h-4 w-4" />
                Create Service
              </Button>
            </div>
            <div className=" w-full max-w-[35%]">
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
                            <X size={12} onClick={() => handleRemove(file)} />
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
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default CreateService;
