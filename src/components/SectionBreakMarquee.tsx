import React from 'react';
import { Recycle, HeartPulse, Leaf } from 'lucide-react';

export const SectionBreakMarquee: React.FC = () => {
  const tickerItems = [
    'GOOD FOOD GREATER IMPACT',
    'BETTER FOOD IS A CYCLE',
    '15% UPCYCLED JACKFRUIT SEED FLOUR',
    'MORE FIBRE SAME ATTA LESS WASTE',
    'A SMALL SEED. A BIGGER TOMORROW',
  ];

  return (
    <section
      id="section-break"
      data-theme="dark"
      className="h-fit z-10 pb-20 sm:pb-28 text-[#FDFBF7] relative w-full bg-[#122B1E] overflow-hidden border-t border-white/5"
    >
      {/* Endless Horizontal Marquee Ticker */}
      <div className="py-5 border-y border-white/10 bg-[#0C1D14] flex whitespace-nowrap overflow-hidden select-none">
        <div className="flex animate-ticker shrink-0 items-center gap-8 text-[#FDFBF7]">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="font-khand text-3xl sm:text-5xl font-bold uppercase tracking-tight">
                {item}
              </span>
              <span className="text-[#D98A2B] text-lg sm:text-xl">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* High-Impact Statement & Philosophy Container */}
      <div className="paddx flex gap-10 sm:gap-14 flex-col items-center justify-between h-full py-16 sm:py-24 max-w-6xl mx-auto">
        {/* Editorial Khand Header */}
        <h2 className="text180 text-center w-full uppercase text-[#F0DC9C]">
          A Small Seed. <br />
          <span className="text-[#FDFBF7]">A Bigger Tomorrow.</span>
        </h2>

        {/* Central Brand Mission Statement */}
        <p className="text-base sm:text-xl max-w-3xl text-center font-inter font-normal text-[#FDFBF7]/80 leading-relaxed">
          At JackBloom, we turn jackfruit seeds — usually discarded across Indian orchards — into an extraordinary, nutrient-dense daily staple. 
          Our 15% upcycled jackfruit seed flour blend brings more prebiotic fibre, plant-based protein, and everyday sustainability to your kitchen table.
        </p>

        {/* 3 Pillars from Pouch Back */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full max-w-4xl mt-4">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#163324] border border-white/10 text-center flex flex-col items-center hover:border-[#D98A2B]/40 transition-colors">
            <div className="size-12 rounded-xl bg-white/5 border border-white/10 text-[#D98A2B] flex items-center justify-center mb-5">
              <Recycle className="size-6 text-[#D98A2B]" />
            </div>
            <h3 className="font-khand text-2xl font-bold uppercase text-[#FDFBF7] tracking-tight">
              Reduces Food Waste
            </h3>
            <p className="text-xs sm:text-sm font-inter text-[#FDFBF7]/70 mt-2 leading-relaxed">
              Rescuing thousands of kilos of nutrient-dense seeds destined for landfills every harvest season.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#163324] border border-white/10 text-center flex flex-col items-center hover:border-[#D98A2B]/40 transition-colors">
            <div className="size-12 rounded-xl bg-white/5 border border-white/10 text-[#D98A2B] flex items-center justify-center mb-5">
              <HeartPulse className="size-6 text-[#D98A2B]" />
            </div>
            <h3 className="font-khand text-2xl font-bold uppercase text-[#FDFBF7] tracking-tight">
              Supports Healthier Choices
            </h3>
            <p className="text-xs sm:text-sm font-inter text-[#FDFBF7]/70 mt-2 leading-relaxed">
              Provides 13g dietary fibre per 100g, supporting smoother digestion and steady metabolic energy.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#163324] border border-white/10 text-center flex flex-col items-center hover:border-[#D98A2B]/40 transition-colors">
            <div className="size-12 rounded-xl bg-white/5 border border-white/10 text-[#D98A2B] flex items-center justify-center mb-5">
              <Leaf className="size-6 text-[#D98A2B]" />
            </div>
            <h3 className="font-khand text-2xl font-bold uppercase text-[#FDFBF7] tracking-tight">
              A Sustainable Future
            </h3>
            <p className="text-xs sm:text-sm font-inter text-[#FDFBF7]/70 mt-2 leading-relaxed">
              Zero extra water, zero land clearing. Maximizing the bounty of nature already harvested.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
