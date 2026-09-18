import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Award, Users, Zap } from 'lucide-react';

export const GlorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(350);
  
  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth < 640 ? 200 : 350);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Use a very tall container to make the page longer
  // The scroll progress from 0 to 1 will map to rotation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Rotate a massive 3D cylinder. 
  // It spins backwards as you scroll down for a cool revealing effect
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -360]);

  const panels = [
    { title: "CASH PRIZES", desc: "Massive rewards for the top innovators and creators.", icon: Trophy },
    { title: "CERTIFICATES", desc: "Official recognition for every participant.", icon: Award },
    { title: "NETWORKING", desc: "Connect with the brightest minds in technology.", icon: Users },
    { title: "INNOVATION", desc: "Bring your craziest ideas to life under pressure.", icon: Zap }
  ];

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-transparent">
      {/* Sticky container locks to screen while we scroll the 300vh height */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
        
        {/* Floating Header */}
        <motion.div 
          className="absolute top-24 text-center z-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[#B600A8] font-black tracking-widest uppercase text-sm md:text-base mb-2">The Ultimate Reward</h2>
          <h3 className="hero-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter">Why Participate?</h3>
        </motion.div>

        {/* 3D Rotating Cylinder */}
        <motion.div 
          style={{ rotateY, transformStyle: 'preserve-3d' }}
          className="relative w-64 h-80 sm:w-80 sm:h-96 mt-20 md:mt-10 pointer-events-none"
        >
          {panels.map((panel, index) => {
            const angle = (360 / panels.length) * index;
            const Icon = panel.icon;
            
            return (
              <motion.div
                key={index}
                className="absolute inset-0 border-2 border-[#D7E2EA]/10 bg-[#0a1526]/80 backdrop-blur-xl rounded-[32px] flex flex-col items-center justify-center p-6 sm:p-8 text-center shadow-2xl"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Nested 3D effects for the content inside the card */}
                <div style={{ transform: 'translateZ(60px)' }} className="mb-6 w-20 h-20 rounded-full bg-[#B600A8]/20 flex items-center justify-center border border-[#B600A8]/50 shadow-[0_0_30px_rgba(182,0,168,0.3)]">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                
                <h4 style={{ transform: 'translateZ(40px)' }} className="text-xl sm:text-2xl font-black text-white uppercase mb-3 tracking-wider">
                  {panel.title}
                </h4>
                
                <p style={{ transform: 'translateZ(20px)' }} className="text-[#D7E2EA]/70 text-sm sm:text-base font-medium">
                  {panel.desc}
                </p>
                
                {/* Glow behind the card */}
                <div className="absolute inset-0 -z-10 rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.8)]" />
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Deep background ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-[#B600A8]/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none -z-10" />
      </div>
    </section>
  );
};
