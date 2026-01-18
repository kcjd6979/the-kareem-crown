"use client";

import Image from "next/image";
import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { VideoPlaceholder, ImagePlaceholder } from "./ui/MediaPlaceholder";

// Reusable component for highlighted text
const Gold = ({ children }: { children: ReactNode }) => (
  <span className="text-midas-gold-glossy font-semibold">{children}</span>
);

// New Manifesto Box component as per specs
interface ManifestoBoxProps {
  number: string;
  title: string;
  children: ReactNode;
  isInView: boolean;
  align: "left" | "right";
}

const ManifestoBox = ({ number, title, children, isInView, align }: ManifestoBoxProps) => {
  const animation = {
    initial: { opacity: 0, y: 40 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <motion.div {...animation} className="mb-12 md:mb-16">
      <div className={`flex flex-col relative ${align === "right" ? "md:items-end" : "md:items-start"}`}>
        <span className="text-7xl md:text-8xl font-black text-midas-gold-glossy/10 select-none absolute -top-8 -z-10 opacity-50">
          {number}
        </span>
        <div className="w-full md:w-4/5 glass-card-glow p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-chrome-white mb-4">
            {title}
          </h3>
          <div className="text-gray-300 leading-relaxed text-lg">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ModernTouchManifesto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const headerAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const ctaAnimation = {
    initial: { opacity: 0, scale: 0.95 },
    animate: isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 },
    transition: { duration: 0.8, delay: 0.5, ease: "easeOut" },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-obsidian-black py-24 sm:py-32 manifesto-section"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#1a1a1a]/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div {...headerAnimation} className="text-center mb-16 md:mb-24">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-chrome-white mb-4 tracking-tight">
            THE MODERN TOUCH <span className="text-midas-gold-glossy">MANIFESTO</span>
          </h2>
          <div className="w-32 h-1 bg-gold-gradient mx-auto rounded-full" />
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 xl:gap-24">

          {/* Left Column: Sticky Video */}
          <div className="lg:sticky top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="mb-12 lg:mb-0"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/10">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/manifesto-poster.jpg"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/customer-journey.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
              <p className="text-center text-midas-gold-glossy text-sm tracking-[0.2em] uppercase mt-4">
                Your Journey Starts Here
              </p>
            </motion.div>
          </div>

          {/* Right Column: Staggered Text Boxes */}
          <div className="flex flex-col gap-8">
            <ManifestoBox number="01" title="THE REALITY CHECK" isInView={isInView} align="left">
              <p>
                You didn&apos;t build this business to spend your nights fighting algorithms or drowning in digital noise. You built it to lead. But right now, the rules are changing faster than you can adapt, and &quot;hustle&quot; alone isn&apos;t cutting through the fog. You&apos;re not here for more content; you&apos;re here for <Gold>Sovereignty</Gold>. You&apos;re ready to stop being a spectator and start owning the narrative.
              </p>
            </ManifestoBox>

            <ManifestoBox number="02" title="THE SHIFT" isInView={isInView} align="right">
              <p>
                The digital world has been rebuilt. Search isn&apos;t just a list of links anymore; it&apos;s an ecosystem of AI assistants and shifting feeds. You can watch this shift from the sidelines, or you can own it. Most try to use AI as a magic wand; they end up with &quot;ChatGPT AI slop&quot; that&apos;s super easy for your competitors to ignore. We do it differently.
              </p>
            </ManifestoBox>

            <ManifestoBox number="03" title="THE MIDAS TOUCH" isInView={isInView} align="left">
              <p>
                This isn&apos;t about chasing trends; it&apos;s about engineering legacy. The Midas Touch is our methodology: a proprietary fusion of architectural precision, creative alchemy, and relentless optimization. We don&apos;t just build systems; we forge ecosystems that anticipate market shifts, captivate audiences, and transmute potential into measurable, undeniable performance. It&apos;s the difference between being in the market and <Gold>becoming</Gold> the market.
              </p>
            </ManifestoBox>

            <ManifestoBox number="04" title="THE MECHANISM" isInView={isInView} align="right">
              <p className="mb-4">
                At MTM, we don&apos;t do hacks; we do the <Gold>Modern Touch</Gold>. We deploy <Gold>The Forge</Gold>: a specialized elite unit powered by our proprietary <Gold>Midas OS</Gold>.
              </p>
              <p>
                While you focus on the vision, <Gold>Roman</Gold>, <Gold>Goldie</Gold>, <Gold>Nina</Gold>, and <Gold>Echo</Gold> architect the strategy and iterate relentlessly to transform your raw ideas into a digital dynasty.
              </p>
            </ManifestoBox>

            <ManifestoBox number="05" title="THE RESULT" isInView={isInView} align="left">
              <p>
                You are the hero of this story. We are simply the guide providing the map and the weaponry. We turn your chaos into clarity and your attention into <Gold>ROI</Gold>. The old rules are burned. The new paradigm is yours to write.
              </p>
            </ManifestoBox>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-24 md:mt-32">
           <motion.div {...ctaAnimation} className="relative inline-block">
             <div className="absolute -inset-1 bg-gold-gradient rounded-2xl blur opacity-30 animate-pulse" />
             <div className="relative bg-jet-black-soft border border-midas-gold-glossy/50 rounded-2xl p-8 md:p-12">
               <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-chrome-white mb-4">
                 THE PALACE IS OPEN.
               </p>
               <p className="text-xl md:text-2xl text-midas-gold-glossy font-semibold">
                 Don&apos;t just watch the shift. <span className="text-white">Own it.</span>
               </p>
             </div>
           </motion.div>

           <motion.p
             initial={{ opacity: 0 }}
             animate={isInView ? { opacity: 1 } : {}}
             transition={{ duration: 0.8, delay: 0.8 }}
             className="text-midas-gold-glossy text-sm tracking-[0.3em] uppercase mt-12"
            >
             MARKETING MASTERY FOR MODERN MINDS
           </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ModernTouchManifesto;
