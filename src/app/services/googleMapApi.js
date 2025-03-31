import axios from "axios";

export const getCoordinates = async (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${import.meta.env.VITE_API_GOOGLE_MAPS_KEY}`;

  const response = await axios.get(url);
  return response;
};
