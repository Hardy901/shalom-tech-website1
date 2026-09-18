import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { Trophy, School, Users, Zap } from 'lucide-react';

interface AnimatedNumberProps {
  value: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1], // Custom premium ease-out
        onUpdate(v) {
          if (ref.current) ref.current.textContent = Math.floor(v).toString();
        },
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return <span ref={ref}>0</span>;
};

export const StatsSection: React.FC = () => {
  return (
    <section className="bg-transparent py-20 sm:py-32 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 lg:gap-12">
          
          {/* Stat 1: Flagship Events */}
          <FadeIn delay={0.1} y={30} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(215,226,234,0.05)]">
              <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-[#D7E2EA]" strokeWidth={1.5} />
            </div>
            <div className="flex items-baseline gap-1">
              <h3 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter">
                <AnimatedNumber value={4} />
              </h3>
            </div>
            <p className="mt-3 text-sm sm:text-base font-medium text-[#D7E2EA]/60 uppercase tracking-widest">
              Flagship Events
            </p>
          </FadeIn>

          {/* Stat 2: Schools */}
          <FadeIn delay={0.2} y={30} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(215,226,234,0.05)]">
              <School className="w-8 h-8 sm:w-10 sm:h-10 text-[#D7E2EA]" strokeWidth={1.5} />
            </div>
            <div className="flex items-baseline gap-1">
              <h3 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter">
                <AnimatedNumber value={50} />
              </h3>
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#B600A8]">+</span>
            </div>
            <p className="mt-3 text-sm sm:text-base font-medium text-[#D7E2EA]/60 uppercase tracking-widest">
              Schools
            </p>
          </FadeIn>

          {/* Stat 3: Innovators */}
          <FadeIn delay={0.3} y={30} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(215,226,234,0.05)]">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-[#D7E2EA]" strokeWidth={1.5} />
            </div>
            <div className="flex items-baseline gap-1">
              <h3 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter">
                <AnimatedNumber value={500} />
              </h3>
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#B600A8]">+</span>
            </div>
            <p className="mt-3 text-sm sm:text-base font-medium text-[#D7E2EA]/60 uppercase tracking-widest">
              Innovators
            </p>
          </FadeIn>

          {/* Stat 4: Prizes */}
          <FadeIn delay={0.4} y={30} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(215,226,234,0.05)]">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-[#D7E2EA]" strokeWidth={1.5} />
            </div>
            <div className="flex items-baseline gap-1">
              <h3 className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#B600A8] to-[#7621B0] tracking-tighter uppercase">
                Huge
              </h3>
            </div>
            <p className="mt-3 text-sm sm:text-base font-medium text-[#D7E2EA]/60 uppercase tracking-widest">
              Prizes to Win
            </p>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};
