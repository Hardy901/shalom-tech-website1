import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const textShadow = useTransform(
    progress,
    range,
    ['0px 0px 0px rgba(215, 226, 234, 0)', '0px 0px 15px rgba(215, 226, 234, 0.4)']
  );

  return (
    <span className="relative inline-block">
      <span className="opacity-15">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span
        style={{ opacity, textShadow }}
        className="absolute left-0 top-0 text-[#D7E2EA]"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');
  const total = characters.length;

  return (
    <p ref={containerRef} className={`flex flex-wrap justify-center ${className}`}>
      {characters.map((char, i) => {
        const start = i / total;
        const end = (i + 1) / total;
        return (
          <Character
            key={i}
            char={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
};
