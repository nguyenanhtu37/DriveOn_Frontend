import useUpload from "@/app/services/Cloudinary/upload";
import { useCreateRescueRequest } from "@/app/stores/entity/emergency";
import { useGetService } from "@/app/stores/entity/service";
import {
  useCloseDialog,
  useDialogOpen,
  useSetDialogId,
} from "@/app/stores/view/dialog";
import { useSearchStore } from "@/app/stores/view/search";
import { useUserStore } from "@/app/stores/view/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { AbsoluteScreenPath } from "@/constants/screen";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Info, X, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const DialogRecuse = () => {
  const mutation = useCreateRescueRequest();

  const setDialog = useSetDialogId();

  const isOpen = useDialogOpen("DialogRecuse");

  const closeDialog = useCloseDialog();

  const { user, sessionId, location } = useUserStore();

  const [errorMessage, setErrorMessage] = useState();

  const { files, progressList, handleFileChange, handleUpload, handleRemove } =
    useUpload();

  const inputRef = useRef(null);

  const [serviceEmergency, setServiceEmergency] = useState([]);

  const response = useGetService();

  const navigate = useNavigate();

  const { setLocation, setIsFetched, setService } = useSearchStore();

  useEffect(() => {
    if (response.isSuccess) {
      setServiceEmergency(
        response.data.filter((service) =>
          service.name.toLowerCase().includes("cứu hộ")
        )
      );
    }
  }, [response.data, response.isSuccess]);

  const phoneRegex = /^(0|\+84)(\d{9})$/;

  const form = useForm({
    defaultValues: {
      description: "",
      location: "",
      phone: "",
    },
    resolver: zodResolver(
      z.object({
        description: z
          .string()
          .min(15, "We need you to describe the problem you are having."),
        location: z.string().optional(),
        phone: z.string().regex(phoneRegex, "Invalid phone number"),
      })
    ),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    let uploadedUrls = [];
    if (files.length > 0) {
      uploadedUrls = await handleUpload();
    }
    const payload = {
      description: data.description,
      address: data.location,
      location: {
        latitude: location?.[0],
        longitude: location?.[1],
      },
      phone: data.phone,
      images: uploadedUrls,
      sessionId: user?._id ?? sessionId,
    };

    mutation.mutate(payload, {
      onSuccess: (data) => {
        console.log(
          "Rescue request created successfully:",
          data.emergency.data
        );
        form.reset();
        inputRef.current.value = null;
        handleRemove(files);
        setLocation(location);
        setService(serviceEmergency.map((service) => service._id));
        setIsFetched(true);
        setDialog({ id: "DialogEmergency", data: data.emergency.data });
        navigate(AbsoluteScreenPath.Search);
      },
      onError: () => {
        setErrorMessage(
          "There was an error sending rescue. Please try again later."
        );
      },
    });
  });
  return (
    <Dialog open={isOpen}>
      <DialogContent
        hiddenClose={true}
        className="p-0 border-0 bg-white shadow-none max-w-xl max-h-[90vh] overflow-y-auto  border-none"
      >
        <Form {...form}>
          <form onSubmit={onSubmit} className="w-full">
            <Card className="w-full ">
              <CardContent className="p-6">
                <div className="mb-6 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl mb-4">
                    <img
                      src="/Screenshot 2025-01-16 232902_preview_rev_1.png"
                      className="w-[150%] h-[150%] object-cover"
                      alt="Logo"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Describe vehicle condition
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Please provide information so we can easily support you.
                  </p>
                </div>

                {errorMessage && (
                  <div className="w-full h-12 bg-red-50 text-red-400 text-start rounded-xl flex items-center p-2 mb-2">
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-5">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Detailed description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the condition your vehicle is experiencing..."
                              className="bg-white/50 backdrop-blur-sm border-white/20 h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Your phone number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter phone number"
                              className="bg-white/50 backdrop-blur-sm border-white/20 h-12"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Your location
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="location"
                              placeholder="Enter address or get current location"
                              className="bg-white/50 backdrop-blur-sm border-white/20 h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            We use coordinates to assist you most accurately.
                            Entering your current location will help the garage
                            locate and reach you more easily.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Image (optional)
                    </Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center bg-white/30 backdrop-blur-sm cursor-pointer hover:bg-white/40 transition-colors">
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
                                onClick={() => handleRemove(file)}
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          className="mx-auto flex flex-col items-center"
                          onClick={() => inputRef.current.click()}
                        >
                          <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">
                            Click to upload image
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            Support: JPG, PNG, HEIC
                          </span>
                        </div>
                      )}

                      <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        multiple
                        max={4}
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col gap-4">
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full bg-gradient-to-r from-red-300 to-red-400 hover:from-red-400 hover:to-red-500 text-white rounded-2xl py-6 font-bold text-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Send a rescue request
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full py-6  rounded-2xl backdrop-blur-sm bg-white/50"
                      type="button"
                      onClick={closeDialog}
                    >
                      Cancel
                    </Button>
                  </div>

                  <div className="bg-blue-50/70 backdrop-blur-sm p-3 rounded-xl flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-700">
                      Detailed information helps the garage easily prepare the
                      necessary tools to support you quickly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRecuse;
