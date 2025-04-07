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
import { serviceDetailSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectGroup } from "@radix-ui/react-select";
import { FileIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const CreateService = () => {
  const { garageId } = useParams();
  const { files, progressList, handleFileChange, handleUpload, handleRemove } =
    useUpload();
  const serviceSystem = useGetService();
  const addService = useAddServiceGarage();

  const form = useForm({
    resolver: zodResolver(serviceDetailSchema),
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    const uploadedUrls = await handleUpload();
    const newService = {
      garage: garageId,
      service: data.serviceSystem,
      name: data.name,
      description: data.description,
      price: Number(data.price),
      // duration: data.duration,
      duration: Number(data.duration),
      warranty: data.warranty,
      images: uploadedUrls,
    };
    console.log(newService);
    addService.mutate(newService);
  };
  return (
    <div className=" h-[100vh] w-full">
      <div className=" w-full max-w-[1220px] mt-8 px-6 pt-3 pb-6 mx-auto bg-white h-full border border-red-100 shadow-md rounded-lg flex flex-col">
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
                                <SelectItem
                                  key={service._id}
                                  value={service._id}
                                >
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
                      <FormLabel className="text-md">Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Price"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
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
                      <FormLabel className="text-md">Duration</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Duration"
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
                  name="warranty"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md">Warranty</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Warranty"
                          {...field}
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
            <Button className="w-full mt-4">Create Service</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateService;
