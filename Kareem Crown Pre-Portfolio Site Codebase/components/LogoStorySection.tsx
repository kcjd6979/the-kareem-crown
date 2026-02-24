"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Crown,
  Hand,
  Zap,
  CircuitBoard,
  Circle,
  Infinity as InfinityIcon,
} from "lucide-react";

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
  const [activeElement, setActiveElement] = useState<string>("crown");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const logoElements: LogoElement[] = [
    {
      id: "crown",
      title: "The Crown",
      icon: <Crown className="w-8 h-8" />,
      description: "Authority and Mastery",
      symbolism:
        'Communicates mastery and authority in the digital marketing space. Clients expect "royal treatment" and superior service.',
      color: "#D4AF37",
    },
    {
      id: "monogram",
      title: "MT Monogram",
      icon: <Circle className="w-8 h-8" />,
      description: "Transformation & Unity",
      symbolism:
        "The T+M represents transformation - turning confusion into clarity, chaos into strategic direction.",
      color: "#D4AF37",
    },
    {
      id: "hands",
      title: "Binary Code Hands",
      icon: <Hand className="w-8 h-8" />,
      description: "Trust & Digital Expertise",
      symbolism:
        "Digital hands holding the logo invoke care and control while emphasizing proficiency in the digital space.",
      color: "#C0C0C0",
    },
    {
      id: "circuitry",
      title: "Blurred Circuitry",
      icon: <CircuitBoard className="w-8 h-8" />,
      description: "Chaos to Clarity",
      symbolism:
        "The transition from blurred to clear circuitry visualizes the transformation Midas Touch Media offers.",
      color: "#B6862C",
    },
    {
      id: "circle",
      title: "Infinite Circle",
      icon: <InfinityIcon className="w-8 h-8" />,
      description: "Continuous Partnership",
      symbolism:
        "Represents ongoing support and collaboration - clients are part of a long-term relationship, not just transactions.",
      color: "#E1E1E1",
    },
    {
      id: "energy",
      title: "Golden Energy",
      icon: <Zap className="w-8 h-8" />,
      description: "Midas Touch Power",
      symbolism:
        "The luminous gold evokes wealth, excellence, and value - positioning MTM as premium digital marketing partner.",
      color: "#D4AF37",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-transparent py-20 overflow-hidden"
    >
      {/* Ambient Background Effects - Midas Gold Only (No Purple/Teal) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-[#0A0A0A]/50 to-black" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#B6862C]/3 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C0C0C0]/3 rounded-full blur-[150px]" />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
            <span className="text-xs text-white/70 uppercase tracking-widest">
              The Story
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-playfair"
          >
            The <span className="text-[#D4AF37]">Logo</span> Story
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Each element tells a story of transformation, trust, and mastery.
            <span className="text-[#D4AF37] font-semibold">
              {" "}
              The logo in itself is an asset. The story multiplies it.
            </span>
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
              {/* Glassmorphism Container */}
              <div className="relative aspect-square p-8 bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl">
                <motion.div
                  className="w-full h-full rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#B6862C]/20 border border-[#D4AF37]/30 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* MTM Logo Text */}
                  <div className="text-center">
                    <div className="text-6xl font-bold text-[#D4AF37] font-serif">
                      MTM
                    </div>
                    <div className="text-[#B6862C] text-sm tracking-widest mt-2">
                      MIDAS TOUCH MEDIA
                    </div>
                  </div>
                </motion.div>

                {/* Interactive Hotspots */}
                {logoElements.map((element, index) => {
                  const leftPos = 20 + (index % 3) * 30;
                  const topPos = 15 + Math.floor(index / 3) * 35;

                  return (
                    <motion.button
                      key={element.id}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.5 as const,
                        delay: 0.5 + 0.1 * index,
                        ease: "easeOut" as const,
                      }}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setActiveElement(element.id)}
                      className={`absolute w-6 h-6 rounded-full border-2 transition-all duration-300 ${activeElement === element.id
                          ? "bg-[#D4AF37] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/50"
                          : "bg-black/80 border-[#D4AF37]/50 hover:border-[#D4AF37]"
                        }`}
                      style={{
                        left: `${leftPos}%`,
                        top: `${topPos}%`,
                      }}
                    >
                      <div className="absolute inset-0 rounded-full bg-[#D4AF37] animate-ping opacity-75" />
                    </motion.button>
                  );
                })}

                {/* Pulsing Background Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute inset-0 border border-[#D4AF37]/20 rounded-full"
                  style={{ transform: "scale(1.1)" }}
                />
              </div>
            </motion.div>
          </div>

          {/* Story Content */}
          <div className="space-y-4">
            {logoElements.map((element, index) => (
              <motion.div
                key={element.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6 as const,
                  delay: 0.1 * index,
                  ease: "easeOut" as const,
                }}
                className={`p-5 rounded-xl border transition-all duration-500 cursor-pointer ${activeElement === element.id
                    ? "border-[#D4AF37]/50 bg-[#D4AF37]/5 shadow-lg shadow-[#D4AF37]/10"
                    : "border-white/10 bg-black/30 hover:border-white/20"
                  }`}
                onClick={() => setActiveElement(element.id)}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    animate={{
                      color: activeElement === element.id ? element.color : "#6B7280",
                      scale: activeElement === element.id ? 1.1 : 1,
                    }}
                    className="flex-shrink-0 mt-1"
                  >
                    {element.icon}
                  </motion.div>

                  <div className="flex-1">
                    <motion.h3
                      className="text-lg font-semibold text-white mb-1"
                      animate={{
                        color:
                          activeElement === element.id ? element.color : "#FFFFFF",
                      }}
                    >
                      {element.title}
                    </motion.h3>

                    <motion.p
                      className="text-[#D4AF37] font-medium text-sm mb-2"
                      animate={{
                        opacity: activeElement === element.id ? 1 : 0.7,
                        scale: activeElement === element.id ? 1.02 : 1,
                      }}
                    >
                      {element.description}
                    </motion.p>

                    <motion.p
                      className="text-gray-400 text-sm leading-relaxed"
                      animate={{
                        opacity: activeElement === element.id ? 1 : 0.5,
                        height: activeElement === element.id ? "auto" : "2.5em",
                        overflow: "hidden",
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
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/10 via-[#B6862C]/10 to-[#C0C0C0]/10 rounded-2xl blur-xl" />
            <blockquote className="relative text-2xl md:text-3xl font-playfair italic text-gray-200 max-w-4xl mx-auto leading-relaxed">
              &quot;The fact that the logo evokes{" "}
              <span className="text-[#D4AF37] font-semibold">
                trust, excitement, and intrigue
              </span>{" "}
              shows that it successfully connects on an emotional level. This
              emotional appeal is essential in decision-making.&quot;
            </blockquote>
          </div>

          <motion.div
            className="mt-8 flex items-center justify-center space-x-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Background Effects */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-transparent" />
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 50,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 border border-[#D4AF37]/10 rounded-full"
        />
      </div>

      {/* Bottom Status Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3"
      >
        <div className="relative flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
          </span>
          <span className="text-xs text-white/70 uppercase tracking-widest">
            Adopt Phase
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default LogoStorySection;
