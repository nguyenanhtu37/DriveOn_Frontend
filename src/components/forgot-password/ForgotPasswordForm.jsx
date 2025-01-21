import InputField from "../login/InputField";
import SubmitButton from "../login/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../../schema/forgotPasswordSchema";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data) => {
    console.log("Forgot Password data:", data);
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        
        type="email"
        placeholder="Enter your email address"
        register={register("email")}
        error={errors.email}
      />
      <SubmitButton />
    </form>
  );
};

export default ForgotPasswordForm;
