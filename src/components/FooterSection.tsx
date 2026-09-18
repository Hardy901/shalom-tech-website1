import React from 'react';

export const FooterSection: React.FC = () => {
  return (
    <div 
      className="relative h-[450px] md:h-[500px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative sm:fixed bottom-0 w-full h-[450px] md:h-[500px] bg-[#02040a]/95 backdrop-blur-2xl text-[#D7E2EA] flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 md:px-24">
        
        {/* Very Subtle Top Inner Border */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/[0.03]" />
        
        {/* Subtle Ambient Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00E5FF]/5 blur-[120px] pointer-events-none z-0" />

        {/* Top Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 w-full max-w-7xl mx-auto z-10 flex-grow relative">
          
          {/* Brand & Hook (Left, Span 6) */}
          <div className="md:col-span-6 flex flex-col gap-6">
            <h2 className="hero-heading font-black text-5xl sm:text-6xl tracking-tighter leading-none text-white/90">
              SHALOM <br/> TECH.
            </h2>
            <p className="text-[#D7E2EA]/40 font-medium text-base sm:text-lg leading-relaxed max-w-sm mt-4">
              The ultimate collision of technology and creativity. Join us in shaping tomorrow's innovations.
            </p>
          </div>

          {/* Links Grid (Right, Span 6) */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8 md:gap-16 pt-2">
            <div className="flex flex-col gap-5">
              <h4 className="text-[#00E5FF]/60 font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Explore</h4>
              <a href="#about" className="text-xl font-black tracking-tight text-white/70 hover:text-white transition-colors duration-300">About</a>
              <a href="#timeline" className="text-xl font-black tracking-tight text-white/70 hover:text-white transition-colors duration-300">Timeline</a>
              <a href="#faculty" className="text-xl font-black tracking-tight text-white/70 hover:text-white transition-colors duration-300">Directory</a>
              <a href="#register" className="text-xl font-black tracking-tight text-white/70 hover:text-white transition-colors duration-300">Register</a>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="text-[#B600A8]/60 font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Connect</h4>
              <a href="#" className="text-xl font-black tracking-tight text-white/70 hover:text-white transition-colors duration-300">Instagram</a>
              <a href="#" className="text-xl font-black tracking-tight text-white/70 hover:text-white transition-colors duration-300">Twitter X</a>
              <a href="#" className="text-xl font-black tracking-tight text-white/70 hover:text-white transition-colors duration-300">LinkedIn</a>
              <a href="#contact" className="text-xl font-black tracking-tight text-white/70 hover:text-white transition-colors duration-300">Contact Us</a>
            </div>
          </div>
        </div>

        {/* Divider & Bottom Bar */}
        <div className="w-full max-w-7xl mx-auto z-10 flex flex-col mt-auto pt-8">
          <div className="w-full h-px bg-white/5 mb-6" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 opacity-30 text-[10px] uppercase tracking-widest font-mono">
            <p>© {new Date().getFullYear()} Shalom Tech.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
