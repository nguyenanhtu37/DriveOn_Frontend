import InputField from "../ui/InputField";
import SubmitButton from "../sign-up/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carOwnerSchema } from "../../schema/carOwnerSchema";
import { useAuth } from "@/common/hooks/useAuth";
import { useState } from "react";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(carOwnerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { handleSignup, error: authError, success } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const submitData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        roles: ["carowner"],
      };
      await handleSignup(submitData);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
      {authError && <div className="mb-4 text-red-600 text-sm">{authError}</div>}
      {success && <div className="mb-4 text-green-600 text-sm">{success}</div>}
      <InputField
        label="Full Name"
        type="text"
        placeholder="Enter full name"
        register={register("name")}
        error={errors.name}
      />
      <InputField
        label="Email"
        type="email"
        placeholder="Enter email"
        register={register("email")}
        error={errors.email}
      />
      <InputField
        label="Phone Number"
        type="tel"
        placeholder="Enter phone number"
        register={register("phone")}
        error={errors.phone}
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter password"
        register={register("password")}
        error={errors.password}
      />
      <InputField
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        register={register("confirmPassword")}
        error={errors.confirmPassword}
      />
      <SubmitButton isLoading={isLoading} disabled={!isValid} />
    </form>
  );
};

export default SignUpForm;