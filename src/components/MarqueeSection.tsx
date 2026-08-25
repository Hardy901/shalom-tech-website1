import React, { useRef, useState, useEffect } from 'react';

const techLogosRow1 = [
  { name: 'Python', icon: 'python' },
  { name: 'React', icon: 'react' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'HTML5', icon: 'html5' },
  { name: 'CSS3', icon: 'css' },
  { name: 'Tailwind CSS', icon: 'tailwindcss' },
  { name: 'Node.js', icon: 'nodedotjs' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Next.js', icon: 'nextdotjs' },
];

const techLogosRow2 = [
  { name: 'Blender', icon: 'blender' },
  { name: 'Figma', icon: 'figma' },
  { name: 'Unity', icon: 'unity' },
  { name: 'Arduino', icon: 'arduino' },
  { name: 'Android', icon: 'android' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Framer', icon: 'framer' },
  { name: 'Apple', icon: 'apple' },
  { name: 'Vercel', icon: 'vercel' },
];

// Tripled lists for seamless scrolling effect
const row1Tripled = [...techLogosRow1, ...techLogosRow1, ...techLogosRow1, ...techLogosRow1];
const row2Tripled = [...techLogosRow2, ...techLogosRow2, ...techLogosRow2, ...techLogosRow2];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      // Slower, smoother scroll multiplier for logos
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.15;
      setOffset(calculatedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#070f1a] pt-16 sm:pt-24 md:pt-32 pb-16 overflow-hidden relative"
    >
      {/* Decorative gradient blur in the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[200px] bg-[#B600A8]/10 blur-[100px] rounded-[100%] pointer-events-none" />

      <div className="flex flex-col gap-6 sm:gap-8 relative z-10">
        {/* Row 1 - Moves RIGHT on scroll */}
        <div className="overflow-hidden w-full relative flex">
          <div
            className="flex gap-4 sm:gap-6 whitespace-nowrap"
            style={{
              // Start way left to prevent empty space when offset increases
              transform: `translateX(calc(-30% + ${offset}px))`,
              willChange: 'transform',
            }}
          >
            {row1Tripled.map((tech, idx) => (
              <div
                key={`r1-${idx}`}
                className="flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-4 sm:py-5 flex-shrink-0 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <img
                  src={`https://cdn.simpleicons.org/${tech.icon}/D7E2EA`}
                  alt={tech.name}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                />
                <span className="text-[#D7E2EA] font-semibold tracking-wider uppercase text-xs sm:text-sm">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Moves LEFT on scroll */}
        <div className="overflow-hidden w-full relative flex justify-end">
          <div
            className="flex gap-4 sm:gap-6 whitespace-nowrap"
            style={{
              transform: `translateX(calc(30% - ${offset}px))`,
              willChange: 'transform',
            }}
          >
            {row2Tripled.map((tech, idx) => (
              <div
                key={`r2-${idx}`}
                className="flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-4 sm:py-5 flex-shrink-0 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <img
                  src={`https://cdn.simpleicons.org/${tech.icon}/D7E2EA`}
                  alt={tech.name}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                />
                <span className="text-[#D7E2EA] font-semibold tracking-wider uppercase text-xs sm:text-sm">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
