// src/app/services/brand.js
import { axios } from "../../lib/axios";

const API_URL = "/brand";

export const getBrands = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`, );
    const data = response.data;
    console.log("Raw API response:", response); // Debug log
    console.log("Parsed data:", data); // Debug log
    // Extract the 'data' array from the response
    return Array.isArray(data.data) ? data.data : []; // Access data.data
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch brands");
  }
};

// Other functions remain unchanged
export const addBrand = async (brandData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, brandData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add brand");
  }
};

export const updateBrand = async (brandId, brandData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${brandId}`, brandData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update brand");
  }
};

export const deleteBrand = async (brandId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${brandId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete brand");
  }
};