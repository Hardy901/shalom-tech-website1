import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';

interface EventItem {
  number: string;
  name: string;
  subtitle: string;
  description: string;
  meta: string;
}

const eventsData: EventItem[] = [
  {
    number: '01',
    name: 'Vision Makers',
    subtitle: 'Hackathon',
    meta: 'Classes: IX-XII • 3-5 Students • Online & Offline',
    description:
      'Address the theme of Financial Scam Prevention by using technology to identify, prevent, or reduce its impact. Solutions can include apps, AI tools, or hardware prototypes.',
  },
  {
    number: '02',
    name: 'Runway to the Future',
    subtitle: 'Fashion Show',
    meta: 'Classes: III-IV • 1 Student • Offline',
    description:
      'Walk the ramp and present attire, accessories, and props that creatively reflect and connect to the technology theme. No replicating existing characters!',
  },
  {
    number: '03',
    name: 'Frame Forge',
    subtitle: '3D Image Composition',
    meta: 'Classes: VIII-IX • 2 Students • Offline',
    description:
      'Create an original 3D composition and poster by creatively reimagining 10-15 images given to you on the spot.',
  },
  {
    number: '04',
    name: 'Web Weavers',
    subtitle: 'Website Design',
    meta: 'Classes: X-XII • 2 Students • Offline',
    description:
      'Design and develop a responsive, original, and user-friendly website on a topic given on the spot. AI tools are permitted to a certain extent.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="events" className="bg-[#FFFFFF] text-[#070f1a] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 text-[#070f1a] leading-none tracking-tight select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Events
          </h2>
        </FadeIn>

        {/* 4 Event items vertical list */}
        <div className="divide-y divide-[rgba(12,12,12,0.15)] border-t border-b border-[rgba(12,12,12,0.15)]">
          {eventsData.map((item, index) => (
            <FadeIn key={item.number} delay={index * 0.1} y={30}>
              <motion.div 
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(7, 15, 26, 0.03)' }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-12 cursor-pointer"
              >
                {/* Left Number */}
                <span
                  className="font-black text-[#070f1a] leading-none shrink-0"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {item.number}
                </span>

                {/* Right Name + Description */}
                <div className="flex flex-col gap-2 max-w-2xl w-full">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-1">
                    <h3
                      className="font-black uppercase text-[#070f1a] tracking-wide"
                      style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)' }}
                    >
                      {item.name}
                    </h3>
                    <span className="text-[#B600A8] font-bold uppercase tracking-wider text-sm sm:text-base">
                      {item.subtitle}
                    </span>
                  </div>
                  
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#070f1a]/50 mb-2">
                    {item.meta}
                  </p>

                  <p
                    className="font-medium leading-relaxed text-[#070f1a] opacity-80"
                    style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
