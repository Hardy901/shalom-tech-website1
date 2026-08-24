import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiveProjectButton } from './LiveProjectButton';
import { FadeIn } from './FadeIn';

interface ProjectData {
  number: string;
  name: string;
  category: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const projects: ProjectData[] = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
  {
    number: '04',
    name: 'Vertex Motion Lab',
    category: 'Client',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
  },
];

interface CardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
}

const ProjectCard: React.FC<CardProps> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.05;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] sticky flex items-center justify-center"
      style={{ top: `${80 + index * 24}px` }}
    >
      <motion.div
        style={{ scale }}
        whileHover={{ scale: 1.02, rotateY: 2, rotateX: 2, transition: { duration: 0.3 } }}
        className="w-full max-w-6xl rounded-[28px] sm:rounded-[34px] md:rounded-[40px] border border-[#D7E2EA]/25 bg-[#070f1a] overflow-hidden shadow-2xl"
      >
        {/* ── Top Row: Number | Category + Name | Live Project Button ── */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-7 md:px-8 pt-5 sm:pt-6 md:pt-7 pb-4 sm:pb-5">
          {/* Left: Number + Category + Name */}
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            {/* Big Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none shrink-0"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 90px)' }}
            >
              {project.number}
            </span>

            {/* Divider */}
            <div className="w-px self-stretch bg-[#D7E2EA]/20 shrink-0" />

            {/* Category + Name */}
            <div className="flex flex-col min-w-0">
              <span className="text-[#D7E2EA]/50 uppercase tracking-widest text-[10px] sm:text-xs font-medium mb-0.5">
                [{project.category}]
              </span>
              <h3
                className="text-[#D7E2EA] font-black uppercase tracking-tight leading-none truncate"
                style={{ fontSize: 'clamp(1rem, 2.4vw, 2rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          {/* Right: Live Project Button */}
          <div className="shrink-0">
            <LiveProjectButton />
          </div>
        </div>

        {/* ── Horizontal Divider ── */}
        <div className="h-px bg-[#D7E2EA]/15 mx-5 sm:mx-7 md:mx-8" />

        {/* ── Image Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 p-4 sm:p-5 md:p-6">
          {/* Left Column (5/12) – 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4">
            <div
              className="w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#181818] shrink-0"
              style={{ height: 'clamp(120px, 15vw, 210px)' }}
            >
              <img
                src={project.col1Img1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#181818] shrink-0"
              style={{ height: 'clamp(150px, 20vw, 300px)' }}
            >
              <img
                src={project.col1Img2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column (7/12) – 1 tall image */}
          <div
            className="md:col-span-7 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#181818]"
            style={{ minHeight: 'clamp(260px, 36vw, 520px)' }}
          >
            <img
              src={project.col2Img}
              alt={`${project.name} feature`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
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
            Project
          </h2>
        </FadeIn>

        {/* Sticky Stacking Cards */}
        <div className="flex flex-col">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={idx}
              totalCards={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
