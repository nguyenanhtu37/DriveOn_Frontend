import {axios} from "@/lib/axios";

export const getEmergencyGarages = async (latitude, longitude) => {
  const response = await axios.get("/emergency", {
    params: { latitude, longitude },
  });
  return response.data;
};