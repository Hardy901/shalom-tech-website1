import React, { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';

export const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const aboutSection = document.getElementById('about');
      
      const hideThreshold = aboutSection ? aboutSection.offsetTop - 100 : window.innerHeight * 4;

      if (currentScrollY > hideThreshold) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: -80 }); // Offset for the sticky navbar height
    }
  };

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-transform duration-500 ease-in-out border-b bg-[#02040a]/80 backdrop-blur-[32px] backdrop-saturate-[150%] border-white/[0.04] py-4 shadow-[0_10px_40px_rgba(0,0,0,0.6)] ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* LOGO */}
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, 'top')}
          className="font-black text-xl sm:text-2xl tracking-tighter text-white hover:opacity-80 transition-opacity"
        >
          SHALOM TECH<span className="text-[#c19b6c]">.</span>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] font-bold">
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-[#D7E2EA]/60 hover:text-[#c19b6c] transition-colors">About</a>
          <a href="#events" onClick={(e) => handleNavClick(e, '#events')} className="text-[#D7E2EA]/60 hover:text-[#c19b6c] transition-colors">Events</a>
          <a href="#timeline" onClick={(e) => handleNavClick(e, '#timeline')} className="text-[#D7E2EA]/60 hover:text-[#c19b6c] transition-colors">Timeline</a>
          <a href="#register" onClick={(e) => handleNavClick(e, '#register')} className="text-[#D7E2EA]/60 hover:text-[#c19b6c] transition-colors">Register</a>
          <a href="#faculty" onClick={(e) => handleNavClick(e, '#faculty')} className="text-[#D7E2EA]/60 hover:text-[#c19b6c] transition-colors">Faculty</a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="md:hidden text-[#c19b6c] font-mono text-[10px] uppercase tracking-widest font-bold">
          MENU
        </div>
      </div>
    </nav>
  );
};
