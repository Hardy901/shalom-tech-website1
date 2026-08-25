import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    let iteration = 0;
    const maxIterations = text.length * 3;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((current) =>
        text
          .split('')
          .map((letter, index) => {
            if (letter === ' ') return ' ';
            if (index < iteration / 3) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current!);
        setDisplayText(text);
      }
      iteration += 1;
    }, 40);
  };

  useEffect(() => {
    // Initial mount scramble
    const timeout = setTimeout(() => {
      scramble();
    }, 200);
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    scramble();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <motion.span
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        textShadow: isHovering
          ? [
              '-3px 0 0 rgba(0,255,255,0.7), 3px 0 0 rgba(182,0,168,0.7)',
              '3px 0 0 rgba(0,255,255,0.7), -3px 0 0 rgba(182,0,168,0.7)',
              '-3px 0 0 rgba(0,255,255,0.7), 3px 0 0 rgba(182,0,168,0.7)',
              '0px 0 0 rgba(0,255,255,0), 0px 0 0 rgba(182,0,168,0)',
            ]
          : '0px 0 0 rgba(0,255,255,0), 0px 0 0 rgba(182,0,168,0)',
        x: isHovering ? [-2, 2, -2, 0] : 0,
      }}
      transition={{
        duration: 0.2,
        repeat: isHovering ? Infinity : 0,
        repeatType: 'reverse',
      }}
      style={{
        color: isHovering ? '#fff' : '#D7E2EA',
      }}
    >
      {displayText}
    </motion.span>
  );
};
