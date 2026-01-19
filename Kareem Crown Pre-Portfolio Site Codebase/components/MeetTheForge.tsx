"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface CharacterStat {
  label: string;
  value: number;
}

interface Character {
  id: string;
  name: string;
  role: string;
  action: string;
  narrative: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  stats: CharacterStat[];
  morphModes: {
    idle: string;
    active: string;
    maestro: string;
  };
}

const characters: Character[] = [
  {
    id: "goldie",
    name: "GOLDIE",
    role: "The Visionary Spark",
    action: "ADOPT",
    narrative:
      "The optimistic first point of contact who welcomes innovation and translates complex data into 'kitchen-table talk'.",
    colors: {
      primary: "#FFD700",
      secondary: "#FFFDD0",
      accent: "#D2B48C",
    },
    stats: [
      { label: "Vision", value: 100 },
      { label: "Empathy", value: 95 },
      { label: "Opportunity Detection", value: 100 },
    ],
    morphModes: {
      idle: "Approachable leader in a tan business suit with subtle gold iris flecks.",
      active: "Luminance—hair tips begin to flicker with fiber-optic gold light.",
      maestro: "The Sun—eyes go solid Molten Gold Marble (no pupils); she radiates a warm aura that brightens the obsidian Void.",
    },
  },
  {
    id: "roman",
    name: "ROMAN",
    role: "The Strategic Engineer",
    action: "ENHANCE",
    narrative:
      "The disciplined big brother and technical advisor who grounds visionary dreams in data-backed frameworks.",
    colors: {
      primary: "#E5E4E2",
      secondary: "#708090",
      accent: "#A9A9A9",
    },
    stats: [
      { label: "Structure", value: 100 },
      { label: "Logic", value: 100 },
      { label: "Efficiency", value: 98 },
    ],
    morphModes: {
      idle: "Sharp strategist in a slate-gray suit with a focused, analytical gaze.",
      active: "Electrification—static blue-white currents arc across his platinum hair streaks and suit.",
      maestro:
        "The Titan—eyes shift to solid Liquid Mercury; his form hardens into hyper-alloy gunmetal as lightning intensifies.",
    },
  },
  {
    id: "nina",
    name: "NINA",
    role: "The Interrogator",
    action: "DEPLOY",
    narrative:
      "The 'Reality Check' and complacency killer who stress-tests every strategy before launch to ensure it is bulletproof.",
    colors: {
      primary: "#F0F8FF",
      secondary: "#E0FFFF",
      accent: "#D4D4D4",
    },
    stats: [
      { label: "Risk Mitigation", value: 100 },
      { label: "Critical Thinking", value: 100 },
      { label: "Security", value: 100 },
    ],
    morphModes: {
      idle: "Discerning professional in a stark white architectural blazer.",
      active: "The Aura—a translucent energy barrier shimmers around her silhouette.",
      maestro:
        "The Validator—eyes go solid Blinding White LED; her shield becomes opaque and unyielding.",
    },
  },
  {
    id: "echo",
    name: "ECHO",
    role: "The Market Heartbeat",
    action: "PULSE BACK",
    narrative:
      "The silent observer who captures market resonance and user feedback to fuel Adaptive Business Intelligence (ABI).",
    colors: {
      primary: "#000000",
      secondary: "#1A1A1A",
      accent: "#353839",
    },
    stats: [
      { label: "Resonance", value: 100 },
      { label: "Listening", value: 100 },
      { label: "Client Alignment", value: 100 },
    ],
    morphModes: {
      idle: "Calm, empathetic listener in black-on-black professional attire.",
      active: "Sonic Distortion—the air around him ripples and distorts like a heat haze.",
      maestro:
        "The Guardian—eyes become light-absorbing Vantablack Orbs; Smoke Trails drift off his form as he dissolves into pure data.",
    },
  },
];

