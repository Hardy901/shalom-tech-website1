import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { Calendar, AlertCircle, Upload, CheckCircle, Code, Users, Trophy } from 'lucide-react';

const schedule = [
  {
    time: "25th Sep",
    title: "Registration Begins",
    description: "Official portal opens for all participating schools and independent students to register for Shalom Tech events.",
    icon: Calendar
  },
  {
    time: "16th Oct",
    title: "Last Date for Registration",
    description: "Final deadline to submit your team rosters and secure your spot in the competition.",
    icon: AlertCircle
  },
  {
    time: "22nd Oct",
    title: "Vision Makers: Submission",
    description: "Deadline to submit all initial 3D models and conceptual designs for the Vision Makers track.",
    icon: Upload
  },
  {
    time: "26th Oct",
    title: "Vision Makers: Round 1 Result",
    description: "Announcement of the shortlisted candidates moving forward to the final offline event.",
    icon: CheckCircle
  },
  {
    time: "27th Oct",
    title: "Web Weavers: Submission",
    description: "Deadline for submitting website designs and codebase repositories for the Web Weavers competition.",
    icon: Code
  },
  {
    time: "30th Oct",
    title: "Offline Event",
    description: "The main summit day! Live competitions, final presentations, and on-the-spot challenges.",
    icon: Users
  },
  {
    time: "30th Oct",
    title: "Felicitation Ceremony",
    description: "Valedictory function, winner announcements, and grand prize distribution.",
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
    <section id="timeline" ref={containerRef} className="py-24 sm:py-32 px-6 md:px-10 bg-transparent relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E5FF]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-20 sm:mb-28">
            <h2 className="text-[#D7E2EA]/80 font-black tracking-widest uppercase text-sm sm:text-base mb-2">Event Flow</h2>
            <h3 className="hero-heading font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter">The Schedule</h3>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Center glowing line (background) */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-1 bg-[#D7E2EA]/5 md:-translate-x-1/2 rounded-full" />
          
          {/* Center line (active progress) */}
          <motion.div 
            className="absolute left-[24px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-white/30 to-transparent md:-translate-x-1/2 rounded-full origin-top"
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
                        <div className="text-[#D7E2EA]/80 font-black text-4xl sm:text-5xl tracking-tighter">
                          {item.time}
                        </div>
                      )}
                    </FadeIn>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-[#0a1526] border border-white/10 z-10 flex items-center justify-center order-1 md:order-2">
                    <motion.div 
                      className="w-full h-full rounded-full bg-gradient-to-br from-[#1A2536] to-[#0D1520] flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-5 h-5 text-[#D7E2EA]/70" />
                    </motion.div>
                  </div>

                  {/* Right side (Main content on mobile, alternating on desktop) */}
                  <div className={`w-full pl-20 md:pl-0 md:w-[45%] order-2 md:order-3 ${isEven ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'}`}>
                    <FadeIn delay={0.2} x={isEven ? 40 : -40} y={0}>
                      {/* Mobile layout always shows time + title + desc here */}
                      <div className="md:hidden mb-2 text-[#D7E2EA]/80 font-black text-2xl tracking-tighter">
                        {item.time}
                      </div>
                      
                      {isEven ? (
                        <div className="hidden md:block text-[#D7E2EA]/80 font-black text-4xl sm:text-5xl tracking-tighter">
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
