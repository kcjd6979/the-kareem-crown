"use client";

import React from 'react';
import { motion } from 'framer-motion';

const CompanyLogoSection: React.FC = () => {

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full Screen Logo Container - NO BACKGROUND, floating in galaxy */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Main Logo - Full Screen Size */}
        <motion.img
          src="/2-mtm-shield-black-_1_.svg"
          alt="Midas Touch Media"
          className="w-full h-full object-contain"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(212, 175, 55, 0.6))',
          }}
          animate={{
            filter: [
              'drop-shadow(0 0 40px rgba(212, 175, 55, 0.6))',
              'drop-shadow(0 0 80px rgba(255, 215, 0, 0.8))',
              'drop-shadow(0 0 40px rgba(212, 175, 55, 0.6))'
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Company tagline - floating in open space */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-serif">
            Midas Touch Media
          </h3>
          <p className="text-yellow-400 text-lg font-light tracking-wider">
            AI-First Venture Studio & Product Lab
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CompanyLogoSection;
