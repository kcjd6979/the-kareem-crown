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
    <div className="relative flex flex-col items-center justify-start w-full min-h-screen perspective-1000 pt-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
           perspective: 1000,
        }}
        className="z-10 flex flex-col items-center justify-center"
      >
        {/* === TRANSPARENT LOGO BLENDING INTO ATMOSPHERE === */}
        <motion.div
          className="relative w-[75%] md:w-[60%] max-w-lg"
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/kc-logo-hero.webp"
            alt="The Kareem Crown personal brand logo"
            width={650}
            height={850}
            priority
            className="w-full h-auto object-contain mix-blend-screen opacity-90"
            style={{
              // Midas Gold (Matte) - Brand Bible Official Color #D4AF37
              filter: 'drop-shadow(0 0 25px rgba(212, 175, 55, 0.5))',
            }}
          />
        </motion.div>
        {/* === END: TRANSPARENT LOGO === */}

        {/* Title Text - Playfair Display SC Black - Glossy Metallic White */}
        <h1 className="text-center text-5xl md:text-7xl font-playfair font-black mt-12 text-white tracking-wide" style={{
          textShadow: '0 2px 10px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.1)',
        }}>
          The Kareem Crown
        </h1>

        {/* Subtitle Text - Merriweather */}
        <p className="text-center text-lg md:text-xl text-white/90 mt-4 font-merriweather font-light tracking-wide">
          An Arsenal of Proof
        </p>
      </motion.div>
    </div>
  );
};

export default HeroSection;