const StatBar: React.FC<{
  label: string;
  value: number;
  color: string;
}> = ({ label, value, color }) => {
  const [isInView, setIsInView] = useState(false);

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs uppercase tracking-wider text-gray-400">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${value}%` } : { width: "0%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          onViewportEnter={() => setIsInView(true)}
        />
      </div>
    </div>
  );
};

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMaestro, setIsMaestro] = useState(false);

  const getMorphEffect = () => {
    switch (character.id) {
      case "goldie":
        return isHovered
          ? "brightness-150 drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]"
          : "";
      case "roman":
        return isHovered
          ? "contrast-125 drop-shadow-[0_0_20px_rgba(229,228,226,0.5)]"
          : "";
      case "nina":
        return isHovered
          ? "blur-[1px] drop-shadow-[0_0_25px_rgba(240,248,255,0.4)]"
          : "";
      case "echo":
        return isHovered
          ? "opacity-80 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          : "";
      default:
        return "";
    }
  };

  const getMaestroEffect = () => {
    switch (character.id) {
      case "goldie":
        return "brightness-200 drop-shadow-[0_0_50px_rgba(255,215,0,0.9)]";
      case "roman":
        return "contrast-150 drop-shadow-[0_0_40px_rgba(229,228,226,0.8)]";
      case "nina":
        return "blur-0 drop-shadow-[0_0_45px_rgba(240,248,255,0.7)]";
      case "echo":
        return "opacity-60 drop-shadow-[0_0_35px_rgba(0,0,0,1)]";
      default:
        return "";
    }
  };

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${character.colors.secondary}05 0%, ${character.colors.primary}08 50%, ${character.colors.secondary}05 100%)`,
        border: `1px solid ${character.colors.primary}30`,
        backdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        setIsMaestro(false);
      }}
      onClick={() => setIsMaestro(!isMaestro)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header */}
      <div
        className="p-4 border-b"
        style={{ borderColor: `${character.colors.primary}30` }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3
              className="text-2xl font-bold uppercase tracking-widest"
              style={{ color: character.colors.primary }}
            >
              {character.name}
            </h3>
            <p
              className="text-sm uppercase tracking-wide mt-1"
              style={{ color: character.colors.secondary }}
            >
              {character.role}
            </p>
          </div>
          <span
            className="px-2 py-1 text-xs font-bold uppercase tracking-wider rounded"
            style={{
              backgroundColor: `${character.colors.primary}20`,
              color: character.colors.primary,
              border: `1px solid ${character.colors.primary}40`,
            }}
          >
            {character.action}
          </span>
        </div>
      </div>

      {/* Visual Representation */}
      <div
        className="relative h-40 overflow-hidden transition-all duration-500"
        style={{
          background: `radial-gradient(ellipse at center, ${character.colors.secondary}10 0%, ${character.colors.primary}08 50%, transparent 70%)`,
        }}
      >
        {/* Character Avatar Placeholder */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${getMorphEffect()} ${isMaestro ? getMaestroEffect() : ""}`}
        >
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${character.colors.secondary}40, ${character.colors.primary}20, transparent)`,
              border: `2px solid ${character.colors.primary}40`,
            }}
          >
            <span
              className="text-4xl font-bold uppercase"
              style={{ color: character.colors.primary }}
            >
              {character.name.charAt(0)}
            </span>
          </div>
        </div>

        {/* Mode Indicator */}
        <div className="absolute bottom-2 left-2 right-2">
          <p
            className="text-xs text-center uppercase tracking-wider transition-all duration-300"
            style={{
              color: isMaestro
                ? character.colors.primary
                : isHovered
                ? character.colors.secondary
                : `${character.colors.secondary}60`,
              textShadow: isMaestro
                ? `0 0 20px ${character.colors.primary}`
                : "none",
            }}
          >
            {isMaestro
              ? character.morphModes.maestro.split("—")[0]
              : isHovered
              ? character.morphModes.active.split("—")[0]
              : "IDLE STATE"}
          </p>
        </div>
      </div>

      {/* Narrative */}
      <div className="p-4 border-b" style={{ borderColor: `${character.colors.primary}20` }}>
        <p className="text-sm text-gray-400 leading-relaxed">{character.narrative}</p>
      </div>

      {/* Stats */}
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">Attributes</p>
        {character.stats.map((stat) => (
          <StatBar
            key={stat.label}
            label={stat.label}
            value={stat.value}
            color={character.colors.primary}
          />
        ))}
      </div>

      {/* Morph Mode Details */}
      <div
        className="p-4 bg-black/20 border-t"
        style={{ borderColor: `${character.colors.primary}20` }}
      >
        <p
          className="text-xs uppercase tracking-wider text-gray-500 mb-2"
        >
          Morphing Loop
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: isMaestro
                  ? character.colors.primary
                  : isHovered
                  ? character.colors.accent
                  : character.colors.secondary,
                boxShadow: isMaestro
                  ? `0 0 10px ${character.colors.primary}`
                  : "none",
              }}
            />
            <p className="text-xs text-gray-400">
              {isMaestro
                ? character.morphModes.maestro
                : isHovered
                ? character.morphModes.active
                : character.morphModes.idle}
            </p>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `inset 0 0 50px ${character.colors.primary}20`,
        }}
      />
    </motion.div>
  );
};

const MeetTheForge: React.FC = () => {
  return (
    <section className="w-full py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#708090]/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Meet <span className="text-[#D4AF37]">The Forge</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Four specialized AI intelligences working in unison to architect your digital excellence
          </p>
          <div className="w-32 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#B6862C] mx-auto rounded-full mt-8" />
        </motion.div>

        {/* Character Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <CharacterCard character={character} />
            </motion.div>
          ))}
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
            {characters.map((character, index) => {
              const angle = (index * 360) / characters.length - 90;
              const radian = (angle * Math.PI) / 180;
              const x1 = 200;
              const y1 = 80;
              const x2 = 200 + Math.cos(radian) * 140;
              const y2 = 80 + Math.sin(radian) * 60;

              return (
                <motion.line
                  key={character.id}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={character.colors.primary}
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
      </div>
      
      {/* === RISING WARMTH - Bottom Section Lighting === */}
      <div className="absolute pointer-events-none z-0" style={{ left: 0, bottom: 0, width: '100%', height: '30vh' }}>
        <div className="absolute pointer-events-none" style={{
          left: '50%', bottom: '0%', transform: 'translateX(-50%)',
          width: '600px', height: '200px',
          background: 'radial-gradient(ellipse at center bottom, rgba(212, 175, 55, 0.2) 0%, rgba(255, 200, 100, 0.1) 35%, transparent 70%)',
          filter: 'blur(20px)',
        }} />
        <div className="absolute pointer-events-none" style={{
          left: '50%', bottom: '-5%', transform: 'translateX(-50%)',
          width: '900px', height: '250px',
          background: 'radial-gradient(ellipse at center bottom, rgba(255, 215, 0, 0.08) 0%, rgba(255, 180, 50, 0.04) 45%, transparent 75%)',
          filter: 'blur(35px)',
        }} />
        <div className="absolute pointer-events-none" style={{
          left: '0', bottom: '0', width: '100%', height: '100%',
          background: 'linear-gradient(to top, rgba(212, 175, 55, 0.05) 0%, rgba(200, 150, 50, 0.02) 50%, transparent 80%)',
          filter: 'blur(50px)',
        }} />
      </div>
    </section>
  );
};

export default MeetTheForge;
