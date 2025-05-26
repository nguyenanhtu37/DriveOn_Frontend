import { useState, useCallback, useEffect } from 'react';

export const useLocationWithRetry = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }

    const timeoutId = setTimeout(() => {
      setError('Location request timed out');
    }, 10000);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        setLocation([position.coords.latitude, position.coords.longitude]);
        setError(null);
      },
      (error) => {
        clearTimeout(timeoutId);
        if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
          setTimeout(getLocation, 1000);
        } else {
          setError('Failed to get location');
        }
      },
      { timeout: 10000, maximumAge: 0, enableHighAccuracy: true }
    );
  }, [retryCount]);

  useEffect(() => {
    getLocation();
  }, []);

  return { location, error, retry: getLocation };
}; 