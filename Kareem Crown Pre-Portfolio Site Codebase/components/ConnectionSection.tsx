/* eslint-disable react/no-unescaped-entities */
"use client";

// components/ConnectionSection.tsx - THE UPLINK

import { MTMRobot } from './MTMRobot';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const ConnectionSection = () => {
  const [isRobotRevealed, setIsRobotRevealed] = useState(false);

  return (
    <section
      id="uplink"
      className="relative w-full min-h-screen py-20 overflow-hidden"
      style={{ backgroundColor: '#0a0a1a' }}
    >
      {/* Background Grid / Data Stream Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(218, 165, 32, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(218, 165, 32, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#DAA520]/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#DAA520]/60 text-xs uppercase tracking-[0.4em] mb-4 font-mono">
            {/* ESTABLISHING UPLINK */}
            ◈ ESTABLISHING UPLINK ◈
          </p>
          <h2 className="font-serif font-bold text-4xl md:text-6xl text-white mb-4">
            Connect with <span className="text-[#DAA520]">The Architect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto font-light">
            Ready to build the future? The MTM Guardian is listening.
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#DAA520] to-transparent mx-auto mt-8" />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: The Hidden Robot (Reveal on Scroll) */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            onViewportEnter={() => setIsRobotRevealed(true)}
            className="relative"
          >
            {/* Robot Container with Enhanced Effects */}
            <div className={`relative transition-all duration-1000 ${isRobotRevealed ? 'opacity-100' : 'opacity-0'}`}>

              {/* Outer Glow Ring */}
              <div className="absolute -inset-4 rounded-3xl border border-[#DAA520]/10 animate-pulse" />

              {/* The Robot */}
              <MTMRobot />

              {/* Status Indicator */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-[#DAA520]/80 font-mono">
                <span className="w-2 h-2 rounded-full bg-[#DAA520] animate-pulse" />
                <span>GUARDIAN ONLINE</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Info & Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            {/* Quick Intro */}
            <div className="p-6 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-3 font-serif">Let's Build Something Legendary</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Whether you're looking for AI-powered systems, full-stack architecture, or strategic digital transformation – The Forge is ready to engineer your vision into reality.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/kcjd6979"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:border-[#DAA520] hover:text-[#DAA520] transition-all duration-300 group"
              >
                <Github size={20} />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/kareem-daniel-a1a397b5/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:border-[#DAA520] hover:text-[#DAA520] transition-all duration-300 group"
              >
                <Linkedin size={20} />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <a
                href="mailto:architect@midastouch.media"
                className="flex items-center gap-3 px-5 py-3 rounded-full border border-[#DAA520]/50 bg-[#DAA520]/10 text-[#DAA520] hover:bg-[#DAA520] hover:text-black transition-all duration-300 group"
              >
                <Mail size={20} />
                <span className="text-sm font-medium">Email The Architect</span>
              </a>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-black font-bold text-lg shadow-lg shadow-[#DAA520]/20 hover:shadow-[#DAA520]/40 transition-shadow"
            >
              <Send size={20} />
              Request a Consultation
            </motion.button>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 pt-8 border-t border-white/5 text-center"
        >
          <p className="text-gray-500 text-sm mb-2">© 2026 Kareem Daniel — The Architect</p>
          <p className="text-[#DAA520]/40 text-xs font-mono tracking-widest">
            ENGINEERED BY THE FORGE • POWERED BY MTM
          </p>
        </motion.footer>
      </div>
    </section>
  );
};

export default ConnectionSection;
