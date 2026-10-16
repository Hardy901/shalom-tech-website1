import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2200; // 2.2 seconds smooth load

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setPercent(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsOpening(true);
          setTimeout(() => {
            setIsDone(true);
            onComplete();
          }, 800);
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isDone) return null;

  // Format 3 digits odometer (e.g., 000, 045, 100)
  const d1 = Math.floor(percent / 100);
  const d2 = Math.floor((percent % 100) / 10);
  const d3 = percent % 10;

  return (
    <section
      id="loader"
      className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-hidden pointer-events-auto"
    >
      {/* Sliding Left & Right Curtain Panels with Palmo-style cubic wipe */}
      <div
        className={`absolute -top-[30dvh] left-0 h-[160dvh] w-[58%] z-1 origin-right bg-[#ECE2B1] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpening ? '-translate-x-full' : 'translate-x-0'
        }`}
      />
      <div
        className={`absolute -top-[30dvh] right-0 h-[160dvh] w-[58%] z-1 origin-left bg-[#ECE2B1] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpening ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
      <div
        className={`absolute -top-[30dvh] left-0 h-[160dvh] w-[58%] z-2 origin-right bg-[#122B1E] transition-transform duration-700 delay-75 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpening ? '-translate-x-full' : 'translate-x-0'
        }`}
      />
      <div
        className={`absolute -top-[30dvh] right-0 h-[160dvh] w-[58%] z-2 origin-left bg-[#122B1E] transition-transform duration-700 delay-75 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpening ? 'translate-x-full' : 'translate-x-0'
        }`}
      />

      {/* Center Liquid Mask JackBloom Emblem Icon */}
      <div
        className={`relative z-10 transition-opacity duration-300 ${
          isOpening ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div
          className="relative size-36 sm:size-48 flex items-center justify-center overflow-hidden"
          style={{
            maskImage: `linear-gradient(to top, transparent 0%, transparent ${100 - percent}%, #000 ${100 - percent}%, #000 100%)`,
            WebkitMaskImage: `linear-gradient(to top, transparent 0%, transparent ${100 - percent}%, #000 ${100 - percent}%, #000 100%)`
          }}
        >
          {/* Official JackBloom Sprouting Seed & Leaf Emblem */}
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#FFE386]">
            {/* Jackfruit exterior rind spiky texture arc */}
            <path
              d="M50 140 C35 115 35 75 55 50 C65 38 78 30 92 25 C88 45 92 65 105 80 C118 95 138 105 155 110 C140 135 115 155 80 155 C68 155 58 150 50 140 Z"
              fill="currentColor"
              opacity="0.9"
            />
            {/* Morphing Sprouting Leaf */}
            <path
              d="M100 25 C120 15 145 25 150 45 C145 65 125 75 108 70 C102 55 98 40 100 25 Z"
              fill="#E29D37"
            />
            {/* Center Golden Seed Core */}
            <ellipse cx="98" cy="88" rx="18" ry="26" transform="rotate(-25 98 88)" fill="#FDFBF7" />
            {/* Mound of Flour at base */}
            <path
              d="M75 145 Q110 115 145 145 Q110 160 75 145 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        <p className="text-center font-inter font-semibold uppercase text-xs tracking-[0.2em] text-[#F0DC9C] mt-3">
          Unlocking The Seed...
        </p>
      </div>

      {/* Mechanical Odometer 000% to 100% in bottom-left */}
      <div
        className={`fixed bottom-8 left-8 z-10 flex items-end gap-1 text-[#F0DC9C] transition-opacity duration-300 ${
          isOpening ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ fontFamily: 'var(--font-khand)', fontWeight: 600, fontSize: 'clamp(3rem, 6vw, 5rem)' }}
      >
        <span className="inline-flex items-end leading-none tracking-[-0.06em]">
          <span className="tabular-nums leading-none">
            {d1}{d2}{d3}
          </span>
        </span>
        <span className="opacity-60 leading-none pb-1 text-xl sm:text-2xl font-normal">
          %
        </span>
      </div>

      {/* Brand Watermark on Right */}
      <div className="fixed bottom-8 right-8 z-10 hidden sm:block text-right text-xs uppercase tracking-widest text-[#FDFBF7]/60 font-mono">
        JackBloom Foods • Upcycled Nutrition
      </div>
    </section>
  );
};
