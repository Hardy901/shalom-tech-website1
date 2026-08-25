import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FlyThroughSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a massive scrolling area (4 full screens)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Array to generate 20 glowing geometric rings for the tunnel
  const totalRings = 20;
  const rings = Array.from({ length: totalRings }).map((_, i) => i);

  // Array for milestone texts that we fly through
  const milestones = [
    { text: "INNOVATE", zOffset: 1 },
    { text: "COMPETE", zOffset: 6 },
    { text: "CONQUER", zOffset: 11 },
    { text: "SHALOM TECH", zOffset: 16 }
  ];

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#070f1a]">
      {/* Sticky container that holds the 3D perspective camera */}
      <div 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        
        {/* Background glow to simulate deep space / tunnel end */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#0088FF]/20 rounded-full blur-[100px] -z-20" />

        {/* Generate the 3D Tunnel Rings */}
        {rings.map((index) => {
          // Rings are spaced 400px apart in Z space.
          // index 0 starts at Z = -400, index 19 starts at Z = -8000
          const baseZ = -(index * 400); 
          
          // Total distance the camera flies forward through the tunnel
          const distanceToTravel = totalRings * 400 + 1000;
          
          // As user scrolls (0 to 1), Z value increases, bringing elements closer
          const z = useTransform(scrollYProgress, [0, 1], [baseZ, baseZ + distanceToTravel]);
          
          // Fade out as it passes behind the camera (Z > 300)
          const opacity = useTransform(z, [-2000, -500, 300, 800], [0, 1, 1, 0]);
          
          // Slowly rotate the rings to create a twisting effect
          const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 180 + index * 10]);

          return (
            <motion.div
              key={`ring-${index}`}
              className="absolute top-1/2 left-1/2 rounded-full border border-[#D7E2EA]/10 shadow-[0_0_50px_rgba(0,136,255,0.1)] pointer-events-none"
              style={{
                width: '60vw',
                height: '60vw',
                maxWidth: '600px',
                maxHeight: '600px',
                x: '-50%',
                y: '-50%',
                translateZ: z,
                opacity,
                rotateZ
              }}
            >
              {/* Inner glowing core ring */}
              <div className="absolute inset-4 rounded-full border border-[#0088FF]/30 border-dashed opacity-50" />
            </motion.div>
          );
        })}

        {/* Generate the 3D Flying Text Milestones */}
        {milestones.map((milestone, index) => {
          const baseZ = -(milestone.zOffset * 400);
          const distanceToTravel = totalRings * 400 + 1000;
          const z = useTransform(scrollYProgress, [0, 1], [baseZ, baseZ + distanceToTravel]);
          
          // The text fades in slowly, gets perfectly bright right in front of the camera, then fades out instantly as it flies "behind" your head
          const opacity = useTransform(z, [-1500, -200, 200, 600], [0, 1, 1, 0]);
          
          // Blur the text when it is far away to create true depth of field
          const blurRaw = useTransform(z, [-2000, -500, 0], [20, 0, 0]);
          const filter = useTransform(() => `blur(${blurRaw.get()}px)`);

          return (
            <motion.div
              key={`text-${index}`}
              className="absolute top-1/2 left-1/2 pointer-events-none w-full text-center"
              style={{
                x: '-50%',
                y: '-50%',
                translateZ: z,
                opacity,
                filter
              }}
            >
              <h2 className="font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#0088FF] uppercase tracking-[0.2em] md:tracking-[0.5em] text-[12vw] sm:text-[8vw] leading-none drop-shadow-[0_0_30px_rgba(0,136,255,0.8)]">
                {milestone.text}
              </h2>
            </motion.div>
          );
        })}
        
        {/* Scroll To Enter Indicator (Fades out when scrolling starts) */}
        <motion.div 
          className="absolute bottom-20 left-1/2 flex flex-col items-center justify-center pointer-events-none"
          style={{ 
            x: '-50%',
            opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) 
          }}
        >
          <div className="w-[2px] h-[60px] bg-gradient-to-b from-transparent via-[#0088FF] to-transparent mb-4 overflow-hidden relative">
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
