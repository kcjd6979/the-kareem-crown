"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  // Mouse position state for 3D tilt effect - Increased sensitivity for fluid movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Refs for lighting effects
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Higher stiffness and lower damping = more responsive, fluid movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 10 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 10 });

  // Wider rotation range for more visible movement
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-25, 25]);

  useEffect(() => {
    // Handle mouse movement for spotlight
    const handleMouseMove = (e: MouseEvent) => {
      // Store raw mouse position for CSS custom property
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      
      // Update CSS variable for spotlight position (performance-optimized)
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        spotlightRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }

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
    // The main container - Hero section centered for full above-the-fold impact
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen perspective-1000 overflow-hidden" style={{ paddingTop: '0px', paddingBottom: '5vh' }}>
      
      {/* === GLOBAL MIDAS GOLD MOUSE SPOTLIGHT === */}
      {/* Follows mouse cursor throughout site with Midas Gold glow */}
      <div 
        ref={spotlightRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(700px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 175, 55, 0.25) 0%, rgba(212, 175, 55, 0.12) 35%, transparent 65%)',
        }}
      />
      
      {/* === OVERHEAD GOLD CROWN LIGHT === */}
      {/* Fixed ambient gold light centered above crown for contrast */}
      <div 
        className="absolute pointer-events-none z-0"
        style={{
          left: '50%',
          top: '5%',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '250px',
          background: 'radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.18) 0%, rgba(212, 175, 55, 0.06) 40%, transparent 70%)',
          filter: 'blur(15px)',
        }}
      />
      
      {/* === OVERHEAD WHITE LAMP LIGHT === */}
      {/* White ambient light that complements the gold crown illumination */}
      <div 
        className="absolute pointer-events-none z-0"
        style={{
          left: '50%',
          top: '0%',
          transform: 'translateX(-50%)',
          width: '450px',
          height: '220px',
          background: 'radial-gradient(ellipse at center bottom, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 50%, transparent 80%)',
          filter: 'blur(25px)',
        }}
      />

      {/* Logo + Title Group - Centered in viewport with minimal gap */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center z-10 w-full max-w-4xl gap-[2vh]"
      >
        {/* === PERSONAL BRAND LOGO - BLACK CROWN - CENTERPIECE === */}
        <motion.div
          className="relative w-[90%] md:w-[85%] max-w-5xl"
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
            transform: 'scale(1.02, 0.95)',
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
              // Midas Gold glow for the crown accents
              filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))',
            }}
          />
        </motion.div>
        {/* === END: PERSONAL BRAND LOGO === */}

        {/* Title Text - Positioned immediately below logo */}
        <h1 className="text-center text-5xl md:text-7xl font-playfair font-black mt-0 mb-0 text-white tracking-wide" style={{
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
