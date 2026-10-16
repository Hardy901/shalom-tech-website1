import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Sprout, Wind, Scale, Flame, ArrowDown, CheckCircle2, ShieldCheck, Sparkles, HeartPulse, Leaf } from 'lucide-react';

interface StageData {
  id: string;
  number: string;
  step: number;
  title: string;
  tagline: string;
  description: string;
  stat: {
    value: string;
    unit: string;
    label: string;
  };
  highlights: string[];
  accentColor: string;
  badgeBg: string;
  icon: React.ElementType;
}

const STAGES: StageData[] = [
  {
    id: 'stage-1',
    number: '01',
    step: 1,
    title: 'THE RESCUE',
    tagline: 'From Discarded Farm Waste to Superfood Asset',
    description:
      'Over 2 billion tonnes of jackfruit seeds are discarded across tropical farms annually. Within 48 hours of fruit harvest, we collect, wash, and sun-condition these nutrient-dense seeds before any microbial breakdown can occur.',
    stat: {
      value: '100%',
      unit: '',
      label: 'Agricultural Waste Rescued',
    },
    highlights: [
      'Rescued from local smallholder farms in South India',
      'Cold-washed with filtered mountain spring water',
      'Parchment skin conditioned to lock in prebiotic nutrients',
    ],
    accentColor: '#E29D37',
    badgeBg: 'bg-[#E29D37]/15 text-[#E29D37] border-[#E29D37]/30',
    icon: Sprout,
  },
  {
    id: 'stage-2',
    number: '02',
    step: 2,
    title: 'THE REFINE',
    tagline: 'Cold-Air Micro-Milling (Under 80 Microns)',
    description:
      'Raw jackfruit seeds are dense and rock-hard. Using proprietary cold-air micronization technology, we mill the seed at low temperatures (<38°C) to prevent thermal degradation of vitamins and delicate soluble fibres.',
    stat: {
      value: '<80',
      unit: 'μm',
      label: 'Ultra-Fine Micron Particle Size',
    },
    highlights: [
      'Zero heat degradation — active resistant starch preserved',
      'Smoother than traditional stone-ground whole wheat',
      'Naturally debittered with zero chemical processing',
    ],
    accentColor: '#FFE386',
    badgeBg: 'bg-[#FFE386]/20 text-[#122B1E] border-[#FFE386]',
    icon: Wind,
  },
  {
    id: 'stage-3',
    number: '03',
    step: 3,
    title: 'THE BLEND',
    tagline: 'The 85/15 Precision Golden Ratio',
    description:
      'We blend 15% micronized jackfruit seed flour with 85% premium whole wheat atta. This exact golden ratio supercharges your daily roti with 4x more dietary fibre and 12.6g plant protein without altering gluten stretch.',
    stat: {
      value: '13',
      unit: 'g',
      label: 'Dietary Fibre Per 100g Serving',
    },
    highlights: [
      '4x higher fibre than standard commercial wheat flour',
      'Low Glycemic Index (GI) prevents post-meal insulin spikes',
      'Zero gut bloating — high in prebiotic bifidogenic fibres',
    ],
    accentColor: '#E29D37',
    badgeBg: 'bg-[#1A3E2B] text-[#FFE386] border-[#FFE386]',
    icon: Scale,
  },
  {
    id: 'stage-4',
    number: '04',
    step: 4,
    title: 'THE SAVOR',
    tagline: 'Same Soft Roti Puff. Zero Taste Compromise.',
    description:
      'Your family will never notice the upgrade — only their renewed digestive energy. Dough kneads with identical water absorption, rolls without tearing, and balloons into cloud-soft rotis on the tava.',
    stat: {
      value: '100%',
      unit: '',
      label: 'Authentic Taste & Texture Puff',
    },
    highlights: [
      'Rotis stay soft in lunch dabbas for over 12 hours',
      'Works seamlessly for phulkas, parathas, puris, and sourdough',
      'Approved by traditional home bakers & dietitians alike',
    ],
    accentColor: '#FFE386',
    badgeBg: 'bg-[#FFE386] text-[#122B1E] border-[#122B1E]',
    icon: Flame,
  },
];

