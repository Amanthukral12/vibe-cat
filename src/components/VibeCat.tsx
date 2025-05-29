import { useRef, useState } from "react";
import { catImages } from "../constants/catImages";
import { FaArrowLeft } from "react-icons/fa";
const VibeCat = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGifPlaying, setIsGifPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    setIsGifPlaying(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? catImages.length - 1 : prevIndex - 1
    );
    setIsGifPlaying(false);
    stopAudio();
  };

  const handleMouseDown = () => {
    setIsGifPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleMouseUp = () => {
    setIsGifPlaying(false);
    stopAudio();
  };

  const handleMouseLeave = () => {
    setIsGifPlaying(false);
    stopAudio();
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const currentItem = catImages[currentIndex];

  return (
    <div className="flex items-center justify-center gap-4">
      <button onClick={handlePrev} className="p-2">
        <div className="flex items-center absolute top-40 right-1/4 -rotate-35">
          <FaArrowLeft className="mr-2" />
          <span>Hold to Vibe cat</span>
        </div>
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
        src={isGifPlaying ? currentItem.gifUrl : currentItem.imageUrl}
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
      <audio ref={audioRef} src="./assets/music/vibecat.mp3" preload="auto" />
    </div>
  );
};

export default VibeCat;
