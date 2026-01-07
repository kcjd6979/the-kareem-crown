"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const CredentialsSection = () => {
  const credentials = [
    {
      name: "High School",
      institution: "Your High School Name",
      logo: "/images/highschool-logo.png",
      achievement: "Academic Excellence"
    },
    {
      name: "College 1",
      institution: "Your First College",
      logo: "/images/college1-logo.png", 
      achievement: "Relevant Degree/Program"
    },
    {
      name: "College 2", 
      institution: "Your Second College",
      logo: "/images/college2-logo.png",
      achievement: "Additional Qualification"
    },
    {
      name: "Certification",
      institution: "Professional Certification",
      logo: "/images/certification-logo.png",
      achievement: "Industry Recognition"
    },
    {
      name: "Scholarship",
      institution: "Maestro University",
      logo: "/images/scholarship-logo.png",
      achievement: "Software Engineering Scholarship"
    }
  ];

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
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-6 tracking-wide">
            The Architect&apos;s Foundation
          </h2>
          <p className="text-xl text-gray-300 font-merriweather font-light tracking-wide">
            Building Excellence Through Education
          </p>
        </motion.div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {credentials.map((credential, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {/* Chrome Card Background */}
              <div className="relative p-6 bg-gradient-to-br from-gray-800/20 to-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-700/30 group-hover:border-[#D4AF37]/50 transition-all duration-500">
                {/* Gold Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
                
                {/* Logo Container */}
                <div className="relative h-16 w-full mb-4 flex items-center justify-center">
                  <div className="relative w-12 h-12">
                    <Image
                      src={credential.logo}
                      alt={`${credential.institution} logo`}
                      fill
                      className="object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.3))',
                      }}
                    />
                  </div>
                </div>

                {/* Institution Name */}
                <h3 className="text-white font-merriweather font-bold text-sm text-center mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {credential.institution}
                </h3>

                {/* Achievement */}
                <p className="text-gray-400 font-merriweather text-xs text-center leading-relaxed">
                  {credential.achievement}
                </p>

                {/* Gold Outline on Hover */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#D4AF37]/20 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};