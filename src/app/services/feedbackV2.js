import { axios } from "@/lib/axios";

const getFeedbackForGarage = async (id) => {
  const response = await axios.get(`/feedback/garage/${id}`);
  return response.data;
};

const addFeedback = async (data) => {
  const response = await axios.post("/feedback/add", data);
  return response.data;
};

const updateFeedback = async ({ appointmentId, data }) => {
  const response = await axios.put(
    `/feedback/appointment/${appointmentId}`,
    data
  );
  return response.data;
};

const deleteFeedback = async (id) => {
  const response = await axios.delete(`/feedback/delete/${id}`);
  return response.data;
};

const getFeedbackByAppointmentId = async (appointmentId) => {
  const response = await axios.get(`/feedback/appointment/${appointmentId}`);
  return response.data;
};

const getFeedbackForServiceDetail = async (serviceId) => {
  const response = await axios.get(`/feedback/service/${serviceId}`);
  return response.data;
};

export {
  getFeedbackForGarage,
  addFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackByAppointmentId,
  getFeedbackForServiceDetail,
};
