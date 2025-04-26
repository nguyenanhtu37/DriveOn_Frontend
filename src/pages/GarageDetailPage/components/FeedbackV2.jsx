import { useGetFeedbackForGarage } from "@/app/stores/entity/feedbackV2";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddFeedback } from "./AddFeedback";
import { format } from "date-fns";

const FeedbackV2 = () => {
  const { garageId } = useParams();
  const feedbacks = useGetFeedbackForGarage(garageId);

  const [showAllFeedbacks, setShowAllFeedbacks] = useState(false);

  const displayedFeedbacks = showAllFeedbacks
    ? feedbacks.data
    : feedbacks.data.slice(0, 3);
  return (
    <div className="w-full  py-8 ">
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold ">Customer Reviews</h2>
        <AddFeedback />
      </div>

      <div className="flex items-center mb-6">
        <div className="flex items-center mr-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-3 h-3 fill-current text-yellow-500" />
          ))}
        </div>
        <span className="font-medium">{feedbacks.data.length} reviews</span>
      </div>

      {feedbacks.isLoading || feedbacks.data.length === 0 ? (
        <div className="text-center py-10">
          <MessageSquare className="w-12 h-12 mx-auto text-gray-300" />
          <p className="mt-2 text-gray-500">
            There are no reviews matching the filter
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {displayedFeedbacks.map((feedback) => (
              <div key={feedback._id} className="border-b pb-6">
                <div className="flex items-center mb-3">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={feedback.user.avatar}
                      alt={feedback.user.name}
                    />
                    <AvatarFallback>
                      {feedback.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{feedback.user.name}</h3>
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {Array.from({ length: feedback.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-current text-yellow-500"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {format(feedback.createdAt, "dd/MM/yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{feedback.text}</p>
              </div>
            ))}
          </div>

          {feedbacks.data.length - 3 > 0 && !showAllFeedbacks && (
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setShowAllFeedbacks(true)}
            >
              Show all {feedbacks.data.length} reviews
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackV2;
