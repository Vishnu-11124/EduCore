import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

const Rating = ({ initialRating, onRating }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [hover, setHover] = useState(0);

  const handleRating = (value) => {
    setRating(value);

    if (onRating) onRating(value);
  };

  useEffect(() => {
    if (initialRating) setRating(initialRating);
  }, [initialRating]);

  return (
    <div className="flex items-center gap-2">

      {/* Stars */}
      <div className="flex items-center gap-1">

        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform duration-200 hover:scale-110"
            >

              <Star
                size={28}
                className={`cursor-pointer transition-all duration-200 ${
                  starValue <= (hover || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />

            </button>
          );
        })}

      </div>

      {/* Rating Text */}
      <p className="text-sm font-medium text-gray-600 ml-2">
        {rating > 0 ? `${rating}.0 Rating` : "Rate this course"}
      </p>

    </div>
  );
};

export default Rating;