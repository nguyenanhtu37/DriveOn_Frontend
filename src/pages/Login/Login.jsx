"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { loginSchema } from "../../schema/loginSchema";
import { useAuth } from "../../common/hooks/useAuth";

import FooterSection from "../../components/login/FooterSection";

import LoginWithGoogleButton from "../../components/login/LoginWithGoogleButton";
import InputField from "../../components/ui/InputField";
import RememberMeSection from "../../components/login/RememberMeSection";
import SubmitButton from "../../components/login/SubmitButton";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { handleLogin, error: authError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await handleLogin(data);
    } catch (error) {
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8 font-archivo">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/background.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-secondary/80 backdrop-blur-sm" />
      </div>

      {/* Back button */}
      <button
        onClick={handleBackToHome}
        className="absolute top-4 left-4 z-10 bg-white hover:bg-gray2 text-heading p-3 rounded-full shadow-lg transition-all duration-300"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Back to home</span>
      </button>

      {/* Login card */}
      <div className="w-full max-w-md z-10 bg-white rounded-lg shadow-2xl border border-gray p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-heading">Login</h1>
          <p className="text-sm text-body">Hi, Welcome back 👋</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <LoginWithGoogleButton />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-body">
                or continue with email
              </span>
            </div>
          </div>

          {authError && (
            <p className="text-destructive text-sm mb-4 p-3 bg-destructive/10 rounded-md">
              {authError}
            </p>
          )}

          <InputField
            label="Email"
            type="text"
            placeholder="Enter your email"
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

        <FooterSection onRegisterClick={handleRegisterClick} />
      </div>
    </div>
  );
}
