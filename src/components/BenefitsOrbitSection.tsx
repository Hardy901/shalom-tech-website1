import React from 'react';

interface BenefitsOrbitProps {
  scrollProgress?: number;
}

export const BenefitsOrbitSection: React.FC<BenefitsOrbitProps> = ({ scrollProgress = 0 }) => {
  // Map sequence progress (0.20 to 0.65 during Benefits section) to local 0 to 1
  const localProgress = Math.max(0, Math.min(1, (scrollProgress - 0.20) / 0.45));

  // Compute curved orbital positions for the 4 badges across progress
  const getBadgeTransform = (index: number) => {
    const baseAngle = index * (Math.PI / 2) + localProgress * Math.PI * 1.5;
    const radiusX = 28; // vw
    const radiusY = 22; // vh
    const x = Math.cos(baseAngle) * radiusX;
    const y = Math.sin(baseAngle) * radiusY;
    const scale = 0.85 + (Math.sin(baseAngle + Math.PI / 4) + 1) * 0.15;
    const zIndex = Math.round(y * 10);
    return {
      transform: `translate3d(${x}vw, ${y}vh, 0) scale(${scale})`,
      zIndex: 20 + zIndex,
    };
  };

  const badges = [
    {
      value: '13',
      unit: 'G',
      label: 'Dietary Fibre',
      sub: 'Per 100g portion',
      bg: 'bg-[#FFE386] text-[#122B1E] border-[#122B1E]',
    },
    {
      value: '100%',
      unit: '',
      label: 'Upcycled Waste',
      sub: 'Rescued from farms',
      bg: 'bg-[#1A3E2B] text-[#FFE386] border-[#FFE386]',
    },
    {
      value: '12.6',
      unit: 'G',
      label: 'Plant Protein',
      sub: 'Everyday strength',
      bg: 'bg-[#FFE386] text-[#122B1E] border-[#122B1E]',
    },
    {
      value: '85/15',
      unit: '',
      label: 'Perfect Blend',
      sub: 'Whole wheat & jackfruit',
      bg: 'bg-[#1A3E2B] text-[#FFE386] border-[#FFE386]',
    },
  ];

  return (
    <section
      id="benefits"
      className="h-[320vh] bg-transparent relative paddx w-full pointer-events-none"
    >
      {/* Huge Split Section Header matching Palmo */}
      <h2 className="text180 pt-[6vw] max-md:pt-[18vh] uppercase w-full leading-[85%] relative z-10 pointer-events-none select-none">
        <span className="grid w-full grid-cols-[1fr_auto_1fr] items-center max-md:flex max-md:flex-col max-md:items-center max-md:w-full">
          <span className="whitespace-nowrap text-left max-md:block max-md:w-full max-md:text-center">
            The real
          </span>

          {/* Heading Waves SVG Banner */}
          <div className="w-[28vw] p-[1vw] translate-y-[-1.5vw] translate-x-[-1.5vw] text-[#E29D37] max-md:hidden">
            <svg
              className="h-full w-full object-contain"
              viewBox="0 0 400 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 145C90 145 120 110 150 70.0001C180 30.0001 230 20.0001 290 60.0001C250 40.0001 215 55.0001 205 90.0001C195 125 215 160 260 165C305 170 335 145 370 145"
                stroke="currentColor"
                strokeOpacity="0.8"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M285.001 65C245.001 70 225.001 105 235.001 135C245.001 165 275.001 175 305.001 165"
                stroke="currentColor"
                strokeOpacity="0.8"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="whitespace-nowrap text-right max-md:block max-md:w-full max-md:text-center">
            Power of
          </span>
        </span>

        <span className="block text-right mr-[14vw] mt-[-3.5vw] whitespace-nowrap max-md:text-center max-md:mr-0 max-md:mt-0 max-md:w-full">
          <span className="inline-block max-md:block max-md:w-full text-[#E29D37]">
            every Roti.
          </span>
        </span>
      </h2>

      {/* Explanatory Paragraph */}
      <p className="text36 max-md:text-center font-medium capitalize w-[27vw] absolute left-[3.5vw] top-[24vw] max-md:static max-md:w-[85%] max-md:mx-auto max-md:mt-6 text-[#122B1E] z-10 pointer-events-none">
        At JackBloom, we turn jackfruit seeds — often thrown away — into something that nourishes you and the planet without changing how you cook.
      </p>

      {/* Sticky Viewport with the 4 Orbiting Circular Badges */}
      <div className="h-screen w-full sticky mt-[10vw] max-md:mt-[12vh] py-[6vw] top-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {badges.map((badge, idx) => {
          const style = getBadgeTransform(idx);
          return (
            <div
              key={badge.label}
              style={style}
              className={`rounded-full border-4 aspect-square flex flex-col size-[15vw] max-md:size-[34vw] max-md:border-2 items-center justify-center text-center p-[1vw] max-md:p-2 select-none absolute will-change-transform shadow-lg ${badge.bg}`}
            >
              <div className="flex font-semibold items-baseline justify-center leading-none font-khand tracking-tighter">
                <span className="text-[4.2vw] max-md:text-[9vw] font-bold">
                  {badge.value}
                </span>
                {badge.unit && (
                  <span className="text-[2.2rem] max-md:text-[4.5vw] uppercase ml-1">
                    {badge.unit}
                  </span>
                )}
              </div>
              <p className="text36 max-md:text-[3.2vw] font-inter font-medium leading-tight mt-[-.4vw] max-md:mt-0">
                {badge.label}
              </p>
              <span className="text-xs font-patrick opacity-80 mt-1 hidden sm:block">
                {badge.sub}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
