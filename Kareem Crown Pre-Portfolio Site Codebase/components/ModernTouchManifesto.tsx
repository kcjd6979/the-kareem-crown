"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ModernTouchManifesto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-obsidian-black py-24"
      style={{
        background: `linear-gradient(180deg, #0A0A0A 0%, #1a1a1a 50%, #0A0A0A 100%)`
      }}
    >
      {/* Midas Gold Accent Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      </div>

      {/* Midas Gold Corner Accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#D4AF37]/40 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#D4AF37]/40 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#D4AF37]/40 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#D4AF37]/40 rounded-br-lg" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-chrome-white mb-4 tracking-tight">
            THE MODERN TOUCH <span className="text-[#D4AF37]">MANIFESTO</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#D4AF37] to-[#B6862C] mx-auto rounded-full" />
        </motion.div>

        {/* Staggered Box Layout */}
        <div className="space-y-16">
          {/* Box 01 - Left Aligned */}
          <ManifestoBox
            number="01"
            title="THE REALITY CHECK"
            isInView={isInView}
            align="left"
          >
            <p>
              You didn&apos;t build this business to spend your nights fighting algorithms or drowning in digital noise. You built it to lead. But right now, the rules are changing faster than you can adapt, and &quot;hustle&quot; alone isn&apos;t cutting through the fog. You&apos;re not here for more content; you&apos;re here for <span className="text-[#D4AF37] font-semibold">Sovereignty</span>. You&apos;re ready to stop being a spectator and start owning the narrative.
            </p>
          </ManifestoBox>

          {/* Box 02 - Right Aligned */}
          <ManifestoBox
            number="02"
            title="THE SHIFT"
            isInView={isInView}
            align="right"
          >
            <p>
              The digital world has been rebuilt. Search isn&apos;t just a list of links anymore; it&apos;s an ecosystem of AI assistants and shifting feeds. You can watch this shift from the sidelines, or you can own it. Most try to use AI as a magic wand; they end up with &quot;ChatGPT AI slop&quot; that&apos;s super easy for your competitors to ignore. <span className="text-[#D4AF37] font-semibold">We do it differently.</span>
            </p>
          </ManifestoBox>

          {/* Box 03 - Left Aligned */}
          <ManifestoBox
            number="03"
            title="THE MECHANISM"
            isInView={isInView}
            align="left"
          >
            <p className="mb-4">
              At MT Media, we don&apos;t do hacks; we do the <span className="text-[#D4AF37] font-semibold">Modern Touch</span>. We deploy <span className="text-[#D4AF37] font-semibold">The Forge</span>: a specialized elite unit powered by our proprietary <span className="text-[#D4AF37] font-semibold">Midas Os</span>.
            </p>
            <p>
              While you focus on the vision, <span className="text-[#D4AF37] font-semibold">Roman</span>, <span className="text-[#D4AF37] font-semibold">Goldie</span>, <span className="text-[#D4AF37] font-semibold">Nina</span>, and <span className="text-[#D4AF37] font-semibold">Echo</span> architect the strategy and iterate relentlessly to transform your raw ideas into a digital dynasty.
            </p>
          </ManifestoBox>

          {/* Box 04 - Right Aligned */}
          <ManifestoBox
            number="04"
            title="THE RESULT"
            isInView={isInView}
            align="right"
          >
            <p>
              You are the hero of this story. We are simply the guide providing the map and the weaponry. We turn your chaos into clarity and your attention into <span className="text-[#D4AF37] font-semibold">ROI</span>. The old rules are burned. The new paradigm is yours to write.
            </p>
          </ManifestoBox>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-center mt-24"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#B6862C] rounded-2xl blur opacity-30 animate-pulse" />
            <div className="relative bg-[#0d0d0d] border border-[#D4AF37]/50 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-chrome-white mb-4">
                THE PALACE IS OPEN.
              </p>
              <p className="text-xl md:text-2xl text-[#D4AF37] font-semibold">
                Don&apos;t just watch the shift. <span className="text-white">Own it.</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">
            Marketing Mastery for Modern Minds
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Staggered Box Component
const ManifestoBox = ({
  number,
  title,
  children,
  isInView,
  align = "left"
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  isInView: boolean;
  align?: "left" | "right";
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col ${align === "right" ? "md:items-end" : "md:items-start"}`}
    >
      {/* Large Shadowed Number */}
      <div className="relative mb-4">
        <span className="text-7xl md:text-8xl font-bold text-[#D4AF37]/15 select-none absolute -top-8 left-0">
          {number}
        </span>
      </div>

      {/* Card Box */}
      <div className={`w-full md:w-4/5 ${align === "right" ? "md:text-right" : ""}`}>
        <div 
          className="bg-[#0d0d0d] border border-[#D4AF37]/20 rounded-xl p-6 md:p-8"
          style={{
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.05)'
          }}
        >
          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-chrome-white mb-4 tracking-wide">
            {title}
          </h3>
          
          {/* Body Text */}
          <div className={`text-gray-300 leading-relaxed text-lg ${align === "right" ? "md:text-right" : ""}`}>
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernTouchManifesto;
