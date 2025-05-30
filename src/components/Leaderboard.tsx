import { useEffect, useState, useRef } from "react";
import { countryList } from "../constants/countryList";
import { GrScorecard } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";

const BATCH_SIZE = 20;

const Leaderboard = () => {
  const [visibleCountries, setVisibleCountries] = useState(
    countryList.slice(0, BATCH_SIZE)
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    setVisibleCountries((prev) => {
      const next = countryList.slice(prev.length, prev.length + BATCH_SIZE);
      if (prev.length + next.length >= countryList.length) setHasMore(false);
      return [...prev, ...next];
    });
  };

  const handleScroll = () => {
    if (!containerRef.current || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      loadMore();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-white/10 backdrop-blur-lg shadow-lg mr-6 overflow-y-auto mb-8"
    >
      <div className="text-center py-2 bg-white/40 w-full mb-2 text-2xl flex justify-center items-center">
        <GrScorecard className="mr-2" /> Leaderboard
      </div>
      <div>
        <AnimatePresence>
          {visibleCountries.map((country, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between px-4 py-2 border-b border-white/20"
            >
              <span>{index + 1}</span>
              <span>{country.name}</span>
              <span>{country.vibe}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {!hasMore && (
          <div className="text-center py-4 text-sm text-white/50">
            🎉 All countries loaded!
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
