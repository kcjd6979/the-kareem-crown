"use client";

import { motion } from "framer-motion";

const MeetTheForge = () => {
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
            Meet The Forge
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-white/80 leading-relaxed">
                The Kareem Crown represents the forge where vision becomes reality. 
                Here, ideas are transformed into powerful automated systems that 
                redefine what's possible.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Every project is crafted with precision, powered by advanced AI, 
                and designed to make a lasting impact in the digital landscape.
              </p>
            </div>
            
            <div className="relative">
              {/* Visual representation of the forge */}
              <div className="aspect-square rounded-full bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚒️</div>
                  <p className="text-white/60">The Creative Forge</p>
                </div>
              </div>
            </div>
          </div>
          
        </motion.div>
        
      </div>
    </section>
  );
};

export default MeetTheForge;
