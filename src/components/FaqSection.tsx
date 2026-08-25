import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FadeIn } from './FadeIn';

const faqs = [
  {
    question: "Who can participate?",
    answer: "Students from classes III to XII can participate. Please check the specific eligibility criteria for each individual event (e.g., Runway to the Future is for III-IV, while Vision Makers is for IX-XII)."
  },
  {
    question: "Is there an entry fee?",
    answer: "No! Participation in all Shalom Tech events is completely free of charge. We believe in providing an accessible platform for all young innovators."
  },
  {
    question: "Can I participate in multiple events?",
    answer: "Yes, you can register for multiple events provided that you meet the eligibility criteria for each and their schedules do not overlap on the event day."
  },
  {
    question: "Are AI tools permitted during the competitions?",
    answer: "It depends on the event. For example, in 'Web Weavers' (Website Design), AI tools are permitted to a certain extent. However, original creativity is always prioritized. Check your specific event's rulebook for details."
  },
  {
    question: "How do I register my team?",
    answer: "You can register by navigating to the 'Register' section just above this FAQ and clicking the 'Register Now' button on your desired event card. This will take you to the official Google Form where you can submit your team's details."
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 px-6 md:px-10 bg-[#070f1a] relative border-t border-[#D7E2EA]/5">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#B600A8]/5 blur-[120px] rounded-[100%] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-[#B600A8] font-black tracking-widest uppercase text-sm sm:text-base mb-2">Got Questions?</h2>
            <h3 className="hero-heading font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter">Frequently Asked</h3>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <FadeIn key={index} delay={index * 0.1}>
                <div 
                  className={`border border-[#D7E2EA]/10 rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-[#0a1526]' : 'bg-[#070f1a] hover:bg-[#0a1526]'}`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left cursor-pointer group"
                  >
                    <span className="font-bold text-white uppercase tracking-wider text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-[#B600A8]/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#B600A8]' : 'group-hover:bg-[#B600A8]/20'}`}>
                      <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-[#B600A8]'}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-[#D7E2EA]/70 text-sm sm:text-base leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
