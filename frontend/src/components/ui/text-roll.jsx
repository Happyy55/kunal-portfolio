import { motion } from "framer-motion";

const DEFAULT_VARIANTS = {
  enter: {
    initial: { rotateX: 0 },
    animate: { rotateX: 90 },
  },
  exit: {
    initial: { rotateX: 90 },
    animate: { rotateX: 0 },
  },
};

export function TextRoll({
  children,
  duration = 0.5,
  getEnterDelay = (i) => i * 0.1,
  getExitDelay = (i) => i * 0.1 + 0.2,
  className,
  transition = { ease: "easeIn" },
  variants,
  onAnimationComplete,
}) {
  const letters = children.split("");

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <span
          key={i}
          className="relative inline-block [perspective:10000px] [transform-style:preserve-3d] [width:auto]"
          aria-hidden="true"
        >
          <motion.span
            className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_25%]"
            initial={variants?.enter?.initial ?? DEFAULT_VARIANTS.enter.initial}
            animate={variants?.enter?.animate ?? DEFAULT_VARIANTS.enter.animate}
            transition={{ ...transition, duration, delay: getEnterDelay(i) }}
          >
            {letter === " " ? " " : letter}
          </motion.span>
          <motion.span
            className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_100%]"
            initial={variants?.exit?.initial ?? DEFAULT_VARIANTS.exit.initial}
            animate={variants?.exit?.animate ?? DEFAULT_VARIANTS.exit.animate}
            transition={{ ...transition, duration, delay: getExitDelay(i) }}
            onAnimationComplete={letters.length === i + 1 ? onAnimationComplete : undefined}
          >
            {letter === " " ? " " : letter}
          </motion.span>
          <span className="invisible">{letter === " " ? " " : letter}</span>
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default TextRoll;
