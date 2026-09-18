import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

interface AboutSectionProps {
  onContactClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-transparent flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Decorative 3D images positioned absolutely in corners */}

      {/* Top-left: Moon icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
              alt="3D Moon Icon"
              className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain select-none"
              draggable={false}
            />
          </motion.div>
        </FadeIn>
      </div>

      {/* Bottom-left: 3D object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
              alt="3D Abstract Object"
              className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain select-none"
              draggable={false}
            />
          </motion.div>
        </FadeIn>
      </div>

      {/* Top-right: Lego icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
              alt="3D Lego Icon"
              className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain select-none"
              draggable={false}
            />
          </motion.div>
        </FadeIn>
      </div>

      {/* Bottom-right: 3D group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
              alt="3D Shape Group"
              className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain select-none"
              draggable={false}
            />
          </motion.div>
        </FadeIn>
      </div>

      {/* Center Content Container */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About event
          </h2>
        </FadeIn>

        {/* Gap between heading and text block */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* Animated Text Paragraph */}
        <div className="max-w-[560px] mx-auto text-[#D7E2EA] font-medium leading-relaxed">
          <AnimatedText
            text="ShalomTech brings together young innovators to explore, create, and compete across technology, creativity, and innovation. From AI to emerging technologies, it is a space where ideas become reality and the future begins."
            className="text-center font-medium leading-relaxed"
          />
        </div>

        {/* Gap between text block and button */}
        <div className="h-16 sm:h-20 md:h-24" />

        {/* Contact Button */}
        <FadeIn delay={0.4} y={20}>
          <ContactButton href="#events" label="EVENTS" />
        </FadeIn>
      </div>
    </section>
  );
};
