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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(carOwnerSchema),
  });

  const { handleSignup, error: authError } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Exclude confirmPassword directly in the object sent to handleSignup
      const submitData = { ...data };
      delete submitData.confirmPassword;
      console.log("Data to send to backend:", submitData);
      await handleSignup(submitData);
    } catch (err) {
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
      {authError && (
        <div className="mb-4 text-red-600 text-sm">{authError}</div>
      )}
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
      <SubmitButton isLoading={isLoading} />
    </form>
  );
};

export default SignUpForm;