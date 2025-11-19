"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    // The main container, centered on the screen.
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center justify-center"
      >
        {/* === START: AGGRESSIVE LOGO SIZING === */}
        {/* Using more direct width control to ensure size */}
        <div className="relative w-[40vw] max-w-xs md:w-[30vw] md:max-w-sm lg:w-[20vw] lg:max-w-md">
          <Image
            src="/kareem-logo.webp"
            alt="The personal brand logo of Kareem Daniel"
            width={600}
            height={750}
            priority
            className="w-full h-auto"
          />
        </div>
        {/* === END: AGGRESSIVE LOGO SIZING === */}

        {/* Title Text */}
        <h1 className="text-center text-6xl md:text-8xl font-bold mt-8 text-white">
          The Kareem Crown
        </h1>

        {/* Subtitle Text */}
        <p className="text-center text-lg md:text-xl text-white/80 mt-4">
          An Arsenal of Proof
        </p>
      </motion.div>
    </div>
  );
};

export default HeroSection;
