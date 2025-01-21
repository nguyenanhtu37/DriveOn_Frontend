import { useState } from 'react';
import { login } from '../../app/services/login';

export const useAuth = () => {
  const [error, setError] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      throw err;
    }
  };

  return { handleLogin, error };
};