export const ConnectedStagesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.28) {
        setActiveStage(1);
      } else if (latest < 0.55) {
        setActiveStage(2);
      } else if (latest < 0.82) {
        setActiveStage(3);
      } else {
        setActiveStage(4);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToStage = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="process-journey"
      data-theme="dark"
      className="relative w-full bg-[#122B1E] text-[#FDFBF7] py-24 sm:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Background Decorative Grid & Watermark */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#F5EFE4_1px,transparent_1px)] [background-size:28px_28px]" />
      
      {/* Subtle Background Watermark Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16vw] font-bold font-khand text-white/[0.02] select-none pointer-events-none uppercase whitespace-nowrap leading-none tracking-tighter">
        JACKBLOOM
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A3828] border border-[#D98A2B]/30 text-[#F0DC9C] font-inter text-xs uppercase tracking-[0.16em] font-medium mb-4">
            <span className="size-1.5 rounded-full bg-[#D98A2B]" />
            Farm Waste to Everyday Superfood Atta
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-khand font-bold tracking-tight uppercase leading-[90%] text-[#FDFBF7]">
            The 4-Stage <span className="text-[#D98A2B]">Nutrient Transformation</span>
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-lg font-normal text-[#FDFBF7]/75 max-w-2xl mx-auto font-inter leading-relaxed">
            Watch how agricultural seed waste becomes the everyday flour revolutionizing family gut health across India.
          </p>

          {/* Interactive Stage Pipeline Navigation Bar */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {STAGES.map((s) => {
              const isActive = activeStage === s.step;
              const isPassed = activeStage > s.step;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToStage(s.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 font-inter text-xs uppercase tracking-wider font-semibold cursor-pointer ${
                    isActive
                      ? 'bg-[#FDFBF7] text-[#122B1E] border-[#FDFBF7] shadow-sm scale-105'
                      : isPassed
                      ? 'bg-[#193828] text-[#F0DC9C] border-white/20 hover:border-white/40'
                      : 'bg-[#122B1E]/60 text-[#FDFBF7]/60 border-white/10 hover:border-white/30'
                  }`}
                >
                  <span
                    className={`size-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isActive
                        ? 'bg-[#122B1E] text-[#FDFBF7]'
                        : isPassed
                        ? 'bg-[#D98A2B] text-[#122B1E]'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    {s.number}
                  </span>
                  <span>{s.title.replace('THE ', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Connected Pipeline Layout */}
        <div className="relative">
          {/* Animated Connecting Vertical Line in Center */}
          <div className="hidden lg:block absolute left-1/2 top-12 bottom-24 -translate-x-1/2 w-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ height: progressHeight }}
              className="w-full bg-[#D98A2B] origin-top"
            />
          </div>

          {/* Stage Cards Staggered Down the Pipeline */}
          <div className="space-y-20 sm:space-y-32">
            {STAGES.map((stage, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = stage.icon;
              const isActive = activeStage === stage.step;

              return (
                <div
                  key={stage.id}
                  id={stage.id}
                  className="relative scroll-mt-28"
                >
                  {/* Central Node Badge on Line (Desktop) */}
                  <div className={`hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 size-10 rounded-full border shadow-sm z-20 items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#193828] border-[#D98A2B] text-[#F0DC9C]'
                      : 'bg-[#122B1E] border-white/20 text-white/50'
                  }`}>
                    <span className="text-xs font-bold font-khand tracking-wider">
                      {stage.number}
                    </span>
                  </div>

                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                    {/* Visual Card Side */}
                    <div className={isEven ? 'lg:pr-12' : 'lg:col-start-2 lg:pl-12'}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className={`rounded-2xl p-6 sm:p-8 border transition-all duration-300 relative overflow-hidden backdrop-blur-sm ${
                          isActive
                            ? 'bg-[#163324] border-[#D98A2B]/40 shadow-sm'
                            : 'bg-[#163324]/70 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {/* Top Stage Header */}
                        <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
                          <span className="font-mono text-xs uppercase tracking-widest text-[#D98A2B] flex items-center gap-2 font-semibold">
                            <span className="size-2 rounded-full bg-[#D98A2B]" />
                            Stage {stage.number}
                          </span>
                          <span className="px-3 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-widest bg-white/5 border border-white/10 text-white/60">
                            Process Milestone
                          </span>
                        </div>

                        {/* Metric Banner */}
                        <div className="p-5 sm:p-6 rounded-xl bg-[#0F2419] border border-white/10 mb-6 flex items-baseline justify-between">
                          <div>
                            <div className="flex items-baseline font-khand font-bold text-[#FDFBF7] leading-none tracking-tight">
                              <span className="text-5xl sm:text-6xl">{stage.stat.value}</span>
                              {stage.stat.unit && (
                                <span className="text-2xl sm:text-3xl text-[#D98A2B] ml-1 uppercase">
                                  {stage.stat.unit}
                                </span>
                              )}
                            </div>
                            <p className="font-inter text-xs sm:text-sm text-white/70 mt-2 font-medium">
                              {stage.stat.label}
                            </p>
                          </div>
                          <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D98A2B]">
                            <Icon className="size-6 text-[#D98A2B]" />
                          </div>
                        </div>

                        {/* Key Technical Highlights */}
                        <ul className="space-y-2.5 font-inter text-xs sm:text-sm text-white/80">
                          {stage.highlights.map((item, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-3">
                              <span className="size-1.5 rounded-full bg-[#D98A2B] mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    {/* Editorial & Story Narrative Side */}
                    <div className={isEven ? 'lg:pl-12' : 'lg:col-start-1 lg:pr-12'}>
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                      >
                        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#D98A2B] uppercase mb-2">
                          <span>Pipeline Phase</span>
                          <span className="size-1 rounded-full bg-current" />
                          <span>{stage.number} of 04</span>
                        </div>

                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-khand font-bold uppercase tracking-tight text-white leading-none">
                          {stage.title}
                        </h3>

                        <p className="font-inter text-base sm:text-lg font-medium text-[#F0DC9C] mt-2 sm:mt-3 leading-snug">
                          {stage.tagline}
                        </p>

                        <p className="font-inter text-sm sm:text-base text-white/75 leading-relaxed mt-4">
                          {stage.description}
                        </p>

                        {/* Interactive Action Hook */}
                        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                          <span className="font-inter text-xs sm:text-sm text-white/60 tracking-wide">
                            {idx < STAGES.length - 1 ? 'Flows into Next Stage →' : 'Ready for Your Kitchen'}
                          </span>
                          {idx < STAGES.length - 1 && (
                            <button
                              type="button"
                              onClick={() => scrollToStage(STAGES[idx + 1].id)}
                              className="size-9 rounded-full border border-white/15 hover:border-[#D98A2B] hover:bg-white/5 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
                              aria-label="Next stage"
                            >
                              <ArrowDown className="size-3.5 text-[#D98A2B]" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
