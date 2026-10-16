import React, { useState, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { X, Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMouseNearTop, setIsMouseNearTop] = useState(false);
  const isNearTopRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const lenis = useLenis();

  // Mouse position tracking with intentional latency
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const isNear = e.clientY < 80;
      
      // Only trigger if the state actually changes
      if (isNear !== isNearTopRef.current) {
        isNearTopRef.current = isNear;
        
        // Clear any existing timeout if they moved their mouse quickly
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        // Add 190ms of latency before reacting
        timeoutRef.current = window.setTimeout(() => {
          setIsMouseNearTop(isNear);
        }, 190);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Don't hide navbar if mobile menu is open
      if (isMobileMenuOpen) return;

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
  }, [lastScrollY, isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (lenis) {
      lenis.scrollTo(target, { offset: -80 });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 z-50 w-full transition-transform duration-500 ease-in-out border-b bg-[#02040a]/80 backdrop-blur-[32px] backdrop-saturate-[150%] border-white/[0.04] py-4 shadow-[0_10px_40px_rgba(0,0,0,0.6)] ${
          (isVisible || isMouseNearTop) ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {/* LOGO */}
          <a 
            href="#" 
            onClick={(e) => handleNavClick(e, 'top')}
            className="font-black text-xl sm:text-2xl tracking-tighter text-white hover:opacity-80 transition-opacity z-50 relative"
          >
            SHALOM TECH<span className="text-[#c19b6c]">.</span>
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] font-bold">
            <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-[#D7E2EA]/60 hover:text-[#c19b6c] transition-colors">About</a>
            <a href="#timeline" onClick={(e) => handleNavClick(e, '#timeline')} className="text-[#D7E2EA]/60 hover:text-[#c19b6c] transition-colors">Timeline</a>
            <a href="#events" onClick={(e) => handleNavClick(e, '#events')} className="text-[#D7E2EA]/60 hover:text-[#c19b6c] transition-colors">Events</a>
            <a href="#register" onClick={(e) => handleNavClick(e, '#register')} className="text-[#D7E2EA]/60 hover:text-[#c19b6c] transition-colors">Register</a>
            <a href="#faculty" onClick={(e) => handleNavClick(e, '#faculty')} className="text-[#D7E2EA]/60 hover:text-[#c19b6c] transition-colors">Faculty</a>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="md:hidden text-[#c19b6c] hover:text-white transition-colors z-50 relative p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN MENU OVERLAY */}
      <div 
        className={`fixed inset-0 z-40 bg-[#02040a]/95 backdrop-blur-3xl flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8 font-mono text-xl sm:text-2xl uppercase tracking-[0.3em] font-bold text-center">
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-white hover:text-[#c19b6c] transition-colors transform hover:scale-110 active:scale-95 duration-200">About</a>
          <a href="#timeline" onClick={(e) => handleNavClick(e, '#timeline')} className="text-white hover:text-[#c19b6c] transition-colors transform hover:scale-110 active:scale-95 duration-200">Timeline</a>
          <a href="#events" onClick={(e) => handleNavClick(e, '#events')} className="text-white hover:text-[#c19b6c] transition-colors transform hover:scale-110 active:scale-95 duration-200">Events</a>
          <a href="#register" onClick={(e) => handleNavClick(e, '#register')} className="text-white hover:text-[#c19b6c] transition-colors transform hover:scale-110 active:scale-95 duration-200">Register</a>
          <a href="#faculty" onClick={(e) => handleNavClick(e, '#faculty')} className="text-white hover:text-[#c19b6c] transition-colors transform hover:scale-110 active:scale-95 duration-200">Faculty</a>
        </div>
      </div>
    </>
  );
};
