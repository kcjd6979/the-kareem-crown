"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaRobot, FaCogs, FaMagic, FaChartLine, FaCode } from 'react-icons/fa';

export const AIToolsSection = () => {
  const aiTools = [
    {
      name: "Gemini",
      company: "Google",
      icon: FaBrain,
      description: "Advanced multimodal AI for complex reasoning",
      expertise: "Content Generation, Analysis"
    },
    {
      name: "ChatGPT",
      company: "OpenAI", 
      icon: FaRobot,
      description: "Conversational AI for diverse applications",
      expertise: "Code Generation, Writing"
    },
    {
      name: "Claude",
      company: "Anthropic",
      icon: FaCogs,
      description: "Constitutional AI for safe interactions",
      expertise: "Analysis, Research"
    },
    {
      name: "MiniMax",
      company: "MiniMax AI",
      icon: FaMagic,
      description: "Cutting-edge AI for enterprise solutions",
      expertise: "Custom Integration"
    },
    {
      name: "DeepSeek",
      company: "DeepSeek AI",
      icon: FaChartLine,
      description: "Advanced reasoning and code generation",
      expertise: "Programming, Logic"
    },
    {
      name: "Custom AI",
      company: "MTM Labs",
      icon: FaCode,
      description: "Proprietary AI systems and workflows",
      expertise: "System Architecture"
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
            Arsenal of Intelligence
          </h2>
          <p className="text-xl text-gray-300 font-merriweather font-light tracking-wide">
            Mastery Across the AI Ecosystem
          </p>
        </motion.div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiTools.map((tool, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Glass Card */}
              <div className="relative p-8 backdrop-blur-sm rounded-2xl transition-all duration-500 h-full">
                {/* Subtle Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-xl group-hover:border-[#D4AF37]/60 transition-all duration-500">
                    <tool.icon 
                      size={32} 
                      className="text-[#D4AF37] group-hover:text-white transition-all duration-500" 
                    />
                  </div>
                </div>

                {/* Tool Name & Company */}
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-playfair font-bold text-white group-hover:text-[#D4AF37] transition-colors duration-300 mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-[#D4AF37] font-merriweather font-medium text-sm">
                    {tool.company}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-300 font-merriweather text-sm text-center leading-relaxed mb-4">
                  {tool.description}
                </p>

                {/* Expertise */}
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 rounded-full text-[#D4AF37] font-merriweather text-xs">
                    {tool.expertise}
                  </span>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#D4AF37]/20 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-gray-400 font-merriweather text-lg">
            Continuous learning across the evolving AI landscape
          </p>
        </motion.div>
      </div>
    </section>
  );
};