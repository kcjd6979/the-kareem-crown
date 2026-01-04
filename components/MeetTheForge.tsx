"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useTransform, useMotionValue, MotionValue } from "framer-motion";
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

// Individual Forge Card Component - Completely transparent, only image and text floating in space
function ForgeCard({ 
  member, 
  scrollX,
}: { 
  member: typeof forgeMembers[0];
  scrollX: MotionValue<number>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect based on scroll position
  const cardParallaxX = useTransform(scrollX, [0, 1], [50, -50]);
  const cardRotation = useTransform(scrollX, [0, 1], [0, -5]);
  
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      className={`group relative w-[260px] md:w-[280px] lg:w-[320px] h-[450px] md:h-[500px] lg:h-[540px] flex-shrink-0 perspective-1000 cursor-grab active:cursor-grabbing`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      style={{
        rotateZ: cardRotation,
        x: cardParallaxX,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Card Glow - Outside any container */}
      <div
        className="pointer-events-none absolute -inset-2 z-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `0 0 100px ${member.glowColor}`,
        }}
      />

      {/* Character Image - Full bleed, no background */}
      <div className="absolute inset-0 top-0 h-3/5">
        {!imageError ? (
          <div className="w-full h-full relative">
            <Image
              src={member.imagePath}
              alt={member.name}
              fill
              className="object-cover object-center transition-all duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/15 text-7xl font-black font-playfair italic">{member.name.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Character Initial - Only show if image fails */}
      {imageError && (
        <div className="absolute top-28 left-8">
          <span className="text-9xl font-black italic opacity-25 font-playfair" style={{ color: member.color }}>
            {member.name.charAt(0)}
          </span>
        </div>
      )}

      {/* Name & Title - Pure text, no container */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-4xl font-playfair font-black text-white mb-2 tracking-tight">
          {member.name}
        </h3>
        <p className={`text-xs font-bold uppercase tracking-[0.25em] mb-3 ${member.accentColor}`}>
          {member.title}
        </p>
        
        {/* Phase Badge */}
        <div className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest mb-4 font-georgia`}>
          <span className="opacity-80" style={{ color: member.color }}>{member.phase}</span>&nbsp;PHASE
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
        transition={{ duration: 0.4 }}
      >
        {/* Power Bar */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-white/35 font-mono italic" style={{ fontFamily: 'Times New Roman, serif' }}>PWR</span>
          <div className="w-16 h-2 bg-white/15 rounded-full overflow-hidden">
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
          <div className="w-16 h-2 bg-white/15 rounded-full overflow-hidden">
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
  );
}

// Main Component
export default function MeetTheForge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for parallax effects
  const scrollX = useMotionValue(0);

  // Track scroll position for parallax
  const handleScroll = () => {
    if (scrollTrackRef.current) {
      const maxScroll = scrollTrackRef.current.scrollWidth - scrollTrackRef.current.clientWidth;
      const currentScroll = scrollTrackRef.current.scrollLeft;
      scrollX.set(maxScroll > 0 ? currentScroll / maxScroll : 0);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Subtle noise texture overlay - barely visible to maintain starfield */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
      </div>
      
      {/* Section Header - Playfair Display SC Black for headings */}
      <motion.div
        className="relative z-10 pt-40 pb-12 text-center px-6"
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

      {/* Carousel Container - Grouped tag + card pairs */}
      <div 
        ref={scrollTrackRef}
        onScroll={handleScroll}
        className="relative z-10 w-full flex justify-start overflow-x-auto"
      >
        {/* Inner wrapper - Equal padding on both sides */}
        <div className="flex px-6 md:px-12 gap-8 lg:gap-12">
          {forgeMembers.map((member) => (
            <div 
              key={member.id}
              className="flex-shrink-0 flex flex-col items-center w-[320px]"
            >
              {/* Tag */}
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
                  className="absolute -inset-3 rounded-xl blur-md opacity-70"
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
                {/* Unique container styling per member */}
                <div 
                  className="relative px-6 py-3 rounded-lg border-2 backdrop-blur-md"
                  style={{ 
                    borderColor: member.id === 'goldie' 
                      ? '#FFD700'
                      : member.id === 'roman'
                      ? '#4A6FA5'
                      : member.id === 'nina'
                      ? '#A8E6E0'
                      : '#9CA3AF',
                    background: member.id === 'goldie' 
                      ? `linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(212, 175, 55, 0.05))`
                      : member.id === 'roman'
                      ? `linear-gradient(135deg, rgba(123, 139, 165, 0.25), rgba(46, 90, 139, 0.15))`
                      : member.id === 'nina'
                      ? `linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(168, 230, 224, 0.12))`
                      : `linear-gradient(135deg, rgba(156, 163, 175, 0.25), rgba(107, 114, 128, 0.15))`,
                  }}
                >
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
                </div>
              </motion.div>
              
              {/* Card */}
              <ForgeCard 
                member={member} 
                scrollX={scrollX}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col items-center gap-4 text-white/20">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Mouse Wheel</span>
          <div className="w-px h-12 bg-white/20" />
        </div>
      </motion.div>

      {/* Navigation Hints */}
      <div className="absolute bottom-12 left-8 text-white/10 text-xs font-mono tracking-widest">
        SCROLL →
      </div>

      {/* Decorative Elements - Removed gold glows */}
    </section>
  );
}
