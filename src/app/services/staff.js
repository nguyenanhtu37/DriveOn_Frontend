import { axios } from "@/lib/axios";

export const addStaff = async (garageId, newStaff) => {
  const response = await axios.post(`garage/${garageId}/add-staff`, newStaff);
  return response.data;
};

export const getStaffs = async (garageId) => {
  const response = await axios.get(`garage/${garageId}/staff`);
  return response.data;
};

export const enableStaff = async (garageId, staffId) => {
  const response = await axios.put(`garage/${garageId}/staff/enable`, {
    staffId,
  });
  return response.data;
};
export const disableStaff = async (garageId, staffId) => {
  const response = await axios.put(`garage/${garageId}/staff/disable`, {
    staffId,
  });
  return response.data;
};
