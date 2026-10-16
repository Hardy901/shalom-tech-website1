import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { ChevronRight } from 'lucide-react';

interface RegCardData {
  number: string;
  name: string;
  subtitle: string;
  meta: string;
  description: string;
  qrCodeUrl: string;
  registerLink: string;
}

const registrationEvents: RegCardData[] = [
  {
    number: '01',
    name: 'Vision Makers',
    subtitle: 'Hackathon',
    meta: 'Classes: IX-XII • 3-5 Students • Online & Offline',
    description:
      'Address the theme of Financial Scam Prevention by using technology to identify, prevent, or reduce its impact. Solutions can include apps, AI tools, or hardware prototypes. Bring your best ideas to life and compete for the top prize!',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2Fe%2F1FAIpQLSfUPcVWMpDknYZGEs5HubXkG5S9pyRBVIM_4NPPs-0XwWnoCA%2Fviewform',
    registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfUPcVWMpDknYZGEs5HubXkG5S9pyRBVIM_4NPPs-0XwWnoCA/viewform',
  },
  {
    number: '02',
    name: 'Frame Forge',
    subtitle: '3D Poster Composition',
    meta: 'Classes: VIII-IX • 2 Students • Offline',
    description:
      'Create a 3D poster composition using 10-15 images provided to you on the spot, creatively reimagining them to design a unique and original poster.',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2Fe%2F1FAIpQLSfnGfM2w1ONV53V_dOzccZxe6V6dUIdvQfPmlcM4kB_w4LUKA%2Fviewform',
    registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfnGfM2w1ONV53V_dOzccZxe6V6dUIdvQfPmlcM4kB_w4LUKA/viewform',
  },
  {
    number: '03',
    name: 'Web Weavers',
    subtitle: 'Website Design',
    meta: 'Classes: IX-XII • 2 Students • Offline',
    description:
      'Design a responsive website using HTML, CSS, and JavaScript on the topics of Quick Commerce or Technology & Innovation. Participants must submit their source code prior to the event.',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2Fe%2F1FAIpQLSfpHdsDtQepTRxvG3qYZLOjo34BaBnKrdFMKm0epsFWB-XqvA%2Fviewform',
    registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfpHdsDtQepTRxvG3qYZLOjo34BaBnKrdFMKm0epsFWB-XqvA/viewform',
  },
];

interface CardProps {
  event: RegCardData;
  index: number;
}

const RegistrationCard: React.FC<CardProps> = ({ event, index }) => {
  return (
    <div
      className="w-full sticky mb-12 sm:mb-20"
      style={{ top: `calc(15vh + ${index * 30}px)`, transform: 'translateZ(0)' }}
    >
      <motion.div
        whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
        className="w-full max-w-6xl mx-auto rounded-[30px] sm:rounded-[40px] border border-[#D7E2EA]/10 bg-[#0a1526] overflow-hidden shadow-2xl flex flex-col relative"
      >
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 via-transparent to-[#B600A8]/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        {/* ── Top Row: Number | Category + Name | Register Button ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 sm:px-8 md:px-10 pt-6 sm:pt-8 md:pt-10 pb-5 sm:pb-6">
          {/* Left: Number + Category + Name */}
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            {/* Big Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none shrink-0"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 100px)' }}
            >
              {event.number}
            </span>

            {/* Divider */}
            <div className="w-px self-stretch bg-[#D7E2EA]/20 shrink-0" />

            {/* Category + Name */}
            <div className="flex flex-col min-w-0">
              <span className="text-[#B600A8] uppercase tracking-widest text-[10px] sm:text-xs font-bold mb-1">
                [{event.subtitle}]
              </span>
              <h3
                className="text-[#D7E2EA] font-black uppercase tracking-tight leading-none truncate"
                style={{ fontSize: 'clamp(1.2rem, 3vw, 2.5rem)' }}
              >
                {event.name}
              </h3>
            </div>
          </div>

          {/* Right: Register Button */}
          <div className="shrink-0">
            <a 
              href={event.registerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex p-[2px] items-center justify-center rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              {/* Spinning Chrome Border (White and Blue) */}
              <div className="absolute w-[200%] h-[1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_35%,#00E5FF_40%,#FFFFFF_45%,#0055FF_48%,transparent_50%,transparent_85%,#00E5FF_90%,#FFFFFF_95%,#0055FF_98%,transparent_100%)] opacity-100" />
              
              {/* Inner Solid Pill */}
              <div className="relative flex items-center justify-between gap-4 pl-2 pr-8 py-2 bg-[#070f1a] rounded-full w-full h-full shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
                
                {/* Logo Circle */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden p-[1.5px] shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                   {/* Spinning Chrome Border for Icon */}
                   <div className="absolute w-[200%] h-[200%] animate-[spin_3s_linear_infinite_reverse] bg-[conic-gradient(from_0deg,transparent_0%,transparent_35%,#00E5FF_40%,#FFFFFF_45%,#0055FF_48%,transparent_50%,transparent_85%,#00E5FF_90%,#FFFFFF_95%,#0055FF_98%,transparent_100%)] opacity-100" />
                   
                   <div className="relative z-10 w-full h-full bg-[#070f1a] rounded-full flex items-center justify-center transition-colors group-hover:bg-white/10">
                     <ChevronRight className="w-5 h-5 text-white transform group-hover:translate-x-0.5 transition-transform" />
                   </div>
                </div>

                <span className="font-['Bebas_Neue'] text-2xl tracking-[0.1em] text-white mt-1 drop-shadow-md">Register Now</span>
              </div>
            </a>
          </div>
        </div>

        {/* ── Horizontal Divider ── */}
        <div className="h-px bg-[#D7E2EA]/15 mx-5 sm:mx-8 md:mx-10" />

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 p-6 sm:p-8 md:p-10 flex-grow items-center">
          
          {/* Left Column (7/12) – Event Details */}
          <div className="md:col-span-7 flex flex-col gap-6 md:pr-10">
            
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 w-fit">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-white/80 uppercase">
                {event.meta}
              </span>
            </div>

            <p 
              className="text-[#D7E2EA]/70 font-medium leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
            >
              {event.description}
            </p>

            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#B600A8]/10 to-transparent border-l-4 border-[#B600A8]">
              <p className="text-sm text-white/90 font-medium">
                Scan the QR code on the right or press the Register Now button to instantly access the registration portal.
              </p>
            </div>
          </div>

          {/* Right Column (5/12) – QR Code Container */}
          <div className="md:col-span-5 flex items-center justify-center">
            <div className="relative group w-full max-w-[280px] aspect-square rounded-3xl p-4 bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
              
              {/* Glowing animated background behind QR */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/20 via-transparent to-[#B600A8]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* QR Code Background plate */}
              <div className="relative z-10 w-full h-full bg-white rounded-2xl p-4 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                <img
                  src={event.qrCodeUrl}
                  alt={`QR Code for ${event.name}`}
                  className="w-full h-full object-contain"
                />
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="register"
      className="relative z-10 bg-[#070f1a] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-4 sm:px-6 md:px-10 pt-40 md:pt-56 pb-40"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight select-none mb-16 sm:mb-20 md:mb-24"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Register
          </h2>
        </FadeIn>

        {/* Sticky Stacking Registration Cards */}
        <div className="flex flex-col">
          {registrationEvents.map((event, idx) => (
            <RegistrationCard
              key={event.number}
              event={event}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
