import React, { useState } from 'react';
import { ArrowUp, ArrowRight, Check } from 'lucide-react';

export const CtaFooterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="cta" data-theme="dark" className="bg-[#122B1E] text-[#FDFBF7] relative w-full pt-20 sm:pt-28 pb-12 overflow-hidden border-t border-white/5">
      <div className="paddx relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Subhead Tag */}
        <span className="text-xs font-mono font-semibold tracking-widest text-[#D98A2B] uppercase bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 mb-5">
          Good Food • Greater Impact
        </span>

        {/* Editorial Khand Callout Header */}
        <h2 className="text150 uppercase text-[#F0DC9C] leading-none mb-4">
          Bring JackBloom Home.
        </h2>

        <p className="font-inter text-sm sm:text-base text-white/75 max-w-xl mb-8 leading-relaxed font-normal">
          Bring 15% upcycled jackfruit seed flour to your kitchen. Subscribe for launch drops, seasonal farmer harvest batches, and chef recipe guides.
        </p>

        {/* Email Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col sm:flex-row items-center gap-2 bg-[#0C1D14] p-1.5 rounded-xl border border-white/10 shadow-sm mb-16"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full bg-transparent px-4 py-2.5 text-xs sm:text-sm text-[#FDFBF7] placeholder-white/40 focus:outline-none font-inter"
          />
          <button
            type="submit"
            className="w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-lg bg-[#D98A2B] hover:bg-[#e69838] text-[#122B1E] font-inter text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {submitted ? (
              <>
                <Check className="size-4" /> Added!
              </>
            ) : (
              <>
                Join Batch <ArrowRight className="size-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Footer Meta Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 py-10 border-t border-white/10 text-left text-xs font-inter text-white/70">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/jackbloom/logo.jpg"
                alt="JackBloom"
                className="size-7 rounded-full border border-white/20"
              />
              <span className="font-khand text-xl font-bold text-[#FDFBF7] tracking-tight uppercase">
                JACKBLOOM
              </span>
            </div>
            <p className="font-inter text-xs leading-relaxed text-white/60">
              Sustainable food-technology converting discarded jackfruit seeds into micro-milled everyday flour.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#D98A2B] font-bold mb-3">Explore</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#Hero" className="hover:text-white transition-colors">Home & Overview</a></li>
              <li><a href="#process-journey" className="hover:text-white transition-colors">4-Stage Process</a></li>
              <li><a href="#packaging-showcase" className="hover:text-white transition-colors">500g Packaging Pouch</a></li>
              <li><a href="#recipes" className="hover:text-white transition-colors">Culinary Recipes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#D98A2B] font-bold mb-3">Compliance & Origin</h4>
            <p className="leading-relaxed text-xs text-white/70">
              Packed & Marketed by: <br />
              <strong className="text-[#FDFBF7]">JackBloom Foods Pvt. Ltd.</strong> <br />
              Gurugram, Haryana, India <br />
              FSSAI Lic. No. 100XXXXXXXXXX
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#D98A2B] font-bold mb-3">Contact</h4>
              <p className="text-xs text-white/70">hello@jackbloom.com</p>
              <p className="mt-1 text-xs text-white/70">+91 (0124) 482-BLOOM</p>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-4 flex items-center gap-1.5 text-xs text-[#D98A2B] hover:text-white transition-colors cursor-pointer"
            >
              Back to top <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>

        {/* GIANT KHAND WATERMARK LOGO TEXT ACROSS FULL SCREEN */}
        <div className="w-full pt-6 border-t border-white/10 select-none">
          <h1
            className="font-khand font-bold tracking-tight text-center uppercase leading-none opacity-10 hover:opacity-20 transition-opacity"
            style={{ fontSize: 'clamp(3.5rem, 13vw, 15rem)' }}
          >
            JACKBLOOM
          </h1>
          <p className="text-center text-[11px] font-mono text-white/40 mt-3">
            © 2026 JackBloom Foods. All rights reserved. Every seed has value. We simply unlock it.
          </p>
        </div>
      </div>
    </footer>
  );
};
