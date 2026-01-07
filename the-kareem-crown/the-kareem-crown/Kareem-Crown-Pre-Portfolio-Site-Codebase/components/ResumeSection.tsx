"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFilePdf, FaEye } from 'react-icons/fa';

export const ResumeSection = () => {
  return (
    <motion.section 
      className="w-full py-16 px-4 md:px-8 relative bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="font-playfair font-bold text-3xl text-white mb-6">
          Ready to Transform Your AI Strategy?
        </h3>
        <p className="text-gray-300 font-merriweather text-lg mb-8 leading-relaxed">
          Download my detailed resume to explore my journey, skills, and the vision behind Midas Touch Media.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] text-black font-merriweather font-bold rounded-lg hover:bg-[#B6862C] transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload className="mr-3" />
            Download Resume
          </motion.a>
          
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 border border-[#D4AF37] text-[#D4AF37] font-merriweather font-bold rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEye className="mr-3" />
            Preview Online
          </motion.a>
        </div>
        
        <p className="text-gray-500 font-merriweather text-sm mt-6">
          PDF format • Last updated: December 2025
        </p>
      </div>
    </motion.section>
  );
};