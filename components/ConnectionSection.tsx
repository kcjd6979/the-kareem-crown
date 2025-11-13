"ConnectionSection.tsx"

"use client";

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));

export const ConnectionSection = () => {
  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="font-playfair font-bold text-4xl md:text-5xl text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Connect with The Architect
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Let's Build the Future Together
        </motion.p>

        {/* Placeholder for the 3D Robot Scene */}
        <motion.div 
          className="h-[300px] w-full mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
           <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="loader"></div></div>}>
            {/* This is the 3D Robot scene you found */}
            <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
          </Suspense>
        </motion.div>

        <motion.div 
          className="flex items-center justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {/* NOTE: These are temporary 2D icons. The 3D icons would be more complex components */}
          <a href="https://github.com/kcjd6979" target="_blank" rel="noopener noreferrer" className="text-white hover:text-midas-gold transition-colors">
            <Github size={32} />
          </a>
          <a href="https://www.linkedin.com/in/kareem-daniel-a1a397b5/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-midas-gold transition-colors">
            <Linkedin size={32} />
          </a>
          <a href="mailto:your-email@example.com" className="text-white hover:text-midas-gold transition-colors">
            <Mail size={32} />
          </a>
        </motion.div>
      </div>
    </section>
   );
};
