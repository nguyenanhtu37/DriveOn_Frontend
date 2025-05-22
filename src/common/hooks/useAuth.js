// useAuth.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../../app/services/login";
import { signup } from "../../app/services/signup";
import {
  requestPasswordReset,
  resetPassword,
} from "../../app/services/reset-password";
import { connectSocket, setUser, userLogout } from "@/app/stores/view/user";
import { requestPermissionAndGetToken } from "../../../firebase-messaging.js";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userRoles, setUserRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      let deviceToken = null;
      try {
        deviceToken = await requestPermissionAndGetToken();
      } catch (error) {
        console.error("Failed to get device token: ", error);
      }

      const response = await login({ ...credentials, deviceToken }); // gọi service login
      setUser(response.user);
      connectSocket();

      localStorage.setItem("token", response.token);

      let roles = response.user.roles;

      setUserRoles(roles);
      setIsLoggedIn(true);

      if (roles.some((userRole) => userRole.roleName === "admin")) {
        return navigate("/admin");
      }
      if (roles.some((userRole) => userRole.roleName === "staff")) {
        return navigate(`/garageManagement/${response.user.garageList[0]._id}`);
      }
      console.log("➡️ Redirecting to homepage...");
      return navigate("/");
    } catch (err) {
      const errorMessage =
        err.message || "Login failed. Please check your email and password.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");

      if (token) await logout(token);
    } catch (err) {
      setError(err.message || "Đăng xuất thất bại.");
    } finally {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setUserRoles([]);
      setUser(null);
      userLogout();
      setIsLoading(false);
      navigate("/login");
    }
  };

  const handleSignup = async (credentials) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await signup({
        ...credentials,
        roles: ["carowner"],
      });
      setSuccess(
        response.message || "Vui lòng kiểm tra email để xác minh tài khoản."
      );
      navigate("/login");
    } catch (err) {
      const errorMessage = err.message || "Đăng ký thất bại. Vui lòng thử lại.";
      console.error("Signup error:", errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestPasswordReset = async (email) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await requestPasswordReset(email);
      setSuccess("Password reset email has been sent.");
    } catch (err) {
      const errorMessage =
        err.message || "Không thể gửi email đặt lại mật khẩu.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (token, newPassword) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await resetPassword(token, newPassword);
      setSuccess("Password reset thành công.");
      navigate("/login");
    } catch (err) {
      const errorMessage = err.message || "Reset password failed.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    isLoggedIn,
    userRoles,
    setUserRoles,
    handleLogin,
    handleSignup,
    handleLogout,
    handleRequestPasswordReset,
    handleResetPassword,
  };
};
