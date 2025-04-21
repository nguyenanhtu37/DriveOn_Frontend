import { useGetFeedbackForGarage } from "@/app/stores/entity/feedbackV2";
import { useParams } from "react-router-dom";
import FeedbackItem from "./FeedbackItem";

const FeedbackV2 = () => {
  const { garageId } = useParams();
  const feedback = useGetFeedbackForGarage(garageId);
  console.log(feedback);
  return (
    <div className=" grid grid-cols-1 gap-x-4 gap-y-3">
      {feedback.data.map((item) => (
        <FeedbackItem key={item._id} feeback={item} />
      ))}
    </div>
  );
};

export default FeedbackV2;
