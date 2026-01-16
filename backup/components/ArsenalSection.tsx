"ArsenalSection.tsx"

"use client";

import { motion } from 'framer-motion';
import { LiquidGlassButton } from './ui/LiquidGlassButton';
import { Layers, BrainCircuit, ShieldCheck } from 'lucide-react';

const arsenalItems = [
  {
    icon: <BrainCircuit size={40} className="text-midas-gold" />,
    title: "AI Systems Architecture",
    description: "Designing and building proprietary, automated AI systems that serve as strategic weapons for business.",
  },
  {
    icon: <Layers size={40} className="text-midas-gold" />,
    title: "Full-Stack Autonomous Development",
    description: "Orchestrating full-stack applications from concept to deployment with ruthless efficiency and elegant precision.",
  },
  {
    icon: <ShieldCheck size={40} className="text-midas-gold" />,
    title: "Performance & SEO 2.0",
    description: "Engineering applications for 'Performance Beast Mode' with Lighthouse scores of 95+ and advanced discoverability.",
  },
];

export const ArsenalSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="w-full py-20 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-12">
          The Arsenal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {arsenalItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center text-center"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <div className="mb-6 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] group-hover:rotate-y-12">{item.icon}</div>
              <h3 className="font-playfair font-bold text-2xl text-white mb-4">{item.title}</h3>
              <p className="text-gray-400 font-merriweather mb-6 flex-grow">{item.description}</p>
              <LiquidGlassButton>
                View Proof
              </LiquidGlassButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
