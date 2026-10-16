import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FlyThroughSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Create a massive scrolling area (4 full screens)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = scrollYProgress;

  // Reduce rings for massive GPU performance boost (especially on mobile)
  const totalRings = isMobile ? 6 : 8;
  const rings = Array.from({ length: totalRings }).map((_, i) => i);

  // Array for milestone texts that we fly through
  const milestones = [
    { text: "INNOVATE", zOffset: 1, xOffset: "-50%", yOffset: "-50%" },
    { text: "COMPETE", zOffset: 3.5, xOffset: "-50%", yOffset: "-50%" },
    // Shift carefully so the camera perfectly threads the needle through the absolute center of the hole in 'Q'
    { text: "CONQUER", zOffset: 6, xOffset: "-48.5%", yOffset: "-53%" },
    // Keep it perfectly centered. The camera will fly through the space between M and T.
    { text: "SHALOM TECH", zOffset: 8.5, xOffset: "-50%", yOffset: "-50%" }
  ];

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-transparent">
      {/* Sticky container that holds the 3D perspective camera */}
      <div 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        
        {/* Background glow using radial-gradient (Zero blur = 100x faster on mobile GPUs) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-20">
          <div className="w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(182,0,168,0.15)_0%,_transparent_60%)] rounded-full" />
        </div>

        {/* Master 3D Container */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Generate the 3D Tunnel Rings */}
          {rings.map((index) => {
            const baseZ = -(index * 600); 
            
            const distanceToTravel = totalRings * 600 + 2000;
            const z = useTransform(smoothProgress, [0, 1], [baseZ, baseZ + distanceToTravel]);
            
            const opacity = useTransform(z, [-2000, -500, 700, 1000], [0, 1, 1, 0]);
            const rotateZ = useTransform(smoothProgress, [0, 1], [0, 180 + index * 10]);

            return (
              <motion.div
                key={`ring-${index}`}
                className="absolute top-1/2 left-1/2 rounded-full border-[1px] border-[#00E5FF]/30 pointer-events-none shadow-[0_0_30px_rgba(0,229,255,0.1)]"
                style={{
                  width: '65vw',
                  height: '65vw',
                  maxWidth: '700px',
                  maxHeight: '700px',
                  x: '-50%',
                  y: '-50%',
                  translateZ: z,
                  opacity,
                  rotateZ,
                  willChange: 'transform, opacity'
                }}
              >
                {/* Inner solid ring instead of dashed for iOS WebKit performance */}
                <div className="absolute inset-6 sm:inset-8 rounded-full border-[1px] border-[#00E5FF]/40 opacity-80" />
              </motion.div>
            );
          })}

          {/* Generate the 3D Flying Text Milestones */}
          {milestones.map((milestone, index) => {
            const baseZ = -(milestone.zOffset * 600);
            const distanceToTravel = totalRings * 600 + 2000;
            const z = useTransform(smoothProgress, [0, 1], [baseZ, baseZ + distanceToTravel]);
            
            const opacity = useTransform(z, [-1500, -200, 750, 900], [0, 1, 1, 0]);

            return (
              <motion.div
                key={`text-${index}`}
                className="absolute top-1/2 left-1/2 pointer-events-none w-full text-center"
                style={{
                  x: milestone.xOffset,
                  y: milestone.yOffset,
                  translateZ: z,
                  opacity,
                  willChange: 'transform, opacity'
                }}
              >
                {/* Restored bg-clip-text gradient */}
                <h2 
                  className="font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00E5FF] uppercase tracking-[0.2em] md:tracking-[0.5em] text-[12vw] sm:text-[8vw] leading-none drop-shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                  style={{ WebkitFontSmoothing: 'antialiased' }}
                >
                  {milestone.text}
                </h2>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Scroll To Enter Indicator */}
        <motion.div 
          className="absolute bottom-20 left-1/2 flex flex-col items-center justify-center pointer-events-none"
          style={{ 
            x: '-50%',
            opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) 
          }}
        >
          <div className="w-[2px] h-[60px] bg-gradient-to-b from-transparent via-[#00E5FF] to-transparent mb-4 overflow-hidden relative">
            <motion.div 
              className="w-full h-1/2 bg-white"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <span className="text-[#D7E2EA]/80 font-bold uppercase tracking-[0.3em] text-xs">Scroll To Enter</span>
        </motion.div>

      </div>
    </section>
  );
};
