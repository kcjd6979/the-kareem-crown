"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const HeroSection = () => {
  // Mouse position state for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  // Transform mouse position to rotation values
  // Adjust range as needed. Here: -20 to 20 degrees based on screen width/height
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position from center of screen (-0.5 to 0.5)
      const normalizedX = (e.clientX / window.innerWidth) - 0.5;
      const normalizedY = (e.clientY / window.innerHeight) - 0.5;

      x.set(normalizedX);
      y.set(normalizedY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    // The main container, centered on the screen.
    <div className="relative flex flex-col items-center justify-center w-full h-screen perspective-1000">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
           perspective: 1000,
        }}
        className="z-10 flex flex-col items-center justify-center"
      >
        {/* === START: AGGRESSIVE LOGO SIZING === */}
        {/* Using more direct width control to ensure size */}
        <motion.div
          className="relative w-[90%] md:w-[80%]"
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/kareem-logo-clean.webp"
            alt="The personal brand logo of Kareem Daniel"
            width={650}
            height={850}
            priority
            className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
          />
        </motion.div>
        {/* === END: AGGRESSIVE LOGO SIZING === */}

        {/* Title Text */}
        <h1 className="text-center text-6xl md:text-8xl font-bold mt-8 text-white pb-4 leading-relaxed">
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
