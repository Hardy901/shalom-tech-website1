import React, { useState } from 'react';
import { Sparkles, Eye, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const PackagingShowcaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'both' | 'front' | 'back'>('both');

  const nutritionalData = [
    { label: 'Energy', value: '345–350 kcal', highlight: false },
    { label: 'Protein', value: '12.5–12.7 g', highlight: true },
    { label: 'Carbohydrate', value: '74 g', highlight: false },
    { label: 'Total Dietary Fibre', value: '13 g', highlight: true },
    { label: 'Total Fat', value: '2.1–2.3 g', highlight: false },
  ];

  const journeySteps = [
    { step: '01', title: 'Jackfruit Harvest', desc: 'Rescued from agricultural orchards (usually discarded)' },
    { step: '02', title: 'Seeds Collected', desc: 'Hand-sorted and graded for optimal density & quality' },
    { step: '03', title: 'Cleaned & Processed', desc: 'Sun-cured and gently dried to retain all nutrients' },
    { step: '04', title: 'Milled into Flour', desc: 'Micro-ground into silky, fine flour texture' },
    { step: '05', title: 'Blended with Wheat', desc: 'Precisely blended with 85% premium whole wheat atta' },
  ];

  return (
    <section
      id="packaging-showcase"
      className="py-[8vw] paddx bg-[#FDFBF7] relative w-full overflow-hidden"
    >
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#122B1E]/10 pb-8">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#D98A2B] uppercase">
            Official Packaging & Blend
          </span>
          <h2 className="text150 uppercase text-[#122B1E] mt-1">
            The Packaging.
          </h2>
          <p className="font-inter text-base sm:text-lg text-[#122B1E]/75 mt-2">
            Every seed has value. We simply unlock it.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-1.5 mt-6 sm:mt-0 bg-[#ECE4D4]/60 p-1 rounded-xl border border-[#122B1E]/10">
          <button
            type="button"
            onClick={() => setActiveTab('both')}
            className={`px-3.5 py-1.5 rounded-lg font-inter text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'both'
                ? 'bg-[#122B1E] text-[#FDFBF7] shadow-sm'
                : 'text-[#122B1E]/70 hover:text-[#122B1E]'
            }`}
          >
            Dual View
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('front')}
            className={`px-3.5 py-1.5 rounded-lg font-inter text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'front'
                ? 'bg-[#122B1E] text-[#FDFBF7] shadow-sm'
                : 'text-[#122B1E]/70 hover:text-[#122B1E]'
            }`}
          >
            Front Pouch
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('back')}
            className={`px-3.5 py-1.5 rounded-lg font-inter text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'back'
                ? 'bg-[#122B1E] text-[#FDFBF7] shadow-sm'
                : 'text-[#122B1E]/70 hover:text-[#122B1E]'
            }`}
          >
            Back Panel
          </button>
        </div>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: High-Res Packaging Photo Viewer */}
        <div className="lg:col-span-7 bg-[#F5EFE4] rounded-2xl p-6 sm:p-8 border border-[#122B1E]/10 shadow-sm relative overflow-hidden group">
          <div className="relative w-full h-[360px] sm:h-[460px] rounded-xl overflow-hidden bg-white/50 border border-[#122B1E]/5 flex items-center justify-center">
            <img
              src="/jackbloom/packaging.jpg"
              alt="JackBloom Packaging Pouch Front and Back"
              className={`w-full h-full transition-all duration-500 ${
                activeTab === 'front'
                  ? 'object-cover object-left scale-110'
                  : activeTab === 'back'
                  ? 'object-cover object-right scale-110'
                  : 'object-contain scale-100 group-hover:scale-[1.02]'
              }`}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#122B1E]/80">
            <span className="flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="size-4 text-[#122B1E]" />
              FSSAI Standard Compliant
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="size-4 text-[#193828]" />
              100% Vegetarian (Indian Veg Mark)
            </span>
            <span className="bg-[#122B1E] text-[#FDFBF7] font-semibold px-3 py-1 rounded-md text-[11px] tracking-wider uppercase">
              Net Wt: 500 g
            </span>
          </div>
        </div>

        {/* Right Column: Nutrition & 5-Step Journey Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          {/* Nutritional Facts Card */}
          <div className="bg-[#122B1E] text-[#FDFBF7] rounded-2xl p-6 sm:p-7 border border-white/10 shadow-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <h3 className="font-khand text-2xl sm:text-3xl font-bold uppercase text-[#FDFBF7] tracking-tight">
                  Nutritional Value
                </h3>
                <p className="text-xs font-mono text-white/60">
                  Approx. values per 100 g serving
                </p>
              </div>
              <span className="text-[11px] bg-[#D98A2B] text-[#122B1E] font-bold font-mono px-2.5 py-1 rounded">
                85:15 BLEND
              </span>
            </div>

            <div className="divide-y divide-white/10">
              {nutritionalData.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-2.5 text-xs sm:text-sm"
                >
                  <span
                    className={
                      item.highlight
                        ? 'font-semibold text-[#F0DC9C]'
                        : 'text-white/80'
                    }
                  >
                    {item.label}
                  </span>
                  <span
                    className={`font-mono ${
                      item.highlight
                        ? 'font-bold text-[#F0DC9C] text-sm sm:text-base'
                        : 'text-white'
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3.5 border-t border-white/10 text-xs font-inter text-white/70 leading-relaxed">
              <strong className="text-[#F0DC9C]">Ingredients:</strong> Whole wheat atta (85%), jackfruit seed flour (15%). No preservatives or artificial additives.
            </div>
          </div>

          {/* 5-Step Journey Breakdown */}
          <div className="bg-[#F5EFE4] rounded-2xl p-6 sm:p-7 border border-[#122B1E]/10">
            <h3 className="font-khand text-xl sm:text-2xl font-bold uppercase text-[#122B1E] tracking-tight mb-4 flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#D98A2B]" />
              The Jackfruit Journey
            </h3>

            <div className="space-y-2.5">
              {journeySteps.map((step) => (
                <div
                  key={step.step}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/70 border border-[#122B1E]/5"
                >
                  <span className="font-khand text-lg font-bold text-[#D98A2B] shrink-0 mt-0.5">
                    {step.step}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#122B1E] uppercase tracking-wide">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#122B1E]/70 font-inter mt-0.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
