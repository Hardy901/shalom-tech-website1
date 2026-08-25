import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { Clock, MapPin, Zap, Coffee, Trophy, Mic } from 'lucide-react';

const schedule = [
  {
    time: "08:30 AM",
    title: "Registration & Welcome",
    description: "Arrival of participants, team check-ins, and distribution of official Shalom Tech welcome kits and ID badges.",
    icon: MapPin
  },
  {
    time: "09:30 AM",
    title: "Inauguration Ceremony",
    description: "Official lighting of the lamp followed by an inspiring keynote address by our Chief Guest to kick off the technology summit.",
    icon: Mic
  },
  {
    time: "10:30 AM",
    title: "Competitions Commence",
    description: "All major events including Vision Makers, Runway to the Future, and Web Weavers officially begin in their designated arenas.",
    icon: Zap
  },
  {
    time: "01:00 PM",
    title: "Networking Lunch",
    description: "A scheduled break for participants to recharge, enjoy a catered lunch, and network with peers from other schools.",
    icon: Coffee
  },
  {
    time: "02:30 PM",
    title: "Final Presentations & Judging",
    description: "Teams pitch their final projects, prototypes, and designs to our panel of expert judges.",
    icon: Clock
  },
  {
    time: "04:30 PM",
    title: "Valedictory & Prize Distribution",
    description: "Closing ceremony where winners are announced, and trophies, cash prizes, and certificates are awarded.",
    icon: Trophy
  }
];

export const TimelineSection: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Track scroll progress to draw the glowing line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 sm:py-32 px-6 md:px-10 bg-[#070f1a] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#B600A8]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-20 sm:mb-28">
            <h2 className="text-[#B600A8] font-black tracking-widest uppercase text-sm sm:text-base mb-2">Event Flow</h2>
            <h3 className="hero-heading font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter">The Schedule</h3>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Center glowing line (background) */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-1 bg-[#D7E2EA]/5 md:-translate-x-1/2 rounded-full" />
          
          {/* Center glowing line (active progress) */}
          <motion.div 
            className="absolute left-[24px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-[#B600A8] to-cyan-400 md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(182,0,168,0.5)] origin-top"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-12 sm:gap-16">
            {schedule.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = item.icon;
              
              return (
                <div key={index} className="relative flex items-center md:justify-between w-full">
                  
                  {/* Left side (Empty on mobile, alternating on desktop) */}
                  <div className={`hidden md:block w-[45%] ${isEven ? 'text-right pr-12' : 'order-3 text-left pl-12'}`}>
                    <FadeIn delay={0.2} x={isEven ? -40 : 40} y={0}>
                      {isEven ? (
                        <>
                          <h4 className="text-2xl font-black text-white uppercase tracking-wider mb-2">{item.title}</h4>
                          <p className="text-[#D7E2EA]/60 text-sm">{item.description}</p>
                        </>
                      ) : (
                        <div className="text-[#B600A8] font-black text-4xl sm:text-5xl tracking-tighter">
                          {item.time}
                        </div>
                      )}
                    </FadeIn>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-[#070f1a] border-4 border-[#0a1526] z-10 flex items-center justify-center shadow-[0_0_20px_rgba(182,0,168,0.2)] order-1 md:order-2">
                    <motion.div 
                      className="w-full h-full rounded-full bg-gradient-to-br from-[#B600A8] to-cyan-600 flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>

                  {/* Right side (Main content on mobile, alternating on desktop) */}
                  <div className={`w-full pl-20 md:pl-0 md:w-[45%] order-2 md:order-3 ${isEven ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'}`}>
                    <FadeIn delay={0.2} x={isEven ? 40 : -40} y={0}>
                      {/* Mobile layout always shows time + title + desc here */}
                      <div className="md:hidden mb-2 text-[#B600A8] font-black text-2xl tracking-tighter">
                        {item.time}
                      </div>
                      
                      {isEven ? (
                        <div className="hidden md:block text-[#B600A8] font-black text-4xl sm:text-5xl tracking-tighter">
                          {item.time}
                        </div>
                      ) : (
                        <div className="hidden md:block">
                          <h4 className="text-2xl font-black text-white uppercase tracking-wider mb-2">{item.title}</h4>
                          <p className="text-[#D7E2EA]/60 text-sm">{item.description}</p>
                        </div>
                      )}

                      {/* Mobile description block */}
                      <div className="md:hidden">
                        <h4 className="text-xl font-black text-white uppercase tracking-wider mb-2">{item.title}</h4>
                        <p className="text-[#D7E2EA]/60 text-sm">{item.description}</p>
                      </div>
                    </FadeIn>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
