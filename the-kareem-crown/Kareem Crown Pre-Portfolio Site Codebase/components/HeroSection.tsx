"HeroSection.tsx"

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle animated background elements can go here if desired */}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center"
      >
        {/* The Architect's Personal Logo */}
        {/* NOTE: We will need to add the logo file to the /public folder later */}
        <motion.div
          initial={{ "--glow-opacity": 0, scale: 1 }}
          animate={{ "--glow-opacity": [0, 1, 0.5, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          style={{
            filter: `drop-shadow(0 0 15px rgba(255, 215, 0, var(--glow-opacity)))`
          }}
        >
          <Image
            src="/architect-logo.svg" // Placeholder - we will add the actual file
            alt="The Architect's Personal Logo"
            width={150}
            height={150}
            priority
          />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-playfair font-black text-5xl md:text-7xl mt-8 text-white"
        >
          The Kareem Crown
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-merriweather text-xl md:text-2xl mt-4 text-gray-300"
        >
          An Arsenal of Proof
        </motion.h2>
      </motion.div>
    </section>
  );
};
