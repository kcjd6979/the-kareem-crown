"use client";

import { motion } from "framer-motion";

export const AIToolsSection = () => {
  const aiTools = [
    { name: "Claude AI", category: "Language Model" },
    { name: "GPT-4", category: "Language Model" },
    { name: "Midjourney", category: "Image Generation" },
    { name: "Stable Diffusion", category: "Image Generation" },
    { name: "LangChain", category: "Framework" },
    { name: "AutoGPT", category: "Autonomous Agent" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20">
      {/* OPEN GALAXY: No container boundaries */}
      <div className="relative w-full max-w-6xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-12 text-center">
            AI Arsenal
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {aiTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/20 hover:border-yellow-500/50 transition-colors cursor-default"
              >
                <span className="text-white font-medium">{tool.name}</span>
                <span className="text-white/40 mx-2">|</span>
                <span className="text-white/60 text-sm">{tool.category}</span>
              </motion.div>
            ))}
          </div>
          
        </motion.div>
        
      </div>
    </section>
  );
};
