
// ForgotPasswordForm.jsx
import { useAuth } from "../../common/hooks/useAuth";
import InputField from "../ui/InputField";
import SubmitButton from "../forgot-password/SubmitButton"; // New import
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../../schema/forgotPasswordSchema";

const ForgotPasswordForm = () => {
  const { handleRequestPasswordReset, isLoading, error, success } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      await handleRequestPasswordReset(data.email);
    } catch (err) {
      console.error("Password reset request failed:", err);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="email"
          placeholder="Enter your email address"
          register={register("email")}
          error={errors.email}
        />
        <SubmitButton
          isLoading={isLoading}
          variant="primary"
          size="md"
        >
          Reset Password
        </SubmitButton>
      </form>

      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-2 text-sm text-green-600" role="alert">
          {success}
        </p>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
