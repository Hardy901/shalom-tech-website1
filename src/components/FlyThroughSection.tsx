import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FlyThroughSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a massive scrolling area (4 full screens)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Lenis handles the smooth scroll globally, so we no longer need useSpring here!
  const smoothProgress = scrollYProgress;

  // Array to generate geometric rings for the tunnel (Reduced for GPU performance)
  const totalRings = 12;
  const rings = Array.from({ length: totalRings }).map((_, i) => i);

  // Array for milestone texts that we fly through
  const milestones = [
    { text: "INNOVATE", zOffset: 1, xOffset: "-50%", yOffset: "-50%" },
    { text: "COMPETE", zOffset: 4, xOffset: "-50%", yOffset: "-50%" },
    // Shift slightly so the camera perfectly threads the needle through the hole in 'Q'
    { text: "CONQUER", zOffset: 7, xOffset: "-50.5%", yOffset: "-47%" },
    // Shift the text to the right so the camera passes directly through the 'M' instead of the space
    { text: "SHALOM TECH", zOffset: 10, xOffset: "-42%", yOffset: "-50%" }
  ];

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-transparent">
      {/* Sticky container that holds the 3D perspective camera */}
      <div 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        
        {/* Background glow to simulate deep space / tunnel end */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#B600A8]/10 rounded-full blur-[80px] -z-20" />

        {/* Master 3D Container - Perfectly straight for realism */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Generate the 3D Tunnel Rings */}
          {rings.map((index) => {
            const baseZ = -(index * 500); 
            
            // Increase travel distance so elements fly way past the camera (perspective is 800px)
            const distanceToTravel = totalRings * 500 + 2000;
            const z = useTransform(smoothProgress, [0, 1], [baseZ, baseZ + distanceToTravel]);
            
            // Keep opacity 1 even as it passes the camera (z=800), let CSS handle the clipping!
            const opacity = useTransform(z, [-2000, -500, 700, 1000], [0, 1, 1, 0]);
            const rotateZ = useTransform(smoothProgress, [0, 1], [0, 180 + index * 10]);

            return (
              <motion.div
                key={`ring-${index}`}
                className="absolute top-1/2 left-1/2 rounded-full border-2 border-[#00E5FF]/40 pointer-events-none"
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
                {/* Inner dashed ring */}
                <div className="absolute inset-4 rounded-full border-2 border-[#00E5FF]/60 border-dashed opacity-80" />
              </motion.div>
            );
          })}

          {/* Generate the 3D Flying Text Milestones */}
          {milestones.map((milestone, index) => {
            const baseZ = -(milestone.zOffset * 500);
            const distanceToTravel = totalRings * 500 + 2000;
            const z = useTransform(smoothProgress, [0, 1], [baseZ, baseZ + distanceToTravel]);
            
            // Keep text fully visible until it physically passes behind the user's head (z > 800)
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
                <h2 className="font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00E5FF] uppercase tracking-[0.2em] md:tracking-[0.5em] text-[12vw] sm:text-[8vw] leading-none">
                  {milestone.text}
                </h2>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Scroll To Enter Indicator (Fades out when scrolling starts) */}
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
