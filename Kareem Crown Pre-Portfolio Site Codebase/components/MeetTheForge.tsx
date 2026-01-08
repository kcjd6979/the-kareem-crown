"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// AI Persona data - Using Midas Touch Media Official Brand Colors
const personas = [
  {
    id: "goldie",
    name: "Goldie",
    role: "The Visionary",
    color: "gold",
    glowColor: "rgba(212, 175, 55, 0.5)", // Midas Gold Glossy #D4AF37
    status: "Adopt Phase",
    description: "Strategic foresight and creative direction",
  },
  {
    id: "roman",
    name: "Roman",
    role: "The Engineer",
    color: "silver",
    glowColor: "rgba(192, 192, 192, 0.5)", // Metallic Silver #C0C0C0
    status: "Adopt Phase",
    description: "Technical architecture and implementation",
  },
  {
    id: "nina",
    name: "Nina",
    role: "The Validator",
    color: "chrome",
    glowColor: "rgba(225, 225, 225, 0.5)", // Hi-Gloss Chrome #E1E1E1
    status: "Enhance Phase",
    description: "Quality assurance and validation systems",
  },
  {
    id: "echo",
    name: "Echo",
    role: "The Guardian",
    color: "gold",
    glowColor: "rgba(212, 175, 55, 0.5)", // Midas Gold Glossy #D4AF37
    status: "Adopt Phase",
    description: "Security and protection protocols",
  },
];

const MeetTheForge = () => {
  const [activePersona, setActivePersona] = useState<string | null>(null);

  const getColorClasses = (color: string, glowColor: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
      gold: {
        bg: "from-[#D4AF37]/10 to-[#B6862C]/5", // Midas Gold Glossy to Matte
        border: "border-[#D4AF37]/30",
        text: "text-[#D4AF37]",
        glow: glowColor,
      },
      silver: {
        bg: "from-[#C0C0C0]/10 to-[#C0C0C0]/5", // Metallic Silver
        border: "border-[#C0C0C0]/30",
        text: "text-[#C0C0C0]",
        glow: glowColor,
      },
      chrome: {
        bg: "from-[#E1E1E1]/10 to-[#E1E1E1]/5", // Hi-Gloss Chrome
        border: "border-[#E1E1E1]/30",
        text: "text-[#E1E1E1]",
        glow: glowColor,
      },
    };
    return colors[color] || colors.gold;
  };

  return (
    <section className="relative min-h-screen py-20 px-4 md:px-8 bg-black overflow-hidden">
      {/* Background Effects - Using Midas Gold colors only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C0C0C0]/5 rounded-full blur-3xl" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto text-center mb-16"
      >
        <h2 className="font-playfair font-bold text-4xl md:text-6xl text-white mb-4">
          Meet <span className="text-gradient-gold">The Forge</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Four specialized AI intelligences working in unison to architect
          excellence.
        </p>
        <div className="section-divider mx-auto mt-8" />
      </motion.div>

      {/* Persona Cards */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {personas.map((persona, index) => {
          const colors = getColorClasses(persona.color, persona.glowColor);

          return (
            <motion.div
              key={persona.id}
              data-persona={persona.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setActivePersona(persona.id)}
              onHoverEnd={() => setActivePersona(null)}
              className={`relative p-6 rounded-2xl glass-card-glow cursor-pointer card-hover ${
                activePersona === persona.id ? "scale-[1.02]" : ""
              }`}
              style={{
                ["--persona-color" as string]: colors.text.replace("text-", "").replace(/[\[\]]/g, ""),
                ["--persona-glow" as string]: colors.glow,
              } as React.CSSProperties}
            >
              {/* Colored Glow Effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(ellipse at top, ${colors.glow}, transparent 70%)`,
                  opacity: activePersona === persona.id ? 0.5 : 0,
                }}
              />

              {/* Status Pill */}
              <div className="absolute top-4 right-4">
                <span className={`status-pill ${colors.text.replace(/[\[\]]/g, "")}`}>
                  {persona.status}
                </span>
              </div>

              {/* Persona Avatar Container */}
              <div className="relative mb-6 mt-2">
                <div
                  className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${colors.bg} border-2`}
                  style={{
                    borderColor: colors.border.replace(/[\[\]]/g, ""),
                    boxShadow: `0 0 30px ${colors.glow}`,
                  }}
                >
                  <span
                    className={`text-3xl font-bold ${colors.text.replace(/[\[\]]/g, "")}`}
                  >
                    {persona.name.charAt(0)}
                  </span>
                </div>

                {/* Pulsing Ring */}
                <div
                  className="absolute inset-0 rounded-full border border-current opacity-20"
                  style={{
                    borderColor: colors.text.replace("text-", "").replace(/[\[\]]/g, ""),
                    animation: "ringPulse 4s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Name & Role */}
              <h3 className={`text-xl font-bold text-white mb-1 text-center ${colors.text.replace(/[\[\]]/g, "")}`}>
                {persona.name}
              </h3>
              <p className={`text-sm text-center mb-4 text-gray-300`}>
                {persona.role}
              </p>

              {/* Description */}
              <p className="text-gray-400 text-sm text-center leading-relaxed">
                {persona.description}
              </p>

              {/* Bottom Accent Line */}
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full transition-all duration-300 ${
                  activePersona === persona.id ? "w-20" : "w-12"
                }`}
                style={{
                  background: colors.text.replace("text-", "").replace(/[\[\]]/g, ""),
                  boxShadow: `0 0 10px ${colors.glow}`,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Central Hub Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="relative max-w-2xl mx-auto mt-20"
      >
        {/* Connection Lines SVG */}
        <svg className="absolute inset-0 w-full h-40 pointer-events-none" viewBox="0 0 400 160">
          {personas.map((persona, index) => {
            const angle = (index * 360) / personas.length - 90;
            const radian = (angle * Math.PI) / 180;
            const x1 = 200;
            const y1 = 80;
            const x2 = 200 + Math.cos(radian) * 140;
            const y2 = 80 + Math.sin(radian) * 60;

            return (
              <motion.line
                key={persona.id}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={persona.glowColor}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>

        {/* Central MTM Hub */}
        <div className="relative flex justify-center">
          <div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B6862C] flex items-center justify-center relative"
            style={{
              boxShadow: "0 0 40px rgba(212, 175, 55, 0.4)",
            }}
          >
            <span className="text-2xl font-bold text-black font-serif">MTM</span>

            {/* Rotating Ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/30"
              style={{
                animation: "ringPulse 4s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        <p className="text-gray-500 text-sm text-center mt-8">
          Four minds, one mission. Orchestrating excellence through proprietary AI systems.
        </p>
      </motion.div>
    </section>
  );
};

export default MeetTheForge;
