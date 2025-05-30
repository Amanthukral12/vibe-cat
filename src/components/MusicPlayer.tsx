import { useEffect, useRef, useState } from "react";
import { music } from "../constants/music";
import { motion } from "framer-motion";
const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const playTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  };

  const handleTrackSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTrack = Number(e.target.value);
    setCurrentTrack(newTrack);

    if (!hasInteracted) {
      setHasInteracted(true);
    }

    if (audioRef.current) {
      audioRef.current.src = music[newTrack].src;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Playback failed:", err);
        });
    }
  };

  const handleNext = () => {
    const nextIndex = (currentTrack + 1) % music.length;
    setCurrentTrack(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentTrack - 1 + music.length) % music.length;
    setCurrentTrack(prevIndex);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = music[currentTrack].src;
      if (hasInteracted && isPlaying) {
        audioRef.current.play().catch((err) => console.warn(err));
      }
    }
  }, [currentTrack, hasInteracted]);

  const handleEnded = () => {
    handleNext();
  };

  return (
    <div className="w-3/5  mx-auto bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6 my-8 text-white border border-white/20">
      <h2 className="text-2xl font-semibold text-center mb-4">
        🎵 Music Player
      </h2>

      {isPlaying && (
        <div className="flex justify-center items-end h-16 gap-1 mb-4">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-indigo-400 rounded"
              animate={{
                height: [8, 32, 12],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mx-4 md:mx-14 gap-6 mb-3">
        <button onClick={handlePrev} className="text-2xl hover:text-indigo-300">
          ⏮️
        </button>
        <button onClick={togglePlay} className="text-3xl hover:text-indigo-300">
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        <button onClick={handleNext} className="text-2xl hover:text-indigo-300">
          ⏭️
        </button>
      </div>

      <div className="text-center mb-4">
        <span className="text-sm opacity-70">Now Playing:</span>
        <div className="text-lg font-medium text-indigo-200">
          {music[currentTrack].title}
        </div>
      </div>

      <div className="text-sm text-center mb-2">
        <label htmlFor="track-select" className="block mb-1 text-indigo-300">
          Select a Track:
        </label>
        <select
          id="track-select"
          value={currentTrack}
          onChange={handleTrackSelect}
          className="w-full bg-white/10 text-white rounded-md px-3 py-2 outline-none border border-white/30 backdrop-blur-md"
        >
          {music.map((song, index) => (
            <option key={song.title} value={index} className=" text-black ">
              {song.title}
            </option>
          ))}
        </select>
      </div>

      <audio
        ref={audioRef}
        src={music[currentTrack].src}
        onEnded={handleEnded}
        preload="auto"
      />
    </div>
  );
};

export default MusicPlayer;
