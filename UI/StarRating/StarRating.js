import { useState } from "react";

function useRating(initialRating = 0) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating > 0 ? hoverRating : rating;

  const handleMouseEnter = (val) => setHoverRating(val);
  const handleMouseLeave = () => setHoverRating(0);
  const handleSaveRating = (val) => setRating(val);

  return {
    rating,
    displayRating,
    handleMouseEnter,
    handleMouseLeave,
    handleSaveRating,
  };
}

function Star({ onClick, onMouseEnter, isFilled = false }) {
  return (
    <button
      className="star-btn"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      aria-checked={isFilled}
      aria-label="star"
      role="radio"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`star-icon ${isFilled ? "star-icon-filled" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        focusable="false"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </button>
  );
}
export default function StarRating({ maxRating = 5, initialRating = 0 }) {
  const {
    rating,
    displayRating,
    handleMouseEnter,
    handleMouseLeave,
    handleSaveRating,
  } = useRating(initialRating);

  return (
    <div
      className="star-rating"
      role="radiogroup"
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: maxRating }).map((_, index) => {
        const starRating = index + 1;

        return (
          <Star
            key={index}
            isFilled={starRating <= displayRating}
            onClick={() => handleSaveRating(starRating)}
            onMouseEnter={() => handleMouseEnter(starRating)}
          />
        );
      })}
      <Announcer rating={rating} maxRating={maxRating} />
    </div>
  );
}

function Announcer({ rating, maxRating }) {
  return (
    <span
      className="sr-only"
      role="status"
    >{`${rating} stars selected out of ${maxRating}`}</span>
  );
}
