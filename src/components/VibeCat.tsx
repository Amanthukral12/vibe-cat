import { useState } from "react";
import { catImages } from "../constants/catImages";

const VibeCat = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? catImages.length - 1 : prevIndex - 1
    );
    setIsPlaying(false);
  };

  const handleMouseDown = () => {
    setIsPlaying(true);
  };

  const handleMouseUp = () => {
    setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
  };

  const currentItem = catImages[currentIndex];

  return (
    <div className="flex items-center justify-center gap-4">
      <button onClick={handlePrev} className="p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={6}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <img
        src={isPlaying ? currentItem.gifUrl : currentItem.imageUrl}
        alt={`Cat ${currentItem.index}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="w-80 h-80  rounded-full shadow cursor-pointer"
      />

      <button onClick={handleNext} className="p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={6}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default VibeCat;
