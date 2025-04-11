import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../../app/services/login";
import { signup } from "../../app/services/signup";
import {
  requestPasswordReset,
  resetPassword,
} from "../../app/services/reset-password";
import { setUser } from "@/app/stores/view/user";

// Hardcoded role data for mapping (replace with API call in production)
const roleData = [
  { _id: "67895c212e7333f925e9c0e9", roleName: "admin" },
  { _id: "67895c322e7333f925e9c0ed", roleName: "manager" },
  { _id: "67895c3e2e7333f925e9c0ef", roleName: "carowner" },
  { _id: "67b60df8c465fe4f943b98cc", roleName: "staff" },
];

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userRoles, setUserRoles] = useState([]);
  const navigate = useNavigate();

  // Sync state with localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    // Optionally fetch user roles from server if token exists
    // Example: if (token) fetchUserRoles();
  }, []);

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await login(credentials); // Updated service
      setUser(response.user); // Set global user state
      localStorage.setItem("token", response.token);
  
      // Determine roles
      let roles = response.roles;
      if (roles.length > 0 && typeof roles[0] === "string" && roles[0].match(/^[0-9a-fA-F]{24}$/)) {
        roles = roles.map((roleId) =>
          roleData.find((r) => r._id === roleId)?.roleName || "carowner"
        );
      }
      setUserRoles(roles);
      setIsLoggedIn(true);
  
      // Redirect based on roles
      const isAdmin = roles.includes("admin");
      const isStaff = roles.includes("staff");
      if (isAdmin) {
        navigate("/adminDashboard/");
      } else if (isStaff) {
        const garageId = response.user.garageId || "defaultGarageId"; // Adjust based on your user data
        navigate(`/garageManagement/${garageId}/staff`);
      } else {
        navigate("/");
      }
    } catch (err) {
      const errorMessage =
        err.message || "Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.";
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
      if (token) {
        await logout(token); // Updated service
      }
    } catch (err) {
      setError(err.message || "Đăng xuất thất bại.");
    } finally {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setUserRoles([]);
      setUser(null);
      setIsLoading(false);
      navigate("/login");
    }
  };

  const handleSignup = async (credentials) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const submitData = {
        ...credentials,
        roles: ["carowner"], // Default role for new users
      };
      const response = await signup(submitData);
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
        err.message || "Password reset email could not be sent.";
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
      setSuccess("Password reset email has been sent.");
      navigate("/login");
    } catch (err) {
      const errorMessage = err.message || "Password reset failed.";
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