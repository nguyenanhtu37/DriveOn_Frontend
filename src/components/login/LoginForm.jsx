import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schema/loginSchema";
import { useAuth } from "../../common/hooks/useAuth";
import LoginWithGoogleButton from "./LoginWithGoogleButton";
import InputField from "../ui/InputField";
import RememberMeSection from "./RememberMeSection";
import SubmitButton from "./SubmitButton";
import { useState } from "react";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { handleLogin, error: authError } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data)
    try {
      await handleLogin(data);
    } catch (error) {
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <LoginWithGoogleButton />

      {authError && <p className="text-red-500 text-sm mb-2">{authError}</p>}

      <InputField
        label="Email"
        type="text"
        placeholder="Enter username"
        register={register("email")}
        error={errors.email}
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        register={register("password")}
        error={errors.password}
      />

      <RememberMeSection />

      <SubmitButton disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </SubmitButton>
    </form>
  );
};

export default LoginForm;