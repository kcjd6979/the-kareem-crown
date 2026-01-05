"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const HeroSection = () => {
  // Mouse position state for 3D tilt effect - Increased sensitivity for fluid movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Higher stiffness and lower damping = more responsive, fluid movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 10 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 10 });

  // Wider rotation range for more visible movement
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-25, 25]);

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
    // The main container - Hero section positioned at top for full above-the-fold impact
    <div className="relative flex flex-col items-center justify-start w-full min-h-screen perspective-1000">
      {/* Logo + Title Group - Positioned at top, title at bottom tip of logo */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center z-10 w-full max-w-6xl pt-0"
      >
        {/* === PERSONAL BRAND LOGO - BLACK CROWN - CENTERPIECE === */}
        <motion.div
          className="relative w-[90%] md:w-[85%] max-w-4xl"
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

        {/* Title Text - Positioned at bottom tip of logo for seamless flow */}
        <h1 className="text-center text-5xl md:text-7xl font-playfair font-black -mt-4 md:-mt-6 text-white tracking-wide" style={{
          textShadow: '0 2px 10px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.1)',
        }}>
          The Kareem Crown
        </h1>
      </motion.div>
      {/* End: Logo + Title Group */}

      {/* Seamless fade to next section - Full height gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
    </div>
  );
};

export default HeroSection;
