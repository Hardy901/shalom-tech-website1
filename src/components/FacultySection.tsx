import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { ChevronRight } from 'lucide-react';

const directory = [
  {
    id: "01",
    title: "Vision Makers",
    subtitle: "Hackathon",
    teachers: [
      { name: "Ms. Neha Kapoor", contact: "78386 63919" },
      { name: "Ms. Sarika Aneja", contact: "98183 04589" }
    ],
    students: [
      { name: "Tanish Saravana", role: "Student In-Charge", contact: "87001 31726" },
      { name: "Ean Kotadia", role: "Student In-Charge", contact: "70423 85888" }
    ]
  },
  {
    id: "02",
    title: "Frame Forge",
    subtitle: "3D Poster Composition",
    teachers: [
      { name: "Ms. Shruti Barawal", contact: "87000 13007" },
      { name: "Ms. Swati Srivastava", contact: "99104 84108" }
    ],
    students: [
      { name: "Ridhaan Aneja", role: "Student In-Charge", contact: "88102 19277" },
      { name: "Prithish Sharma", role: "Student In-Charge", contact: "74281 36533" }
    ]
  },
  {
    id: "03",
    title: "Web Weavers",
    subtitle: "Website Design",
    teachers: [
      { name: "Ms. Deepali Yadav", contact: "92890 74656" },
      { name: "Ms. Neena Chauhan", contact: "98911 66750" }
    ],
    students: [
      { name: "Hardik Batra", role: "Student In-Charge", contact: "93156 71544" },
      { name: "Nimardeep Singh", role: "Student In-Charge", contact: "93191 13083" }
    ]
  }
];

const ElegantCard = ({ title, name, avatar, delay, objectPosition = "object-center" }: { title: string, name: string, avatar: string, delay: number, objectPosition?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="w-full bg-[#060A1F]/80 backdrop-blur-md border border-[#c19b6c]/20 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:border-[#c19b6c]/40 transition-colors duration-500 min-h-[250px] sm:min-h-[350px]"
    >
      <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full border-[3px] border-[#c19b6c] overflow-hidden mb-6 shadow-[0_0_20px_rgba(193,155,108,0.3)] bg-[#0a1526]">
        <img src={avatar} alt={name} className={`w-full h-full object-cover ${objectPosition}`} />
      </div>
      <h3 className="font-serif text-3xl sm:text-4xl text-white mb-3 tracking-wide">{name}</h3>
      <p className="text-[#c19b6c] text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] font-sans">
        {title}
      </p>
    </motion.div>
  );
};

export const FacultySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="faculty" className="py-24 sm:py-32 relative border-t border-white/5 overflow-hidden">
      
      {/* Background Image with Deep Blue Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop" 
          alt="Background Crowd" 
          className="w-full h-full object-cover opacity-30 object-top"
        />
        <div className="absolute inset-0 bg-[#020513]/90 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070f1a] via-transparent to-[#070f1a]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* HEADER */}
        <FadeIn>
          <div className="mb-20 text-center flex flex-col items-center">
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white mb-4 tracking-tight">
              The Faculty
            </h2>
            <p className="font-serif italic text-[#c19b6c] text-lg sm:text-xl max-w-2xl">
              From foundational code to the final pitch. <br/>
              The leadership entrusted with stewarding Shalom Tech.
            </p>
          </div>
        </FadeIn>

        {/* CORE OC */}
        <FadeIn delay={0.1}>
          <div className="mb-24 sm:mb-32 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-[1px] bg-[#c19b6c]/40" />
              <h4 className="text-[#c19b6c] font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
                Core Organizing Committee
              </h4>
              <div className="w-12 h-[1px] bg-[#c19b6c]/40" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full">
              <ElegantCard title="President" name="Hardik" avatar="/hardik.jpg" delay={0.1} objectPosition="object-top" />
              <ElegantCard title="Co-President" name="Tanish" avatar="/tanish.png" delay={0.2} />
              <ElegantCard title="Managing Director" name="Bhawna" avatar="https://i.pravatar.cc/150?u=bhawna" delay={0.3} />
            </div>
          </div>
        </FadeIn>

        {/* INTERACTIVE DIRECTORY */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Side: Track List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-2">
            {directory.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative flex items-center justify-between w-full p-6 text-left transition-all duration-300 border-b ${
                    isActive ? 'border-[#c19b6c] bg-[#060A1F]/80' : 'border-white/10 hover:border-[#c19b6c]/50 hover:bg-[#060A1F]/40'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className={`font-mono text-sm ${isActive ? 'text-[#c19b6c]' : 'text-white/40 group-hover:text-white/60'}`}>
                      {item.id}
                    </span>
                    <span className={`font-serif text-xl sm:text-2xl tracking-wide ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                      {item.title}
                    </span>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-[#c19b6c] translate-x-0 opacity-100' : '-translate-x-4 opacity-0 text-white/40 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Side: Details Panel */}
          <div className="w-full lg:w-2/3 min-h-[500px] lg:min-h-[550px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full min-h-[500px] lg:min-h-[550px] p-8 sm:p-12 bg-[#060A1F]/80 backdrop-blur-md border border-[#c19b6c]/20 rounded-xl"
              >
                
                <div className="mb-12 text-center sm:text-left">
                  <h4 className="text-white font-serif text-3xl sm:text-5xl tracking-wide mb-3">
                    {directory[activeIndex].title}
                  </h4>
                  <p className="text-[#c19b6c] font-sans font-bold uppercase tracking-[0.2em] text-[10px]">
                    {directory[activeIndex].subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
                  
                  {/* Teachers */}
                  <div className="flex flex-col gap-6">
                    <h5 className="text-white/40 font-sans text-[10px] font-bold uppercase tracking-widest border-b border-white/10 pb-4 text-center sm:text-left">
                      Teacher Incharges
                    </h5>
                    <div className="flex flex-col gap-6">
                      {directory[activeIndex].teachers.map((teacher, idx) => (
                        <div key={idx} className="flex flex-col gap-1 text-center sm:text-left">
                          <span className="text-white font-serif text-2xl tracking-wide">{teacher.name}</span>
                          <span className="text-white/40 text-sm font-sans">
                            {teacher.contact}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Students */}
                  <div className="flex flex-col gap-6">
                    <h5 className="text-white/40 font-sans text-[10px] font-bold uppercase tracking-widest border-b border-white/10 pb-4 text-center sm:text-left">
                      Student Incharges
                    </h5>
                    <div className="flex flex-col gap-6">
                      {directory[activeIndex].students.map((student, idx) => (
                        <div key={idx} className="flex flex-col gap-1 text-center sm:text-left">
                          <span className="text-white font-serif text-2xl tracking-wide">{student.name}</span>
                          <span className="text-white/40 text-sm font-sans uppercase tracking-widest">{student.role}</span>
                          {student.contact && (
                            <span className="text-white/40 text-sm font-sans">
                              {student.contact}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
