"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Crown, Hand, Zap, CircuitBoard, Circle, Infinity } from 'lucide-react';

interface LogoElement {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  symbolism: string;
  color: string;
}

const LogoStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeElement, setActiveElement] = useState<string>('crown');
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const logoElements: LogoElement[] = [
    {
      id: 'crown',
      title: 'The Crown',
      icon: <Crown className="w-8 h-8" />,
      description: 'Authority and Mastery',
      symbolism: 'Communicates mastery and authority in the digital marketing space. Clients expect "royal treatment" and superior service.',
      color: '#FFD700'
    },
    {
      id: 'monogram',
      title: 'MT Monogram',
      icon: <Circle className="w-8 h-8" />,
      description: 'Transformation & Unity',
      symbolism: 'The T+M represents transformation - turning confusion into clarity, chaos into strategic direction.',
      color: '#D4AF37'
    },
    {
      id: 'hands',
      title: 'Binary Code Hands',
      icon: <Hand className="w-8 h-8" />,
      description: 'Trust & Digital Expertise',
      symbolism: 'Digital hands holding the logo invoke care and control while emphasizing proficiency in the digital space.',
      color: '#FFA500'
    },
    {
      id: 'circuitry',
      title: 'Blurred Circuitry',
      icon: <CircuitBoard className="w-8 h-8" />,
      description: 'Chaos to Clarity',
      symbolism: 'The transition from blurred to clear circuitry visualizes the transformation Midas Touch Media offers.',
      color: '#32CD32'
    },
    {
      id: 'circle',
      title: 'Infinite Circle',
      icon: <Infinity className="w-8 h-8" />,
      description: 'Continuous Partnership',
      symbolism: 'Represents ongoing support and collaboration - clients are part of a long-term relationship, not just transactions.',
      color: '#4169E1'
    },
    {
      id: 'energy',
      title: 'Golden Energy',
      icon: <Zap className="w-8 h-8" />,
      description: 'Midas Touch Power',
      symbolism: 'The luminous gold evokes wealth, excellence, and value - positioning MTM as premium digital marketing partner.',
      color: '#FFD700'
    }
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black py-20 overflow-hidden">
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-playfair"
          >
            The <span className="text-yellow-400">Logo</span> Story
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Each element tells a story of transformation, trust, and mastery.
            <span className="text-yellow-400 font-semibold"> The logo in itself is an asset. The story multiplies it.</span>
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Logo Display */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full max-w-lg mx-auto"
            >
              {/* Main Logo */}
              <div className="relative aspect-square">
                <motion.img
                  src="/images/mtm-logo-main.jpeg"
                  alt="MTM Logo Story"
                  className="w-full h-full object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Interactive Hotspots */}
                {logoElements.map((element, index) => (
                  <motion.button
                    key={element.id}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setActiveElement(element.id)}
                    className={`absolute w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                      activeElement === element.id
                        ? 'bg-yellow-400 border-yellow-400 shadow-lg shadow-yellow-400/50'
                        : 'bg-black/80 border-yellow-400/50 hover:border-yellow-400'
                    }`}
                    style={{
                      left: `${20 + (index % 3) * 30}%`,
                      top: `${15 + Math.floor(index / 3) * 35}%`
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-75" />
                  </motion.button>
                ))}

                {/* Pulsing Background Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-yellow-400/20 rounded-full"
                  style={{ transform: 'scale(1.1)' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Story Content */}
          <div className="space-y-8">
            {logoElements.map((element, index) => (
              <motion.div
                key={element.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-lg border transition-all duration-500 cursor-pointer ${
                  activeElement === element.id
                    ? 'border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20'
                    : 'border-gray-700 bg-gray-900/50 hover:border-yellow-400/50'
                }`}
                onClick={() => setActiveElement(element.id)}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    animate={{
                      color: activeElement === element.id ? element.color : '#6B7280',
                      scale: activeElement === element.id ? 1.1 : 1
                    }}
                    className="flex-shrink-0 mt-1"
                  >
                    {element.icon}
                  </motion.div>

                  <div className="flex-1">
                    <motion.h3
                      className="text-xl font-bold text-white mb-2"
                      animate={{ color: activeElement === element.id ? element.color : '#FFFFFF' }}
                    >
                      {element.title}
                    </motion.h3>

                    <motion.p
                      className="text-yellow-400 font-semibold mb-3"
                      animate={{
                        opacity: activeElement === element.id ? 1 : 0.7,
                        scale: activeElement === element.id ? 1.02 : 1
                      }}
                    >
                      {element.description}
                    </motion.p>

                    <motion.p
                      className="text-gray-300 leading-relaxed"
                      animate={{
                        opacity: activeElement === element.id ? 1 : 0.5,
                        height: activeElement === element.id ? 'auto' : '3em',
                        overflow: 'hidden'
                      }}
                    >
                      {element.symbolism}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <blockquote className="text-2xl md:text-3xl font-playfair italic text-gray-300 max-w-4xl mx-auto">
            "The fact that the logo evokes <span className="text-yellow-400 font-semibold">trust, excitement, and intrigue</span> shows that it successfully connects on an emotional level. This emotional appeal is essential in decision-making."
          </blockquote>

          <motion.div
            className="mt-8 flex items-center justify-center space-x-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-transparent" />
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 border border-yellow-400/10 rounded-full"
        />
      </div>
    </section>
  );
};

export default LogoStorySection;