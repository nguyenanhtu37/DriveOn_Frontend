import { useState, useEffect } from "react";
import { getProfile, updateProfile as updateProfileService ,changePassword as changePasswordService } from "../../app/services/profile";

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

      // Ensure userId is available and append it
      if (profile && profile.userId) {
        formData.append("userId", profile.userId);
      } else {
        throw new Error("User ID is missing");
      }

      // Append updated fields to FormData, including the name and phone
      formData.append("name", updatedProfile.name || profile.name); // If no name, use existing profile name
      formData.append("phone", updatedProfile.phone || profile.phone); // Same for phone

      // Append avatar if it's a file (e.g., image uploaded by user)
      if (updatedProfile.avatar) {
        formData.append("avatar", updatedProfile.avatar);
      }

      // Call the API to update the profile with token in Authorization header
      await updateProfileService(formData);

      // Fetch updated profile data after successful update
      await fetchProfile();
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message); // Handle error message
      throw err;
    } finally {
      setLoading(false); // Reset loading state
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
