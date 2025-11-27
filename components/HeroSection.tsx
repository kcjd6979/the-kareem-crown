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
        <div className="relative w-[90%] md:w-[75%]">
          <Image
            src="/kareem-logo.webp"
            alt="The personal brand logo of Kareem Daniel"
            width={600}
            height={750}
            priority
            className="w-full h-auto mix-blend-screen"
          />
        </div>
        {/* === END: AGGRESSIVE LOGO SIZING === */}

        {/* Title Text */}
        <h1 className="text-center text-6xl md:text-8xl font-display font-black mt-8 text-white pb-4 leading-normal">
          The Kareem Crown
        </h1>

        {/* Subtitle Text */}
        <p className="text-center text-lg md:text-xl text-white/80 mt-4 font-sans">
          An Arsenal of Proof
        </p>
      </motion.div>
    </div>
  );
};

export default HeroSection;
