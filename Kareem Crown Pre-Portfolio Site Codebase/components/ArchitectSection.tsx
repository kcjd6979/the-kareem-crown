"ArchitectSection.tsx"

"use client";

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
const Spline = React.lazy(() => import('@splinetool/react-spline'));

export const ArchitectSection = () => {
  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: 3D Brain */}
        <motion.div 
          className="h-[400px] w-full"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="loader"></div></div>}>
            <Spline scene="https://app.spline.design/community/file/08b0ad4f-2015-4aef-88be-8a30bb3373ee/scene.splinecode" />
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
            Architect
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed font-merriweather">
            &quot;Most companies today see AI as either a confusing threat or a simple toy. I&apos;m the guy who hands them the operating manual. My name is Kareem Daniel, founder of Midas Touch Media.
            <strong className="text-white"> I&apos;m an AI Systems Architect who doesn&apos;t just use AI, I orchestrate it.</strong>
            I build the proprietary, automated systems that transform that chaos into a strategic weapon. My foundation wasn&apos;t built in a classroom; it was forged in a decade of operational warfare. And my future is being honed as a Software Engineering scholarship recipient at the AI-first Maestro University. I&apos;m looking for a place where I can stop just talking about the future of business, and get back to the business of building it.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
};
