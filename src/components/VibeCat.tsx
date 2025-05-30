import { useRef, useState } from "react";
import { catImages } from "../constants/catImages";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
const VibeCat = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGifPlaying, setIsGifPlaying] = useState(false);
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startCounter = () => {
    setCounter(0); // Reset counter
    intervalRef.current = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 500);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

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
    stopCounter(); // Stop if already running
    startCounter();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleMouseUp = () => {
    setIsGifPlaying(false);
    stopCounter();
    stopAudio();
  };

  const handleMouseLeave = () => {
    setIsGifPlaying(false);
    stopCounter();
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
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center gap-4">
        <button onClick={handlePrev} className="p-2">
          <motion.div
            className="flex items-center text-2xl absolute top-60 right-1/4 -rotate-35"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaArrowLeft className="mr-2 rainbow-text" />
            <span>Hold to Vibe cat</span>
          </motion.div>
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
          className="w-140 h-140  rounded-full shadow-2xl cursor-pointer"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="text-2xl font-bold mt-4">
        {`Vibing for ${counter} sec`}
      </div>
      <audio ref={audioRef} src="./assets/music/vibecat.mp3" preload="auto" />
    </div>
  );
};

export default VibeCat;
