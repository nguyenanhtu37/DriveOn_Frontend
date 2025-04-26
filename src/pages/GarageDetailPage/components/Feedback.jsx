import { useState } from "react";
import { Star } from "lucide-react";
import { useFeedback } from "@/common/hooks/useFeedback";
import { Loading } from "@/components/Loading";

const Feedback = ({ garageId, currentUserId }) => {
  const token = localStorage.getItem("token");
  const {
    feedbacks,
    loading,
    error,
    addFeedback,
    updateFeedback,
    deleteFeedback,
  } = useFeedback(garageId);
  const [newFeedback, setNewFeedback] = useState({ rating: 0, text: "" });
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [submitError, setSubmitError] = useState(null); // Lưu lỗi khi submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setSubmitError("Please login to submit feedback");
      return;
    }

    if (!newFeedback.rating || !newFeedback.text.trim()) {
      setSubmitError("Please provide a rating and feedback text");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (editingFeedback) {
        await updateFeedback(editingFeedback._id, newFeedback, token);
        setEditingFeedback(null);
      } else {
        await addFeedback({ ...newFeedback, garage: garageId }, token);
      }
      setNewFeedback({ rating: 0, text: "" });
    } catch (err) {
      setSubmitError(err.message || "Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (feedbackId) => {
    if (!token) {
      setSubmitError("Please login to delete feedback");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await deleteFeedback(feedbackId, token);
    } catch (err) {
      setSubmitError(err.message || "Failed to delete feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hiển thị Loading khi đang fetch lần đầu mà chưa có dữ liệu
  if (loading && !feedbacks.length) return <Loading />;

  // Hiển thị lỗi từ useFeedback (lỗi fetch ban đầu)
  if (error) return <div className="text-red-500">Error: {error}</div>;
  console.log(
    "Feedback user ID:",
    feedbacks.map((f) => f.user?.id)
  );
  console.log("Current user ID:", currentUserId);
  return (
    <div className="w-full py-8 flex flex-col gap-y-6">
      <h3 className="text-lg font-semibold text-[#222222]">
        Customer Feedback
      </h3>

      {/* Feedback Form */}
      {token ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={`cursor-pointer ${
                  star <= newFeedback.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() =>
                  !isSubmitting &&
                  setNewFeedback({ ...newFeedback, rating: star })
                }
              />
            ))}
          </div>
          <textarea
            value={newFeedback.text}
            onChange={(e) =>
              !isSubmitting &&
              setNewFeedback({ ...newFeedback, text: e.target.value })
            }
            placeholder="Write your feedback here..."
            className="w-full p-3 border rounded-lg"
            rows={4}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="self-start bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting
              ? "Submitting..."
              : editingFeedback
              ? "Update Feedback"
              : "Submit Feedback"}
          </button>
          {submitError && (
            <div className="text-red-500 text-sm mt-2">{submitError}</div>
          )}
        </form>
      ) : (
        <p className="text-gray-500">Please login to submit feedback.</p>
      )}

      {/* Feedback List */}
      <div className="flex flex-col gap-4">
        {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div
              key={feedback._id || `feedback-${index}`}
              className="border p-4 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {feedback.user && feedback.user.name
                    ? feedback.user.name
                    : "Current User"}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={
                        star <= feedback.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-[#6a6a6a] mt-2">{feedback.text}</p>
              {token &&
                feedback.user &&
                String(feedback.user.id) === String(currentUserId) && (
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingFeedback(feedback);
                        setNewFeedback({
                          rating: feedback.rating,
                          text: feedback.text,
                        });
                        setSubmitError(null); // Reset lỗi khi edit
                      }}
                      className="text-blue-500 hover:underline"
                      disabled={isSubmitting}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(feedback.id)}
                      className="text-red-500 hover:underline"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
            </div>
          ))
        ) : (
          <p>No feedback available</p>
        )}
      </div>
    </div>
  );
};

export default Feedback;
