import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wrench } from "lucide-react";
import { Form } from "@/components/ui/form";

import { toast } from "@/hooks/use-toast";
import { BasicInfoStep } from "./components/Steps/BasicInfoStep";
import { BusinessDetailsStep } from "./components/Steps/BusinessDetailsStep";
import { LocationStep } from "./components/Steps/LocationStep";
import { ImagesStep } from "./components/Steps/ImagesStep";
import { ReviewStep } from "./components/Steps/ReviewStep";
import { RegistrationStepper } from "./RegistrationStepper";
import useUpload from "@/app/services/Cloudinary/upload";
import { formSchema } from "@/schema";
import { useNavigate } from "react-router-dom";
import { useRegisterGarage } from "@/app/stores/entity/garage";
import { useTabStore } from "@/app/stores/view/tab";
import { useGetGeocode } from "@/app/stores/entity/distance-matrix";

const steps = [
  {
    id: "basic-info",
    title: "Basic Information",
    description: "Let's start with your garage's basic details",
  },
  {
    id: "business-details",
    title: "Business Details",
    description: "Tell us about your services and operating hours",
  },
  {
    id: "location",
    title: "Location",
    description: "Where can customers find your garage?",
  },
  {
    id: "images",
    title: "Images",
    description: "Showcase your garage with photos",
  },
  {
    id: "review",
    title: "Review & Submit",
    description: "Review your information before submitting",
  },
];

export default function GarageRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { files, progressList, handleFileChange, handleUpload, handleRemove } =
    useUpload();

  const navigate = useNavigate();
  const register = useRegisterGarage();
  const { setTab } = useTabStore();
  const getLocation = useGetGeocode();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      description: "",
      openTime: "",
      closeTime: "",
      address: "",
      openDays: [],
    },
  });

  const validateCurrentStep = () => {
    const values = form.getValues();

    switch (currentStep) {
      case 0:
        return values.name && values.phone && values.email;
      case 1: // Business Details
        return (
          values.description &&
          values.openTime &&
          values.closeTime &&
          values.openDays.length > 0
        );
      case 2:
        return values.address;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    } else {
      toast({
        title: "Please complete all required fields",
        description:
          "Fill in all required information before proceeding to the next step.",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    // Trigger full validation on all fields
    const isValid = await form.trigger();

    if (!isValid) {
      toast({
        title: "Please check your information",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const data = form.getValues();
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep form={form} />;
      case 1:
        return <BusinessDetailsStep form={form} />;
      case 2:
        return <LocationStep form={form} />;
      case 3:
        return (
          <ImagesStep
            files={files}
            progressList={progressList}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemove}
          />
        );
      case 4:
        return (
          <ReviewStep
            formData={form.getValues()}
            files={files}
            progressList={progressList}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Wrench className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Register Your Garage
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Join our network of professional garages and start managing your
            business more efficiently today.
          </p>
        </div>

        {/* Stepper Form */}
        <Form {...form}>
          <RegistrationStepper
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            canProceed={validateCurrentStep()}
            isSubmitting={submitting}
          >
            {renderStepContent()}
          </RegistrationStepper>
        </Form>
      </div>
    </div>
  );
}
