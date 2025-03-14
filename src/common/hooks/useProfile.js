import { useState, useEffect } from "react";
import { getProfile, updateProfile as updateProfileService, changePassword as changePasswordService } from "../../app/services/profile";

export const useProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch profile data from server
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle profile update with form data (gọi API)
  const handleUpdateProfile = async (updatedProfile) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(updatedProfile).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      await updateProfileService(formData);
      await fetchProfile(); // Refetch updated profile
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handleChangePassword = async (oldPassword, newPassword) => {
    setLoading(true);
    try {
      await changePasswordService(oldPassword, newPassword);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile(); // Fetch profile on mount
  }, []);

  return {
    profile,
    setProfile,         // Cho phép cập nhật state cục bộ
    loading,
    error,
    updateProfile: handleUpdateProfile, // Hàm gọi API update profile
    changePassword: handleChangePassword,
    refetchProfile: fetchProfile,       // Cho phép refetch profile sau update
  };
};
