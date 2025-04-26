import { useAddFeedback } from "@/app/stores/entity/feedbackV2";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const AddFeedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const { garageId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const addFeedback = useAddFeedback();

  const handleSubmit = () => {
    addFeedback.mutate(
      { garage: garageId, rating, text },
      {
        onSuccess: () => {
          toast({
            title: "Thành công",
            description: "Đánh giá của bạn đã được gửi thành công.",
            duration: 2000,
          });
          setRating(0);
          setText("");
          setIsOpen(false);
          queryClient.invalidateQueries(["feedback", garageId]);
        },
        onError: (error) => {
          toast({
            title: "Lỗi",
            description: error?.response?.data?.message || "Đã có lỗi xảy ra.",
            duration: 2000,
          });
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="w-full md:w-auto">Create reviews</Button>
      </DialogTrigger>
      <DialogContent className="p-0 border-none">
        <div className="w-full max-w-3xl  p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Create reviews</h2>
          <div>
            <label className="block mb-2 font-medium">Ratings</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    className={`size-5 ${
                      (hoverRating || rating) >= star
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="feedback-text" className="block mb-2 font-medium">
              Your Comment
            </label>
            <Textarea
              id="feedback-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your experience about the service..."
              rows={4}
            />
          </div>

          <Button
            disabled={rating === 0 || addFeedback.isPending}
            className="w-full md:w-auto mt-4"
            onClick={handleSubmit}
          >
            {addFeedback.isPending ? "Loading..." : "Submit a review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
