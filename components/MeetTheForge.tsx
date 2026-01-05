"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";

// Forge member data with CORRECT colors and roles based on AEDPS framework
const forgeMembers = [
  {
    id: "goldie",
    name: "Goldie",
    title: "The Visionary",
    phase: "ADOPT",
    color: "#D4AF37",
    glowColor: "rgba(212, 175, 55, 0.5)",
    gradientFrom: "from-amber-600",
    gradientTo: "to-yellow-800",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/50",
    imagePath: "/images/Goldie Golden Eye.png",
    description: "The spark of origin. Goldie adopts new ideas and brings them into the MTM ecosystem with an inviting, magnetic nature.",
  },
  {
    id: "roman",
    name: "Roman",
    title: "The Engineer",
    phase: "ENHANCE",
    color: "#E5E4E2",
    glowColor: "rgba(229, 228, 226, 0.5)",
    gradientFrom: "from-slate-300",
    gradientTo: "to-slate-500",
    accentColor: "text-slate-300",
    borderColor: "border-slate-400/50",
    imagePath: "/images/roman 3d shiny synth headshot character sheet .png",
    description: "The bridge between dream and reality. Roman takes wild concepts and engineers the technical framework to bring them to life.",
  },
  {
    id: "nina",
    name: "Nina",
    title: "The Validator",
    phase: "DEPLOY",
    color: "#F8F9FA",
    glowColor: "rgba(248, 249, 250, 0.5)",
    gradientFrom: "from-white",
    gradientTo: "to-slate-200",
    accentColor: "text-slate-600",
    borderColor: "border-white/50",
    imagePath: "/images/.75 nina.png",
    description: "The rigorous tester. Nina stress tests every idea, asking the hard questions to ensure quality and robustness before deployment.",
  },
  {
    id: "echo",
    name: "Echo",
    title: "The Guardian",
    phase: "PULSE BACK",
    color: "#1A1A1A",
    glowColor: "rgba(0, 255, 255, 0.8)",
    gradientFrom: "from-neutral-900",
    gradientTo: "to-black",
    accentColor: "text-neutral-400",
    borderColor: "border-neutral-700/50",
    imagePath: "/images/Echo 3d headshot white watch.png",
    description: "The voice of the customer. Echo ensures the feedback loop remains open and client needs are always the ultimate priority.",
  },
];

