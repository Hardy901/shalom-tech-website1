import React, { useState } from 'react';
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
import { X, Mail, Sparkles, Send } from 'lucide-react';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleContactClick = () => {
    setIsContactOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsContactOpen(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
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

      {/* CONTACT MODAL */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#141414] border-2 border-[#D7E2EA]/20 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-6 right-6 text-[#D7E2EA]/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 text-[#B600A8] text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" /> Get In Touch
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2">
              Contact Shalom Tech
            </h3>
            <p className="text-sm text-[#D7E2EA]/70 mb-6">
              Fill out the form below to register, sponsor, or inquire about Shalom Tech event details.
            </p>

            {submitted ? (
              <div className="py-10 text-center flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#B600A8]/20 flex items-center justify-center text-[#B600A8]">
                  <Send className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Received!</h4>
                <p className="text-sm text-[#D7E2EA]/70">We will reach out to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full rounded-xl bg-[#070f1a] border border-[#D7E2EA]/20 px-4 py-3 text-sm text-white placeholder-[#D7E2EA]/40 focus:outline-none focus:border-[#B600A8]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full rounded-xl bg-[#070f1a] border border-[#D7E2EA]/20 px-4 py-3 text-sm text-white placeholder-[#D7E2EA]/40 focus:outline-none focus:border-[#B600A8]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1 font-medium">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project or event interest..."
                    className="w-full rounded-xl bg-[#070f1a] border border-[#D7E2EA]/20 px-4 py-3 text-sm text-white placeholder-[#D7E2EA]/40 focus:outline-none focus:border-[#B600A8]"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-full py-4 text-white font-bold uppercase tracking-widest text-sm transition-transform active:scale-95 cursor-pointer shadow-lg"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
