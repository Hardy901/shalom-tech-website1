import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const ManifestoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a tall scrolling container to drive the animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Add physics spring to the scroll progress so it never stutters
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  const text = "THE FUTURE OF TECHNOLOGY STARTS HERE. INNOVATE. BUILD. CONQUER.";
  const words = text.split(" ");

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#070f1a]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10 overflow-hidden">
        
        {/* Deep ambient background pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-r from-[#B600A8]/10 to-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-4">
          {words.map((word, index) => {
            // Overlap the word animations so it feels like a fluid wave rather than strict one-by-one
            const start = (index / words.length) * 0.7; 
            const end = start + 0.2;
            
            // Map the smoothed scroll progress to elegant properties
            const opacity = useTransform(smoothScroll, [start, end], [0.1, 1]);
            const filter = useTransform(smoothScroll, [start, end], ['blur(6px)', 'blur(0px)']);
            const y = useTransform(smoothScroll, [start, end], [20, 0]);
            const scale = useTransform(smoothScroll, [start, end], [0.95, 1]);
            
            // Make "INNOVATE. BUILD. CONQUER." stand out with the brand color
            const isHighlight = ["INNOVATE.", "BUILD.", "CONQUER."].includes(word);

            return (
              <motion.span
                key={index}
                className={`font-black uppercase tracking-tighter text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[7vw] leading-[0.9] ${
                  isHighlight 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#B600A8] to-fuchsia-400 drop-shadow-[0_0_30px_rgba(182,0,168,0.6)]' 
                    : 'text-white'
                }`}
                style={{ 
                  opacity,
                  filter,
                  y,
                  scale
                }}
              >
                {word}
              </motion.span>
            );
          })}
        </div>

        {/* Small hint at the bottom */}
        <motion.div 
          className="absolute bottom-12 text-[#D7E2EA]/40 text-xs font-bold tracking-[0.3em] uppercase"
          style={{ opacity: useTransform(smoothScroll, [0.8, 1], [1, 0]) }}
        >
          Keep Scrolling
        </motion.div>

      </div>
    </section>
  );
};
