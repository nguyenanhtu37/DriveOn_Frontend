import { setLocation } from "@/app/stores/view/user";
import { useEffect } from "react";

const useGeolocation = () => {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation([latitude, longitude]);
    };

    const handleError = (error) => {
      console.error("Error getting location:", error);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

    return () => {
      navigator.geolocation.clearWatch(handleSuccess);
    };
  }, []);
};
export { useGeolocation };
