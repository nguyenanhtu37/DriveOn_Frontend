import axios from "axios";

export const getDrivingDistance = async ({ origin, destination }) => {
  const response = await axios.get(
    `https://router.project-osrm.org/route/v1/driving/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?overview=full&geometries=geojson`
  );
  return response.data;
};
