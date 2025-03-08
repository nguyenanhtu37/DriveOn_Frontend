import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../app/services/profile';

export const useProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    address: '',
    bankAccount: '',
    bankName: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (newProfile) => {
    try {
      setLoading(true);
      if (typeof newProfile === 'function') {
        setProfile(prev => {
          const updated = newProfile(prev);
          return { ...prev, ...updated };
        });
        return;
      }
      const response = await updateProfile(newProfile);
      setProfile(newProfile);
      setError(null);
      return response;
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
    loading,
    error,
    updateProfile: handleUpdateProfile,
    refetchProfile: fetchProfile
  };
};