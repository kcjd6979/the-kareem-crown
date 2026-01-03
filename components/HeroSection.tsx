"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const HeroSection = () => {
  // Mouse position state for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const mouseX = useSpring(x, { stiffness: 40, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 40, damping: 15 });

  // Transform mouse position to rotation values with enhanced sensitivity
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

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
    // The main container, centered on the screen with full impact
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen perspective-1000">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
           perspective: 1000,
        }}
        className="z-10 flex flex-col items-center justify-center"
      >
        {/* === PERSONAL BRAND LOGO - BLACK CROWN - CENTERPIECE === */}
        <motion.div
          className="relative w-[95%] md:w-[90%] max-w-5xl"
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/kc-logo-black-crown.webp"
            alt="The Kareem Crown personal brand logo"
            width={800}
            height={350}
            priority
            className="w-full h-auto object-contain"
            style={{
              // Subtle golden glow for the crown accents
              filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.25))',
            }}
          />
        </motion.div>
        {/* === END: PERSONAL BRAND LOGO === */}

        {/* Title Text - Playfair Display SC Black - Glossy Metallic White */}
        <h1 className="text-center text-4xl md:text-6xl font-playfair font-black mt-4 text-white tracking-wide" style={{
          textShadow: '0 2px 10px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.1)',
        }}>
          The Kareem Crown
        </h1>
      </motion.div>
    </div>
  );
};

export default HeroSection;
