import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../../app/services/login";
import { signup } from "../../app/services/signup";
import { requestPasswordReset, resetPassword } from "../../app/services/reset-password";


export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userRoles, setUserRoles] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await login(credentials);
      console.log("Login response:", response); // Debug
      localStorage.setItem("token", response.token);
      setIsLoggedIn(true);
      console.log("isLoggedIn set to true"); // Debug
      navigate("/");
    } catch (err) {
      const errorMessage = err.message || "Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.";
      console.error("Login error:", errorMessage); // Debug
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
      const submitData = {
        ...credentials,
        roles: ["carowner"],
      };
      const response = await signup(submitData);
      setSuccess(response.message || "Vui lòng kiểm tra email để xác minh tài khoản.");
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

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await logout(token);
      setIsLoggedIn(false);
      setUserRoles([]);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      const errorMessage = err.message || "Đăng xuất thất bại.";
      console.error("Logout error:", errorMessage);
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
      setSuccess("Email đặt lại mật khẩu đã được gửi.");
    } catch (err) {
      const errorMessage = err.message || "Không thể gửi email đặt lại mật khẩu.";
      console.error("Request reset password error:", errorMessage);
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
      setSuccess("Mật khẩu đã được đặt lại thành công.");
      navigate("/login");
    } catch (err) {
      const errorMessage = err.message || "Đặt lại mật khẩu thất bại.";
      console.error("Reset password error:", errorMessage);
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