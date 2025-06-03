import { axios } from "@/lib/axios";

const getFeedbackForGarage = async (payload) => {
  const response = await axios.get(`/feedback/garage/${payload.garageId}`, {
    params: {
      type: payload.type,
      rating: payload.rating,
      service: payload.service,
      keyword: payload.keyword,
      page: payload.page,
      limit: payload.limit,
    },
  });
  return response.data;
};

const getAllFeedbacksByGarage = async (garageId) => {
  const response = await axios.get(`/feedback/garage/${garageId}/all`);
  return response.data;
};

const getFeedbackForGarageDetail = async (garageId) => {
  const response = await axios.get(`/feedback/garageDetail/${garageId}`);
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
  getAllFeedbacksByGarage,
  addFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackByAppointmentId,
  getFeedbackForServiceDetail,
  getFeedbackForGarageDetail,
};
