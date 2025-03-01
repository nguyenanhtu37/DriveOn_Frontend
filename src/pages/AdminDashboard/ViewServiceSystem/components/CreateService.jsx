import { uploadImage } from "@/app/services/Cloudinary/cloudinary";
import useUpload from "@/app/services/Cloudinary/upload";
import { useAddService } from "@/app/stores/entity/service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { serviceSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Plus } from "lucide-react";

import { useForm } from "react-hook-form";

const CreateService = () => {
  const addService = useAddService();
  const { files, progressList, handleFileChange, handleUpload } = useUpload();
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    let uploadedUrls = [];
    if (files.length > 0) {
      uploadedUrls = await handleUpload();
    }
    const newService = {
      ...data,
      image: uploadedUrls.length > 0 ? uploadedUrls[0] : "",
    };
    console.log(newService);
    addService.mutate(newService);
    form.reset();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className=" bg-red-100 flex justify-center items-center gap-2 hover:bg-red-200 transition-colors duration-100 ease-in-out"
        >
          <Plus size={18} />
          Create service
        </Button>
      </DialogTrigger>
      <DialogContent className=" min-w-[378px] max-w-[600px] w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>New Service</DialogTitle>
              <DialogDescription>
                Create new service here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center">
                    <FormLabel>Service</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Service name"
                        {...field}
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center ">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Service description"
                        {...field}
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name=""
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center ">
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John's Auto Repair"
                        {...field}
                        className="col-span-3"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-4 items-center">
                <FormLabel>Progress</FormLabel>
                <div className="col-span-3">
                  {files.map((file) => (
                    <div key={file.name} className=" flex flex-col gap-y-1">
                      <img src={URL.createObjectURL(file)} alt="" />
                      <Progress value={progressList[file.name]} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                className="bg-red-200 hover:bg-red-300 transition-colors duration-100 ease-in-out"
                type="submit"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateService;
