import { useEffect, useState } from "react";
import { getEmergencyGarages } from "@/app/services/emergency";
import { getLocation } from "@/app/stores/view/user";

const useEmergencyGarages = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    
  const fetchEmergencyGarages = async () => {
    try {
      const location = getLocation();
      const [latitude, longitude] = location;
      const data = await getEmergencyGarages(latitude, longitude);
      setGarages(data);
    } catch (err) {
      setError("Failed to fetch emergency garages");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencyGarages();
  }, []);

  return { garages, loading, error };
};

export default useEmergencyGarages;