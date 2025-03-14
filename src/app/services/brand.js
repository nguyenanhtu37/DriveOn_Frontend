import axios from "axios";

const API_URL = "/brand";

export const addBrand = async (brandData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, brandData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add brand");
  }
};