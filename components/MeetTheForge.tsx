"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useSpring, useTransform, useMotionValue, MotionValue } from "framer-motion";
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
    glowColor: "rgba(26, 26, 26, 0.6)",
    gradientFrom: "from-neutral-900",
    gradientTo: "to-black",
    accentColor: "text-neutral-400",
    borderColor: "border-neutral-700/50",
    imagePath: "/images/Echo 3d headshot white watch.png",
    description: "The voice of the customer. Echo ensures the feedback loop remains open and client needs are always the ultimate priority.",
  },
];

// Spotlight cursor component for metallic shine effect
function SpotlightCursor({ 
  mouseX, 
  mouseY, 
  color,
}: { 
  mouseX: MotionValue<number>; 
  mouseY: MotionValue<number>; 
  color: string;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
      style={{
        background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${color}25%, transparent 65%)`,
      }}
    />
  );
}

// Individual Forge Card Component with Metallic/Glossy Finish
function ForgeCard({ 
  member, 
  mouseX, 
  mouseY,
  scrollX,
}: { 
  member: typeof forgeMembers[0];
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollX: MotionValue<number>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Effect - responds to mouse position within card
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });
  
  // Parallax effect based on scroll position
  const cardParallaxX = useTransform(scrollX, [0, 1], [50, -50]);
  const cardRotation = useTransform(scrollX, [0, 1], [0, -5]);
  
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      className={`relative w-[320px] h-[540px] flex-shrink-0 perspective-1000 cursor-grab active:cursor-grabbing`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      style={{
        rotateX,
        rotateY,
        rotateZ: cardRotation,
        x: cardParallaxX,
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight Effect跟随鼠标 */}
      <SpotlightCursor 
        mouseX={mouseX} 
        mouseY={mouseY} 
        color={member.color}
      />

      {/* Metallic Card Glow */}
      <motion.div
        className={`absolute inset-0 rounded-2xl ${member.borderColor} opacity-0`}
        style={{
          boxShadow: isHovered ? `0 0 60px ${member.glowColor}` : "none",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card Background with Metallic/Glossy Finish - More transparent */}
      <div className={`absolute inset-0 rounded-2xl border ${member.borderColor} border-opacity-30 overflow-hidden mix-blend-screen`}>
        
        {/* Glossy Reflection Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-transparent opacity-60" />
        
        {/* Metallic Sheen Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-b ${isHovered ? "from-white/25" : "from-white/8"} via-transparent to-black/40 opacity-60 transition-opacity duration-300`} />

        {/* Character Image */}
        <div className="absolute inset-x-0 top-0 h-3/5 p-5 pt-10">
          {!imageError ? (
            <div className="w-full h-full relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={member.imagePath}
                alt={member.name}
                fill
                className={`object-cover object-center transition-all duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-full h-full rounded-xl bg-black/50 flex items-center justify-center">
              <span className="text-white/15 text-7xl font-black font-playfair italic">{member.name.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Metallic Accent Line */}
        <div className={`absolute top-[calc(60%+20px)] left-5 right-5 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50`} />

        {/* Character Initial - Only show if image fails */}
        {imageError && (
          <div className="absolute top-28 left-8">
            <span className="text-9xl font-black italic opacity-25 font-playfair" style={{ color: member.color }}>
              {member.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Name & Title - Playfair Display SC Black */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
          <h3 className="text-4xl font-playfair font-black text-white mb-2 tracking-tight">
            {member.name}
          </h3>
          <p className={`text-xs font-bold uppercase tracking-[0.25em] mb-3 ${member.accentColor}`}>
            {member.title}
          </p>
          
          {/* Phase Badge - Georgia font for footer-like elements */}
          <div className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest mb-4 border ${member.borderColor} font-georgia`}>
            <span style={{ color: member.color }}>{member.phase}</span>&nbsp;PHASE
          </div>

          {/* Description - Merriweather for body text */}
          <p className="text-sm text-white/65 font-merriweather font-light leading-relaxed">
            {member.description}
          </p>
        </div>

        {/* Power/Stats Indicators - Times New Roman for alternative text */}
        <motion.div
          className="absolute top-8 right-8 flex flex-col gap-4"
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 25 }}
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
                animate={{ width: isHovered ? `${65 + (member.id === "goldie" ? 30 : member.id === "roman" ? 25 : member.id === "nina" ? 35 : 20)}%` : "0%" }}
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
                animate={{ width: isHovered ? `${55 + (member.id === "nina" ? 40 : member.id === "echo" ? 25 : member.id === "roman" ? 35 : 25)}%` : "0%" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Holographic Scan Lines Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.015)_50%,transparent_100%)] bg-[length:100%_4px]" />
        </div>

        {/* Corner Accents - Decorative borders - removed to eliminate hard lines */}
      </div>
    </motion.div>
  );
}

// Main Component
export default function MeetTheForge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for card tilt effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Scroll progress for parallax effects
  const scrollX = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  // Track scroll position for parallax
  const handleScroll = () => {
    if (trackRef.current) {
      const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;
      const currentScroll = trackRef.current.scrollLeft;
      scrollX.set(maxScroll > 0 ? currentScroll / maxScroll : 0);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Subtle noise texture overlay - barely visible to maintain starfield */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
      </div>
      
      {/* Section Header - Playfair Display SC Black for headings */}
      <motion.div
        className="relative z-10 pt-40 pb-20 text-center px-6"
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
        
        {/* AEDPS Framework Badge - Georgia font */}
        <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
          {["ADOPT", "ENHANCE", "DEPLOY", "PULSE BACK"].map((phase, i) => (
            <React.Fragment key={phase}>
              <span className="text-xs font-georgia tracking-[0.2em] text-white/35">
                {phase}
              </span>
              {i < 3 && <span className="text-white/15 text-lg">→</span>}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Carousel Container with Wheel Support */}
      <div 
        ref={trackRef}
        onScroll={handleScroll}
        className="relative z-10 w-full py-12 overflow-x-auto overflow-y-hidden no-scrollbar"
        style={{ 
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex items-center justify-center gap-12 min-w-max px-8">
          {forgeMembers.map((member) => (
            <div 
              key={member.id} 
              className="transition-transform duration-500 hover:scale-[1.03] flex-shrink-0"
            >
              <ForgeCard 
                member={member} 
                mouseX={mouseX}
                mouseY={mouseY}
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
