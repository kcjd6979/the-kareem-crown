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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-chrome-white mb-4 tracking-tight">
            THE MODERN TOUCH <span className="text-[#D4AF37]">MANIFESTO</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#D4AF37] to-[#B6862C] mx-auto rounded-full" />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Manifesto Text */}
          <div className="space-y-12">
            {/* Reality Check */}
            <ManifestoItem number="01" title="THE REALITY CHECK" isInView={isInView}>
              <p>
                You didn&apos;t build this business to spend your nights fighting algorithms or drowning in digital noise. You built it to lead. But right now, the rules are changing faster than you can adapt, and &quot;hustle&quot; alone isn&apos;t cutting through the fog. You&apos;re not here for more content; you&apos;re here for <span className="text-[#D4AF37] font-semibold">Sovereignty</span>. You&apos;re ready to stop being a spectator and start owning the narrative.
              </p>
            </ManifestoItem>

            {/* The Shift */}
            <ManifestoItem number="02" title="THE SHIFT" isInView={isInView}>
              <p>
                The digital world has been rebuilt. Search isn&apos;t just a list of links anymore; it&apos;s an ecosystem of AI assistants and shifting feeds. You can watch this shift from the sidelines, or you can own it. Most try to use AI as a magic wand; they end up with &quot;ChatGPT AI slop&quot; that&apos;s super easy for your competitors to ignore. <span className="text-[#D4AF37] font-semibold">We do it differently.</span>
              </p>
            </ManifestoItem>

            {/* The Mechanism */}
            <ManifestoItem number="03" title="THE MECHANISM" isInView={isInView}>
              <p className="mb-4">
                At MT Media, we don&apos;t do hacks; we do the <span className="text-[#D4AF37] font-semibold">Modern Touch</span>. We deploy <span className="text-[#D4AF37] font-semibold">The Forge</span>: a specialized elite unit powered by our proprietary <span className="text-[#D4AF37] font-semibold">Midas Os</span>.
              </p>
              <p>
                While you focus on the vision, <span className="text-[#D4AF37] font-semibold">Roman</span>, <span className="text-[#D4AF37] font-semibold">Goldie</span>, <span className="text-[#D4AF37] font-semibold">Nina</span>, and <span className="text-[#D4AF37] font-semibold">Echo</span> architect the strategy and iterate relentlessly to transform your raw ideas into a digital dynasty.
              </p>
            </ManifestoItem>

            {/* The Result */}
            <ManifestoItem number="04" title="THE RESULT" isInView={isInView}>
              <p>
                You are the hero of this story. We are simply the guide providing the map and the weaponry. We turn your chaos into clarity and your attention into <span className="text-[#D4AF37] font-semibold">ROI</span>. The old rules are burned. The new paradigm is yours to write.
              </p>
            </ManifestoItem>
          </div>

          {/* RIGHT COLUMN: Customer Journey Video */}
          <div className="lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              {/* Video Container */}
              <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/10">
                {/* Video Element */}
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/manifesto-poster.jpg"
                >
                  <source src="/videos/customer-journey.mp4" type="video/mp4" />
                  {/* Fallback for GIF */}
                  <img 
                    src="/images/customer-journey.gif" 
                    alt="Customer Journey"
                    className="w-full h-full object-cover"
                  />
                </video>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-black/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Caption */}
              <p className="text-center text-[#D4AF37] text-sm tracking-[0.2em] uppercase mt-4">
                Your Journey Starts Here
              </p>
            </motion.div>

            {/* Call to Action Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="mt-8 text-center"
            >
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#B6862C] rounded-xl blur opacity-30 animate-pulse" />
                <div className="relative bg-obsidian-black border border-[#D4AF37]/50 rounded-xl p-6">
                  <p className="text-xl md:text-2xl font-bold text-chrome-white mb-2">
                    THE PALACE IS OPEN.
                  </p>
                  <p className="text-[#D4AF37] font-semibold">
                    Don&apos;t just watch the shift. <span className="text-white">Own it.</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.7 }}
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

// Manifesto Item Component
const ManifestoItem = ({
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative pl-8 border-l-2 border-[#D4AF37]/20"
    >
      {/* Number Badge */}
      <span className="absolute left-[-1.5rem] top-0 text-4xl font-bold text-[#D4AF37]/20 select-none">
        {number}
      </span>
      
      {/* Content */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-chrome-white mb-3 tracking-wide">
          {title}
        </h3>
        <p className="text-gray-300 leading-relaxed text-lg">
          {children}
        </p>
      </div>
    </motion.div>
  );
};

export default ModernTouchManifesto;
