import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';

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
    name: 'Runway to the Future',
    subtitle: 'Fashion Show',
    meta: 'Classes: III-IV • 1 Student • Offline',
    description:
      'Walk the ramp and present attire, accessories, and props that creatively reflect and connect to the technology theme. Show off your futuristic style and imagination—no replicating existing characters allowed!',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2Fe%2F1FAIpQLSfPGPwwR8a7xCD_8YnxdVNWxxViBeFQlSsGMbdeOL-AWV8m8A%2Fviewform',
    registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfPGPwwR8a7xCD_8YnxdVNWxxViBeFQlSsGMbdeOL-AWV8m8A/viewform',
  },
  {
    number: '03',
    name: 'Frame Forge',
    subtitle: '3D Image Composition',
    meta: 'Classes: VIII-IX • 2 Students • Offline',
    description:
      'Create an original 3D composition and poster by creatively reimagining 10-15 images given to you on the spot. Test your rapid design skills and 3D modeling expertise under pressure!',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2Fe%2F1FAIpQLSfnGfM2w1ONV53V_dOzccZxe6V6dUIdvQfPmlcM4kB_w4LUKA%2Fviewform',
    registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfnGfM2w1ONV53V_dOzccZxe6V6dUIdvQfPmlcM4kB_w4LUKA/viewform',
  },
  {
    number: '04',
    name: 'Web Weavers',
    subtitle: 'Website Design',
    meta: 'Classes: X-XII • 2 Students • Offline',
    description:
      'Design and develop a responsive, original, and user-friendly website on a topic given on the spot. AI tools are permitted to a certain extent. Build the web of tomorrow, today!',
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
      className="h-[85vh] sticky flex items-center justify-center"
      style={{ top: `${80 + index * 24}px` }}
    >
      <motion.div
        whileHover={{ scale: 1.01, rotateY: 1, rotateX: 1, transition: { duration: 0.3 } }}
        className="w-full max-w-6xl rounded-[28px] sm:rounded-[34px] md:rounded-[40px] border border-[#D7E2EA]/25 bg-[#070f1a] overflow-hidden shadow-2xl flex flex-col"
      >
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
              className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-[#B600A8] rounded-full hover:bg-cyan-400 hover:text-[#070f1a] hover:scale-105"
            >
              <span className="text-sm tracking-wider uppercase">Register Now</span>
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
                Scan the QR code on the right with your smartphone to instantly access the registration portal.
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
      className="relative z-10 bg-[#070f1a] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-4 sm:px-6 md:px-10 pt-20 pb-40"
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
