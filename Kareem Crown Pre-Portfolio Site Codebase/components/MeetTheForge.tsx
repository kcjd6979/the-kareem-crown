"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// AI Persona data matching the restore point image
const personas = [
  {
    id: "goldie",
    name: "Goldie",
    role: "The Visionary",
    color: "from-amber-400/20 to-amber-600/10",
    borderColor: "border-amber-500/30",
    accentColor: "text-amber-400",
    status: "Adopt Phase",
    description: "Strategic foresight and creative direction",
  },
  {
    id: "roman",
    name: "Roman",
    role: "The Engineer",
    color: "from-purple-500/20 to-purple-700/10",
    borderColor: "border-purple-500/30",
    accentColor: "text-purple-400",
    status: "Adopt Phase",
    description: "Technical architecture and implementation",
  },
  {
    id: "nina",
    name: "Nina",
    role: "The Validator",
    color: "from-slate-300/20 to-slate-500/10",
    borderColor: "border-slate-400/30",
    accentColor: "text-slate-300",
    status: "Enhance Phase",
    description: "Quality assurance and validation systems",
  },
  {
    id: "echo",
    name: "Echo",
    role: "The Guardian",
    color: "from-teal-400/20 to-teal-600/10",
    borderColor: "border-teal-500/30",
    accentColor: "text-teal-400",
    status: "Adopt Phase",
    description: "Security and protection protocols",
  },
];

const MeetTheForge = () => {
  const [activePersona, setActivePersona] = useState(personas[0].id);

  return (
    <section className="relative min-h-screen py-20 px-4 md:px-8 bg-black">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-4">
          Meet The Forge
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Four specialized AI intelligences working in unison to architect
          excellence.
        </p>
      </motion.div>

      {/* Persona Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {personas.map((persona, index) => (
          <motion.div
            key={persona.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative p-6 rounded-2xl border ${persona.borderColor} bg-gradient-to-br ${persona.color} backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/10`}
            onClick={() => setActivePersona(persona.id)}
          >
            {/* Status Pill */}
            <div className="absolute top-4 right-4">
              <span className={`text-xs px-3 py-1 rounded-full border ${persona.borderColor} ${persona.accentColor} bg-black/30`}>
                {persona.status}
              </span>
            </div>

            {/* Persona Icon/Avatar Placeholder */}
            <div className={`w-16 h-16 rounded-full mb-4 ${persona.borderColor} border-2 flex items-center justify-center`}>
              <span className={`text-2xl font-bold ${persona.accentColor}`}>
                {persona.name.charAt(0)}
              </span>
            </div>

            {/* Name & Role */}
            <h3 className={`text-xl font-bold text-white mb-1 ${persona.accentColor}`}>
              {persona.name}
            </h3>
            <p className="text-sm text-gray-400 mb-3">{persona.role}</p>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
              {persona.description}
            </p>

            {/* Active Indicator */}
            {activePersona === persona.id && (
              <motion.div
                layoutId="activeGlow"
                className={`absolute inset-0 rounded-2xl ${persona.borderColor} border-2`}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Connection Visualization */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <div className="relative h-32 flex items-center justify-center">
          {/* Central Hub */}
          <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <span className="text-2xl font-bold text-black">MTM</span>
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {personas.map((persona, index) => {
              const angle = (index * 360) / personas.length - 90;
              const radian = (angle * Math.PI) / 180;
              const x1 = 200 + Math.cos(radian) * 120;
              const y1 = 100 + Math.sin(radian) * 60;

              return (
                <motion.line
                  key={persona.id}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  x1="50%"
                  y1="50%"
                  x2={`${50 + Math.cos(radian) * 25}%`}
                  y2={`${50 + Math.sin(radian) * 15}%`}
                  stroke="rgba(212, 175, 55, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              );
            })}
          </svg>
        </div>

        <p className="text-gray-500 text-sm mt-8">
          Four minds, one mission. Orchestrating excellence through proprietary AI systems.
        </p>
      </div>
    </section>
  );
};

export default MeetTheForge;
