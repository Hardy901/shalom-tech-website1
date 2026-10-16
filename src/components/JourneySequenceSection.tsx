import React from 'react';

interface JourneySequenceProps {
  scrollProgress?: number;
}

export const JourneySequenceSection: React.FC<JourneySequenceProps> = ({ scrollProgress = 0 }) => {
  // Map sequence progress (0.65 to 0.90 during Journey transformation) to local 0% to 100%
  const localRatio = Math.max(0, Math.min(1, (scrollProgress - 0.65) / 0.25));
  const progress = Math.round(localRatio * 100);
  const paddedProgress = progress.toString().padStart(3, '0');

  return (
    <section
      id="sequence-animation"
      className="h-[calc(100vh+20vw)] max-md:h-[calc(100dvh+20vw)] bg-transparent mt-[-20vw] w-full relative pointer-events-none"
    >
      <div className="sticky top-0 h-screen max-md:h-[100dvh] w-full overflow-hidden">
        <div className="relative z-10 h-full paddx max-md:flex max-md:flex-col max-md:items-center max-md:pt-[95px] max-md:pb-[85px] max-md:justify-between max-md:text-center">
          {/* Top Left Title & Narrative */}
          <div className="absolute top-[7vw] left-[3vw] max-md:static max-md:flex max-md:w-full max-md:flex-col max-md:items-center pointer-events-none select-none">
            <h2 className="text180 uppercase whitespace-nowrap text-[#122B1E] max-md:text-[11vw] max-md:leading-none max-md:tracking-tight max-md:text-center">
              Jackfruit
            </h2>
            <p className="mt-[2vw] w-[28vw] text36 font-medium text-[#122B1E] max-md:mt-1.5 max-md:w-full max-md:max-w-[78vw] max-md:text-center max-md:text-[3.3vw] max-md:leading-snug max-md:opacity-85">
              One mighty fruit, rescued and cleaned within days of harvest. 100% upcycled seeds packed with 13g of prebiotic dietary fibre.
            </p>
          </div>

          {/* Spacer on mobile */}
          <div className="hidden max-md:block max-md:flex-1 max-md:min-h-[25dvh]" />

          {/* Bottom Left Meter & Expanding Line */}
          <div className="absolute bottom-[3vw] left-[3vw] w-[26vw] pointer-events-none max-md:static max-md:w-full max-md:px-1">
            <div className="flex items-end justify-between mb-[.6vw] font-khand font-bold uppercase leading-none max-md:mb-1.5 text-[#122B1E]">
              <span className="text36 max-md:text-[4.5vw]">Upcycled Seeds</span>
              <span className="tabular-nums text36 max-md:text-[4.5vw]">
                {paddedProgress}%
              </span>
            </div>
            <div className="h-[.55vw] min-h-1.5 w-full rounded-full bg-[#122B1E]/15 origin-left relative overflow-hidden max-md:h-2.5">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-[#122B1E] transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Bottom Right Narrative & Recipes Link */}
          <div className="absolute bottom-[3vw] right-[3vw] w-[26vw] text-right max-md:hidden pointer-events-auto">
            <p className="text36 font-medium text-[#122B1E]">
              From farm waste to everyday nutrition. Blended seamlessly with 85% whole wheat atta so your cooking remains authentic.
            </p>
            <a
              href="#recipes"
              aria-label="Explore recipes"
              className="mt-[.8vw] inline-block"
            >
              <button
                type="button"
                className="relative inline-flex cursor-pointer items-center justify-center text-[#122B1E] hover:text-[#E29D37] transition-colors"
              >
                <span className="font-patrick text-2xl border-b-2 border-current pb-0.5">
                  Explore Recipe Ideas →
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
