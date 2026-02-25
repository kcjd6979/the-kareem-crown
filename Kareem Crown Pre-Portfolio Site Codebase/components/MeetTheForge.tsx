"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Master Design Doctrine: Character Squad Specs
const personas = [
  {
    id: "goldie",
    name: "Goldie",
    role: "Vision & Adoption",
    hex: "#FFD700", // Radiant Gold
    secondary: "#FFFDD0", // Cream
    maestroMode: "The Sun",
    description: "Identifies market opportunities and architects the initial adoption strategy. Burns away ambiguity with molten insight.",
    effectClass: "gold-sun-effect"
  },
  {
    id: "roman",
    name: "Roman",
    role: "Structure & Engineering",
    hex: "#E5E4E2", // Platinum
    secondary: "#708090", // Slate
    maestroMode: "The Titan",
    description: "Engineers the core systems. A liquid mercury titan that solidifies into unshakeable infrastructure.",
    effectClass: "silver-titan-effect"
  },
  {
    id: "nina",
    name: "Nina",
    role: "Validation & Deployment",
    hex: "#FFFFFF", // Ice White
    secondary: "#C0C0C0", // Silver
    maestroMode: "The Validator",
    description: "Manages seamless deployment. Her blinding LED gaze validates every line of code for operational excellence.",
    effectClass: "white-validator-effect"
  },
  {
    id: "echo",
    name: "Echo",
    role: "Feedback & Optimization",
    hex: "#000000", // Vantablack
    secondary: "#36454F", // Charcoal
    maestroMode: "The Guardian",
    description: "Monitors the ecosystem post-launch. A shadow guardian composed of data and smoke that detects every anomaly.",
    effectClass: "black-guardian-effect"
  },
];

const MeetTheForge = () => {
  const [activePersona, setActivePersona] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen py-20 px-4 md:px-8 bg-transparent section-under-light overflow-hidden">

      {/* Background Effects - The Void */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px]" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto text-center mb-20"
      >
        <h2 className="font-serif font-bold text-4xl md:text-6xl text-white mb-4">
          Meet <span style={{ color: '#FFD700' }}>The Forge</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
          Four specialized intelligences. One diverse neural network.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mt-8 opacity-50" />
      </motion.div>

      {/* Persona Cards */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {personas.map((persona, index) => {
          const isActive = activePersona === persona.id;

          return (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setActivePersona(persona.id)}
              onHoverEnd={() => setActivePersona(null)}
              className="relative group h-[420px] rounded-2xl cursor-none perspective-1000"
            >
              <div
                className={`w-full h-full rounded-2xl relative transition-all duration-500 ease-out border border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden ${isActive ? 'scale-105 shadow-2xl' : 'grayscale hover:grayscale-0'}`}
                style={{
                  boxShadow: isActive ? `0 0 30px ${persona.hex}40` : 'none',
                  borderColor: isActive ? persona.hex : 'rgba(255,255,255,0.1)'
                }}
              >
                {/* MAESTRO MODE VISUALS */}

                {/* 1. Base Gradient */}
                <div
                  className="absolute inset-0 opacity-20 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${persona.hex}, ${persona.secondary})`,
                    opacity: isActive ? 0.2 : 0.05
                  }}
                />

                {/* 2. Effect Layers (Simulating the 'Modes') */}

                {/* GOLDIE: SUN / MOLTEN */}
                {persona.id === 'goldie' && isActive && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFD700]/40 via-orange-500/10 to-transparent mix-blend-screen"
                  />
                )}

                {/* ROMAN: TITAN / MERCURY */}
                {persona.id === 'roman' && isActive && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-gray-200/20 via-transparent to-transparent"
                    style={{ filter: 'url(#liquid-filter)' }} // Assuming SVG filter exists or just fallback
                  />
                )}

                {/* NINA: VALIDATOR / LED */}
                {persona.id === 'nina' && isActive && (
                  <div className="absolute inset-0 bg-white/5 mix-blend-overlay animate-pulse" />
                )}

                {/* ECHO: GUARDIAN / SMOKE */}
                {persona.id === 'echo' && isActive && (
                  <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
                )}

                {/* CONTENT */}
                <div className="relative z-10 p-8 h-full flex flex-col items-center text-center">

                  {/* Avatar Circle */}
                  <div
                    className="w-24 h-24 rounded-full mb-6 relative flex items-center justify-center transition-all duration-500"
                    style={{
                      border: `2px solid ${isActive ? persona.hex : 'rgba(255,255,255,0.2)'}`,
                      backgroundColor: isActive ? `${persona.hex}10` : 'transparent',
                      boxShadow: isActive ? `0 0 20px ${persona.hex}60` : 'none'
                    }}
                  >
                    <span className="text-4xl font-serif font-black" style={{ color: isActive ? persona.hex : '#888' }}>
                      {persona.name.charAt(0)}
                    </span>

                    {/* Eyes / Effect in Avatar */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1.2, opacity: 1 }}
                        className="absolute inset-0 rounded-full blur-md"
                        style={{ backgroundColor: persona.hex, mixBlendMode: 'screen', opacity: 0.5 }}
                      />
                    )}
                  </div>

                  {/* Text Info */}
                  <h3 className="text-2xl font-bold font-serif mb-2 transition-colors duration-300" style={{ color: isActive ? persona.hex : 'white' }}>
                    {persona.name}
                  </h3>

                  <div className="text-xs uppercase tracking-widest mb-6 px-3 py-1 rounded-full border border-white/10" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: isActive ? persona.secondary : '#aaa' }}>
                    {persona.role}
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed opacity-80">
                    {persona.description}
                  </p>

                  {/* Maestro Mode Tag */}
                  <motion.div
                    className="mt-auto pt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                  >
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color: persona.hex }}>
                      Maestro Mode: {persona.maestroMode}
                    </span>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default MeetTheForge;
