import { useGetFeedbackForGarageDetail } from "@/app/stores/entity/feedbackV2";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeedbackItem from "./FeedbackItem";

const FeedbackV2 = () => {
  const { garageId } = useParams();
  const [showMore, setShowMore] = useState(1);
  const feedbackData = useGetFeedbackForGarageDetail({
    garageId,
    showMore,
  });

  const handleShowMoreFeedbacks = () => {
    setShowMore((prev) => prev + 1);
  };

  const { feedbacks, canShowMore } = feedbackData.data || {};
  return (
    <div className="w-full  py-8 ">
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold ">Customer Reviews</h2>
        {/* <AddFeedback /> */}
      </div>

      <div className="flex items-center mb-6">
        <div className="flex items-center mr-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-3 h-3 fill-current text-yellow-500" />
          ))}
        </div>
        <span className="font-medium">{feedbacks?.length} reviews</span>
      </div>

      {feedbackData.isLoading || feedbacks?.length === 0 ? (
        <div className="text-center py-10">
          <MessageSquare className="w-12 h-12 mx-auto text-gray-300" />
          <p className="mt-2 text-gray-500">
            There are no reviews yet. Be the first to leave a review!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {feedbacks.map((feedback) => (
              <FeedbackItem
                key={feedback._id}
                avatar={feedback.user.avatar}
                name={feedback.user.name}
                content={feedback.content}
                rating={feedback.rating}
                services={feedback.serviceName}
                createdAt={feedback.createdAt}
              />
            ))}
          </div>

          {canShowMore && (
            <Button
              variant="outline"
              className="mt-6"
              onClick={handleShowMoreFeedbacks}
            >
              Show More Feedbacks
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackV2;
