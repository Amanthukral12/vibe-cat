import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const TEXT = "VibeCat";
const TRAIL_COUNT = TEXT.length;

function useTrailMotionValues(count: number) {
  const xValues = Array(count)
    .fill(0)
    .map(() => useMotionValue(0));
  const yValues = Array(count)
    .fill(0)
    .map(() => useMotionValue(0));

  const springs = xValues.map((x, i) => ({
    x: useSpring(x, { damping: 20, stiffness: 100, mass: 1 + i * 0.3 }),
    y: useSpring(yValues[i], {
      damping: 20,
      stiffness: 100,
      mass: 1 + i * 0.3,
    }),
  }));

  return { xValues, yValues, springs };
}

const VibeTrail = () => {
  const { xValues, yValues, springs } = useTrailMotionValues(TRAIL_COUNT);
  const letters = TEXT.split("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      xValues[0].set(e.clientX);
      yValues[0].set(e.clientY);

      for (let i = 1; i < TRAIL_COUNT; i++) {
        // Instead of directly setting to previous spring's value,
        // move a bit towards it by averaging current and target
        const prevX = springs[i - 1].x.get();
        const prevY = springs[i - 1].y.get();

        const currentX = xValues[i].get();
        const currentY = yValues[i].get();

        // Move 80% towards previous spring position, 20% current pos
        xValues[i].set(currentX * 0.1 + prevX * 0.9);
        yValues[i].set(currentY * 0.1 + prevY * 0.9);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [xValues, yValues, springs]);

  return (
    <>
      {springs.map((spring, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none text-white font-bold text-xl sm:text-lg select-none"
          style={{
            x: spring.x,
            y: spring.y,
            translateX: "-50%",
            translateY: "-50%",
            opacity: (1 - i / TRAIL_COUNT) * 0.9,
            userSelect: "none",
          }}
        >
          {letters[i]}
        </motion.div>
      ))}
    </>
  );
};

export default VibeTrail;
