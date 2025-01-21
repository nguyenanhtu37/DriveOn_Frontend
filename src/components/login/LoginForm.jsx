import LoginWithGoogleButton from "./LoginWithGoogleButton";
import InputField from "./InputField";
import RememberMeSection from "./RememberMeSection";
import SubmitButton from "./SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schema/loginSchema";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <LoginWithGoogleButton />
      <InputField
        label="Username"
        type="text"
        placeholder="Enter username"
        register={register("username")}
        error={errors.username}
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        register={register("password")}
        error={errors.password}
      />
      <RememberMeSection />
      <SubmitButton />
    </form>
  );
};

export default LoginForm;