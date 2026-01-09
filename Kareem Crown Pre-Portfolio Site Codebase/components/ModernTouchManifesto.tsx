"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ModernTouchManifesto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#050505] py-24"
    >
      {/* Midas Gold Accent Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
      </div>

      {/* Midas Gold Corner Accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-[#D4AF37]/30 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-[#D4AF37]/30 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-[#D4AF37]/30 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-[#D4AF37]/30 rounded-br-lg" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header - Editorial Serif Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="font-merriweather text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            THE MODERN TOUCH <span className="text-[#D4AF37]">MANIFESTO</span>
          </h2>
          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto rounded-full" />
        </motion.div>

        {/* Two-Column Layout: Video Left, Content Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Video/Media Area */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              {/* Video Container with Gold Border */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#D4AF37]/40 bg-[#0a0a0a]">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/manifesto-poster.jpg"
                >
                  <source src="/videos/customer-journey.mp4" type="video/mp4" />
                  <img 
                    src="/images/customer-journey.gif" 
                    alt="Customer Journey"
                    className="w-full h-full object-cover"
                  />
                </video>
                
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Caption with Letter Spacing */}
              <p className="font-merriweather text-center text-[#D4AF37] text-sm uppercase tracking-[0.25em] mt-6">
                Your Journey Starts Here
              </p>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Manifesto Content */}
          <div className="lg:col-span-7 space-y-24">
            
            {/* Box 01 - THE REALITY CHECK */}
            <ManifestoBox
              number="01"
              title="THE REALITY CHECK"
              isInView={isInView}
            >
              <p className="font-merriweather text-gray-300 leading-loose text-lg">
                You didn&apos;t build this business to spend your nights fighting algorithms or drowning in digital noise. You built it to lead. But right now, the rules are changing faster than you can adapt, and &quot;hustle&quot; alone isn&apos;t cutting through the fog. You&apos;re not here for more content; you&apos;re here for <span className="text-[#D4AF37] font-semibold">Sovereignty</span>. You&apos;re ready to stop being a spectator and start owning the narrative.
              </p>
            </ManifestoBox>

            {/* Box 02 - THE SHIFT */}
            <ManifestoBox
              number="02"
              title="THE SHIFT"
              isInView={isInView}
            >
              <p className="font-merriweather text-gray-300 leading-loose text-lg">
                The digital world has been rebuilt. Search isn&apos;t just a list of links anymore; it&apos;s an ecosystem of AI assistants and shifting feeds. You can watch this shift from the sidelines, or you can own it. Most try to use AI as a magic wand; they end up with &quot;ChatGPT AI slop&quot; that&apos;s super easy for your competitors to ignore. <span className="text-[#D4AF37] font-semibold">We do it differently.</span>
              </p>
            </ManifestoBox>

            {/* Box 03 - THE MECHANISM */}
            <ManifestoBox
              number="03"
              title="THE MECHANISM"
              isInView={isInView}
            >
              <p className="font-merriweather text-gray-300 leading-loose text-lg mb-6">
                At MT Media, we don&apos;t do hacks; we do the <span className="text-[#D4AF37] font-semibold">Modern Touch</span>. We deploy <span className="text-[#D4AF37] font-semibold">The Forge</span>: a specialized elite unit powered by our proprietary <span className="text-[#D4AF37] font-semibold">Midas Os</span>.
              </p>
              <p className="font-merriweather text-gray-300 leading-loose text-lg">
                While you focus on the vision, <span className="text-[#D4AF37] font-semibold">Roman</span>, <span className="text-[#D4AF37] font-semibold">Goldie</span>, <span className="text-[#D4AF37] font-semibold">Nina</span>, and <span className="text-[#D4AF37] font-semibold">Echo</span> architect the strategy and iterate relentlessly to transform your raw ideas into a digital dynasty.
              </p>
            </ManifestoBox>

            {/* Box 04 - THE RESULT */}
            <ManifestoBox
              number="04"
              title="THE RESULT"
              isInView={isInView}
            >
              <p className="font-merriweather text-gray-300 leading-loose text-lg">
                You are the hero of this story. We are simply the guide providing the map and the weaponry. We turn your chaos into clarity and your attention into <span className="text-[#D4AF37] font-semibold">ROI</span>. The old rules are burned. The new paradigm is yours to write.
              </p>
            </ManifestoBox>

          </div>
        </div>

        {/* Call to Action - Elegant Minimalist Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-center mt-24"
        >
          <div className="relative inline-block">
            {/* Gold Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-[#D4AF37]/20 rounded-xl blur-md" />
            
            {/* CTA Card */}
            <div 
              className="relative bg-[#0d0d0d] border border-[#D4AF37]/30 rounded-xl p-8 md:p-12"
              style={{
                boxShadow: '0 0 40px rgba(212, 175, 55, 0.08)'
              }}
            >
              <p className="font-merriweather text-3xl md:text-4xl font-bold text-white mb-4">
                THE PALACE IS OPEN.
              </p>
              <p className="font-merriweather text-xl text-[#D4AF37]">
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
          <p className="font-merriweather text-[#D4AF37] text-sm uppercase tracking-[0.3em]">
            Marketing Mastery for Modern Minds
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Manifesto Box Component - Editorial Card Style
const ManifestoBox = ({
  number,
  title,
  children,
  isInView
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  isInView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      {/* Floating Icon - Decorative Gold Bullet */}
      <div className="absolute -left-4 -top-3 w-2 h-2 bg-[#D4AF37] rounded-full z-10" />
      
      {/* Large Watermark Number in Background */}
      <span className="absolute -top-8 -right-4 font-merriweather text-6xl md:text-7xl font-bold text-white/5 select-none pointer-events-none">
        {number}
      </span>

      {/* Card Container - Subtle Styling */}
      <div 
        className="bg-[#121212] border border-white/5 rounded-lg p-6 md:p-8"
        style={{
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Title with Serif Typography */}
        <h3 className="font-merriweather text-xl md:text-2xl font-bold text-white mb-6 tracking-wide">
          {title}
        </h3>
        
        {/* Body Text - Serif with comfortable line-height */}
        <div className="font-merriweather text-gray-300 leading-loose text-lg">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default ModernTouchManifesto;
