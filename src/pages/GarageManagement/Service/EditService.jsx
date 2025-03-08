import useUpload from "@/app/services/Cloudinary/upload";
import { useGetService } from "@/app/stores/entity/service";
import { useUpdateServiceGarage } from "@/app/stores/entity/service-detail";
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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { serviceDetailSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const EditService = ({ serviceDetail, setIsEdit }) => {
  const editService = useUpdateServiceGarage();
  const serviceSystem = useGetService();
  const { files, progressList, handleFileChange, handleUpload, handleRemove } =
    useUpload();

  const [images, setImages] = useState(serviceDetail.data.images);
  const handleDeleteImage = (image) => {
    setImages((prev) => prev.filter((img) => img !== image));
  };

  const form = useForm({
    resolver: zodResolver(serviceDetailSchema),
    defaultValues: {
      name: serviceDetail.data.name,
      description: serviceDetail.data.description,
      price: serviceDetail.data.price,
      duration: serviceDetail.data.duration,
      warranty: serviceDetail.data.warranty,
      serviceSystem: serviceDetail.data.service._id,
    },
  });

  const onSubmit = async (data) => {
    let imagesUpload = [];
    if (files.length > 0) {
      imagesUpload = await handleUpload(files);
    }
    const serviceUpdate = {
      ...data,
      service: data.serviceSystem,
      images: images.concat(imagesUpload),
    };
    editService.mutate({ id: serviceDetail.data._id, service: serviceUpdate });
  };
  return (
    <Form {...form}>
      <form className=" w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative px-1 ml-2 pb-3 flex-1 bg-white gap-y-2 h-full">
          <div className=" w-full flex justify-between items-center">
            <Button
              type="button"
              variant="ghost"
              className="flex items-center gap-2 hover:shadow-md mt-2 "
              onClick={() => setIsEdit(false)}
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:shadow-md mt-2 mr-2"
            >
              <Save size={16} />
              Save
            </Button>
          </div>
          {/* Top */}
          <div className="px-3 py-2 mb-2 flex justify-between items-start">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-md">Service Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={serviceDetail.data.name}
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Content */}
          <div className=" px-3 w-full flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="serviceSystem"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-md">Service System</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={serviceDetail.data.service._id}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={serviceDetail.data.service.name}
                        />
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

            <div className="w-full flex justify-start gap-4 items-center flex-wrap ">
              {images.map((image) => (
                <div key={image} className=" relative">
                  <img
                    key={image}
                    src={image}
                    alt="service"
                    className="size-[180px] flex bg-red-50 rounded-lg"
                  />
                  <div
                    className=" absolute top-2 right-2 p-2 bg-white rounded-full cursor-pointer hover:shadow-md flex justify-center items-center"
                    onClick={() => {
                      handleDeleteImage(image);
                    }}
                  >
                    <X size={12} />
                  </div>
                </div>
              ))}
              {files.map((file) => (
                <div key={file} className=" relative flex flex-col gap-y-2">
                  <img
                    key={file}
                    src={URL.createObjectURL(file)}
                    alt="service"
                    className="size-[180px] flex bg-red-50 rounded-lg"
                  />
                  <div
                    className=" absolute top-2 right-2 p-2 bg-white rounded-full cursor-pointer hover:shadow-md flex justify-center items-center"
                    onClick={() => {
                      handleRemove(file);
                    }}
                  >
                    <X size={12} />
                  </div>
                  <Progress value={progressList[file.name]} />
                </div>
              ))}
            </div>
            <Input
              id="file"
              type="file"
              multiple
              placeholder="File"
              accept="image/*"
              onChange={handleFileChange}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-md">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={serviceDetail.data.description}
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
                      placeholder={serviceDetail.data.price}
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                      placeholder={serviceDetail.data.duration}
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
                      placeholder={serviceDetail.data.warranty}
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
