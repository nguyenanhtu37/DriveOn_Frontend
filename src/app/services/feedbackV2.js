import { axios } from "@/lib/axios";

const getFeedbackForGarage = async (id) => {
  const response = await axios.get(`/feedback/garage/${id}`);
  return response.data;
};

const addFeedback = async (data) => {
  const response = await axios.post("/feedback", data);
  return response.data;
};

const updateFeedback = async (data) => {
  const response = await axios.put(`/feedback/${data._id}`, data);
  return response.data;
};

const deleteFeedback = async (id) => {
  const response = await axios.delete(`/feedback/${id}`);
  return response.data;
};

export { getFeedbackForGarage, addFeedback, updateFeedback, deleteFeedback };
