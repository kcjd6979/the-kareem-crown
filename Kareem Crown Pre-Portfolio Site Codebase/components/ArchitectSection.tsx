"use client";

import React, { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Brain, Zap } from 'lucide-react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));

export const ArchitectSection = () => {
  const [splineError, setSplineError] = useState(false);

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Background Effects - Midas Gold Only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4AF37]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#B6862C]/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column: 3D Brain/Particle Brain */}
        <motion.div 
          className="h-[400px] w-full relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Spline Container */}
          {!splineError ? (
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="loader"></div></div>}>
              <div className="w-full h-full">
                <Spline 
                  scene="https://prod.spline.design/08b0ad4f-2015-4aef-88be-8a30bb3373ee/scene.splinecode"
                  onError={() => setSplineError(true)}
                />
              </div>
            </Suspense>
          ) : (
            /* Fallback: Animated Particle Brain Visualization */
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] border border-[#D4AF37]/30 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Animated particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#D4AF37] rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
              
              {/* Brain icon with glow */}
              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    filter: ["drop-shadow(0 0 20px rgba(212, 175, 55, 0.5))", "drop-shadow(0 0 40px rgba(212, 175, 55, 0.8))", "drop-shadow(0 0 20px rgba(212, 175, 55, 0.5))"]
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="w-32 h-32 mx-auto mb-4"
                >
                  <Brain className="w-full h-full text-[#D4AF37]" />
                </motion.div>
                <p className="text-[#D4AF37] text-sm uppercase tracking-widest">Particle Brain</p>
                <p className="text-gray-500 text-xs mt-2">AI Systems Architecture</p>
              </div>
              
              {/* Circuit lines effect */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <motion.path
                  d="M0,200 Q100,100 200,200 T400,200"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.path
                  d="M0,300 Q150,200 300,300 T600,300"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                />
              </svg>
            </div>
          )}
          
          <style>{`
            .loader {
              width: 48px;
              height: 48px;
              border: 5px solid #FFF;
              border-bottom-color: #FFD700;
              border-radius: 50%;
              display: inline-block;
              box-sizing: border-box;
              animation: rotation 1s linear infinite;
            }
            @keyframes rotation {
              0% { transform: rotate(0deg ); }
              100% { transform: rotate(360deg); }
            } 
          `}</style>
        </motion.div>

        {/* Right Column: Narrative */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-6">
              Architect
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] rounded-full mb-8" />
            
            <p className="text-lg text-gray-300 leading-relaxed font-merriweather">
              &quot;Most companies today see AI as either a confusing threat or a simple toy. 
              I&apos;m the guy who hands them the operating manual. My name is{" "}
              <span className="text-[#D4AF37] font-semibold">Kareem Daniel</span>, 
              founder of <span className="text-[#D4AF37] font-semibold">Midas Touch Media</span>.
              <br /><br />
              I&apos;m an <span className="text-[#D4AF37] font-semibold">AI Systems Architect</span> who 
              doesn&apos;t just use AI, <span className="text-[#D4AF37] font-semibold">I orchestrate it</span>.
              I build the <span className="text-[#D4AF37] font-semibold">proprietary, automated systems</span> that 
              transform that chaos into a strategic weapon. My foundation wasn&apos;t built in a classroom; 
              it was forged in a <span className="text-[#D4AF37] font-semibold">decade of operational warfare</span>.
              <br /><br />
              And my future is being honed as a <span className="text-[#D4AF37] font-semibold">Software Engineering scholarship</span> recipient 
              at the AI-first Maestro University. I&apos;m looking for a place where I can stop just talking about 
              the future of business, and <span className="text-[#D4AF37] font-semibold">get back to the business of building it</span>.&quot;
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-black font-bold font-playfair rounded-lg hover:bg-[#E5C578] transition-colors shadow-lg shadow-[#D4AF37]/20"
            >
              <span>Let&apos;s Build Together</span>
              <ArrowRight size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-8 py-4 border border-[#D4AF37] text-[#D4AF37] font-bold font-playfair rounded-lg hover:bg-[#D4AF37]/10 transition-colors"
            >
              <Download size={18} />
              <span>Download Resume</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
