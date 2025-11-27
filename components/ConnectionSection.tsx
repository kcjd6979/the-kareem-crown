"use client";

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';

export const ConnectionSection = () => {
  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-6">
            Connect with The Architect
          </h2>
          <p className="text-xl text-gray-300">
            Let&apos;s Build the Future Together
          </p>
        </motion.div>

        {/* 3-Column Layout: Stack on Mobile, Row on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

          {/* Left Column: The Architect (Dossier) */}
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative w-[80%] aspect-[3/4] border border-[#B39566]/30 rounded-xl overflow-hidden group">
              <Image
                src="/images/dossier.png"
                alt="Dossier"
                fill
                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </motion.div>

          {/* Center Column: The Creation (Robot) */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="h-[400px] w-full mb-8">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="loader"></div></div>}>
                <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
              </Suspense>
            </div>

            <div className="flex items-center justify-center gap-8">
              <a href="https://github.com/kcjd6979" target="_blank" rel="noopener noreferrer" className="text-white hover:text-midas-gold transition-colors">
                <Github size={32} />
              </a>
              <a href="https://www.linkedin.com/in/kareem-daniel-a1a397b5/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-midas-gold transition-colors">
                <Linkedin size={32} />
              </a>
              <a href="mailto:your-email@example.com" className="text-white hover:text-midas-gold transition-colors">
                <Mail size={32} />
              </a>
            </div>
          </motion.div>

          {/* Right Column: The Empire (MTM Logo) */}
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
             {/* Float animation using framer-motion since animate-bounce-slow is not custom defined */}
            <motion.div
              className="relative w-64 h-64 mix-blend-screen"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/mtm_logo.png"
                alt="MTM Logo"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>

        </div>

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
      </div>
    </section>
   );
};
