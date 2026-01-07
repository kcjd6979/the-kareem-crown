"use client";

import { motion } from "framer-motion";

export const ConnectionSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20">
      {/* OPEN GALAXY: No container boundaries */}
      <div className="relative w-full max-w-6xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-8">
            Let's Connect
          </h2>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
            Ready to transform your vision into reality? Let's build something 
            extraordinary together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="mailto:kcjd6979@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-yellow-500 text-black font-bold text-lg hover:bg-yellow-400 transition-colors"
            >
              Email Me
            </motion.a>
            
            <motion.a
              href="https://linkedin.com/in/kareemdaniel"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-bold text-lg hover:bg-white/20 transition-colors"
            >
              LinkedIn
            </motion.a>
          </div>
          
        </motion.div>
        
      </div>
    </section>
  );
};
