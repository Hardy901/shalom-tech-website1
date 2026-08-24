import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y, filter: 'blur(15px)', scale: 0.95, rotateX: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)', scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: duration || 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // Premium spring-like easeOut
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
