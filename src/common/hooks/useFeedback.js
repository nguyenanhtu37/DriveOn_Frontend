import { useState, useEffect, useCallback } from 'react';
import { feedbackService } from '@/app/services/feedback';

export const useFeedback = (garageId) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hàm fetch feedbacks
  const fetchFeedbacks = useCallback(async () => {
    if (!garageId) return;
    setLoading(true);
    try {
      const data = await feedbackService.getFeedbackByGarageId(garageId);
      setFeedbacks(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch feedbacks');
    } finally {
      setLoading(false);
    }
  }, [garageId]);

  // Thêm feedback
  const addFeedback = async (feedbackData, token) => {
    if (!token) throw new Error('Authentication token is required');
    setLoading(true);
    try {
      const newFeedback = await feedbackService.addFeedback(feedbackData, token);
      setFeedbacks((prev) => [newFeedback, ...prev]); // Thêm feedback mới vào đầu danh sách
      setError(null);
      return newFeedback; // Trả về để component có thể sử dụng nếu cần
    } catch (err) {
      const errorMsg = err.message || 'Failed to add feedback';
      setError(errorMsg);
      throw new Error(errorMsg); // Ném lỗi để component xử lý
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật feedback
  const updateFeedback = async (feedbackId, updateData, token) => {
    if (!token) throw new Error('Authentication token is required');
    setLoading(true);
    try {
      const updatedFeedback = await feedbackService.updateFeedback(feedbackId, updateData, token);
      setFeedbacks((prev) =>
        prev.map((fb) => (fb._id === feedbackId ? updatedFeedback : fb))
      );
      setError(null);
      return updatedFeedback;
    } catch (err) {
      const errorMsg = err.message || 'Failed to update feedback';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Xóa feedback
  const deleteFeedback = async (feedbackId, token) => {
    if (!token) throw new Error('Authentication token is required');
    setLoading(true);
    try {
      await feedbackService.deleteFeedback(feedbackId, token);
      setFeedbacks((prev) => prev.filter((fb) => fb._id !== feedbackId));
      setError(null);
    } catch (err) {
      const errorMsg = err.message || 'Failed to delete feedback';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Fetch feedbacks khi garageId thay đổi
  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return {
    feedbacks,
    loading,
    error,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    refetch: fetchFeedbacks, // Thêm hàm refetch để gọi thủ công nếu cần
  };
};