import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const HeroSection = ({ onContactClick }: { onContactClick: () => void }) => {
  // Mouse tracking for dynamic 3D perspective tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth 3D tilt springs
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 100,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 100,
    damping: 15,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    
    // Normalize mouse position between -0.5 and 0.5
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    // Reset to center on leave
    mouseX.set(0);
    mouseY.set(0);
  };

  const titleChars = "SHALOM TECH".split("");

  return (
    <section 
      className="relative w-full h-screen overflow-hidden bg-[#070f1a] perspective-[2000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Breathing Orb Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(182,0,168,0.15) 0%, transparent 68%)'
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />

      <div className="absolute inset-0 w-full h-full flex flex-col justify-between z-10 select-none">
        {/* Navbar */}
        <div className="w-full z-20">
          <nav className="flex justify-between items-start px-6 md:px-10 pt-6 md:pt-8 w-full">
            <div className="flex-shrink-0 mr-4">
              <img src="/event-logo.png" alt="Shalom Tech" className="h-16 sm:h-20 md:h-24 object-contain" />
            </div>
            <div className="flex-shrink-0 ml-4">
              <img src="/school-logo-2.png" alt="School Logo" className="h-16 sm:h-20 md:h-24 object-contain" />
            </div>
          </nav>
        </div>

        {/* 3D "SHALOM TECH" HEADING */}
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 pointer-events-none">
          <div className="w-full max-w-full">
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="w-full perspective-[1000px] py-6 flex justify-center items-center pointer-events-auto"
            >
              {/* Central glowing effect behind the 3D text */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-[75vw] h-[25vw] bg-gradient-to-r from-[#B600A8]/20 via-cyan-400/20 to-indigo-900/20 blur-[100px] rounded-full animate-pulse" />
              </div>
              
              <h1 className="hero-3d-text font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[10.5vw] sm:text-[11.5vw] md:text-[12vw] lg:text-[12.5vw] xl:text-[13vw] select-none relative z-10 flex justify-center items-center">
                {titleChars.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: [0, -8, 0], rotateZ: [0, index % 2 === 0 ? 0.8 : -0.8, 0] }}
                    transition={{
                      opacity: { duration: 0.6, delay: index * 0.04 },
                      y: { duration: 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: index * 0.12 },
                      rotateZ: { duration: 5.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: index * 0.15 },
                    }}
                    whileHover={{ scale: 1.25, y: -25, rotateZ: index % 2 === 0 ? 8 : -8, rotateY: 20, color: "#A5D6FF", transition: { type: "spring", stiffness: 400, damping: 10 } }}
                    className="inline-block transform-gpu transition-transform cursor-pointer"
                    style={{ display: 'inline-block', width: char === ' ' ? '0.22em' : 'auto' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-20 flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 w-full">
          <div>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
            >
              Empowering young innovators to shape the future — boldly, ethically, and with purpose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
