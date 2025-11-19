"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* === START: RESPONSIVE LOGO === */}
        {/* This container makes the logo responsive. */}
        <div className="relative w-1/2 md:w-1/3 lg:w-1/4">
          <Image
            src="/kareem-logo.webp"
            alt="The personal brand logo of Kareem Daniel"
            width={600}
            height={750}
            priority
            className="w-full h-auto"
          />
        </div>
        {/* === END: RESPONSIVE LOGO === */}

        {/* Title Text */}
        <h1 className="text-center text-6xl md:text-8xl font-bold mt-6 text-white">
          The Kareem Crown
        </h1>

        {/* Subtitle Text */}
        <p className="text-center text-lg md:text-xl text-white/80 mt-4">
          An Arsenal of Proof
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
