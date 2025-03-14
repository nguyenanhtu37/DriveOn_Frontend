// src/app/services/brand.js
import { axios } from "../../lib/axios";

const API_URL = "/brand";

export const addBrand = async (brandData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, brandData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add brand");
  }
};

export const getBrands = async () => {
  try {
    console.log("Fetching brands from:", `${API_URL}/get`);
    const response = await axios.get(`${API_URL}/get`); // Changed from API_URL to API_URL/get
    console.log("Response:", response.data);
    if (!response.data || !response.data.data) {
      throw new Error("Invalid response from server");
    }
    return response.data.data; // Return the 'data' field specifically
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch brand");
  }
};