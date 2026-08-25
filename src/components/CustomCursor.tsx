import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Real-time hover detection using elementFromPoint is more reliable 
      // than mouseover events for complex React nested components
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.closest('.hero-3d-text') !== null;

      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-white rounded-full pointer-events-none z-[99999]"
        style={{ mixBlendMode: 'difference' }}
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998]"
        style={{ mixBlendMode: 'difference' }}
        animate={{
          x: mousePosition.x - (isHovering ? 25 : 18),
          y: mousePosition.y - (isHovering ? 25 : 18),
          width: isHovering ? 50 : 36,
          height: isHovering ? 50 : 36,
          backgroundColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
          border: isHovering ? '0px solid rgba(255,255,255,0)' : '1px solid rgba(255,255,255,0.4)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
      />
    </>
  );
};
