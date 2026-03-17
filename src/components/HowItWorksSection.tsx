import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ClipboardCheck, Flame, Target, Swords, Send } from 'lucide-react';

interface HowItWorksProps {
  t: any;
}

const HowItWorksSection: React.FC<HowItWorksProps> = ({ t }) => {
  const steps = [
    {
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
      icon: ClipboardCheck
    },
    {
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
      icon: Flame
    },
    {
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
      icon: Target
    },
    {
      title: t.howItWorks.step4Title,
      description: t.howItWorks.step4Desc,
      icon: Swords
    },
    {
      title: t.howItWorks.step5Title,
      description: t.howItWorks.step5Desc,
      icon: Send
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

  return (
    <section className="py-16 md:py-24 bg-[#0c0c0c] relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[128px] opacity-5 -mr-24 -mt-24 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
            {t.howItWorks.title1} <span className="text-red-600">{t.howItWorks.title2}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Mobile Line */}
          <motion.div 
            className="absolute left-[26px] top-0 bottom-0 w-[2px] bg-red-600/30 lg:hidden origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {/* Desktop Line */}
          <motion.div 
            className="hidden lg:block absolute top-[27px] left-0 right-0 h-[2px] bg-red-600/30 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-6 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex lg:flex-col items-start lg:items-center gap-6 lg:gap-8 lg:flex-1 group"
              >
                {/* Number Node */}
                <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-red-600 border-4 border-[#0c0c0c] flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:scale-110 group-hover:bg-red-500 transition-all duration-300">
                  <span className="text-white font-heading font-bold text-xl relative z-10">{index + 1}</span>
                </div>

                {/* Content Card */}
                <div className="flex-1 lg:text-center bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group-hover:border-red-600/30 transition-colors duration-300 group-hover:shadow-[-10px_0_30px_-10px_rgba(220,38,38,0.2)] lg:group-hover:shadow-[0_-10px_30px_-10px_rgba(220,38,38,0.2)]">
                  {/* Subtle red left glow (mobile) or top glow (desktop) */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-600/30 group-hover:bg-red-600 transition-colors duration-300 lg:w-full lg:h-1 lg:top-0 lg:left-0"></div>
                  
                  <div className="relative z-10">
                    <step.icon className="w-8 h-8 text-red-500 mb-4 lg:mx-auto opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                    <h3 className="text-lg md:text-xl font-heading font-bold text-white uppercase tracking-wide mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Reassurance Line */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-block px-8 py-4 rounded-full bg-red-600/10 border border-red-600/20 shadow-[0_0_20px_rgba(220,38,38,0.1)]">
            <p className="text-red-500 font-heading font-bold text-lg md:text-xl uppercase tracking-widest">
              {t.howItWorks.bottomLine}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
