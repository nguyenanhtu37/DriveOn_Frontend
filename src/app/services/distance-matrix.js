import axios from "axios";

export const getGeocode = async (address) => {
  const response = await axios.get(
    `https://api.distancematrix.ai/maps/api/geocode/json?address=${address}&key=${
      import.meta.env.VITE_API_GEOCODING_KEY
    }`
  );
  return response.data;
};
