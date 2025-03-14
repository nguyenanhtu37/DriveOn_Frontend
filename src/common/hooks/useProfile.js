import { useState, useEffect } from "react";
import { getProfile, updateProfile as updateProfileService, changePassword as changePasswordService } from "../../app/services/profile";

export const useProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleUpdateProfile = async (updatedProfile) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", updatedProfile.name || profile.name);
      Object.entries(updatedProfile).forEach(([key, value]) => {
        if (key !== "name" && value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      await updateProfileService(formData);
      await fetchProfile();
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

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
    fetchProfile();
  }, []);

  return {
    profile,
    setProfile,
    loading,
    error,
    updateProfile: handleUpdateProfile,
    changePassword: handleChangePassword,
    refetchProfile: fetchProfile,
  };
};