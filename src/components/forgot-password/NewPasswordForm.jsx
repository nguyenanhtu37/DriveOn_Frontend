import InputField from "../login/InputField";
import SubmitButton from "../login/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "../../schema/forgotPasswordSchema";

const NewPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = (data) => {
    console.log("New Password data:", data);
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="New Password"
        type="password"
        placeholder="Enter your new password"
        register={register("password")}
        error={errors.password}
      />
      <InputField
        label="Confirm Password"
        type="password"
        placeholder="Confirm your new password"
        register={register("confirmPassword")}
        error={errors.confirmPassword}
      />
      <SubmitButton />
    </form>
  );
};

export default NewPasswordForm;