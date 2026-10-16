import React from 'react';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { TimelineSection } from './components/TimelineSection';
import { ServicesSection } from './components/ServicesSection';
import { FlyThroughSection } from './components/FlyThroughSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FacultySection } from './components/FacultySection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';

export const App: React.FC = () => {
  const handleContactClick = () => {
    const el = document.getElementById('faculty');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="main-wrapper bg-[#070f1a] min-h-screen text-[#D7E2EA] overflow-x-clip selection:bg-[#B600A8] selection:text-white">
      <div className="film-grain" />
      <CustomCursor />
      
      {/* 0. INTRO SPACE TUNNEL */}
      <FlyThroughSection />

      {/* NAVBAR (Sticks to top after intro) */}
      <Navbar />

      {/* 1. HERO SECTION */}
      <HeroSection onContactClick={handleContactClick} />

      {/* 1.5. MANIFESTO SECTION */}
      <ManifestoSection />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <AboutSection onContactClick={handleContactClick} />

      {/* 3.5. TIMELINE SECTION */}
      <TimelineSection />

      {/* 4. SERVICES SECTION */}
      <ServicesSection />

      {/* 5. PROJECTS SECTION */}
      <ProjectsSection />

      {/* 5.5. FACULTY DIRECTORY */}
      <FacultySection />

      {/* 6. FAQ SECTION */}
      <FaqSection />

      {/* FOOTER */}
      <FooterSection />
    </div>
  );
};

export default App;
