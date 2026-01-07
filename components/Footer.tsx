"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="w-full py-8 flex items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-wrap items-center justify-center gap-6"
      >
        {/* Navigation Links - No containers, just text floating in space */}
        <a 
          href="#logo-story" 
          className="text-sm text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-georgia"
        >
          Logo Story
        </a>
        
        <div className="w-px h-6 bg-white/20"></div>
        
        <a 
          href="#connection" 
          className="text-sm text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-georgia"
        >
          Connect
        </a>
        
        <div className="w-px h-6 bg-white/20"></div>
        
        {/* Copyright */}
        <p className="text-sm text-gray-300 font-georgia">
          &copy; {new Date().getFullYear()} Kareem Daniel
        </p>
        
        <div className="w-px h-6 bg-white/20"></div>
        
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-300 font-georgia">
            Told by The Forge
          </p>
        </div>
      </motion.div>
    </footer>
  );
};
