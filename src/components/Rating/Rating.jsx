import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

const Rating = ({ value = 0, onChange, size }) => {
  const [rating, setRating] = useState(value);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="p-1 transition-colors"
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => handleRatingChange(star)}
        >
          <Star
            className={cn(
              "transition-colors ease-in-out duration-100",
              `size-${size || 5} `,
              star <= (hoveredRating || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default Rating;
