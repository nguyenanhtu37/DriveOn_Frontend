// hooks/useAuth.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../../app/services/login";
import { signup } from "../../app/services/signup";
import { requestPasswordReset, resetPassword } from "../../app/services/reset-password";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Handle normal login
  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await login(credentials);
      if (!response.token || typeof response.token !== 'string') {
        throw new Error("Invalid token received");
      }
      localStorage.setItem("token", response.token);
      navigate("/");
      return response;
    } catch (err) {
      const errorMessage = err.message || "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignup = async (credentials) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      console.log("Signup credentials sent:", credentials);
      const response = await signup(credentials);
      console.log("Signup response received:", response);
      setSuccess(response.message || "Please check your email to verify your account.");
      // Do not redirect to login since the user isn't created yet
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Signup failed";
      console.error("Signup error details:", {
        message: errorMessage,
        stack: err.stack,
        response: err.response?.data,
      });
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  // Handle logout
  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await logout(); // Call the API logout function
      localStorage.removeItem("token");
      navigate("/");
      return { message: "Logged out successfully" };
    } catch (err) {
      const errorMessage = err.message || "Logout failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Request password reset
  const handleRequestPasswordReset = async (email) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await requestPasswordReset(email);
      setSuccess(response.message);
      return response;
    } catch (err) {
      const errorMessage = err.message || "Failed to send reset email";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password with token
  const handleResetPassword = async (token, password) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await resetPassword(token, password);
      setSuccess(response.message);
      navigate("/login");
      return response;
    } catch (err) {
      const errorMessage = err.message || "Failed to reset password";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token && !window.location.pathname.includes("reset-password")) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [navigate]);

  return {
    isLoading,
    error,
    success,
    handleLogin,
    handleSignup,
    handleLogout,
    handleRequestPasswordReset,
    handleResetPassword,
  };
};