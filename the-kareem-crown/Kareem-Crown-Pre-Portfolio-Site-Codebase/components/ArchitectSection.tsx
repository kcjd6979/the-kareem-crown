"use client";

import { motion } from "framer-motion";

export const ArchitectSection = () => {
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
            The Architect
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Kareem Daniel is an AI Systems Architect who orchestrates proprietary, 
            automated systems. With a foundation built on advanced machine learning 
            and creative problem-solving, he designs solutions that transform 
            complex challenges into elegant, automated victories.
          </p>
          
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              { label: "Systems Built", value: "50+" },
              { label: "Years Experience", value: "7+" },
              { label: "Lives Changed", value: "1000+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
        </motion.div>
        
      </div>
    </section>
  );
};
