import { useAuth } from "../../common/hooks/useAuth";
import InputField from "../ui/InputField";
import SubmitButton from "../forgot-password/SubmitButton"; // New import
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "../../schema/forgotPasswordSchema";
import { useSearchParams } from "react-router-dom";
const NewPasswordForm = () => {
  const { handleResetPassword, isLoading, error, success } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data) => {
    if (!token) {
      console.error("No reset token provided");
      return;
    }
    try {
      await handleResetPassword(token, data.password);
    } catch (err) {
      console.error("Password reset failed:", err);
    }
  };

  return (
    <div className="w-full max-w-md">
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
        <SubmitButton 
          isLoading={isLoading} 
          disabled={!token} 
          variant="primary"
          size="md"
        >
          Set New Password
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
      {!token && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          No reset token provided. Please use the link from your email.
        </p>
      )}
    </div>
  );
};

export default NewPasswordForm;