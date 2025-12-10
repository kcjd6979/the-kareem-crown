"Footer.tsx"

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // We'll use Image for the icons

// This is the SVG filter that creates the liquid glass distortion
const GlassFilter = () => (
  <svg style={{ display: "none" }}>
    <filter id="glass-distortion">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="turbulence"
        scale="20" // Reduced scale for a subtler effect
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="w-full py-12 px-4 flex items-center justify-center relative">
      <GlassFilter />
      <motion.div
        className="relative p-2 rounded-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          filter: "url(#glass-distortion)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="flex items-center justify-center gap-4">
          {/* NOTE: These are placeholders. We will add the actual 3D icons/images later */}
          <p className="text-sm text-gray-300 font-georgia">
            &copy; {new Date().getFullYear()} Kareem Daniel
          </p>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="flex items-center gap-2">
             {/* Placeholder for the "Told by The Forge" icon */}
            <p className="text-sm text-gray-300 font-georgia">
              Told by The Forge
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
