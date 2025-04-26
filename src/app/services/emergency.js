import { axios } from "@/lib/axios";

export const fetchRescueGarages = async (latitude, longitude) => {
    const response = await axios.get('/garage/emergency', {
      params: { latitude, longitude },
    });
    return response.data;
};