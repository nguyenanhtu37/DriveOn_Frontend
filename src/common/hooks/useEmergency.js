import useGeolocation from './useGeolocation';

const EmergencyPage = () => {
  const { location, error: geoError } = useGeolocation();
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (geoError) {
      setError('Unable to get your location. Please enable location services.');
    } else if (location) {
      setUserLocation([location.latitude, location.longitude]);
      fetchGarages(location.latitude, location.longitude);
    }
  }, [location, geoError]);
};