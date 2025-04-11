import { axios } from "../../lib/axios";

const API_URL = "/brand";

export const getBrands = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`);
    const data = response.data;
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch brands");
  }
};

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
    const response = await axios.put(`${API_URL}/update`, { brandId, ...brandData });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update brand");
  }
};

export const deleteBrand = async (brandId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete`, {
      data: { brandId }, // Axios DELETE hỗ trợ body qua `data` trong config
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete brand");
  }
};
