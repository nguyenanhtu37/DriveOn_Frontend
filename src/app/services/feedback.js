import { axios } from "@/lib/axios";


export const feedbackService = {
  // Lấy danh sách feedback theo garageId
  getFeedbackByGarageId: async (garageId) => {
    try {
      const response = await axios.get(`feedback/garage/${garageId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch feedbacks');
    }
  },

  // Thêm feedback mới
  addFeedback: async (feedbackData, token) => {
    try {
      const response = await axios.post(`feedback/add`, feedbackData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add feedback');
    }
  },

  // Cập nhật feedback
  updateFeedback: async (feedbackId, updateData, token) => {
    try {
      const response = await axios.put(`feedback/${feedbackId}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update feedback');
    }
  },

  // Xóa feedback
  deleteFeedback: async (feedbackId, token) => {
    try {
      const response = await axios.delete(`feedback/${feedbackId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete feedback');
    }
  },
};