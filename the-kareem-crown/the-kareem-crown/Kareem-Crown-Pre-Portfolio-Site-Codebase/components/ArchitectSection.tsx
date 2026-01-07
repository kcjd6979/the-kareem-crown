"use client";

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export const ArchitectSection = () => {
  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: 3D Brain */}
        <motion.div
          className="h-[500px] w-full flex items-center justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="loader"></div></div>}>
            <Spline scene="https://prod.spline.design/08b0ad4f-2015-4aef-88be-8a30bb3373ee/scene.splinecode" />
          </Suspense>
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
        >
          <h2 className="font-playfair font-bold text-4xl text-white mb-6">
            The Architect
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed font-merriweather">
            &quot;Most companies today see AI as either a confusing threat or a simple toy. I&apos;m the guy who hands them the operating manual. My name is Kareem Daniel, founder of <span className="text-[#D4AF37] font-semibold">Midas Touch Media</span>.
            <strong className="text-white"> I&apos;m an AI Systems Architect who doesn&apos;t just use AI, I orchestrate it.</strong>
            I build the proprietary, automated systems that transform that chaos into a strategic weapon. My foundation wasn&apos;t built in a classroom; it was forged in a decade of operational warfare. And my future is being honed as a Software Engineering scholarship recipient at the AI-first Maestro University.
          </p>
          
          {/* Strategic CTA for Employment */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#connection"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#D4AF37] text-black font-merriweather font-bold rounded-lg hover:bg-[#B6862C] transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let&apos;s Build Together
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.a>
            <motion.a
              href="/resume.pdf"
              className="inline-flex items-center justify-center px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-merriweather font-bold rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
