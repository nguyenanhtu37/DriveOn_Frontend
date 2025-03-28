import { axios } from "@/lib/axios";

export const createAppointment = async (data) => {
  const response = axios.post("/appointment/create", data);
  return response.data;
};

export const getAppointmentByGarageId = async (garageId) => {
  const response = await axios.get(`/appointment/garage/${garageId}`);
  return response.data;
};

export const getAppointmentDetails = async (appointmentId) => {
  const response = await axios.get(`/appointment/${appointmentId}`);
  return response.data;
};

export const confirmAppointment = async (appointmentId) => {
  const response = await axios.put(`/appointment/${appointmentId}/confirm`);
  return response.data;
};

export const denyAppointment = async (appointmentId) => {
  const response = await axios.put(`/appointment/${appointmentId}/deny`);
  return response.data;
};
export const completeAppointment = async (appointmentId) => {
  const response = await axios.put(`/appointment/${appointmentId}/complete`);
  return response.data;
};

export const getAppointmentById = async (appointmentId) => {
  const response = await axios.get(`/appointment/${appointmentId}`);
  return response.data;
};
