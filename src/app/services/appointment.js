import { axios } from "@/lib/axios";

export const createAppointment = async (data) => {
  const response = await axios.post("/appointment/create", data);
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
export const completeAppointment = async ({ appointmentId, data }) => {
  const response = await axios.put(
    `/appointment/${appointmentId}/complete`,
    data
  );
  return response.data;
};

export const getAppointmentById = async (appointmentId) => {
  const response = await axios.get(`/appointment/${appointmentId}`);
  return response.data;
};

export const getAppointmentByUserId = async () => {
  const response = await axios.get(`/appointment/view-list-user-appointment`);
  return response.data;
};

export const cancelAppointment = async (appointmentId) => {
  const response = await axios.put(`/appointment/${appointmentId}/cancel`);
  return response.data;
};

export const getNextMaintenance = async (garageId) => {
  const response = await axios.get(
    `/appointment/garage/${garageId}/next-maintenance`
  );
  return response.data;
};

export const createAppointmentReminder = async (data) => {
  const response = await axios.post("/appointment/create-by-staff", data);
  return response.data;
};

export const isCalledAppointment = async (appointmentId) => {
  await axios.put(`/appointment/isCalled/${appointmentId}`);
};

export const createAppointmentByStaff = async (data) => {
  const response = await axios.post("/appointment/create-by-staff", data);
  return response.data;
};