// Individual Forge Card Component - Automatic dopamine-driven animations
function ForgeCard({ 
  member, 
  index,
}: { 
  member: typeof forgeMembers[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  // Staggered animation delays for organic feel
  const delay = index * 0.2;

  return (
    <motion.div
      ref={cardRef}
      className={`group relative w-[260px] md:w-[280px] lg:w-[320px] h-[450px] md:h-[500px] lg:h-[540px] flex-shrink-0 perspective-1000`}
      initial={{ opacity: 0, y: 100 }}
      animate={{ 
        opacity: 1, 
        y: [0, -15, 0],
      }}
      transition={{ 
        duration: 0.8,
        y: {
          duration: 4 + (index * 0.5),
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }
      }}
      whileHover={{ scale: 1.02 }}
      style={{
        transformStyle: "preserve-3d",
        rotateX: 2,
      }}
    >
      {/* Auto-rotating 3D floating animation */}
      <motion.div
        className="w-full h-full"
        animate={{
          rotateY: [-3, 3, -3],
          rotateX: [2, 4, 2],
        }}
        transition={{
          duration: 6 + (index * 0.3),
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Card Glow - Pulsing auto-animation */}
        <div
          className="pointer-events-none absolute -inset-3 z-20 rounded-2xl opacity-40"
          style={{
            background: `radial-gradient(ellipse at center, ${member.glowColor} 0%, transparent 70%)`,
            animation: `pulseGlow ${3 + (index * 0.5)}s ease-in-out infinite`,
          }}
        />

        {/* Card Border Glow - Enhanced on hover */}
        <div
          className="pointer-events-none absolute -inset-1 z-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `0 0 60px ${member.glowColor}, 0 0 100px ${member.glowColor}`,
          }}
        />

        {/* Character Image - Extended beyond container for seamless fade */}
        <div className="absolute inset-0 top-0 h-[55%] overflow-visible">
          {!imageError ? (
            <div className="w-full h-full relative -bottom-4">
              <Image
                src={member.imagePath}
                alt={member.name}
                fill
                className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                }}
                onError={() => setImageError(true)}
              />
              {/* Fade to background - eliminates hard line */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent 50%, #000000 85%, #0a0a0a 100%)',
                }}
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/15 text-7xl font-black font-playfair italic">{member.name.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Name & Title - Pure text, no container */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-4xl font-playfair font-black text-white mb-2 tracking-tight">
            {member.name}
          </h3>
          <p className={`text-xs font-bold uppercase tracking-[0.25em] mb-3 ${member.accentColor}`}>
            {member.title}
          </p>
          
          {/* Phase Badge - Auto-glowing */}
          <div className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest mb-4 font-georgia relative overflow-hidden`}>
            <div 
              className="absolute inset-0 opacity-30"
              style={{ 
                background: member.glowColor,
                animation: `pulseGlow ${3 + (index * 0.5)}s ease-in-out infinite`
              }}
            />
            <span className="relative z-10 opacity-90" style={{ color: member.color }}>{member.phase}</span>&nbsp;PHASE
          </div>

          {/* Description */}
          <p className="text-sm text-white/65 font-merriweather font-light leading-relaxed">
            {member.description}
          </p>
        </div>

        {/* Power/Stats Indicators */}
        <motion.div
          className="absolute top-8 right-8 flex flex-col gap-4"
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 + delay }}
        >
          {/* Power Bar */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] text-white/35 font-mono italic" style={{ fontFamily: 'Times New Roman, serif' }}>PWR</span>
            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${member.color}, ${member.color}cc)` }}
                initial={{ width: "0%" }}
                animate={{ width: "85%" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              />
            </div>
          </div>
          
          {/* Intelligence Bar */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] text-white/35 font-mono italic" style={{ fontFamily: 'Times New Roman, serif' }}>INT</span>
            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${member.color}, ${member.color}cc)` }}
                initial={{ width: "0%" }}
                animate={{ width: "95%" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Ambient particle effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: member.color,
              left: `${20 + (i * 30)}%`,
              top: `${30 + (i * 20)}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Main Component
export default function MeetTheForge() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Top gradient fade for seamless transition from previous section */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.5) 100%)`
      }} />
      
      {/* Bottom gradient fade for seamless transition to next section */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.5) 100%)`
      }} />

      {/* Subtle noise texture overlay - barely visible to maintain starfield */}
      <div className="absolute inset-0 opacity-[0.008] pointer-events-none mix-blend-overlay z-0">
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
      </div>
      
      {/* Section Header - Playfair Display SC Black for headings */}
      <motion.div
        className="relative z-10 pt-32 pb-8 text-center px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-6xl font-playfair font-black mb-6 tracking-tight" style={{ color: "#D4AF37" }}>
          Meet The Forge
        </h2>
        <p className="text-xl text-white/45 font-merriweather max-w-4xl mx-auto leading-relaxed px-8">
          Four specialized intelligences working in concert. 
          <span className="text-white/65"> One unified vision.</span>
          <br />
          <span className="text-[#D4AF37] italic">Adaptive Business Intelligence, personified.</span>
        </p>
      </motion.div>

      {/* Carousel Container - Auto-animated floating cards */}
      <div className="relative z-10 w-full flex justify-center overflow-visible">
        {/* Inner wrapper - Equal padding on both sides */}
        <div className="flex px-6 md:px-12 gap-8 lg:gap-12 py-8">
          {forgeMembers.map((member, index) => (
            <div 
              key={member.id}
              className="flex-shrink-0 flex flex-col items-center w-[320px]"
            >
              {/* Tag - No visible border, seamless floating */}
              <motion.div 
                className="relative group mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.08 }}
              >
                {/* Unique glow effects per member */}
                <div 
                  className="absolute -inset-3 rounded-xl blur-md opacity-50"
                  style={{ 
                    background: member.id === 'goldie' 
                      ? `linear-gradient(135deg, #FFD700, #D4AF37, #FFA500)`
                      : member.id === 'roman'
                      ? `linear-gradient(135deg, #7B8BA5, #4A6FA5, #2E5A8B)`
                      : member.id === 'nina'
                      ? `linear-gradient(135deg, #FFFFFF, #E8F5F5, #A8E6E0)`
                      : `linear-gradient(135deg, #9CA3AF, #6B7280, #4B5563)`,
                    boxShadow: member.id === 'goldie' 
                      ? `0 0 35px rgba(255, 215, 0, 0.4), 0 0 70px rgba(212, 175, 55, 0.2)`
                      : member.id === 'roman'
                      ? `0 0 30px rgba(74, 111, 165, 0.4), 0 0 60px rgba(46, 90, 139, 0.25)`
                      : member.id === 'nina'
                      ? `0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(168, 230, 224, 0.25)`
                      : `0 0 35px rgba(156, 163, 175, 0.4), 0 0 70px rgba(107, 114, 128, 0.25)`,
                  }}
                />
                {/* Tag text - No visible container, just glowing text */}
                <span 
                  className="relative z-10 text-sm md:text-base font-georgia font-bold tracking-[0.35em] uppercase"
                  style={{ 
                    color: member.id === 'goldie' 
                      ? '#FFD700'
                      : member.id === 'roman'
                      ? '#7B8BA5'
                      : member.id === 'nina'
                      ? '#FFFFFF'
                      : '#9CA3AF',
                    textShadow: member.id === 'goldie' 
                      ? `0 0 15px rgba(255, 215, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.5)`
                      : member.id === 'roman'
                      ? `0 0 12px rgba(123, 139, 165, 0.8), 0 0 25px rgba(46, 90, 139, 0.5)`
                      : member.id === 'nina'
                      ? `0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(168, 230, 224, 0.5)`
                      : `0 0 18px rgba(156, 163, 175, 0.9), 0 0 35px rgba(107, 114, 128, 0.6)`,
                  }}
                >
                  {member.phase}
                </span>
              </motion.div>
              
              {/* Card */}
              <ForgeCard 
                member={member} 
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CSS Keyframes for auto-animations */}
      <style jsx global>{`
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}
